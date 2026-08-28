import { company, defaultLang, pathFor, socialLinks } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Footer({ t, lang = defaultLang }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href={pathFor("home", lang)} className="footer-logo-link" aria-label={company.name}>
            <img src="/logo.webp" alt={t.logoAlt} className="footer-logo" width="99" height="54" />
          </a>
          <p className="footer-tagline">{company.legalGroup}</p>
          <p className="footer-desc">{t.footerText}</p>
          <div className="footer-social">
            {socialLinks.map((s) => (
              <a key={s.name} href={s.url} aria-label={s.name} target="_blank" rel="noreferrer" className="footer-social-link">
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <p className="footer-nav-title">{t.menu}</p>
          {t.nav.map(([label, routeId]) => (
            <a key={routeId} href={pathFor(routeId, lang)}>{label}</a>
          ))}
        </nav>

        <div className="footer-legal-col">
          <p className="footer-nav-title">{t.legal}</p>
          <a href={pathFor("privacy", lang)}>{t.privacy}</a>
          <a href={pathFor("terms", lang)}>{t.terms}</a>
          <a href={pathFor("cookies", lang)}>{t.cookies}</a>
          <p className="footer-copy">© {company.started}–{new Date().getFullYear()} {company.name}</p>
        </div>
      </div>
    </footer>
  );
}
