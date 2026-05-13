import { cities, cityPath, localize } from "../data/content.js";
import Icon from "./Icon.jsx";
import { SectionIntro } from "./Services.jsx";

export default function Cities({ t, lang, id }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <SectionIntro eyebrow={t.nav[2][0]} title={t.citiesTitle} text={t.citiesText} />
        <div className="city-grid">
          {cities.map((city) => (
            <article className="city-card" key={city.name}>
              <div className="city-media">
                <img src={city.image} alt={city.name} loading="lazy" />
                <div>
                  <Icon name="MapPin" className="gold" />
                  <h3>{city.name}</h3>
                </div>
              </div>
              <p>{localize(city.text, lang)}</p>
              <a className="text-link" href={cityPath(city)}>
                {t.cityDetails}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
