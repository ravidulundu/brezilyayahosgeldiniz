import assert from "node:assert/strict";
import test from "node:test";

import { cities, company, localeCodes, siteUrl, translations } from "../src/data/content.js";
import { applySeo } from "../src/utils/seo-dom.js";
import { buildSeo } from "../src/utils/seo.js";

const alternatePaths = (tr, en, pt, es) => [
  ["tr", tr],
  ["en", en],
  ["pt", pt],
  ["es", es],
];

const routeCases = [
  {
    name: "home",
    routeId: "home",
    title: "Brazil Tours, Local Guides and VIP Transfers | GRUPOEKER",
    description: "Your trusted local partner in Brazil for tourism, transfer, trade fairs and corporate operations.",
    path: "/en/",
    image: "/logo.png",
    type: "website",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/", "/en/", "/pt/", "/es/"),
    xDefault: "/",
    jsonLdTypes: ["TravelAgency", "WebPage", "ItemList"],
  },
  {
    name: "about",
    routeId: "about",
    title: "About | Brezilya'ya Hoş Geldiniz",
    description: "Since 2010, we have provided reliable, professional and integrated solutions through Brazil-based operations.",
    path: "/en/about/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/hakkimizda/", "/en/about/", "/pt/sobre/", "/es/sobre/"),
    xDefault: "/hakkimizda/",
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
  {
    name: "cities",
    routeId: "cities",
    title: "Featured destinations | Brezilya'ya Hoş Geldiniz",
    description: "Professional operational solutions for tourism, events, transfers and local support in Brazil's key destinations.",
    path: "/en/cities/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/sehirler/", "/en/cities/", "/pt/cidades/", "/es/ciudades/"),
    xDefault: "/sehirler/",
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
  {
    name: "tours",
    routeId: "tours",
    title: "Tours | Turkish-Speaking Guide | Brezilya'ya Hoş Geldiniz",
    description: "Brazil city tours planned with multilingual guiding, professional interpretation, private transfer and corporate field coordination.",
    path: "/en/tours/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/turlar/", "/en/tours/", "/pt/tours/", "/es/tours/"),
    xDefault: "/turlar/",
    jsonLdTypes: ["TravelAgency", "WebPage", "TouristTrip"],
  },
  {
    name: "contact",
    routeId: "contact",
    title: "Contact our team for your Brazil plan | Brezilya'ya Hoş Geldiniz",
    description: "For tourism, car rental, transfer or corporate organization, contact our Santos and São Paulo based team.",
    path: "/en/contact/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/iletisim/", "/en/contact/", "/pt/contato/", "/es/contacto/"),
    xDefault: "/iletisim/",
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
  {
    name: "profile / umutEker",
    routeId: "umutEker",
    title: "Umut Eker | Brezilya'ya Hoş Geldiniz",
    description: "Born on 17 May 1977 in Soma, Manisa, Umut Eker completed his primary and secondary education in Soma. He graduated in Forest Industrial Engineering from Istanbul University in 1999. Since 2010, he has been managing GRUPOEKER's operations in Brazil — including the brands KIRMIZIBEYAZ DO BRASIL Rent a Car, A LA TURCA Travel & MICE and EXPOTURQUIA Events & PR. He is actively engaged in strengthening commercial, cultural and institutional ties between Turkey and Brazil, and regularly appears as a news commentator on several television channels.",
    path: "/en/umuteker/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/umuteker/", "/en/umuteker/", "/pt/umuteker/", "/es/umuteker/"),
    xDefault: "/umuteker/",
    jsonLdTypes: ["TravelAgency", "WebPage", "Person"],
  },
  {
    name: "privacy",
    routeId: "privacy",
    title: "Privacy Policy | Brezilya'ya Hoş Geldiniz",
    description: "GRUPOEKER privacy notice and LGPD: data processed, legal bases, data subject rights, retention, sharing and the data protection contact channel.",
    path: "/en/privacy-policy/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/privacy-policy/", "/en/privacy-policy/", "/pt/privacy-policy/", "/es/privacy-policy/"),
    xDefault: "/privacy-policy/",
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
  {
    name: "terms",
    routeId: "terms",
    title: "Terms of Service | Brezilya'ya Hoş Geldiniz",
    description: "Terms of service, scope of services, quotation process and corporate website conditions.",
    path: "/en/terms-of-service/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/terms-of-service/", "/en/terms-of-service/", "/pt/terms-of-service/", "/es/terms-of-service/"),
    xDefault: "/terms-of-service/",
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
  {
    name: "cookies",
    routeId: "cookies",
    title: "Cookie Policy | Brezilya'ya Hoş Geldiniz",
    description: "Cookie policy: strictly necessary technical use, marketing cookies and ad tracking status.",
    path: "/en/cookie-policy/",
    image: "/logo.png",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/cookie-policy/", "/en/cookie-policy/", "/pt/cookie-policy/", "/es/cookie-policy/"),
    xDefault: "/cookie-policy/",
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
  {
    name: "city page",
    routeId: null,
    city: cities[0],
    title: "Rio de Janeiro Guide and Transfer | Brezilya'ya Hoş Geldiniz",
    description: "One of Brazil's most iconic destinations, known for Copacabana, Ipanema, Christ the Redeemer, Carnival, Sugarloaf and Santa Teresa. Multilingual guiding, VIP transfer, car rental and local operations coordination.",
    path: "/en/Rio-de-Janeiro/",
    image: "/cities/rio.webp",
    type: "article",
    robots: "index, follow, max-image-preview:large",
    alternates: alternatePaths("/Rio-de-Janeiro/", "/en/Rio-de-Janeiro/", "/pt/Rio-de-Janeiro/", "/es/Rio-de-Janeiro/"),
    xDefault: "/Rio-de-Janeiro/",
    jsonLdTypes: ["TravelAgency", "WebPage", "TouristDestination"],
  },
  {
    name: "not found",
    routeId: null,
    title: "Page not found | Brezilya'ya Hoş Geldiniz",
    description: "Page not found",
    path: "/en/",
    image: "/logo.png",
    type: "article",
    robots: "noindex, follow",
    alternates: [],
    xDefault: null,
    jsonLdTypes: ["TravelAgency", "WebPage"],
  },
];

