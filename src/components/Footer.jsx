import { company, legalLinks, socialLinks } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="footer-logo-link" aria-label={company.name}>
            <img src="/logo.png" alt="" className="footer-logo" width="99" height="54" />
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
          <p className="footer-nav-title">{t.nav[0][0]}</p>
          {t.nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="footer-legal-col">
          <p className="footer-nav-title">Legal</p>
          <a href={legalLinks.privacy}>{t.privacy}</a>
          <a href={legalLinks.terms}>{t.terms}</a>
          <a href={legalLinks.cookies}>{t.cookies}</a>
          <p className="footer-copy">© {company.started}–{new Date().getFullYear()} {company.name}</p>
        </div>
      </div>
    </footer>
  );
}
