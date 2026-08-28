/*
 * Dil önekli URL şeması.
 *
 * Türkçe kök dizinde kalır (önek almaz) — böylece halihazırda indekslenmiş
 * /hakkimizda/, /sehirler/, /Rio-de-Janeiro/ gibi URL'ler hiç değişmez.
 * Diğer diller /en/, /pt/, /es/ öneki + o dile ait slug alır:
 *
 *   tr  /              /hakkimizda/     /sehirler/     /Rio-de-Janeiro/
 *   en  /en/           /en/about/       /en/cities/    /en/Rio-de-Janeiro/
 *   pt  /pt/           /pt/sobre/       /pt/cidades/   /pt/Rio-de-Janeiro/
 *   es  /es/           /es/sobre/       /es/ciudades/  /es/Rio-de-Janeiro/
 *
 * Bu modül bilinçli olarak bağımsızdır (hiçbir şey import etmez) ki
 * content.js ⇄ routes.js döngüsü oluşmasın.
 */

export const languages = ["tr", "en", "pt", "es"];
export const defaultLang = "tr";

/* html[lang], og:locale ve hreflang için */
export const localeCodes = { tr: "tr-TR", en: "en", pt: "pt-BR", es: "es-ES" };

/* Şehir slug'ları özel isim olduğu için dile göre değişmez. */
export const routeSlugs = {
  home: { tr: "", en: "", pt: "", es: "" },
  about: { tr: "hakkimizda", en: "about", pt: "sobre", es: "sobre" },
  cities: { tr: "sehirler", en: "cities", pt: "cidades", es: "ciudades" },
  tours: { tr: "turlar", en: "tours", pt: "tours", es: "tours" },
  contact: { tr: "iletisim", en: "contact", pt: "contato", es: "contacto" },
  umutEker: { tr: "umuteker", en: "umuteker", pt: "umuteker", es: "umuteker" },
  privacy: { tr: "privacy-policy", en: "privacy-policy", pt: "privacy-policy", es: "privacy-policy" },
  terms: { tr: "terms-of-service", en: "terms-of-service", pt: "terms-of-service", es: "terms-of-service" },
  cookies: { tr: "cookie-policy", en: "cookie-policy", pt: "cookie-policy", es: "cookie-policy" },
};

export const routeIds = Object.keys(routeSlugs);

/*
 * Türkçe noktalı İ, toLowerCase() ile "i" + U+0307 (birleşen nokta) üretir;
 * bu yüzden "İletişim" düz karşılaştırmada "iletişim" ile eşleşmez.
 * Birleşen noktayı atarak iki yazımı da aynı anahtara indiriyoruz.
 */
const lower = (value) => value.toLowerCase().replace(/̇/g, "");

/* Eski veya hatalı yazılmış slug'lar → kanonik slug.
   Yol tamamı değil sadece slug eşlendiği için dil önekinden bağımsız çalışır. */
const slugAliases = {
  "hakkımızda": "hakkimizda",
  "sehirler": "sehirler",
  "şehirler": "sehirler",
  "iletişim": "iletisim",
  "umut-eker": "umuteker",
  "brasília": "Brasilia",
  "são-paulo": "Sao-Paulo",
  "foz-do-iguaçu": "Foz-do-Iguacu",
  "vitória": "Vitoria",
  "maceió": "Maceio",
  "florianópolis": "Florianopolis",
};

/* Hangi dilin slug'ı gelirse gelsin sayfayı bulabilmek için ters tablo.
   Yanlış dilde gelen slug sayfayı açar, canonical doğru URL'e işaret eder. */
const slugToRouteId = new Map();
for (const [id, byLang] of Object.entries(routeSlugs)) {
  for (const slug of Object.values(byLang)) {
    if (slug) slugToRouteId.set(lower(slug), id);
  }
}

const prefixOf = (lang) => (lang === defaultLang ? "" : `/${lang}`);

export function pathFor(routeId, lang = defaultLang) {
  const byLang = routeSlugs[routeId];
  if (!byLang) return prefixOf(lang) || "/";
  const slug = byLang[lang] ?? byLang[defaultLang];
  return slug ? `${prefixOf(lang)}/${slug}/` : `${prefixOf(lang)}/`;
}

export function cityPathFor(slug, lang = defaultLang) {
  return `${prefixOf(lang)}/${slug}/`;
}

/*
 * Bir pathname'i dil + sayfaya çözer.
 * Dönen `citySlug` bir şehir adayıdır; gerçekten var olup olmadığını
 * çağıran taraf `cities` listesine bakarak doğrular.
 */
export function resolvePath(pathname) {
  let decoded;
  try {
    decoded = decodeURI(pathname || "/");
  } catch {
    decoded = pathname || "/";
  }

  const parts = decoded.split("/").filter(Boolean);

  let lang = defaultLang;
  if (parts.length && languages.includes(parts[0].toLowerCase())) {
    lang = parts.shift().toLowerCase();
  }

  if (!parts.length) return { lang, routeId: "home", citySlug: null };

  /* Şema tek segmentli; /a/b/ gibi yollar 404. */
  if (parts.length > 1) return { lang, routeId: null, citySlug: null };

  const raw = parts[0];
  const slug = slugAliases[lower(raw)] ?? raw;
  const routeId = slugToRouteId.get(lower(slug));

  if (routeId) return { lang, routeId, citySlug: null };
  return { lang, routeId: null, citySlug: slug };
}

/* hreflang için: aynı sayfanın tüm dillerdeki yolları. */
export function alternatePaths({ routeId, citySlug }) {
  return languages.map((code) => [
    code,
    routeId ? pathFor(routeId, code) : cityPathFor(citySlug, code),
  ]);
}