const buildFor = ({ routeId, city }) => buildSeo({
  lang: "en",
  routeId,
  city,
  t: translations.en,
});

for (const routeCase of routeCases) {
  test(`buildSeo characterizes ${routeCase.name}`, () => {
    const seo = buildFor(routeCase);
    const graph = seo.jsonLd["@graph"];
    const webPage = graph.find((item) => item["@type"] === "WebPage");

    assert.equal(seo.title, routeCase.title);
    assert.equal(seo.description, routeCase.description);
    assert.equal(seo.canonical, new URL(routeCase.path, siteUrl).href);
    assert.equal(seo.image, new URL(routeCase.image, siteUrl).href);
    assert.equal(seo.type, routeCase.type);
    assert.equal(seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large", routeCase.robots);
    assert.deepEqual(seo.alternates, routeCase.alternates);
    assert.equal(seo.alternates.find(([code]) => code === "tr")?.[1] ?? null, routeCase.xDefault);

    // These model values are the source for Open Graph and Twitter metadata.
    assert.deepEqual(
      { title: seo.title, description: seo.description, url: seo.canonical, image: seo.image, type: seo.type },
      {
        title: routeCase.title,
        description: routeCase.description,
        url: new URL(routeCase.path, siteUrl).href,
        image: new URL(routeCase.image, siteUrl).href,
        type: routeCase.type,
      },
    );

    assert.equal(seo.jsonLd["@context"], "https://schema.org");
    assert.deepEqual(graph.map((item) => item["@type"]), routeCase.jsonLdTypes);
    assert.equal(webPage.url, seo.canonical);
    assert.equal(webPage.name, routeCase.name === "home" ? translations.en.heroTitle : routeCase.title.replace(` | ${company.name}`, ""));
    assert.equal(webPage.description, seo.description);
    assert.equal(webPage.inLanguage, "en");
  });
}

class FakeElement {
  constructor(tagName) {
    this.tagName = tagName.toLowerCase();
    this.attributes = new Map();
    this.parentNode = null;
    this.textContent = "";
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  remove() {
    if (!this.parentNode) return;
    this.parentNode.children = this.parentNode.children.filter((child) => child !== this);
    this.parentNode = null;
  }
}

class FakeFragment {
  constructor() {
    this.children = [];
  }

  appendChild(element) {
    this.children.push(element);
    return element;
  }
}

class FakeHead {
  constructor() {
    this.children = [];
  }

  appendChild(element) {
    if (element instanceof FakeFragment) {
      for (const child of element.children) this.appendChild(child);
      element.children = [];
      return element;
    }
    element.parentNode = this;
    this.children.push(element);
    return element;
  }
}

const matchesSelector = (element, selector) => {
  if (selector === "link[rel='alternate'][hreflang]") {
    return element.tagName === "link" && element.getAttribute("rel") === "alternate" && element.getAttribute("hreflang") !== null;
  }

  const tag = selector.match(/^[a-z]+/)?.[0];
  if (!tag || element.tagName !== tag) return false;
  const attributes = [...selector.matchAll(/\[([^=\]]+)=['"]([^'"]+)['"]\]/g)];
  return attributes.every(([, name, value]) => element.getAttribute(name) === value);
};

class FakeDocument {
  constructor() {
    this.title = "";
    this.documentElement = { lang: "" };
    this.head = new FakeHead();
  }

  createElement(tagName) {
    return new FakeElement(tagName);
  }

  createDocumentFragment() {
    return new FakeFragment();
  }

  querySelector(selector) {
    return this.head.children.find((element) => matchesSelector(element, selector)) ?? null;
  }

  querySelectorAll(selector) {
    return this.head.children.filter((element) => matchesSelector(element, selector));
  }
}

const meta = (document, name) => document.querySelector(`meta[name="${name}"]`)?.getAttribute("content");
const property = (document, name) => document.querySelector(`meta[property="${name}"]`)?.getAttribute("content");
const link = (document, rel) => document.querySelector(`link[rel="${rel}"]`)?.getAttribute("href");

function assertDomMatches(document, seo, lang) {
  assert.equal(document.title, seo.title);
  assert.equal(document.documentElement.lang, localeCodes[lang] ?? lang);
  assert.equal(meta(document, "description"), seo.description);
  assert.equal(meta(document, "robots"), seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
  assert.equal(link(document, "canonical"), seo.canonical);

  assert.equal(property(document, "og:type"), seo.type);
  assert.equal(property(document, "og:title"), seo.title);
  assert.equal(property(document, "og:description"), seo.description);
  assert.equal(property(document, "og:url"), seo.canonical);
  assert.equal(property(document, "og:image"), seo.image);
  assert.equal(property(document, "og:site_name"), company.name);

  assert.equal(meta(document, "twitter:card"), "summary_large_image");
  assert.equal(meta(document, "twitter:title"), seo.title);
  assert.equal(meta(document, "twitter:description"), seo.description);
  assert.equal(meta(document, "twitter:image"), seo.image);

  const alternateElements = document.querySelectorAll("link[rel='alternate'][hreflang]");
  const actualAlternates = alternateElements.map((element) => [
    element.getAttribute("hreflang"),
    element.getAttribute("href"),
  ]);
  const expectedAlternates = seo.alternates.flatMap(([code, path]) => {
    const alternate = [[localeCodes[code] ?? code, new URL(path, siteUrl).href]];
    if (code === "tr") alternate.push(["x-default", new URL(path, siteUrl).href]);
    return alternate;
  });
  assert.deepEqual(actualAlternates, expectedAlternates);

  const jsonLdElements = document.querySelectorAll('script[type="application/ld+json"][data-seo="structured-data"]');
  assert.equal(jsonLdElements.length, 1);
  assert.deepEqual(JSON.parse(jsonLdElements[0].textContent), seo.jsonLd);

  for (const selector of [
    'meta[name="description"]',
    'meta[name="robots"]',
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
    'link[rel="canonical"]',
  ]) {
    assert.equal(document.querySelectorAll(selector).length, 1, `${selector} should not be duplicated`);
  }
}

test("applySeo replaces stale DOM state across home, city, legal, 404 and home", () => {
  const originalDocument = globalThis.document;
  const document = new FakeDocument();
  const staleAlternate = document.createElement("link");
  staleAlternate.setAttribute("rel", "alternate");
  staleAlternate.setAttribute("hreflang", "de");
  staleAlternate.setAttribute("href", "https://stale.example/de/");
  document.head.appendChild(staleAlternate);
  globalThis.document = document;

  try {
    const sequence = [
      buildSeo({ lang: "en", routeId: "home", city: undefined, t: translations.en }),
      buildSeo({ lang: "en", routeId: null, city: cities[0], t: translations.en }),
      buildSeo({ lang: "en", routeId: "privacy", city: undefined, t: translations.en }),
      buildSeo({ lang: "en", routeId: null, city: undefined, t: translations.en }),
      buildSeo({ lang: "en", routeId: "home", city: undefined, t: translations.en }),
    ];

    for (const seo of sequence) {
      applySeo(seo, "en");
      assertDomMatches(document, seo, "en");
      assert.equal(document.querySelectorAll("link[rel='alternate'][hreflang]").some(
        (element) => element.getAttribute("hreflang") === "de",
      ), false);
    }

    // Applying the same page again must update in place rather than append duplicates.
    applySeo(sequence.at(-1), "en");
    assertDomMatches(document, sequence.at(-1), "en");
  } finally {
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
  }
});
