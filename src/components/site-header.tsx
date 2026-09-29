"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Mara Vale, home">
        <span className="brand-mark" aria-hidden="true">m.</span><span>MARA VALE</span><span className="brand-caption">image maker</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {pages.map((page) => {
          const active = pathname === page.href;
          return <Link key={page.href} className={`nav-link${active ? " nav-link-active" : ""}`} href={page.href} aria-current={active ? "page" : undefined}>{page.label}</Link>;
        })}
      </nav>
      <a className="header-contact" href="mailto:hello@maravale.studio">Let’s talk <span aria-hidden="true">↗</span></a>
    </header>
  );
}