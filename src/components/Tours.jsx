import { company, localize, tours } from "../data/content.js";
import Icon from "./Icon.jsx";
import { SectionIntro } from "./Services.jsx";

export default function Tours({ t, lang, id }) {
  return (
    <section id={id} className="section section-white">
      <div className="container">
        <SectionIntro eyebrow={t.toursEyebrow} title={t.toursTitle} text={t.toursText} />
        <div className="tour-stack">
          {tours.map((tour, i) => (
            <article
              className={`tour-feature${i % 2 === 1 ? " tour-feature-flip" : ""}`}
              key={localize(tour.title, lang)}
            >
              <div className="tour-feature-img">
                <img src={tour.image} alt={localize(tour.title, lang)} loading="lazy" />
                <span className="tour-feature-loc">
                  <Icon name="MapPin" size={12} />
                  {tour.location}
                </span>
              </div>
              <div className="tour-feature-body">
                <span className="tour-feature-idx" aria-hidden="true">0{i + 1}</span>
                <p className="eyebrow">{tour.location}</p>
                <h3>{localize(tour.title, lang)}</h3>
                <p className="tour-feature-text">{localize(tour.text, lang)}</p>
                <a className="button button-dark" href={company.whatsapp} target="_blank" rel="noreferrer">
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
