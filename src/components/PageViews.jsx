import About from "./About.jsx";
import Cities from "./Cities.jsx";
import Contact from "./Contact.jsx";
import Tours from "./Tours.jsx";
import { cities, company, legalContent, localize, people, routes, sectionIds } from "../data/content.js";
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
      <About t={t} id={sectionIds.about} />
    </>
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
          <div className="person-photo" aria-label={person.name}>
            <span>UE</span>
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
