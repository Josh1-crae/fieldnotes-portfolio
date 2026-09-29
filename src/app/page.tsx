import Link from "next/link";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="home-intro">
          <p className="eyebrow"><span className="status-dot" /> Independent photographer & image maker</p>
          <h1>Looking for<br />the <em>in-between.</em></h1>
          <div className="home-intro-bottom">
            <p>Portraits, places, and the little things that make a life. Made slowly, with feeling.</p>
            <Link className="text-link" href="/portfolio">Explore selected work <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="home-image image-surface" role="img" aria-label="Close-up studio portrait in blue light" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=88)" }}>
          <span className="image-index">01 / 04 — The light between things</span><span className="image-stamp">MV<br />NYC</span>
        </div>
      </section>
      <section className="home-note page-gutter">
        <p className="eyebrow">A practice in paying attention</p>
        <p className="note-copy">I make photographs for people who know that the best stories rarely announce themselves.</p>
        <Link className="round-link" href="/about" aria-label="Learn more about Mara">↗</Link>
      </section>
      <section className="home-feature page-gutter">
        <div className="section-heading"><p className="eyebrow">A few recent stories</p><Link className="text-link" href="/gallery">See the full gallery <span aria-hidden="true">↗</span></Link></div>
        <div className="feature-grid">
          <Link className="feature-card" href="/portfolio"><div className="feature-photo photo-sunday image-surface" role="img" aria-label="Woman in a bright red dress in a sunlit room" /><span>Sunday at home <small>Personal · 2025</small></span></Link>
          <Link className="feature-card feature-card-offset" href="/portfolio"><div className="feature-photo photo-coast image-surface" role="img" aria-label="Rocky coastline in soft morning light" /><span>Salt, slowly <small>Travel · 2024</small></span></Link>
        </div>
      </section>
      <footer className="site-footer"><span>New York · Available everywhere</span><span>© Mara Vale 2025</span><Link href="mailto:hello@maravale.studio">Say hello ↗</Link></footer>
    </main>
  );
}