import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell">
      <section className="about-top">
        <div className="about-copy">
          <div className="page-kicker"><span className="status-dot" /><p className="eyebrow">A little about me</p></div>
          <h1 className="page-title">Hello, I’m<br /><em>Mara.</em></h1>
          <p className="page-lede">Photographer, chronic wanderer, collector of small moments. Usually looking for the light.</p>
        </div>
        <div className="about-portrait image-surface" role="img" aria-label="Photographer Mara Vale in a blue-lit studio portrait"><span className="portrait-note">Nice to meet you!</span></div>
      </section>
      <section className="about-details">
        <h2>My point of view</h2>
        <div>
          <p>I’m an independent photographer working across portraiture, editorial, and travel. My camera tends to come out in the quieter moments: the pause before a story, the familiar corner of a new place, the softness in someone’s face when they forget I’m there.</p>
          <p>For the last decade, I’ve collaborated with thoughtful people and small, big-hearted brands to make images that feel lived in. My process is easygoing, considered, and always rooted in connection.</p>
          <a className="about-contact" href="mailto:hello@maravale.studio">Tell me what you’re dreaming up ↗</a>
        </div>
      </section>
      <section className="about-facts" aria-label="Studio details">
        <div className="about-fact"><strong>10 years</strong><span>behind the camera</span></div>
        <div className="about-fact"><strong>NYC + away</strong><span>home base, open road</span></div>
        <div className="about-fact"><strong>35mm always</strong><span>digital, too</span></div>
      </section>
    </main>
  );
}