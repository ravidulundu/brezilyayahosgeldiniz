import { localize, pathFor, people } from "../../data/content.js";
import { groupBrands } from "../../data/company-profile-data.js";
import { credentialsDetailed, umutQuote, umutTimeline } from "../../data/umut-eker-data.js";
import Icon from "../Icon.jsx";

export function UmutEkerPage({ t, lang }) {
  const person = people.umutEker;

  return (
    <>
      {/* Profile Hero */}
      <section className="section section-below-header umut-hero-section">
        <div className="container umut-hero-grid">
          <div className="umut-hero-photo">
            <img src={person.image} alt={person.name} />
          </div>
          <div className="umut-hero-info">
            <p className="eyebrow">{t.umutIntroEyebrow}</p>
            <h1 className="umut-hero-name">{person.name}</h1>
            <p className="umut-hero-role">{localize(person.role, lang)}</p>
            <div className="umut-hero-meta">
              <Icon name="Calendar" size={14} />
              <span>{person.birth}</span>
            </div>
            <p className="umut-hero-bio">{localize(person.bio, lang)}</p>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="section umut-quote">
        <div className="container">
          <div className="umut-quote-wrap">
            <div className="umut-quote-rule" aria-hidden="true" />
            <p className="eyebrow umut-quote-eyebrow">{t.umutQuoteEyebrow}</p>
            <blockquote className="umut-quote-text">{localize(umutQuote, lang)}</blockquote>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="section umut-career">
        <div className="container">
          <div className="refined-section-intro">
            <p className="eyebrow">{t.umutCareerEyebrow}</p>
            <h2>{t.umutCareerTitle}</h2>
          </div>
          <div className="refined-timeline">
            {umutTimeline.map((row) => (
              <div className="refined-timeline-row" key={row.year}>
                <span className="refined-timeline-year">{row.year}</span>
                <span className="refined-timeline-dot" aria-hidden="true" />
                <div className="refined-timeline-body">
                  <p className="refined-timeline-text">{localize(row.text, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands under management */}
      <section className="section umut-brands-section">
        <div className="container">
          <div className="refined-section-intro">
            <p className="eyebrow">{t.umutBrandsEyebrow}</p>
            <h2>{t.umutBrandsTitle}</h2>
          </div>
          <div className="umut-brands-grid">
            {groupBrands.map((brand) => (
              <article className="umut-brand-card" key={brand.name}>
                <div className="umut-brand-card-head">
                  <span className="umut-brand-card-icon">
                    <Icon name={brand.icon} size={18} />
                  </span>
                  <span className="umut-brand-card-year">{brand.year}</span>
                </div>
                <h3 className="umut-brand-card-name">{brand.name}</h3>
                <p className="umut-brand-card-text">{localize(brand.text, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships & Positions */}
      <section className="section umut-credentials-section">
        <div className="container">
          <div className="refined-section-intro">
            <p className="eyebrow">{t.umutCredentialsEyebrow}</p>
            <h2>{t.umutCredentialsTitle}</h2>
          </div>
          <div className="umut-credentials-list">
            {credentialsDetailed.map((c) => (
              <div className="umut-cred-row" key={c.org}>
                <h3 className="umut-cred-org">{c.org}</h3>
                <span className="umut-cred-role">{localize(c.role, lang)}</span>
                <p className="umut-cred-desc">{localize(c.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="section umut-actions-section">
        <div className="container umut-actions-inner">
          <div className="actions">
            <a className="button button-dark" href={person.externalUrl} target="_blank" rel="noreferrer">
              <Icon name="ExternalLink" size={16} />
              {t.externalProfile}
            </a>
            <a className="button button-light" href={pathFor("about", lang)}>
              {t.aboutEyebrow}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
