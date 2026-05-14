import { company, sectionIds } from "../data/content.js";
import Icon from "./Icon.jsx";

const HERO_IMAGE = "/hero.webp";

export default function Hero({ t }) {
  const ticker = t.heroTicker ?? [];
  return (
    <section id="top" className="hero">
      <img src={HERO_IMAGE} alt="" className="hero-bg" aria-hidden="true" fetchPriority="high" width="1280" height="720" />
      <div className="hero-overlay" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <span className="hero-brasil-text" aria-hidden="true">BRASIL</span>

      <div className="hero-meta-bar">
        <span className="hero-meta-item">
          <Icon name="Calendar" size={11} />
          Est. {company.started}
        </span>
        <span className="hero-meta-sep" aria-hidden="true" />
        <span className="hero-meta-item">
          <Icon name="ShieldCheck" size={11} />
          IATA TIDS
        </span>
        <span className="hero-meta-sep" aria-hidden="true" />
        <span className="hero-meta-item">
          <Icon name="Clock" size={11} />
          {t.support}
        </span>
      </div>

      <div className="hero-coords-badge">
        <Icon name="MapPin" size={11} />
        <span>23°S 43°W · Santos, BR</span>
      </div>

      <div className="container hero-body">
        <div className="hero-eyebrow-row">
          <span className="hero-eyebrow-pill">{t.badge}</span>
        </div>

        <h1 className="hero-h1">
          <span className="hero-h1-top">{t.heroTitle}</span>
        </h1>

        <div className="hero-foot">
          <p className="hero-text">{t.heroText}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={company.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="MessageCircle" />
              {t.ctaPrimary}
            </a>
            <a className="button button-ghost" href={`#${sectionIds.cities}`}>
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="hero-ticker-item">
              <span className="hero-ticker-dot">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
