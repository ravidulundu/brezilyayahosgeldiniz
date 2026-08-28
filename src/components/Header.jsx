import { useEffect, useRef, useState } from "react";
import { company, languages, pathFor } from "../data/content.js";
import Icon from "./Icon.jsx";

/* Bayrak emojileri Windows tarayıcılarında glif yerine iki harfli kod olarak
   çizildiği için (🇹🇷 → "TR") dil kodunun yanında ikinci bir "TR" görünüyordu.
   Bayrak yerine globe ikonu + dil kodu kullanıyoruz. */
const LANG_META = {
  tr: { label: "Türkçe" },
  en: { label: "English" },
  pt: { label: "Português" },
  es: { label: "Español" },
};

export default function Header({ lang, setLang, nav, logoAlt }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [langOpen]);

  const current = LANG_META[lang] ?? LANG_META.tr;

  return (
    <header className={`site-header${scrolled ? " header-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href={pathFor("home", lang)} className="brand" aria-label={company.name}>
          <img src="/logo.webp" alt={logoAlt} className="brand-logo" fetchPriority="high" width="99" height="54" />
          <span className="brand-full">{company.name}</span>
          <span className="brand-short">Brasil</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, routeId]) => (
            <a key={routeId} href={pathFor(routeId, lang)}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switcher" ref={langRef}>
            <button
              className="lang-button"
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={`${lang.toUpperCase()} — ${current.label} — dil / language`}
            >
              <Icon name="Globe2" size={15} className="lang-globe" />
              <span className="lang-code">{lang.toUpperCase()}</span>
              <Icon name="ChevronDown" size={13} className={langOpen ? "lang-chevron-open" : "lang-chevron"} />
            </button>
            {langOpen && (
              <div className="lang-dropdown" role="listbox">
                {languages.map((code) => {
                  const meta = LANG_META[code] ?? { label: code.toUpperCase() };
                  return (
                    <button
                      key={code}
                      role="option"
                      aria-selected={code === lang}
                      className={`lang-option${code === lang ? " lang-option-active" : ""}`}
                      type="button"
                      onClick={() => { setLang(code); setLangOpen(false); }}
                    >
                      <span className="lang-option-code" aria-hidden="true">{code.toUpperCase()}</span>
                      <span>{meta.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "X" : "Menu"} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([label, routeId]) => (
            <a key={routeId} href={pathFor(routeId, lang)} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
