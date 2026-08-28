import { cities, cityPathFor, company, localize, pathFor } from "../../data/content.js";
import Icon from "../Icon.jsx";
import { PageHero } from "./PageHero.jsx";

export function CityPage({ t, lang, city }) {
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 4);

  return (
    <>
      <PageHero title={city.name} image={city.image} />

      <section className="section section-cream">
        <div className="container city-detail-grid">
          <div className="city-detail-main">
            <p className="eyebrow">{t.citiesTitle}</p>
            <h2>{city.name}</h2>
            <p className="city-detail-text">{localize(city.text, lang)}</p>

            {city.highlights && (
              <div className="city-highlights">
                {city.highlights.map((h) => (
                  <div className="city-highlight-item" key={localize(h.label, lang)}>
                    <Icon name={h.icon} size={16} />
                    <span>{localize(h.label, lang)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="actions">
              <a className="button button-light" href={pathFor("cities", lang)}>
                <Icon name="Map" />
                {t.allCities}
              </a>
            </div>
          </div>

          <aside className="city-detail-aside">
            {city.climate && (
              <div className="city-climate-card">
                <div className="city-climate-icon">
                  <Icon name="Sun" size={18} />
                </div>
                <h3>{t.bestTime}</h3>
                <p>{localize(city.climate, lang)}</p>
              </div>
            )}

            <div className="city-cta-card">
              <Icon name="MessageCircle" size={28} />
              <h3>{t.cityCtaTitle}</h3>
              <p>{t.cityCtaText}</p>
              <a className="button button-primary" href={company.whatsapp} target="_blank" rel="noreferrer">
                {t.ctaPrimary}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {otherCities.length > 0 && (
        <section className="section section-white">
          <div className="container">
            <div className="section-intro">
              <p className="eyebrow">{t.otherCities}</p>
              <h2>{t.exploreBrazil}</h2>
            </div>
            <div className="city-related-grid">
              {otherCities.map((c) => (
                <a className="city-related-card" href={cityPathFor(c.slug, lang)} key={c.slug}>
                  <img src={c.image} alt={c.name} loading="lazy" />
                  <div className="city-related-overlay">
                    <span>{c.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
