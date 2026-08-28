import Cities from "./Cities.jsx";
import Contact from "./Contact.jsx";
import Tours from "./Tours.jsx";
import { cities, cityPathFor, company, localize, pathFor, people, sectionIds } from "../data/content.js";
import {
  aboutPillars,
  aboutTimeline,
  credentialsDetailed,
  founders,
  groupBrands,
  legalContent,
  logos,
  servicesScope,
  umutQuote,
  umutTimeline,
} from "../data/page-data.js";
import Icon from "./Icon.jsx";

export function PageHero({ title, text, image }) {
  return (
    <section className="page-hero">
      {image && <img src={image} alt="" />}
      <div className="page-hero-shade" />
      <div className="container">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

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
            {groupBrands.map((brand, i) => (
              <article className={`ab-brand-row${i % 2 === 1 ? " reverse" : ""}`} key={brand.name}>
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

export function CitiesPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.citiesTitle} text={t.citiesText} image={cities[0].image} />
      <Cities t={t} lang={lang} id={sectionIds.cities} showIntro={false} />
    </>
  );
}

export function ToursPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.toursTitle} text={t.toursText} />
      <Tours t={t} lang={lang} id={sectionIds.tours} showIntro={false} />
    </>
  );
}

export function ContactPage({ t, lang }) {
  /* Bu sayfada bolum basligi ayni zamanda sayfanin tek h1 i. */
  return <Contact t={t} lang={lang} id={sectionIds.contact} className="section-below-header" headingLevel="h1" />;
}

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

export function LegalPage({ t, lang, type }) {
  const content = legalContent[type] ?? legalContent.privacy;

  return (
    <>
      <PageHero title={localize(content.title, lang)} text={content.lead ? localize(content.lead, lang) : undefined} />
      <section className="section">
        <div className="container legal-page">
          {content.sections ? (
            content.sections.map((section) => (
              <section className="legal-section" key={localize(section.title, lang)}>
                <h2>{localize(section.title, lang)}</h2>
                {section.text.map((paragraph, i) => (
                  <p key={i}>{localize(paragraph, lang)}</p>
                ))}
              </section>
            ))
          ) : (
            content.text.map((paragraph, i) => <p key={i}>{localize(paragraph, lang)}</p>)
          )}
          <a className="button button-dark" href={pathFor("home", lang)}>
            {t.backHome}
          </a>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.pageNotFound} />
      <section className="section">
        <div className="container legal-page">
          <a className="button button-dark" href={pathFor("home", lang)}>
            {t.backHome}
          </a>
        </div>
      </section>
    </>
  );
}
