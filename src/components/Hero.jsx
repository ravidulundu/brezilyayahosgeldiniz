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
            <a className="button button-ghost" href={`#${sectionIds.cities}`}>
              {t.ctaSecondary}
            </a>
          </div>
        </div>

        <aside className="hero-panel hero-destination" aria-label="Brazil guide">
          <span>{t.heroPanelEyebrow}</span>
          <strong>Brezilya</strong>
          <div>
            {t.heroPanelTags.map((tag) => (
              <em key={tag}>{tag}</em>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
