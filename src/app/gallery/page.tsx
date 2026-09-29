import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gallery" };

const images = [
  { title: "A study in blue", className: "gallery-item-1" },
  { title: "A road without a plan", className: "gallery-item-2" },
  { title: "Sunday in red", className: "gallery-item-3" },
  { title: "The long way home", className: "gallery-item-4" },
  { title: "Before the city wakes", className: "gallery-item-5" },
  { title: "Between the scenes", className: "gallery-item-6" },
  { title: "Things we keep", className: "gallery-item-7" },
];

export default function GalleryPage() {
  return (
    <main id="main-content" className="page-shell">
      <div className="gallery-heading">
        <div><div className="page-kicker"><span className="status-dot" /><p className="eyebrow">An ongoing visual diary</p></div><h1 className="page-title">Collected<br /><em>moments.</em></h1></div>
        <p className="gallery-count">A little bit of everywhere<br />2023 — 2025</p>
      </div>
      <section className="gallery-grid" aria-label="Photo gallery">
        {images.map((image) => <div className={`gallery-item image-surface ${image.className}`} key={image.title} role="img" aria-label={image.title}><span>{image.title}</span></div>)}
      </section>
      <div className="gallery-end"><p>Good things happen between the plans.</p><a className="text-link" href="/portfolio">See selected work <span aria-hidden="true">↗</span></a></div>
    </main>
  );
}