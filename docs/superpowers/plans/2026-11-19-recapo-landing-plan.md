# Recapo landing page: implementation plan

Spec: `docs/superpowers/specs/2026-11-19-recapo-landing-design.md`

Versions checked on 2026-11-19: next 16.4, react 19.3, ai 7.0, @ai-sdk/google 4.0, @ai-sdk/react 4.0, stripe 23.2, zod 4.6, motion 14.14, jose 6.2, tailwindcss 4.3, vitest 5.1, @playwright/test 1.65, Node 22.

API notes for ai 7:
- `streamObject` is deprecated. Server uses `streamText({ model, output: Output.object({ schema }), ... })` and returns `result.toTextStreamResponse()`.
- Client uses `useObject({ api, schema })` from `@ai-sdk/react`.
- Model ID comes from `GEMINI_MODEL`, default `gemini-3.5-flash`; fall back to `gemini-2.5-flash` if the newer one is not on the free tier.

Rules for every task: no code comments, strict TypeScript, small single-purpose files, run `npm run lint` and `npm run typecheck` before committing, one commit per task.

## Task 0. Accounts and keys (user)

- Google AI Studio API key (free tier).
- Stripe account in test mode: secret key `sk_test_...`.
- Vercel account linked to GitHub.
- Generate `PLAN_TOKEN_SECRET`: `openssl rand -base64 32`.

Done when: all four values are in `.env.local` (never committed).

## Task 1. Scaffold

- `create-next-app` with TypeScript, Tailwind, App Router, ESLint, `src/` off, import alias `@/*`, in the existing `recapo` folder (spec and plan docs stay).
- Add dependencies: `ai @ai-sdk/google @ai-sdk/react zod stripe jose motion geist`; dev: `vitest @vitejs/plugin-react @playwright/test`.
- `tsconfig`: `strict`, `noUncheckedIndexedAccess`.
- Scripts: `typecheck`, `test`, `test:e2e`.
- Geist font in `app/layout.tsx`; colour tokens for light and dark in `app/globals.css` (Tailwind v4 `@theme`), one accent colour.
- `.env.example` with `GOOGLE_GENERATIVE_AI_API_KEY`, `GEMINI_MODEL`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`, `PLAN_TOKEN_SECRET`.
- `lib/env.ts`: reads and validates server env with Zod, throws a clear error when a value is missing.

Verify: `npm run dev` shows a blank themed page; `npm run build` passes.

## Task 2. Result schema (test first)

- `lib/schema.ts`: `actionItemSchema`, `freeResultSchema` (summary, decisions, actionItems), `proResultSchema` (adds risks), `resultSchemaFor(plan)`. Field descriptions guide the model (owner "Unassigned", due "Not set" when unknown).
- `lib/schema.test.ts`: valid object passes, missing summary fails, bad priority fails, Pro requires risks.

Verify: `npm test` green.

## Task 3. Plans and token (test first)

- `lib/plan.ts`: `Plan = "free" | "pro"`, `PLAN_LIMITS` (4,000 and 20,000 characters), `signPlanToken(sessionId)` and `verifyPlanToken(token)` with `jose` HS256, 24 hours, `PLAN_COOKIE` name.
- `lib/plan.test.ts`: round trip, tampered token rejected, expired token rejected.

Verify: tests green.

## Task 4. Rate limiter (test first)

- `lib/rate-limit.ts`: in-memory sliding window per key, `checkRateLimit(key, now)` returns allowed and retry-after seconds; 10 requests per 10 minutes.
- `lib/rate-limit.test.ts`: allows up to the limit, blocks the next, allows again after the window.

Verify: tests green.

## Task 5. `/api/analyze`

- `lib/current-plan.ts`: reads the cookie from a request and returns the plan.
- `lib/prompt.ts`: system prompt for meeting analysis.
- `app/api/analyze/route.ts`: parse body with Zod; check length against the plan; rate limit by IP (`x-forwarded-for`); `streamText` with `Output.object({ schema: resultSchemaFor(plan) })`; return `toTextStreamResponse()`. Errors return JSON `{ error: "too_long" | "rate_limited" | "busy" }` with 413, 429 or 503; provider 429 maps to `busy`.
- `lib/sample.ts`: sample meeting notes and a bundled sample result for the busy fallback.

Verify: `curl` with the sample text streams JSON; over-limit text returns 413.

## Task 6. Demo UI

- `components/demo/demo.tsx` (client): holds state, uses `useObject` with `resultSchemaFor(plan)`.
- `components/demo/demo-input.tsx`: textarea, counter with plan limit, "Use sample meeting", Analyse button, confidentiality note.
- `components/demo/demo-result.tsx`: Summary, Decisions, Action items, Risks (Pro); skeletons while streaming; "Try again" when the stream breaks; busy notice with the sample result.
- `components/demo/action-items-table.tsx`: table on desktop, cards on mobile, priority badges.
- `lib/to-markdown.ts` + `lib/to-markdown.test.ts`; `components/demo/export-button.tsx` (Pro only, downloads `.md`) and a Copy button.

Verify: in the browser the sample streams in; errors render as designed; tests green.

## Task 7. `/api/plan` and plan state

- `app/api/plan/route.ts`: returns `{ plan }` from the cookie.
- `lib/use-plan.ts` (client hook): fetches the plan, exposes `refresh()`.
- Demo uses the hook for limits and Pro features.

Verify: without a cookie the plan is free.

## Task 8. Stripe test checkout

- `lib/stripe.ts`: Stripe client from env.
- `app/api/checkout/route.ts`: body `{ interval: "month" | "year" }`; Checkout Session in subscription mode with inline `price_data` ($12 per month, $120 per year); success URL `/?session_id={CHECKOUT_SESSION_ID}#pricing`; cancel URL `/?checkout=cancelled#pricing`; returns `{ url }`.
- `app/api/verify/route.ts`: body `{ sessionId }`; retrieve session; require `status === "complete"`; set httpOnly, secure, SameSite=Lax cookie with the signed token; return `{ plan: "pro" }`.
- `components/sections/pricing.tsx` + `components/pricing/upgrade-button.tsx` + `components/pricing/checkout-return.tsx`: monthly/yearly toggle, test card hint, verifies `session_id` on return, shows cancelled notice, refreshes plan, then removes the query string.

