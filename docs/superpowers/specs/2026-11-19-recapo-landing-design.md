# Recapo: AI meeting recap landing page

Date: 2026-11-19
Status: approved in conversation, pending written review

## Purpose

A portfolio project for the author's Upwork profile. It is a landing page for a fictional AI product, Recapo, that turns meeting notes into a summary, decisions and action items. One live link must demonstrate three services at once: Next.js landing pages, AI integrations and Stripe payments.

Success criteria:

- Live on Vercel with a public GitHub repository.
- A visitor can try the AI demo and complete a Stripe test-mode upgrade without help.
- Lighthouse 95+ in Performance, Accessibility, Best Practices and SEO on mobile.
- Works on mobile, tablet and desktop, in light and dark themes.

Out of scope: user accounts, a database, real payments, i18n, a blog.

## Product

Name: Recapo (fictional; must not match an existing brand).
Tagline: "Paste your meeting notes, get decisions and action items in seconds."

Plans shown in the demo:

| | Free | Pro (after test payment) |
|---|---|---|
| Input limit | 4,000 characters | 20,000 characters |
| Output | summary, decisions, action items | same plus risks and open questions |
| Export to Markdown | no | yes |

Pricing section shows Free and Pro with a monthly/yearly toggle. Pro costs $12 per month or $120 per year (display and test-mode prices only).

## Page structure

1. Header: logo, anchors (Demo, Features, Pricing, FAQ), "Try it free" button; burger menu on mobile.
2. Hero: headline, subheadline, two buttons (Try the demo, See pricing), animated preview of a result card.
3. Live demo: input on the left with a "Use sample meeting" button and a character counter; streamed result on the right (Summary, Decisions, Action items with task, owner, due date, priority; Risks for Pro); Copy and Export to Markdown buttons below. A note under the input: "Don't paste confidential meetings."
4. How it works: three steps (Paste, Analyse, Share).
5. Features: six cards.
6. Pricing: Free and Pro, monthly/yearly toggle, "Upgrade" on Pro, test card hint (4242 4242 4242 4242).
7. FAQ: accordion with five or six questions.
8. Footer: links and "Portfolio project. Payments run in Stripe test mode."

## Architecture

Single Next.js App Router application deployed on Vercel. No database.

Stack: Next.js (latest stable at start), TypeScript (strict), Tailwind CSS, Motion, Vercel AI SDK with `@ai-sdk/google` (Gemini Flash, free tier), Zod, Stripe, `jose`.

```
app/
  page.tsx                landing sections (server components)
  api/analyze/route.ts    AI analysis, streamed structured output
  api/checkout/route.ts   creates a Stripe Checkout Session
  api/verify/route.ts     verifies payment, sets the Pro cookie
  api/plan/route.ts       returns the current plan to the client
components/
  sections/               Header, Hero, HowItWorks, Features, Pricing, Faq, Footer
  demo/                   DemoInput, DemoResult, ActionItemsTable, ExportButton
lib/
  schema.ts               shared Zod schema for the result
  plan.ts                 plan limits, token signing and verification
  stripe.ts               Stripe client
```

Sections are server components; the demo and pricing upgrade are client components.

Environment variables: `GOOGLE_GENERATIVE_AI_API_KEY`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`, `PLAN_TOKEN_SECRET`.

## Data flow

### AI analysis

1. The user pastes text (or loads the sample) and presses Analyse.
2. The client uses the AI SDK object-streaming hook to POST the text to `/api/analyze`.
3. The route reads the plan from the cookie, checks the input length for that plan and a per-IP request limit, then calls the AI SDK object-streaming function with the Zod schema for that plan.
4. The partial object streams back; summary, decisions and action items render as they arrive.

Result schema: `summary: string`, `decisions: string[]`, `actionItems: { task, owner, due, priority: "high" | "medium" | "low" }[]`, and for Pro `risks: string[]`. `owner` and `due` may be "Unassigned" or "Not set" when the notes do not say.

### Payment

1. "Upgrade" calls `/api/checkout`, which creates a Checkout Session in subscription mode with inline `price_data` (monthly or yearly), so no Stripe dashboard setup is needed beyond test keys.
2. Stripe redirects to `/?session_id={CHECKOUT_SESSION_ID}#pricing`; cancel returns to `/?checkout=cancelled#pricing`.
3. The client calls `/api/verify` with the session ID. The server retrieves the session from Stripe, requires `status === "complete"`, signs a JWT (HS256, 24 hours) and sets it as an httpOnly, secure, SameSite=Lax cookie.
4. `/api/analyze` and `/api/plan` read and verify the cookie. Nothing is stored in localStorage.

### Export

Markdown is built on the client from the result object and downloaded as a file. Available only when the plan is Pro.

## Error handling

- Empty or over-limit input: inline message, Analyse disabled, counter shows the plan limit.
- Gemini error or 429: show a bundled sample result with a "Demo is busy, here's a sample result" notice.
- Invalid model output: rejected by Zod on the server. If the stream breaks, keep what arrived and show "Try again".
- Rate limit hit: 429 with a friendly message and retry hint.
- Checkout cancelled: notice in the pricing section. Unknown or unpaid `session_id`: ignored, plan stays Free.

Rate limiting is a best-effort in-memory per-IP limit inside the function. It is acceptable because the Gemini free tier has no cost and its own quota.

## Testing

- Vitest: result schema, plan limits, token sign and verify.
- Playwright: smoke test "load sample, analyse, see action items" with `/api/analyze` mocked; a mobile viewport check of the main sections.
- Manual: Stripe test checkout end to end on the Vercel preview; Lighthouse on mobile.

## Visual design

- Light and dark themes following the system setting, one accent colour, Geist via `next/font`.
- Motion only where it helps: section reveal, streamed cards, hover states; respects `prefers-reduced-motion`.
- SEO: metadata, generated Open Graph image, sitemap, favicon.

## Code rules

- No comments in code; clarity through naming and small files.
- Strict TypeScript, one responsibility per file.
- Git commits use the author's GitHub noreply email (already configured globally).

## Deliverables

1. Live Vercel URL.
2. Public GitHub repository under the author's account.
3. README with description, architecture, screenshots and Lighthouse result.
4. Upwork portfolio item: cover image, three or four screenshots, description.
