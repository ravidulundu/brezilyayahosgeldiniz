import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Cities from "./components/Cities.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Icon from "./components/Icon.jsx";
import Operations from "./components/Operations.jsx";
import Services from "./components/Services.jsx";
import Tours from "./components/Tours.jsx";

const pv = () => import("./components/PageViews.jsx");
const AboutPage = lazy(() => pv().then((m) => ({ default: m.AboutPage })));
const CitiesPage = lazy(() => pv().then((m) => ({ default: m.CitiesPage })));
const CityPage = lazy(() => pv().then((m) => ({ default: m.CityPage })));
const ContactPage = lazy(() => pv().then((m) => ({ default: m.ContactPage })));
const LegalPage = lazy(() => pv().then((m) => ({ default: m.LegalPage })));
const NotFoundPage = lazy(() => pv().then((m) => ({ default: m.NotFoundPage })));
const ToursPage = lazy(() => pv().then((m) => ({ default: m.ToursPage })));
const UmutEkerPage = lazy(() => pv().then((m) => ({ default: m.UmutEkerPage })));
import { cities, cityPath, company, oldRouteAliases, routes, sectionIds, translations } from "./data/content.js";
import { applySeo, buildSeo } from "./utils/seo.js";

export default function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("lang") ?? "tr"; } catch { return "tr"; }
  });

  function handleLangChange(code) {
    setLang(code);
    try { localStorage.setItem("lang", code); } catch {}
  }
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
      <Header lang={lang} setLang={handleLangChange} nav={t.nav} />
      <main><Suspense fallback={null}>{page}</Suspense></main>
      <a className="whatsapp-float" href={company.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg className="whatsapp-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.502L4 29l7.752-1.814A11.94 11.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="white" fillOpacity="0.15"/>
          <path d="M16 4.5C10.201 4.5 5.5 9.201 5.5 15c0 2.19.65 4.23 1.77 5.935L6 27l6.24-1.64A11.46 11.46 0 0016 26.5c5.799 0 10.5-4.701 10.5-10.5S21.799 4.5 16 4.5zm5.54 14.96c-.23.65-1.35 1.24-1.84 1.3-.47.06-1.07.08-1.72-.11-.4-.12-.9-.28-1.55-.56-2.72-1.18-4.5-3.93-4.64-4.11-.13-.18-1.1-1.46-1.1-2.79 0-1.32.69-1.97 1-2.28.3-.31.65-.38.87-.38.21 0 .43.002.62.012.2.01.46-.076.72.55.27.64.9 2.23.98 2.39.08.16.13.35.03.56-.1.21-.15.34-.3.52-.14.18-.3.4-.43.54-.14.14-.29.3-.13.58.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.38-.23.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.16 1.33z" fill="white"/>
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
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
      <Cities t={t} lang={lang} id={sectionIds.cities} limit={6} />
      <Tours t={t} lang={lang} id={sectionIds.tours} />
      <Operations t={t} id={sectionIds.operations} />
    </>
  );
}

function renderPage({ path, t, lang, city }) {
  if (path === routes.home) return <HomePage t={t} lang={lang} />;
  if (path === routes.about) return <AboutPage t={t} lang={lang} />;
  if (path === routes.cities) return <CitiesPage t={t} lang={lang} />;
  if (path === routes.tours) return <ToursPage t={t} lang={lang} />;
  if (path === routes.contact) return <ContactPage t={t} />;
  if (path === routes.umutEker) return <UmutEkerPage t={t} lang={lang} />;
  if (path === routes.privacy) return <LegalPage t={t} lang={lang} type="privacy" />;
  if (path === routes.terms) return <LegalPage t={t} lang={lang} type="terms" />;
  if (path === routes.cookies) return <LegalPage t={t} lang={lang} type="cookies" />;
  if (city) return <CityPage t={t} lang={lang} city={city} />;
  return <NotFoundPage t={t} />;
}

function normalizePath(pathname) {
  const decoded = decodeURI(pathname || routes.home);
  const normalized = decoded.endsWith("/") || decoded === routes.home ? decoded : `${decoded}/`;
  return oldRouteAliases[normalized] ?? normalized;
}
