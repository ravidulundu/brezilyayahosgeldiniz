import { useEffect, useRef, useState } from "react";
import { company, languages } from "../data/content.js";
import Icon from "./Icon.jsx";

const LANG_META = {
  tr: { flag: "🇹🇷", label: "Türkçe" },
  en: { flag: "🇬🇧", label: "English" },
  pt: { flag: "🇧🇷", label: "Português" },
  es: { flag: "🇪🇸", label: "Español" },
};

export default function Header({ lang, setLang, nav }) {
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
        <a href="/" className="brand" aria-label={company.name}>
          <img src="/logo.webp" alt="" className="brand-logo" fetchPriority="high" width="99" height="54" />
          <span className="brand-full">{company.name}</span>
          <span className="brand-short">Brasil</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
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
            >
              <span aria-hidden="true">{current.flag}</span>
              <span className="lang-code">{lang.toUpperCase()}</span>
              <Icon name="ChevronDown" size={13} className={langOpen ? "lang-chevron-open" : "lang-chevron"} />
            </button>
            {langOpen && (
              <div className="lang-dropdown" role="listbox">
                {languages.map((code) => {
                  const meta = LANG_META[code] ?? { flag: "🌐", label: code };
                  return (
                    <button
                      key={code}
                      role="option"
                      aria-selected={code === lang}
                      className={`lang-option${code === lang ? " lang-option-active" : ""}`}
                      type="button"
                      onClick={() => { setLang(code); setLangOpen(false); }}
                    >
                      <span aria-hidden="true">{meta.flag}</span>
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
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
