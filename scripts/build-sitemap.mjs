/*
 * sitemap.xml üretici — `npm run build` öncesinde otomatik çalışır (prebuild).
 *
 * Rota tablosu ile şehir listesini tek kaynaktan okur, dolayısıyla yeni bir
 * sayfa veya şehir eklendiğinde sitemap'i elle güncellemek gerekmez.
 * Her URL, kendisinin tüm dillerdeki karşılıklarını xhtml:link ile bildirir.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { cities, siteUrl } from "../src/data/content.js";
import { alternatePaths, languages, localeCodes, defaultLang } from "../src/data/routes.js";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
const lastmod = process.env.SITEMAP_LASTMOD?.trim() || null;
if (lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
  throw new Error("SITEMAP_LASTMOD must use YYYY-MM-DD format");
}

/* routeId → sitemap ağırlığı */
const pageMeta = {
  home: { changefreq: "weekly", priority: "1.0" },
  cities: { changefreq: "monthly", priority: "0.9" },
  tours: { changefreq: "monthly", priority: "0.9" },
  contact: { changefreq: "monthly", priority: "0.8" },
  about: { changefreq: "monthly", priority: "0.8" },
  umutEker: { changefreq: "yearly", priority: "0.6" },
  privacy: { changefreq: "yearly", priority: "0.3" },
  terms: { changefreq: "yearly", priority: "0.3" },
  cookies: { changefreq: "yearly", priority: "0.3" },
};

const cityMeta = { changefreq: "monthly", priority: "0.7" };

const absolute = (path) => new URL(path, siteUrl).href;

function urlEntry({ routeId, citySlug }, meta) {
  const alternates = alternatePaths({ routeId, citySlug });
  const byLang = Object.fromEntries(alternates);

  const links = alternates.map(
    ([code, path]) =>
      `    <xhtml:link rel="alternate" hreflang="${localeCodes[code] ?? code}" href="${absolute(path)}"/>`,
  );
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(byLang[defaultLang])}"/>`,
  );

  return languages.map((lang) =>
    [
      "  <url>",
      `    <loc>${absolute(byLang[lang])}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      `    <changefreq>${meta.changefreq}</changefreq>`,
      `    <priority>${meta.priority}</priority>`,
      ...links,
      "  </url>",
    ].join("\n"),
  );
}

const entries = [
  ...Object.entries(pageMeta).flatMap(([routeId, meta]) => urlEntry({ routeId, citySlug: null }, meta)),
  ...cities.flatMap((city) => urlEntry({ routeId: null, citySlug: city.slug }, cityMeta)),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...entries,
  "</urlset>",
  "",
].join("\n");

writeFileSync(OUT, xml, "utf8");
console.log(`sitemap.xml yazildi: ${entries.length} URL (${Object.keys(pageMeta).length} sayfa + ${cities.length} sehir) x ${languages.length} dil`);
