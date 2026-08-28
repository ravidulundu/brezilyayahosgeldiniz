import { cities, sectionIds } from "../../data/content.js";
import Cities from "../Cities.jsx";
import { PageHero } from "./PageHero.jsx";

export function CitiesPage({ t, lang }) {
  return (
    <>
      <PageHero title={t.citiesTitle} text={t.citiesText} image={cities[0].image} imageAlt={cities[0].name} />
      <Cities t={t} lang={lang} id={sectionIds.cities} showIntro={false} />
    </>
  );
}
