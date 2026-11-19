function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Recapo",
  title: "Recapo: meeting notes to decisions and action items",
  description:
    "Paste meeting notes, a call transcript or a Slack thread and get a summary, decisions and action items with owners and due dates in seconds.",
  url: siteUrl(),
};
