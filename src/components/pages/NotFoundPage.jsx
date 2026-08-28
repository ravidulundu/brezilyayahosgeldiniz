import { pathFor } from "../../data/content.js";
import { PageHero } from "./PageHero.jsx";

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
