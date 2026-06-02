import "./globals.css";

export const metadata = {
  title:
    "The Purpose Driven Wealth Plan™ — Eliminate Debt and Build Wealth at the Same Time",
  description:
    "A free ebook by Denise Boisvert & Steve Gibbs, Esq. AEP. Redirect money you already spend into a policy you own, so paying off debt and building wealth happen at the same time.",
  metadataBase: new URL("https://insuranceandestates.com"),
  openGraph: {
    title:
      "The Purpose Driven Wealth Plan™ — Eliminate Debt and Build Wealth at the Same Time",
    description:
      "A free ebook. Redirect money you already spend into a policy you own, so paying off debt and building wealth happen at the same time.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded via a plain Google Fonts stylesheet <link> here in the
          document head — intentionally NOT via next/font, to avoid build-time
          font fetching. Fraunces (serif headlines, with italics) + Hanken
          Grotesk (body and UI).
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
