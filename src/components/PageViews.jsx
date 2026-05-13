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

export function AboutPage({ t }) {
  return (
    <>
      <PageHero title={t.aboutTitle} text={t.aboutLead} />
      <section id={sectionIds.about} className="section corporate-about">
        <div className="container corporate-about-grid">
          <article className="corporate-profile">
            <p className="eyebrow">{t.aboutProfileTitle}</p>
            <h2>{company.legalGroup}</h2>
            <p>{t.aboutProfileText}</p>
          </article>

          <aside className="corporate-facts">
            <Fact value={company.started} label={t.foundedLabel} />
            <Fact value={company.iata.replace("IATA TIDS: ", "IATA")} label={t.agency} />
            <Fact value="4+" label={t.countries} />
            <Fact value="7/24" label={t.support} />
          </aside>
        </div>

        <div className="container corporate-block">
          <SectionHeading eyebrow={t.aboutBrandsTitle} title={t.aboutBrandsTitle} />
          <div className="brand-profile-grid">
            {groupBrands.map((brand) => (
              <article className="brand-profile-card" key={brand.name}>
                <Icon name={brand.icon} className="card-icon" />
                <h3>{brand.name}</h3>
                <span>{brand.company}</span>
                <p>{localize(brand.text, "tr")}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="container corporate-block">
          <SectionHeading eyebrow={t.aboutPillarsTitle} title={t.aboutPillarsTitle} />
          <div className="pillar-grid">
            {aboutPillars.map((pillar) => (
              <article className="pillar-card" key={localize(pillar.title, "tr")}>
                <Icon name={pillar.icon} className="card-icon" />
                <h3>{localize(pillar.title, "tr")}</h3>
                <p>{localize(pillar.text, "tr")}</p>
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
          <a className="button button-primary" href={company.whatsapp}>
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
  return (
    <>
      <PageHero title={t.contactTitle} text={t.contactText} />
      <Contact t={t} id={sectionIds.contact} />
    </>
  );
}

export function UmutEkerPage({ t }) {
  const person = people.umutEker;

  return (
    <>
      <PageHero title={person.name} text={person.role} />
      <section className="section">
        <div className="container person-profile">
          <div className="person-photo">
            <img src={person.image} alt={person.name} />
          </div>
          <article className="person-card">
            <p className="eyebrow">{t.founderProfile}</p>
            <h2>{person.name}</h2>
            <strong>{person.birth}</strong>
            <p>{person.bio}</p>
            <div className="actions">
              <a className="button button-dark" href={person.externalUrl} target="_blank" rel="noreferrer">
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
  return (
    <>
      <PageHero title={city.name} text={localize(city.text, lang)} image={city.image} />
      <section className="section">
        <div className="container detail-layout">
          <article className="detail-card">
            <p className="eyebrow">{t.citiesTitle}</p>
            <h2>{city.name}</h2>
            <p>{localize(city.text, lang)}</p>
            <div className="actions">
              <a className="button button-dark" href={company.whatsapp}>
                <Icon name="MessageCircle" />
                {t.ctaPrimary}
              </a>
              <a className="button button-light" href={routes.cities}>
                <Icon name="Map" />
                {t.cityAction}
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export function LegalPage({ t, type }) {
  const content = legalContent[type] ?? legalContent.privacy;

  return (
    <>
      <PageHero title={content.title} text={content.lead} />
      <section className="section">
        <div className="container legal-page">
          {content.sections ? (
            content.sections.map((section) => (
              <section className="legal-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))
          ) : (
            content.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
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
