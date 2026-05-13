import { cities, cityPath, company, defaultShareImage, routes, siteUrl, socialLinks, tours } from "../data/content.js";

const urlFor = (path) => new URL(path, siteUrl).href;

export function buildSeo({ path, t, city }) {
  const title = getPageTitle(path, t, city);
  const description = getPageDescription(path, t, city);
  const image = city?.image ?? defaultShareImage;
  const canonical = urlFor(path);
  const type = path === routes.home ? "website" : "article";

  return {
    title: `${title} | ${company.name}`,
    description,
    canonical,
    image,
    type,
    jsonLd: buildJsonLd({ path, t, city, title, description, canonical, image }),
  };
}

export function applySeo(seo, lang) {
  document.title = seo.title;
  document.documentElement.lang = lang;

  setMeta("description", seo.description);
  setMeta("robots", "index, follow, max-image-preview:large");
  setLink("canonical", seo.canonical);

  setProperty("og:locale", localeFor(lang));
  setProperty("og:type", seo.type);
  setProperty("og:title", seo.title);
  setProperty("og:description", seo.description);
  setProperty("og:url", seo.canonical);
  setProperty("og:image", seo.image);
  setProperty("og:site_name", company.name);

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", seo.title);
  setMeta("twitter:description", seo.description);
  setMeta("twitter:image", seo.image);

  setJsonLd(seo.jsonLd);
}

function getPageTitle(path, t, city) {
  if (city) return `${city.name} Rehber ve Transfer`;
  if (path === routes.about) return t.aboutEyebrow;
  if (path === routes.cities) return t.citiesTitle;
  if (path === routes.tours) return `${t.toursTitle} | Türkçe Rehber`;
  if (path === routes.contact) return t.contactTitle;
  if (path === routes.privacy) return t.privacy;
  if (path === routes.terms) return t.terms;
  if (path === routes.cookies) return t.cookies;
  return t.heroTitle;
}

function getPageDescription(path, t, city) {
  if (city) return `${city.text?.tr ?? t.citiesText} Çok dilli rehberlik, VIP transfer, araç kiralama ve yerel operasyon koordinasyonu.`;
  if (path === routes.about) return t.aboutLead;
  if (path === routes.cities) return t.citiesText;
  if (path === routes.tours) return t.toursText;
  if (path === routes.contact) return t.contactText;
  if (path === routes.privacy) return "GRUPOEKER Aviso de Privacidade e LGPD: dados tratados, bases legais, direitos do titular, retenção, compartilhamento e canal do encarregado.";
  if (path === routes.terms) return "Kullanım şartları, hizmet kapsamı, tekliflendirme ve kurumsal web sitesi koşulları.";
  if (path === routes.cookies) return "Çerez politikası: zorunlu teknik kullanım, pazarlama çerezi ve reklam izleme durumu.";
  return t.heroText;
}

function buildJsonLd({ path, t, city, title, description, canonical, image }) {
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
    knowsAbout: ["Brazil tourism", "VIP transfer", "car rental", "multilingual guiding", "MICE", "B2B events"],
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: ["tr", "en", "pt-BR", "es"],
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: company.name,
      url: siteUrl,
    },
    about: { "@id": `${siteUrl}/#organization` },
  };

  const graph = [organization, webPage];

  if (path === routes.home) {
    graph.push({
      "@type": "ItemList",
      "@id": `${siteUrl}/#destinations`,
      name: t.citiesTitle,
      itemListElement: cities.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: urlFor(cityPath(item)),
        name: item.name,
      })),
    });
  }

  if (path === routes.tours) {
    graph.push(
      ...tours.map((tour) => ({
        "@type": "TouristTrip",
        name: tour.title.tr,
        description: tour.text.tr,
        image: tour.image,
        touristType: ["International travelers", "Corporate travelers", "Business delegations"],
        provider: { "@id": `${siteUrl}/#organization` },
      })),
    );
  }

  if (city) {
    graph.push({
      "@type": "TouristDestination",
      name: city.name,
      description: city.text.tr,
      image: city.image,
      url: canonical,
      provider: { "@id": `${siteUrl}/#organization` },
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function setMeta(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setProperty(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setJsonLd(data) {
  let element = document.querySelector('script[type="application/ld+json"][data-seo="structured-data"]');
  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("data-seo", "structured-data");
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function localeFor(lang) {
  return {
    tr: "tr_TR",
    en: "en_US",
    pt: "pt_BR",
    es: "es_ES",
  }[lang] ?? "tr_TR";
}
