import BookCover from "@/components/BookCover";
import EmailCapture from "@/components/EmailCapture";

// Statically rendered marketing page. The only dynamic piece is the
// /api/subscribe route.
export const dynamic = "force-static";

const CHAPTERS = [
  {
    num: "Chapter One",
    title: "The False Choice",
    body: "You were told to pay off debt first, then start building wealth. That order is why responsible people stay behind. The choice was never real — and this chapter shows you why.",
  },
  {
    num: "Chapter Two",
    title: "What Your Debt Really Costs",
    body: "The interest is only the part you can see. The deeper cost is the wealth those dollars never got to build. We put the actual math on the table so you can see the full price.",
  },
  {
    num: "Chapter Three",
    title: "Redirect, Repay, Reuse",
    body: "The mechanics: take money you already spend, route it through a policy you own, retire the debt — then put those same dollars back to work. One stream of money doing two jobs.",
  },
  {
    num: "Chapter Four",
    title: "The Different Zero",
    body: "There is the zero where you simply owe nothing, and the zero where the debt is gone and an asset is growing in its place. They are not the same. This is the one worth reaching.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "For the first time, I feel like I actually have a plan to not only pay off debt but also start building real long term security. It gave me hope and direction I really needed.",
    name: "Jacque P.",
  },
  {
    quote:
      "I wasn't sure what to expect with this book, but wow — it really made me rethink everything I knew about money. The whole idea of using whole life insurance as a banking system? Mind blown. I loved the part about paying off credit card debt with that 'Redirect, Repay, Reuse' strategy — actually feels doable.",
    name: "Sunghwan N.",
  },
  {
    quote:
      "The first part of breaking free from debt is the 'silent killer' of savings, investments, and wealth and is not discussed enough. Strong recommendation.",
    name: "Idan",
  },
  {
    quote:
      "I never knew you could borrow from a whole life insurance policy. This book was eye opening for me. Many wealthy people use these loans to create more wealth without being taxed.",
    name: "RD",
  },
  {
    quote:
      "Boisvert's book can change how you think about money. Easy steps, real-life examples, and charts that made everything clear. If you're serious about crushing debt and growing real wealth, you need a good read like this.",
    name: "D Rob",
  },
];

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5 stars">
      <span aria-hidden="true">★★★★★</span>
    </div>
  );
}

export default function Page() {
  return (
    <>
      {/* 1. Top bar */}
      <header className="topbar">
        <div className="container topbar__inner">
          <a className="wordmark" href="#top">
            Insurance &amp; <span>Estates</span>
          </a>
          <a className="topbar__link" href="#top">
            Get the Ebook
          </a>
        </div>
      </header>

      <main id="top">
        {/* 2. Hero */}
        <section className="section hero">
          <div className="container hero__grid">
            <p className="eyebrow hero__eyebrow reveal" style={{ "--delay": "0.05s" }}>
              The Purpose Driven Wealth Plan™ · Free Ebook
            </p>
            <h1 className="hero__title reveal" style={{ "--delay": "0.15s" }}>
              You don&rsquo;t have to choose between <em>killing the debt</em>{" "}
              and building wealth.
            </h1>

            <div className="hero__book reveal" style={{ "--delay": "0.22s" }}>
              <BookCover />
            </div>

            <p className="hero__sub reveal" style={{ "--delay": "0.3s" }}>
              You&rsquo;ve done the responsible things and still feel behind.
              This free ebook shows how to redirect money you already spend into
              a policy you own — so the debt comes down and your wealth goes up
              from the very same dollars.
            </p>

            <div className="hero__form reveal" style={{ "--delay": "0.4s" }}>
              <EmailCapture id="hero" />
              <a className="hero__proof" href="#reviews">
                <span className="stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>Loved by readers — see what they said</span>
              </a>
            </div>

            <p className="hero__reassure reveal" style={{ "--delay": "0.5s" }}>
              By Denise Boisvert &amp; Steve Gibbs, Esq. AEP
            </p>
          </div>
        </section>

        {/* 3. Inside the ebook — dark band */}
        <section className="section dark">
          <div className="container">
            <div className="band__head">
              <p className="eyebrow">Inside the ebook</p>
              <h2>
                Four short chapters that change the <em>order of operations</em>.
              </h2>
              <p>
                No filler, no jargon. Just the plain math behind paying down
                debt and building wealth in the same motion.
              </p>
            </div>
            <div className="cards">
              {CHAPTERS.map((c) => (
                <article className="card" key={c.title}>
                  <span className="card__num">{c.num}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Pull quote */}
        <section className="section pullquote">
          <div className="container">
            <span className="mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>
              When the debt is gone — <em>what will you have?</em>
            </blockquote>
          </div>
        </section>

        {/* 5. Testimonials */}
        <section className="section" id="reviews">
          <div className="container">
            <div className="testi__head">
              <p className="eyebrow">From readers</p>
              <h2>People who stopped choosing.</h2>
            </div>
            <div className="testi-grid">
              {TESTIMONIALS.map((t) => (
                <figure className="testimonial" key={t.name}>
                  <Stars />
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption>
                    <footer>
                      <cite>{t.name}</cite>
                      <span className="verified">Verified Purchase</span>
                    </footer>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Authors — dark band */}
        <section className="section dark">
          <div className="container">
            <div className="authors__head">
              <p className="eyebrow">The authors</p>
              <h2>
                Written by the people who <em>run the numbers</em>.
              </h2>
            </div>
            <div className="authors-grid">
              <article className="author">
                <div className="author__monogram" aria-hidden="true">
                  DB
                </div>
                <div>
                  <h3>Denise Boisvert</h3>
                  <p className="author__role">
                    Licensed Insurance Professional &amp; Debt Elimination
                    Strategist
                  </p>
                  <p className="author__bio">
                    More than 20 years designing properly structured whole life
                    policies for real people — showing the actual math applied
                    to their actual numbers, not a sales pitch.
                  </p>
                </div>
              </article>
              <article className="author">
                <div className="author__monogram" aria-hidden="true">
                  SG
                </div>
                <div>
                  <h3>Steve Gibbs, Esq. AEP</h3>
                  <p className="author__role">
                    Estate Planning Attorney &amp; Co-Founder of Insurance &amp;
                    Estates
                  </p>
                  <p className="author__bio">
                    Brings the legacy view: the policy that frees you from debt
                    today is the same one that protects your family tomorrow.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="section final">
          <div className="container final__inner">
            <p className="eyebrow">Get the free ebook</p>
            <h2>You don&rsquo;t have to choose. You never did.</h2>
            <p>
              Add your details and the ebook is yours. Read it tonight, run it
              against your own numbers, and decide for yourself.
            </p>
            <EmailCapture id="final" />
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <span className="footer__brand">
              Insurance &amp; <span>Estates</span>
            </span>
            <a
              className="footer__link"
              href="https://insuranceandestates.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              insuranceandestates.com
            </a>
          </div>
          <p className="footer__disclaimer">
            This ebook and page are for educational purposes only and do not
            constitute financial, legal, or tax advice. Figures and client
            examples are illustrations of how the strategy can work and are not
            guarantees of future results; individual outcomes vary. Consult a
            licensed professional before making decisions.
          </p>
          <p className="footer__copy">
            © {new Date().getFullYear()} Insurance &amp; Estates. The Purpose
            Driven Wealth Plan™.
          </p>
        </div>
      </footer>
    </>
  );
}
