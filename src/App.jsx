import { useEffect, useMemo, useState } from "react";
import About from "./components/About.jsx";
import Cities from "./components/Cities.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Icon from "./components/Icon.jsx";
import Operations from "./components/Operations.jsx";
import {
  AboutPage,
  CitiesPage,
  CityPage,
  ContactPage,
  LegalPage,
  NotFoundPage,
  ToursPage,
  UmutEkerPage,
} from "./components/PageViews.jsx";
import Services from "./components/Services.jsx";
import Tours from "./components/Tours.jsx";
import { cities, cityPath, company, oldRouteAliases, routes, sectionIds, translations } from "./data/content.js";
import { applySeo, buildSeo } from "./utils/seo.js";

export default function App() {
  const [lang, setLang] = useState("tr");
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const t = translations[lang] ?? translations.tr;
  const city = useMemo(() => cities.find((item) => normalizePath(cityPath(item)) === path), [path]);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onPopState);
    };
  }, []);

  useEffect(() => {
    applySeo(buildSeo({ path, t, city }), lang);
  }, [city, lang, path, t]);

  const page = renderPage({ path, t, lang, city });

  return (
    <>
      <Header lang={lang} setLang={setLang} nav={t.nav} homeSections={t.homeSections} />
      <main>{page}</main>
      <a className="whatsapp-float" href={company.whatsapp} aria-label="WhatsApp">
        <Icon name="MessageCircle" size={30} />
      </a>
      <Footer t={t} />
    </>
  );
}

function HomePage({ t, lang }) {
  return (
    <>
      <Hero t={t} />
      <Services t={t} lang={lang} id={sectionIds.services} />
      <Cities t={t} lang={lang} id={sectionIds.cities} />
      <Tours t={t} lang={lang} id={sectionIds.tours} />
      <Operations t={t} id={sectionIds.operations} />
      <Contact t={t} id={sectionIds.contact} />
    </>
  );
}

function renderPage({ path, t, lang, city }) {
  if (path === routes.home) return <HomePage t={t} lang={lang} />;
  if (path === routes.about) return <AboutPage t={t} />;
  if (path === routes.cities) return <CitiesPage t={t} lang={lang} />;
  if (path === routes.tours) return <ToursPage t={t} lang={lang} />;
  if (path === routes.contact) return <ContactPage t={t} />;
  if (path === routes.umutEker) return <UmutEkerPage t={t} />;
  if (path === routes.privacy) return <LegalPage t={t} type="privacy" />;
  if (path === routes.terms) return <LegalPage t={t} type="terms" />;
  if (path === routes.cookies) return <LegalPage t={t} type="cookies" />;
  if (city) return <CityPage t={t} lang={lang} city={city} />;
  return <NotFoundPage t={t} />;
}

function normalizePath(pathname) {
  const decoded = decodeURI(pathname || routes.home);
  const normalized = decoded.endsWith("/") || decoded === routes.home ? decoded : `${decoded}/`;
  return oldRouteAliases[normalized] ?? normalized;
}
