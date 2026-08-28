import { company, localize, pathFor } from "../../data/content.js";
import { aboutPillars, aboutTimeline, founders, groupBrands, logos, servicesScope } from "../../data/company-profile-data.js";
import Icon from "../Icon.jsx";
import { PageHero } from "./PageHero.jsx";

export function AboutPage({ t, lang }) {
  const stats = [
    { value: company.started, label: t.foundedLabel },
    { value: company.iata.replace("IATA TIDS: ", ""), label: t.agency },
    { value: "4+", label: t.countries },
    { value: "7/24", label: t.support },
  ];

  return (
    <>
      <PageHero title={t.aboutTitle} text={t.aboutLead} />

      <div className="about-stats-strip">
        <div className="container about-stats-row">
          {stats.map(({ value, label }) => (
            <div className="about-stat-item" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate narrative — editorial, no white card */}
      <section className="ab-narrative">
        <div className="container ab-narrative-inner">
          <div className="ab-narrative-sidebar">
            <span className="eyebrow">{t.aboutProfileTitle}</span>
          </div>
          <div className="ab-narrative-body">
            <h2 className="ab-narrative-title">{company.legalGroup}</h2>
            <p className="ab-narrative-text">{t.aboutProfileText}</p>
          </div>
        </div>
      </section>

      {/* Company timeline — refined corporate */}
      <section className="section section-cream">
        <div className="container">
          <div className="refined-section-intro">
            <p className="eyebrow">{t.aboutTimelineEyebrow}</p>
            <h2>{t.aboutTimelineTitle}</h2>
          </div>
          <div className="refined-timeline">
            {aboutTimeline.map((row) => (
              <div className="refined-timeline-row" key={row.year}>
                <span className="refined-timeline-year">{row.year}</span>
                <span className="refined-timeline-dot" aria-hidden="true" />
                <div className="refined-timeline-body">
                  <h3 className="refined-timeline-title">{localize(row.title, lang)}</h3>
                  <p className="refined-timeline-text">{localize(row.text, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic brand story — dark green */}
      <section className="ab-brands">
        <div className="container">
          <div className="refined-section-intro">
            <p className="eyebrow ab-brands-eyebrow">{t.aboutBrandsStoryEyebrow}</p>
            <h2 className="ab-brands-heading">{t.aboutBrandsStoryTitle}</h2>
          </div>
          <div className="ab-brands-cinematic">
            {groupBrands.map((brand) => (
              <article className="ab-brand-row" key={brand.name}>
                <div className="ab-brand-side">
                  <span className="ab-brand-year">{brand.year}</span>
                  <span className="ab-brand-icon-circle">
                    <Icon name={brand.icon} size={22} />
                  </span>
                </div>
                <div className="ab-brand-body">
                  <h3 className="ab-brand-name">{brand.name}</h3>
                  <span className="ab-brand-entity">{brand.company}</span>
                  <p className="ab-brand-desc">{localize(brand.text, lang)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logo strip */}
      <div className="ab-logos-wrap">
        <div className="container">
          <div className="about-logos-strip-inner">
            {logos.map((logo) => (
              <div className="about-logo-item" key={logo.name}>
                <img src={logo.image} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pillars — numbered editorial rows */}
      <section className="ab-pillars">
        <div className="container">
          <p className="eyebrow">{t.aboutPillarsTitle}</p>
          <div className="ab-pillars-list">
            {aboutPillars.map((pillar, i) => (
              <article className="ab-pillar-row" key={localize(pillar.title, lang)}>
                <span className="ab-pillar-num">0{i + 1}</span>
                <span className="ab-pillar-icon"><Icon name={pillar.icon} size={17} /></span>
                <h3 className="ab-pillar-title">{localize(pillar.title, lang)}</h3>
                <p className="ab-pillar-text">{localize(pillar.text, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service scope — refined grid */}
      <section className="section ab-scope">
        <div className="container">
          <div className="refined-section-intro">
            <p className="eyebrow">{t.aboutScopeEyebrow}</p>
            <h2>{t.aboutScopeTitle}</h2>
          </div>
          <div className="ab-scope-grid">
            {servicesScope.map((item) => (
              <div className="ab-scope-cell" key={item.labelKey}>
                <span className="ab-scope-cell-icon">
                  <Icon name={item.icon} size={18} />
                </span>
                <span className="ab-scope-cell-label">{t[item.labelKey]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders — typographic drama */}
      <section className="ab-founders">
        <div className="container ab-founders-inner">
          <p className="eyebrow">{t.aboutManagementTitle}</p>
          <div className="ab-founders-names">
            {founders.map((founder) => (
              <span className="ab-founder-name" key={founder.name}>
                {founder.routeId
                  ? <a href={pathFor(founder.routeId, lang)}>{founder.name}</a>
                  : founder.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="container ab-cta-inner">
          <h2>{t.aboutCtaTitle}</h2>
          <a className="button button-primary" href={company.whatsapp} target="_blank" rel="noreferrer">
            <Icon name="MessageCircle" />
            {t.ctaPrimary}
          </a>
        </div>
      </section>
    </>
  );
}
