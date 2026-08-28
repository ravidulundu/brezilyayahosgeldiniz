import assert from "node:assert/strict";
import test from "node:test";

import { cities, translations } from "../src/data/content.js";
import { cityPathFor, languages, pathFor, resolvePath, routeIds } from "../src/data/routes.js";
import { buildSeo } from "../src/utils/seo.js";

test("all localized routes resolve back to their route id", () => {
  for (const lang of languages) {
    for (const routeId of routeIds) {
      assert.deepEqual(resolvePath(pathFor(routeId, lang)), { lang, routeId, citySlug: null });
    }
  }
});

test("all localized city paths resolve to their city slug", () => {
  for (const lang of languages) {
    for (const city of cities) {
      assert.deepEqual(resolvePath(cityPathFor(city.slug, lang)), { lang, routeId: null, citySlug: city.slug });
    }
  }
});

test("translations expose the same keys in every language", () => {
  const expected = Object.keys(translations.tr).sort();
  for (const lang of languages) assert.deepEqual(Object.keys(translations[lang]).sort(), expected);
});

test("SEO images are absolute for city and tour metadata", () => {
  const citySeo = buildSeo({ lang: "en", routeId: null, city: cities[0], t: translations.en });
  const toursSeo = buildSeo({ lang: "en", routeId: "tours", city: undefined, t: translations.en });

  assert.match(citySeo.image, /^https:\/\//);
  for (const item of [...citySeo.jsonLd["@graph"], ...toursSeo.jsonLd["@graph"]]) {
    if (item.image) assert.match(item.image, /^https:\/\//);
  }
});

test("localized home titles stay within the recommended length", () => {
  for (const lang of languages) {
    const seo = buildSeo({ lang, routeId: "home", city: undefined, t: translations[lang] });
    assert.ok(seo.title.length >= 50 && seo.title.length <= 60, `${lang} home title length: ${seo.title.length}`);
  }
});
