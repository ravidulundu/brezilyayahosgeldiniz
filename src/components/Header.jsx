import { useState } from "react";
import { company, languages } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Header({ lang, setLang, nav, homeSections }) {
  const [open, setOpen] = useState(false);
  const sectionLinks = homeSections.map(([label, id]) => [label, `/#${id}`]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand" aria-label={company.name}>
          <img src="/logo.png" alt="" className="brand-logo" />
          <span className="brand-full">{company.name}</span>
          <span className="brand-short">Brasil</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, id]) => (
            <a key={id} href={id}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <select value={lang} onChange={(event) => setLang(event.target.value)} aria-label="Language">
            {languages.map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
          </select>
          <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            <Icon name={open ? "X" : "Menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[...nav, ...sectionLinks].map(([label, href]) => (
            <a key={`${label}-${href}`} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
