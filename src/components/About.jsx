import { company, defaultLang, pathFor } from "../data/content.js";
import { founders, logos } from "../data/page-data.js";
import Icon from "./Icon.jsx";

export default function About({ t, id, lang = defaultLang, compact = false }) {
  const milestones = [
    [company.started, t.foundedLabel, "Globe2"],
    [company.foundedTravel, company.travelBrand, "Plane"],
    [company.foundedEvents, company.eventsBrand, "BriefcaseBusiness"],
  ];

  const stats = [
    ["4+", t.countries, "Globe2"],
    ["15+", t.experience, "BriefcaseBusiness"],
    ["IATA", t.agency, "ShieldCheck"],
    ["7/24", t.support, "Users"],
  ];

  return (
    <section id={id} className="section section-cream section-about">
      <div className={`container about-shell ${compact ? "about-compact" : ""}`}>
        <div className="split">
          <div>
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
            <p className="lead">{t.aboutLead}</p>
            {compact && (
              <a className="button button-dark about-detail-button" href={pathFor("about", lang)}>
                {t.aboutDetail}
              </a>
            )}
          </div>
          <p className="body-copy">{t.aboutText}</p>
        </div>

        {!compact && (
          <div className="logo-grid">
            {logos.map((logo) => (
              <div className="logo-card" key={logo.name}>
                <img src={logo.image} alt={logo.name} loading="lazy" />
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        )}

        {!compact && (
          <div className="milestone-grid">
            {milestones.map(([year, label, icon]) => (
              <article className="milestone" key={label}>
                <Icon name={icon} />
                <strong>{year}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        )}

        <div className={`stats-grid ${compact ? "stats-compact" : ""}`}>
          {stats.map(([value, label, icon]) => (
            <div className="stat" key={label}>
              <Icon name={icon} className="gold" />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="founders-panel">
          <span>{t.foundersLabel}</span>
          <div>
            {founders.map((founder, index) => (
              <FragmentFounder founder={founder} lang={lang} key={founder.name} separator={index < founders.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FragmentFounder({ founder, lang, separator }) {
  return (
    <>
      {founder.routeId ? <a href={pathFor(founder.routeId, lang)}>{founder.name}</a> : <strong>{founder.name}</strong>}
      {separator && <em>/</em>}
    </>
  );
}
