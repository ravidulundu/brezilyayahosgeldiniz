import { company, sectionIds } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Hero({ t }) {
  return (
    <section id="top" className="hero">
      <img
        src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop"
        alt="Rio de Janeiro coastline"
        className="hero-image"
      />
      <div className="hero-shade" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="pill">{t.badge}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="actions">
            <a className="button button-primary" href={company.whatsapp}>
              <Icon name="MessageCircle" />
              {t.ctaPrimary}
            </a>
            <a className="button button-ghost" href={`#${sectionIds.services}`}>
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Company credentials">
          <p className="panel-eyebrow">{company.legalGroup}</p>
          <Credential icon="ShieldCheck" title={company.iata} text={t.iataDescription} />
          <Credential icon="Plane" title={company.travelBrand} text={t.travelDescription} />
          <Credential icon="BriefcaseBusiness" title={company.eventsBrand} text={t.eventDescription} />
        </aside>
      </div>
    </section>
  );
}

function Credential({ icon, title, text }) {
  return (
    <div className="credential">
      <Icon name={icon} className="gold" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
