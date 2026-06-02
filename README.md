# The Purpose Driven Wealth Plan™ — Lead-Magnet Landing Page

A single-page lead-generation site that gives away the free ebook
**"The Purpose Driven Wealth Plan™ — How to Eliminate Debt and Build Wealth at
the Same Time"** by Denise Boisvert & Steve Gibbs, Esq. AEP, in exchange for an
email address.

Built with **Next.js 14 (App Router)** and hand-written CSS (CSS variables, no
Tailwind, no UI kit). Fonts (Fraunces + Hanken Grotesk) load via a Google Fonts
stylesheet `<link>` — no build-time font fetching. The hero book cover is a
pure-CSS 3D mockup (no external image).

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
  api/subscribe/route.js Dynamic API route — validates + logs email
components/
  EmailCapture.js        Client component: validate → POST → auto-download
  BookCover.js           Pure-CSS 3D book cover
public/
  the-purpose-driven-wealth-plan.pdf   Placeholder PDF — REPLACE with the ebook
```

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

## Email-provider integration point

By default, a submitted email is **validated and logged** in the API route —
no third-party calls, no keys required. When you're ready to connect a real
provider (ConvertKit, Mailchimp, or Beehiiv), open:

```
app/api/subscribe/route.js
```

and look for the block marked:

```
// INTEGRATION POINT — connect your email provider here.
```

Copy-paste examples for all three providers are included there. **Never
hardcode an API key.** Read it from an environment variable instead.

Set the env var locally in a `.env.local` file (git-ignored):

```bash
# .env.local
CONVERTKIT_API_KEY=your_key_here
CONVERTKIT_FORM_ID=your_form_id_here
```

…and on Vercel:

```bash
vercel env add CONVERTKIT_API_KEY
vercel env add CONVERTKIT_FORM_ID
```

(or add them under **Project → Settings → Environment Variables** in the Vercel
dashboard). Redeploy after adding env vars.

---

## Deploy to Vercel (zero config)

This is a standard Next.js app — Vercel detects and builds it with no extra
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
