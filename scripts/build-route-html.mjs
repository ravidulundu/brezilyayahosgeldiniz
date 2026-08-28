import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

import { cities, siteUrl, translations } from "../src/data/content.js";
import {
  cityPathFor,
  defaultLang,
  languages,
  localeCodes,
  pathFor,
  routeIds,
} from "../src/data/routes.js";
import { buildSeo } from "../src/utils/seo.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const template = readFileSync(join(DIST, "index.html"), "utf8");
const vite = await createServer({
  appType: "custom",
  logLevel: "silent",
  mode: "production",
  server: { middlewareMode: true },
});
const { renderRoute } = await vite.ssrLoadModule("/src/entry-server.jsx");

const localeFor = (lang) => ({ tr: "tr_TR", en: "en_US", pt: "pt_BR", es: "es_ES" })[lang] ?? "tr_TR";
const escapeAttribute = (value) => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const escapeText = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in built index.html`);
  return html.replace(pattern, replacement);
}

function setMeta(html, attribute, key, content) {
  const pattern = new RegExp(`<meta(?=[^>]*\\b${attribute}=["']${escapeRegExp(key)}["'])[^>]*>`, "i");
  return replaceRequired(html, pattern, `<meta ${attribute}="${key}" content="${escapeAttribute(content)}">`, `${attribute}=${key}`);
}

function setLink(html, rel, href) {
  const pattern = new RegExp(`<link(?=[^>]*\\brel=["']${escapeRegExp(rel)}["'])[^>]*>`, "i");
  return replaceRequired(html, pattern, `<link rel="${rel}" href="${escapeAttribute(href)}">`, `link rel=${rel}`);
}

function renderHtml({ lang, routeId, city }, body = "") {
  const seo = buildSeo({ lang, routeId, city, t: translations[lang] });
  let html = template;

  html = replaceRequired(html, /<html\b[^>]*\blang=["'][^"']*["'][^>]*>/i, `<html lang="${localeCodes[lang] ?? lang}">`, "html lang");
  html = replaceRequired(html, /<title>[^<]*<\/title>/i, `<title>${escapeText(seo.title)}</title>`, "title");
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "name", "robots", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
  html = setMeta(html, "property", "og:locale", localeFor(lang));
  html = setMeta(html, "property", "og:type", seo.type);
  html = setMeta(html, "property", "og:title", seo.title);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "property", "og:url", seo.canonical);
  html = setMeta(html, "property", "og:image", seo.image);
  html = setMeta(html, "name", "twitter:title", seo.title);
  html = setMeta(html, "name", "twitter:description", seo.description);
  html = setMeta(html, "name", "twitter:image", seo.image);
  html = setLink(html, "canonical", seo.canonical);

  html = html.replace(/\s*<!-- Ana sayfanin dil alternatifleri; alt sayfalarda applySeo\(\) yeniden yazar\. -->/i, "");
  html = html.replace(/\s*<link(?=[^>]*\brel=["']alternate["'])[^>]*>/gi, "");
  const alternateLinks = seo.alternates.map(([code, path]) => {
    const href = new URL(path, seo.canonical).href;
    return `<link rel="alternate" hreflang="${localeCodes[code] ?? code}" href="${escapeAttribute(href)}">`;
  });
  const defaultPath = seo.alternates.find(([code]) => code === defaultLang)?.[1];
  if (defaultPath) {
    alternateLinks.push(`<link rel="alternate" hreflang="x-default" href="${escapeAttribute(new URL(defaultPath, seo.canonical).href)}">`);
  }
  html = html.replace(/(<link\s+rel=["']canonical["'][^>]*>)/i, `$1\n    ${alternateLinks.join("\n    ")}`);

  const jsonLd = JSON.stringify(seo.jsonLd).replaceAll("<", "\\u003c");
  html = html.replace("</head>", `    <script type="application/ld+json" data-seo="structured-data">${jsonLd}</script>\n  </head>`);
  html = replaceRequired(html, /<div\s+id=["']root["']><\/div>/i, `<div id="root">${body}</div>`, "root mount");
  return html;
}

function outputPath(pathname) {
  if (pathname === "/") return join(DIST, "index.html");
  return join(DIST, ...pathname.split("/").filter(Boolean), "index.html");
}

const pages = new Map();
for (const lang of languages) {
  for (const routeId of routeIds) {
    pages.set(pathFor(routeId, lang), { lang, routeId, city: undefined });
  }
  for (const city of cities) {
    pages.set(cityPathFor(city.slug, lang), { lang, routeId: null, city });
  }
}

for (const [pathname, page] of pages) {
  const destination = outputPath(pathname);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, renderHtml(page, renderRoute(pathname)), "utf8");
}

writeFileSync(join(DIST, "404.html"), renderHtml({ lang: defaultLang, routeId: null, city: undefined }), "utf8");

const robotsPath = join(DIST, "robots.txt");
const robots = readFileSync(robotsPath, "utf8").replace(/^Sitemap:.*$/m, `Sitemap: ${siteUrl}/sitemap.xml`);
writeFileSync(robotsPath, robots, "utf8");

const markdownPath = join(DIST, "index.md");
const markdown = readFileSync(markdownPath, "utf8").replace(/^(\*\*Website:\*\*)\s+\S+/m, `$1 ${siteUrl}`);
writeFileSync(markdownPath, markdown, "utf8");

await vite.close();
console.log(`Route HTML generated: ${pages.size} pages + 404`);
