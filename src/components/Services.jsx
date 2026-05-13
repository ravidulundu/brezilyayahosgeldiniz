import { localize, services } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Services({ t, lang, id }) {
  return (
    <section id={id} className="section section-white">
      <div className="container">
        <SectionIntro eyebrow={t.nav[1][0]} title={t.servicesTitle} text={t.servicesText} />
        <div className="service-grid">
          {services.map((service) => (
            <article className="card" key={localize(service.title, lang)}>
              <Icon name={service.icon} className="card-icon" />
              <h3>{localize(service.title, lang)}</h3>
              <p>{localize(service.text, lang)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
