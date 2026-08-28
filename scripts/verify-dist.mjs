import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { cities, siteUrl } from "../src/data/content.js";
import { cityPathFor, languages, pathFor, routeIds } from "../src/data/routes.js";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const DIST = join(ROOT, "dist");
const failures = [];

function htmlPath(pathname) {
  return pathname === "/"
    ? join(DIST, "index.html")
    : join(DIST, ...pathname.split("/").filter(Boolean), "index.html");
}

const paths = new Set();
for (const lang of languages) {
  routeIds.forEach((routeId) => paths.add(pathFor(routeId, lang)));
  cities.forEach((city) => paths.add(cityPathFor(city.slug, lang)));
}

for (const pathname of paths) {
  const file = htmlPath(pathname);
  if (!existsSync(file)) {
    failures.push(`missing ${pathname}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  if (!html.includes(`<link rel="canonical" href="${siteUrl}`)) failures.push(`invalid canonical ${pathname}`);
  if (!html.includes(`<meta property="og:image" content="${siteUrl}/`)) failures.push(`invalid og:image ${pathname}`);
  if (!/<script type="application\/ld\+json" data-seo="structured-data">/.test(html)) failures.push(`missing JSON-LD ${pathname}`);
  if (/<div id="root"><\/div>/.test(html)) failures.push(`empty prerendered root ${pathname}`);
  if (!html.includes("<!-- -->")) failures.push(`missing hydration markers ${pathname}`);
}

const notFound = readFileSync(join(DIST, "404.html"), "utf8");
if (!/<meta name="robots" content="noindex, follow">/.test(notFound)) failures.push("404.html is indexable");

const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
if (/<lastmod>/.test(sitemap)) failures.push("sitemap contains synthetic lastmod");
if (!sitemap.includes(`<loc>${siteUrl}/`)) failures.push("sitemap uses the wrong site origin");

const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) failures.push("robots.txt uses the wrong sitemap origin");

const markdown = readFileSync(join(DIST, "index.md"), "utf8");
if (!markdown.includes(`**Website:** ${siteUrl}`)) failures.push("index.md uses the wrong site origin");

if (failures.length) throw new Error(`Distribution verification failed:\n- ${failures.join("\n- ")}`);
console.log(`Distribution verified: ${paths.size} route pages + 404`);
