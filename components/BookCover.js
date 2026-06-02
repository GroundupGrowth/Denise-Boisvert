/**
 * Pure-CSS 3D book mockup. No external image required.
 * All faces (front, spine, page edges, back) are built with CSS transforms.
 */
export default function BookCover() {
  return (
    <div className="book-stage" aria-hidden="true">
      <div className="book">
        <div className="book__back" />
        <div className="book__pages" />
        <div className="book__spine" />
        <div className="book__face">
          <div className="book__inner">
            <span className="book__tm">The Purpose Driven Wealth Plan™</span>
            <h3 className="book__title">
              Eliminate Debt &amp; <em>Build Wealth</em> at the Same Time
            </h3>
            <span className="book__rule" />
            <span className="book__sub">A Properly Structured Plan You Own</span>
            <span className="book__authors">
              Denise Boisvert &amp; Steve Gibbs, Esq.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
