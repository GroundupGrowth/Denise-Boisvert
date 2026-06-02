# The Purpose Driven Wealth Plan™: Lead-Magnet Landing Page

A single-page lead-generation site that gives away the free ebook
**"The Purpose Driven Wealth Plan™, How to Eliminate Debt and Build Wealth at
the Same Time"** by Denise Boisvert & Steve Gibbs, Esq. AEP, in exchange for an
email address.

Built with **Next.js 14 (App Router)** and hand-written CSS (CSS variables, no
Tailwind, no UI kit). Fonts (Fraunces + Hanken Grotesk) load via a Google Fonts
stylesheet `<link>`, no build-time font fetching. Emerald-and-gold palette
matched to the book cover. The hero presents the real cover artwork in a
CSS-built 3D frame (page thickness, spine shading, sheen, gentle float), with a
faithful inline-SVG fallback so the hero is never broken before the image is
added.

## One job

The entire page pushes toward a single conversion: enter an email → download
the ebook. There are no competing CTAs.

---

## Project structure

```
app/
  layout.js              Root layout + Google Fonts <link> in <head>
  page.js                The full landing page (statically rendered)
  globals.css            All styles: tokens, 3D book, animations, responsive
  api/subscribe/route.js Dynamic API route, validates + logs email
components/
  EmailCapture.js        Lead form (name/email/phone): validate → POST → download
  BookCover.js           3D frame around /book-cover.jpg (+ SVG fallback)
public/
  the-purpose-driven-wealth-plan.pdf   Placeholder PDF, REPLACE with the ebook
  book-cover.jpg                        Hero cover artwork, ADD this file
```

## Add the cover artwork

The hero renders `public/book-cover.jpg` (portrait, ideally ~1024×1536). Drop
the cover image at exactly that path and it appears automatically, no code
change required. Until the file exists, an inline-SVG recreation of the cover
is shown as a fallback.

---

## Run locally

Requires Node 18.17+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Production build / preview:

```bash
npm run build
npm start
```

The marketing page is statically rendered; `/api/subscribe` is dynamic.

---

## Replace the placeholder ebook

A minimal valid placeholder PDF ships at:

```
public/the-purpose-driven-wealth-plan.pdf
```

Drop in the final ebook at that exact path/filename (the download link and the
form's auto-download both point to it).

---

## Lead form & GoHighLevel webhook

The form collects **name, email, and phone**. On submit the API route
(`app/api/subscribe/route.js`) validates the input, logs the lead, and, if a
webhook URL is configured, POSTs the lead as JSON to your **GoHighLevel
inbound webhook**. The ebook download fires regardless, so a slow or
mis-configured webhook never blocks the visitor.

The JSON payload sent to GoHighLevel:

```json
{
  "name": "Jane Smith",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "phone": "+1 555 123 4567",
  "source": "hero",
  "submittedAt": "2026-06-02T12:34:56.000Z"
}
```

### Connect the webhook

1. In GoHighLevel: **Automation → Workflows → New Workflow → add an "Inbound
   Webhook" trigger**, and copy the webhook URL.
2. Set it as an environment variable (the URL is **never** hardcoded in source).

Locally, in a `.env.local` file (git-ignored):

```bash
# .env.local
GOHIGHLEVEL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/XXXX/webhook-trigger/YYYY
```

On Vercel:

```bash
vercel env add GOHIGHLEVEL_WEBHOOK_URL
```

(or add it under **Project → Settings → Environment Variables** in the Vercel
dashboard). Redeploy after adding it.

3. In the workflow, map `name` / `first_name` / `last_name` / `email` /
   `phone` / `source` to your GHL contact fields.

Until `GOHIGHLEVEL_WEBHOOK_URL` is set, leads are validated and **logged only**
(visible in `vercel logs` / your terminal), and the ebook still downloads.

---

## Deploy to Vercel (zero config)

This is a standard Next.js app, Vercel detects and builds it with no extra
configuration.

First time:

```bash
npm i -g vercel   # if you don't have the CLI
vercel            # link the project (creates the Vercel project)
vercel --prod     # deploy to production
```

After the project is linked, every production deploy is just:

```bash
vercel --prod
```

Remember to add any email-provider environment variables (see above) before or
after the first deploy, then redeploy.

---

## Notes

- **Accessibility / motion:** a single orchestrated staggered fade-up runs on
  load and the book gently floats; both are disabled under
  `prefers-reduced-motion`.
- **Responsive:** verified layouts at 375px, 768px, and 1280px.
- **No invented proof:** testimonials are real and verbatim; there are no fake
  stats, logos, or press mentions.
- This page is for educational purposes only and does not constitute financial,
  legal, or tax advice.
