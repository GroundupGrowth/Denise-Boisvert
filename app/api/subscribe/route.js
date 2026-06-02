import { NextResponse } from "next/server";

// Force this route to be dynamic (server-rendered on each request).
// The marketing page stays static; only this endpoint is dynamic.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const source = typeof body?.source === "string" ? body.source : "unknown";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  // Always have a record of the lead in your server logs.
  console.log(`[subscribe] ${email} (source: ${source})`);

  // ============================================================
  // INTEGRATION POINT — connect your email provider here.
  //
  // Read the API key from a Vercel environment variable. NEVER
  // hardcode a key in source. Set it in the Vercel dashboard
  // (Project → Settings → Environment Variables) or via:
  //   vercel env add EMAIL_PROVIDER_API_KEY
  //
  // ConvertKit example:
  // ------------------------------------------------------------
  // const apiKey = process.env.CONVERTKIT_API_KEY;
  // const formId = process.env.CONVERTKIT_FORM_ID;
  // if (apiKey && formId) {
  //   await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ api_key: apiKey, email }),
  //   });
  // }
  //
  // Mailchimp example:
  // ------------------------------------------------------------
  // const apiKey = process.env.MAILCHIMP_API_KEY;        // e.g. "abc-us21"
  // const listId = process.env.MAILCHIMP_LIST_ID;
  // const dc = apiKey?.split("-")[1];
  // if (apiKey && listId && dc) {
  //   await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
  //     },
  //     body: JSON.stringify({ email_address: email, status: "subscribed" }),
  //   });
  // }
  //
  // Beehiiv example:
  // ------------------------------------------------------------
  // const apiKey = process.env.BEEHIIV_API_KEY;
  // const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  // if (apiKey && pubId) {
  //   await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //     body: JSON.stringify({ email, reactivate_existing: true }),
  //   });
  // }
  // ============================================================

  return NextResponse.json({ ok: true });
}

// Reject other methods cleanly.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
