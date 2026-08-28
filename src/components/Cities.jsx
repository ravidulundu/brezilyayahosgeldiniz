import { cities, cityPathFor, localize, pathFor } from "../data/content.js";
import Icon from "./Icon.jsx";
import { SectionIntro } from "./Services.jsx";

export default function Cities({ t, lang, id, limit, showIntro = true }) {
  const displayed = limit ? cities.slice(0, limit) : cities;

  return (
    <section id={id} className="section section-cream">
      <div className="container">
        {showIntro && <SectionIntro eyebrow={t.citiesEyebrow} title={t.citiesTitle} text={t.citiesText} />}
        <div className="city-grid">
          {displayed.map((city) => (
            <article className="city-card" key={city.name}>
              <div className="city-media">
                <img
                  src={city.image}
                  srcSet={`${city.image.replace(/\.webp$/, "-480.webp")} 480w, ${city.image.replace(/\.webp$/, "-800.webp")} 800w, ${city.image} 1024w`}
                  sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 1000px) 50vw, 33vw"
                  alt={city.name}
                  loading="lazy"
                />
              </div>
              <div className="city-overlay">
                <div className="city-name-row">
                  <Icon name="MapPin" size={16} className="gold" />
                  <h3>{city.name}</h3>
                </div>
                <p className="city-desc">{localize(city.text, lang)}</p>
                <a className="city-cta" href={cityPathFor(city.slug, lang)}>
                  {t.cityDetails} →
                </a>
              </div>
            </article>
          ))}
        </div>
        {limit && (
          <div className="cities-see-all">
            <a className="button button-dark" href={pathFor("cities", lang)}>
              <Icon name="Map" />
              {t.citiesTitle} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
