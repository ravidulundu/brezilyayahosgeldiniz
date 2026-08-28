import { company, seoKeywords } from "../data/content.js";
import { defaultLang, localeCodes } from "../data/routes.js";
import { localeFor, urlFor } from "./seo.js";

export function applySeo(seo, lang) {
  document.title = seo.title;
  document.documentElement.lang = localeCodes[lang] ?? lang;

  setMeta("description", seo.description);
  setMeta("robots", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
  setMeta("keywords", seoKeywords.join(", "));
  setLink("canonical", seo.canonical);
  setAlternates(seo.alternates);

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

/*
 * hreflang etiketleri. Sayfa değiştiğinde eski setin tamamı silinip yenisi
 * yazılır; index.html'deki statik alternatifler de böylece yönetilir.
 * x-default varsayılan dile (Türkçe) işaret eder.
 */
function setAlternates(alternates) {
  document
    .querySelectorAll("link[rel='alternate'][hreflang]")
    .forEach((element) => element.remove());

  if (!alternates?.length) return;

  const fragment = document.createDocumentFragment();
  for (const [code, path] of alternates) {
    fragment.appendChild(createAlternate(localeCodes[code] ?? code, urlFor(path)));
    if (code === defaultLang) {
      fragment.appendChild(createAlternate("x-default", urlFor(path)));
    }
  }
  document.head.appendChild(fragment);
}

function createAlternate(hreflang, href) {
  const element = document.createElement("link");
  element.setAttribute("rel", "alternate");
  element.setAttribute("hreflang", hreflang);
  element.setAttribute("href", href);
  return element;
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
