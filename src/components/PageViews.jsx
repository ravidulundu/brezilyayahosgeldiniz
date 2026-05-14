import About from "./About.jsx";
import Cities from "./Cities.jsx";
import Contact from "./Contact.jsx";
import Tours from "./Tours.jsx";
import {
  aboutPillars,
  cities,
  company,
  founders,
  groupBrands,
  legalContent,
  localize,
  logos,
  people,
  routes,
  sectionIds,
} from "../data/content.js";
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

      <section id={sectionIds.about} className="section corporate-about">
        <div className="container">
          <article className="corporate-profile corporate-profile-full">
            <p className="eyebrow">{t.aboutProfileTitle}</p>
            <h2>{company.legalGroup}</h2>
            <p>{t.aboutProfileText}</p>
          </article>
        </div>

        <div className="container corporate-block">
          <SectionHeading eyebrow={t.aboutBrandsTitle} title={t.aboutBrandsTitle} />
          <div className="about-logos-strip-inner">
            {logos.map((logo) => (
              <div className="about-logo-item" key={logo.name}>
                <img src={logo.image} alt={logo.name} />
              </div>
            ))}
          </div>
          <div className="brand-profile-grid">
            {groupBrands.map((brand) => (
              <article className="brand-profile-card" key={brand.name}>
                <div className="brand-card-icon-wrap">
                  <Icon name={brand.icon} size={22} />
                </div>
                <h3>{brand.name}</h3>
                <span>{brand.company}</span>
                <p>{localize(brand.text, lang)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="container corporate-block">
          <SectionHeading eyebrow={t.aboutPillarsTitle} title={t.aboutPillarsTitle} />
          <div className="pillar-grid">
            {aboutPillars.map((pillar) => (
              <article className="pillar-card" key={localize(pillar.title, lang)}>
                <div className="pillar-icon-wrap">
                  <Icon name={pillar.icon} size={20} />
                </div>
                <h3>{localize(pillar.title, lang)}</h3>
                <p>{localize(pillar.text, lang)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="container corporate-management">
          <div>
            <p className="eyebrow">{t.aboutManagementTitle}</p>
            <h2>{t.aboutManagementTitle}</h2>
          </div>
          <div className="management-card">
            {founders.map((founder, index) => (
              <span key={founder.name}>
                {founder.url ? <a href={founder.url}>{founder.name}</a> : <strong>{founder.name}</strong>}
                {index < founders.length - 1 && <em>/</em>}
              </span>
            ))}
          </div>
        </div>

        <div className="container about-cta">
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

function Fact({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="corporate-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

export function CitiesPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.citiesTitle} text={t.citiesText} image={cities[0].image} />
      <Cities t={t} lang={lang} id={sectionIds.cities} />
    </>
  );
}

export function ToursPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.toursTitle} text={t.toursText} />
      <Tours t={t} lang={lang} id={sectionIds.tours} />
    </>
  );
}

export function ContactPage({ t }) {
  return <Contact t={t} id={sectionIds.contact} className="section-below-header" />;
}

export function UmutEkerPage({ t, lang }) {
  const person = people.umutEker;

  return (
    <>
      <section className="section section-cream section-below-header">
        <div className="container person-profile">
          <div className="person-photo-wrap">
            <img src={person.image} alt={person.name} />
          </div>
          <article className="person-card">
            <p className="person-role-label">{localize(person.role, lang)}</p>
            <h2>{person.name}</h2>
            <div className="person-meta">
              <Icon name="Calendar" size={14} />
              <span>{person.birth}</span>
            </div>
            <p className="person-bio">{localize(person.bio, lang)}</p>
            {person.credentials && (
              <div className="person-credentials">
                {person.credentials.map((c) => (
                  <span className="person-cred-tag" key={localize(c, lang)}>{localize(c, lang)}</span>
                ))}
              </div>
            )}
            <div className="actions">
              <a className="button button-dark" href={person.externalUrl} target="_blank" rel="noreferrer">
                <Icon name="ExternalLink" size={16} />
                {t.externalProfile}
              </a>
              <a className="button button-light" href={routes.about}>
                {t.aboutEyebrow}
              </a>
            </div>
          </article>
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
              <a className="button button-light" href={routes.cities}>
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
                <a className="city-related-card" href={`/${c.slug}/`} key={c.slug}>
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
          <a className="button button-dark" href={routes.home}>
            {t.backHome}
          </a>
        </div>
      </section>
    </>
  );
}

export function NotFoundPage({ t }) {
  return (
    <>
      <PageHero title={t.pageNotFound} />
      <section className="section">
        <div className="container legal-page">
          <a className="button button-dark" href={routes.home}>
            {t.backHome}
          </a>
        </div>
      </section>
    </>
  );
}
