import { localize, services } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Services({ t, lang, id }) {
  return (
    <section id={id} className="section section-white">
      <div className="container">
        <SectionIntro eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesText} />
        <div className="svc-grid">
          {services.map((service, i) => {
            const isDark = i === 1 || i === 2;
            return (
              <article className={`svc-card${isDark ? " svc-card-dark" : ""}`} key={localize(service.title, lang)}>
                <span className="svc-num" aria-hidden="true">0{i + 1}</span>
                <div className="svc-icon-wrap">
                  <Icon name={service.icon} size={22} />
                </div>
                <h3>{localize(service.title, lang)}</h3>
                <p>{localize(service.text, lang)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
