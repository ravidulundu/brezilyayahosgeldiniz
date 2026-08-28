import { sectionIds } from "../../data/content.js";
import Tours from "../Tours.jsx";
import { PageHero } from "./PageHero.jsx";

export function ToursPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.toursTitle} text={t.toursText} />
      <Tours t={t} lang={lang} id={sectionIds.tours} showIntro={false} />
    </>
  );
}
