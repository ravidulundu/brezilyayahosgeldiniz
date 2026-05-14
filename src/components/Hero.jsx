import { company, sectionIds } from "../data/content.js";
import Icon from "./Icon.jsx";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1920&auto=format&fit=crop";

export default function Hero({ t }) {
  return (
    <section id="top" className="hero">
      <img src={HERO_IMAGE} alt="" className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" />
      <div className="hero-dots" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-accent-line" />
          <p className="pill">{t.badge}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-text">{t.heroText}</p>
          <div className="actions">
            <a className="button button-primary" href={company.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="MessageCircle" />
              {t.ctaPrimary}
            </a>
            <a className="button button-ghost" href={`#${sectionIds.cities}`}>
              {t.ctaSecondary}
            </a>
          </div>
          <div className="hero-trust">
            <span className="hero-trust-item">
              <Icon name="Calendar" size={13} />
              {company.started}
            </span>
            <span className="hero-trust-dot" aria-hidden="true" />
            <span className="hero-trust-item">
              <Icon name="ShieldCheck" size={13} />
              IATA
            </span>
            <span className="hero-trust-dot" aria-hidden="true" />
            <span className="hero-trust-item">
              <Icon name="Clock" size={13} />
              {t.support}
            </span>
          </div>
        </div>
      </div>
      <div className="hero-location-pill">
        <Icon name="MapPin" size={12} />
        <span>Rio de Janeiro, Brasil</span>
      </div>
    </section>
  );
}
