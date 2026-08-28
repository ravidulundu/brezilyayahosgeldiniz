import { localize, pathFor } from "../../data/content.js";
import { legalContent } from "../../data/legal-data.js";
import { PageHero } from "./PageHero.jsx";

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
