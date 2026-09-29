import type { Metadata } from "next";

export const metadata: Metadata = { title: "Portfolio" };

const projects = [
  { title: "A softer kind of Sunday", type: "Portraits · Personal story", year: "2025", image: "work-portrait" },
  { title: "The shape of a feeling", type: "Editorial · Kinfolk Journal", year: "2025", image: "work-fashion" },
  { title: "Where the road gives way", type: "Travel · Field Notes", year: "2024", image: "work-landscape" },
  { title: "Objects for keeping", type: "Still life · Common Ground", year: "2024", image: "work-product" },
];

export default function PortfolioPage() {
  return (
    <main id="main-content" className="page-shell">
      <div className="page-kicker"><span className="status-dot" /><p className="eyebrow">Selected commissions & personal work</p></div>
      <h1 className="page-title">Work made<br />with <em>intention.</em></h1>
      <p className="page-lede">A collection of stories about the way we live, the places we find, and the people who stay with us.</p>
      <section className="work-list" aria-label="Selected projects">
        {projects.map((project, index) => <article className="work-row" key={project.title}>
          <span className="work-number">0{index + 1}</span>
          <div><h2>{project.title}</h2><span className="work-meta">{project.type}</span></div>
          <div className={`work-image image-surface ${project.image}`} role="img" aria-label={`${project.title} photography`} />
          <span className="work-year">{project.year}</span>
        </article>)}
      </section>
      <div className="gallery-end"><p>Have a story in mind?</p><a className="text-link" href="mailto:hello@maravale.studio">Let’s make it real <span aria-hidden="true">↗</span></a></div>
    </main>
  );
}