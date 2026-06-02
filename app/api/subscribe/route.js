import { NextResponse } from "next/server";

// Force this route to be dynamic (server-rendered on each request).
// The marketing page stays static; only this endpoint is dynamic.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitsOf = (s) => (s.match(/\d/g) || []).length;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const source = typeof body?.source === "string" ? body.source : "unknown";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }
  if (digitsOf(phone) < 7) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 422 }
    );
  }

  // Split the full name into first/last so GoHighLevel can map them cleanly.
  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");

  const lead = {
    name,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    source, // "hero" or "final", which form converted
    submittedAt: new Date().toISOString(),
  };

  // Always have a record of the lead in your server logs.
  console.log(`[subscribe] ${name} <${email}> ${phone} (source: ${source})`);

  // ============================================================
  // GoHighLevel inbound webhook.
  //
  // The form forwards every lead to this GoHighLevel webhook. It works out of
  // the box on deploy. You can override the URL without a code change by
  // setting a GOHIGHLEVEL_WEBHOOK_URL environment variable in Vercel.
  //
  // The lead object above is POSTed as JSON; map name/first_name/last_name/
  // email/phone/source to your GHL contact fields inside the workflow.
  // ============================================================
  const webhookUrl =
    process.env.GOHIGHLEVEL_WEBHOOK_URL ||
    "https://services.leadconnectorhq.com/hooks/g8TD4Xx0YuFrBlcfcrE2/webhook-trigger/qQPJ1mGWkgFqDwiJKx3M";

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      // Don't let a slow webhook hang the visitor's download.
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[subscribe] webhook responded ${res.status}`);
    }
  } catch (err) {
    // Lead is still in the logs above; never block the ebook on a
    // webhook hiccup.
    console.error("[subscribe] webhook error:", err?.message || err);
  }

  return NextResponse.json({ ok: true });
}

// Reject other methods cleanly.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
