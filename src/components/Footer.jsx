import { company, legalLinks } from "../data/content.js";
import SocialLinks from "./SocialLinks.jsx";

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{company.legalGroup}</strong>
          <p>{t.footerText}</p>
          <SocialLinks label={t.social} />
        </div>
        <nav aria-label="Legal links">
          <a href={legalLinks.privacy}>{t.privacy}</a>
          <a href={legalLinks.terms}>{t.terms}</a>
          <a href={legalLinks.cookies}>{t.cookies}</a>
        </nav>
      </div>
    </footer>
  );
}
