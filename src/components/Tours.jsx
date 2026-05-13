import { company, localize, tours } from "../data/content.js";
import Icon from "./Icon.jsx";
import { SectionIntro } from "./Services.jsx";

export default function Tours({ t, lang, id }) {
  return (
    <section id={id} className="section section-white">
      <div className="container">
        <SectionIntro eyebrow={t.toursTitle} title={t.toursTitle} text={t.toursText} />
        <div className="tour-grid">
          {tours.map((tour) => (
            <article className="tour-card" key={localize(tour.title, lang)}>
              <img src={tour.image} alt={localize(tour.title, lang)} loading="lazy" />
              <div>
                <p className="eyebrow">{tour.location}</p>
                <h3>{localize(tour.title, lang)}</h3>
                <p>{localize(tour.text, lang)}</p>
                <a className="button button-dark" href={company.whatsapp}>
                  <Icon name="MessageCircle" />
                  {t.ctaPrimary}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
