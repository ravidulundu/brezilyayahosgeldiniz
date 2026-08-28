import {
  cities,
  cityPathFor,
  company,
  defaultShareImage,
  localize,
  pathFor,
  seoKeywords,
  siteUrl,
  socialLinks,
  tours,
  people,
} from "../data/content.js";
import { alternatePaths, defaultLang, localeCodes } from "../data/routes.js";

export const urlFor = (path) => new URL(path, siteUrl).href;

/*
 * SEO çözümlenmiş rota üzerinden kurulur: { lang, routeId, city }.
 * routeId veya city'den biri dolu olur; ikisi de boşsa sayfa 404 sayılır
 * ve noindex verilir.
 */
export function buildSeo({ lang, routeId, city, t }) {
  const notFound = !routeId && !city;
  const canonicalPath = notFound
    ? pathFor("home", lang)
    : city
      ? cityPathFor(city.slug, lang)
      : pathFor(routeId, lang);

  const title = notFound ? t.pageNotFound : getPageTitle({ routeId, city, t, lang });
  const description = notFound ? t.pageNotFound : getPageDescription({ routeId, city, t, lang });
  const image = urlFor(city?.image ?? defaultShareImage);
  const canonical = urlFor(canonicalPath);
  const type = routeId === "home" ? "website" : "article";

  return {
    title: routeId === "home"
      ? t.homeMetaTitle
      : title === company.name
        ? title
        : `${title} | ${company.name}`,
    description,
    canonical,
    image,
    type,
    noindex: notFound,
    /* 404'te alternatif üretmenin anlamı yok. */
    alternates: notFound ? [] : alternatePaths({ routeId, citySlug: city?.slug }),
    jsonLd: buildJsonLd({ routeId, city, t, lang, title, description, canonical, image }),
  };
}

function getPageTitle({ routeId, city, t, lang }) {
  if (city) return `${city.name} ${t.cityTitleSuffix}`;

  switch (routeId) {
    case "about": return t.aboutEyebrow;
    case "cities": return t.citiesTitle;
    case "tours": return `${t.toursTitle} | ${t.toursGuideSuffix}`;
    case "contact": return t.contactTitle;
    case "umutEker": return people.umutEker.name;
    case "privacy": return t.privacy;
    case "terms": return t.terms;
    case "cookies": return t.cookies;
    default: return t.heroTitle;
  }
}

function getPageDescription({ routeId, city, t, lang }) {
  if (city) return `${localize(city.text, lang)} ${t.cityMetaTail}`;

  switch (routeId) {
    case "about": return t.aboutLead;
    case "cities": return t.citiesText;
    case "tours": return t.toursText;
    case "contact": return t.contactText;
    case "umutEker": return localize(people.umutEker.bio, lang);
    case "privacy": return t.privacyMeta;
    case "terms": return t.termsMeta;
    case "cookies": return t.cookiesMeta;
    default: return t.heroText;
  }
}


function buildJsonLd({ routeId, city, t, lang, title, description, canonical, image }) {
  const organization = {
    "@type": "TravelAgency",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    alternateName: [company.legalGroup, company.travelBrand, company.rentalBrand, company.eventsBrand],
    url: siteUrl,
    image,
    telephone: company.phones,
    email: company.emails,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Praça Visc. de Mauá, 42 - Sala 93",
      addressLocality: "Santos",
      addressRegion: "São Paulo",
      postalCode: "11010-901",
      addressCountry: "BR",
    },
    sameAs: socialLinks.map((item) => item.url),
    areaServed: ["Brazil", "Chile", "Argentina", "Colombia", "South America"],
    knowsAbout: seoKeywords,
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: localeCodes[lang] ?? lang,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: company.name,
      url: siteUrl,
    },
    about: { "@id": `${siteUrl}/#organization` },
  };

  const graph = [organization, webPage];

  if (routeId === "home") {
    graph.push({
      "@type": "ItemList",
      "@id": `${siteUrl}/#destinations`,
      name: t.citiesTitle,
      itemListElement: cities.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: urlFor(cityPathFor(item.slug, lang)),
        name: item.name,
      })),
    });
  }

  if (routeId === "tours") {
    graph.push(
      ...tours.map((tour) => ({
        "@type": "TouristTrip",
        name: localize(tour.title, lang),
        description: localize(tour.text, lang),
        image: urlFor(tour.image),
        touristType: ["International travelers", "Corporate travelers", "Business delegations"],
        provider: { "@id": `${siteUrl}/#organization` },
      })),
    );
  }

  if (city) {
    graph.push({
      "@type": "TouristDestination",
      name: city.name,
      description: localize(city.text, lang),
      image: urlFor(city.image),
      url: canonical,
      provider: { "@id": `${siteUrl}/#organization` },
    });
  }

  if (routeId === "umutEker") {
    graph.push({
      "@type": "Person",
      "@id": `${siteUrl}${pathFor("umutEker", defaultLang)}#person`,
      name: people.umutEker.name,
      birthDate: "1977-05-17",
      birthPlace: "Soma, Manisa, Türkiye",
      jobTitle: localize(people.umutEker.role, lang),
      description: localize(people.umutEker.bio, lang),
      url: canonical,
      sameAs: [people.umutEker.externalUrl],
      worksFor: { "@id": `${siteUrl}/#organization` },
      memberOf: ["MÜSİAD", "DTİK", "OREMDER"],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function localeFor(lang) {
  return {
    tr: "tr_TR",
    en: "en_US",
    pt: "pt_BR",
    es: "es_ES",
  }[lang] ?? "tr_TR";
}
