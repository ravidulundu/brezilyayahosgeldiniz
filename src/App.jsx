import { useEffect, useMemo, useState } from "react";
import Cities from "./components/Cities.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Operations from "./components/Operations.jsx";
import Services from "./components/Services.jsx";
import Tours from "./components/Tours.jsx";

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
import { cities, company, sectionIds, translations } from "./data/content.js";
import { alternatePaths, cityPathFor, pathFor, resolvePath } from "./data/routes.js";
import { applySeo, buildSeo } from "./utils/seo.js";

export default function App({ initialPathname }) {
  /*
   * Dilin tek kaynağı URL: /  → tr, /en/... → en.
   * Böylece her dil ayrı ayrı indekslenebilir ve paylaşılan link
   * karşı tarafta da aynı dilde açılır.
   */
  const [route, setRoute] = useState(() => resolveRoute(initialPathname ?? window.location.pathname));
  const { lang, routeId, city, canonicalPath } = route;
  const t = translations[lang] ?? translations.tr;
  const [waVisible, setWaVisible] = useState(false);

  useEffect(() => {
    const onPopState = () => setRoute(resolveRoute(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onPopState);
    };
  }, []);

  useEffect(() => {
    applySeo(buildSeo({ lang, routeId, city, t }), lang);
  }, [city, lang, routeId, t]);

  /*
   * Adres çubuğunu kanonik yola çek: /en/hakkimizda/ → /en/about/,
   * /İletişim/ → /iletisim/, /tr/hakkimizda/ → /hakkimizda/, /en → /en/,
   * /rio-de-janeiro/ → /Rio-de-Janeiro/. Sayfa aynı, sadece URL temizlenir;
   * geçmişe yeni kayıt eklemediği için geri tuşu bozulmaz.
   * 404'te dokunmuyoruz — kullanıcı ne yazdığını görmeli.
   */
  useEffect(() => {
    if (!canonicalPath || window.location.pathname === canonicalPath) return;
    const { search, hash } = window.location;
    window.history.replaceState({}, "", `${canonicalPath}${search}${hash}`);
  }, [canonicalPath]);

  useEffect(() => {
    const blockedSections = new Set();
    let scrolledDown = false;

    const onScroll = () => {
      scrolledDown = window.scrollY > 300;
      setWaVisible(scrolledDown && blockedSections.size === 0);
    };

    const blockers = document.querySelectorAll("footer, .ab-founders, .ab-cta, .contact-section");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) blockedSections.add(entry.target);
        else blockedSections.delete(entry.target);
      });
      setWaVisible(scrolledDown && blockedSections.size === 0);
    }, { threshold: 0, rootMargin: "0px 0px 120px 0px" });

    blockers.forEach((section) => io.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  /* Dil değiştirmek = aynı sayfanın o dildeki URL'ine gitmek. */
  const langPaths = useMemo(
    () => Object.fromEntries(alternatePaths({ routeId, citySlug: city?.slug })),
    [city, routeId],
  );

  function handleLangChange(code) {
    const target = langPaths[code];
    if (target) window.location.assign(target);
  }

  const page = renderPage({ routeId, city, t, lang });

  return (
    <>
      <Header lang={lang} setLang={handleLangChange} nav={t.nav} logoAlt={t.logoAlt} />
      <main>{page}</main>
      <a className={`whatsapp-float${waVisible ? " wa-visible" : ""}`} href={company.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg className="whatsapp-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.502L4 29l7.752-1.814A11.94 11.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3z" fill="white" fillOpacity="0.15"/>
          <path d="M16 4.5C10.201 4.5 5.5 9.201 5.5 15c0 2.19.65 4.23 1.77 5.935L6 27l6.24-1.64A11.46 11.46 0 0016 26.5c5.799 0 10.5-4.701 10.5-10.5S21.799 4.5 16 4.5zm5.54 14.96c-.23.65-1.35 1.24-1.84 1.3-.47.06-1.07.08-1.72-.11-.4-.12-.9-.28-1.55-.56-2.72-1.18-4.5-3.93-4.64-4.11-.13-.18-1.1-1.46-1.1-2.79 0-1.32.69-1.97 1-2.28.3-.31.65-.38.87-.38.21 0 .43.002.62.012.2.01.46-.076.72.55.27.64.9 2.23.98 2.39.08.16.13.35.03.56-.1.21-.15.34-.3.52-.14.18-.3.4-.43.54-.14.14-.29.3-.13.58.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.7-.82.89-1.1.19-.28.38-.23.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.16 1.33z" fill="white"/>
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </a>
      <Footer t={t} lang={lang} />
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

function renderPage({ routeId, city, t, lang }) {
  switch (routeId) {
    case "home": return <HomePage t={t} lang={lang} />;
    case "about": return <AboutPage t={t} lang={lang} />;
    case "cities": return <CitiesPage t={t} lang={lang} />;
    case "tours": return <ToursPage t={t} lang={lang} />;
    case "contact": return <ContactPage t={t} lang={lang} />;
    case "umutEker": return <UmutEkerPage t={t} lang={lang} />;
    case "privacy":
    case "terms":
    case "cookies": return <LegalPage t={t} lang={lang} type={routeId} />;
    default: break;
  }

  if (city) return <CityPage t={t} lang={lang} city={city} />;
  return <NotFoundPage t={t} lang={lang} />;
}

/*
 * resolvePath yalnızca slug'ı döndürür; şehir olup olmadığı burada
 * doğrulanır. Eşleştirme büyük/küçük harfe duyarsız, canonical her zaman
 * veri dosyasındaki asıl yazımı gösterir.
 */
function resolveRoute(pathname) {
  const { lang, routeId, citySlug } = resolvePath(pathname);
  const city = citySlug
    ? cities.find((item) => item.slug.toLowerCase() === citySlug.toLowerCase())
    : undefined;

  /* 404'te kanonik yol yok. */
  const canonicalPath = routeId
    ? pathFor(routeId, lang)
    : city
      ? cityPathFor(city.slug, lang)
      : null;

  return { lang, routeId, city, canonicalPath };
}