Verify: pay with 4242 4242 4242 4242 in test mode, return to the page, Pro badge shows, 20,000 limit and Export work.

## Task 9. Landing sections

- `components/sections/`: `header.tsx` (anchors, mobile menu), `hero.tsx` (animated preview card), `how-it-works.tsx`, `features.tsx`, `faq.tsx` (accessible accordion), `footer.tsx` (test-mode note).
- `components/motion/reveal.tsx`: section reveal that respects `prefers-reduced-motion`.
- `app/page.tsx` composes the sections.

Verify: every breakpoint (375, 768, 1280) in both themes; keyboard navigation works.

## Task 10. SEO

- `app/layout.tsx` metadata, `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`.

Verify: `npm run build`; OG image renders at `/opengraph-image`.

## Task 11. Playwright

- `playwright.config.ts` with desktop and mobile projects; `webServer` runs the production build.
- `e2e/demo.spec.ts`: route-mock `/api/analyze` with the sample result; load sample, analyse, see action items.
- `e2e/layout.spec.ts`: on mobile, header menu opens and pricing cards stack.

Verify: `npm run test:e2e` green.

## Task 12. Polish

- Lighthouse mobile on the production build: target 95+ in all four categories; fix images, fonts, contrast, labels.
- Check console for errors and hydration warnings.

Verify: Lighthouse screenshot saved to `docs/lighthouse.png`.

## Task 13. Deploy

- Create the public GitHub repo with `gh repo create ArtemPan/recapo --public --source . --push` (after confirming with the user).
- Import to Vercel, add env vars, set `NEXT_PUBLIC_SITE_URL` to the Vercel URL.
- Run the Stripe test checkout on production.

Verify: live URL works end to end; commits show the noreply email.

## Task 14. README and portfolio

- `README.md`: what it is, live link, features, architecture diagram (text), stack, running locally, tests, Lighthouse result, screenshots.
- Upwork portfolio item: cover, three or four screenshots (hero, demo result, pricing with Pro, mobile), description.

Verify: README renders on GitHub; portfolio item submitted.
