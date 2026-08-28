import { sectionIds } from "../../data/content.js";
import Contact from "../Contact.jsx";

export function ContactPage({ t, lang }) {
  /* Bu sayfada bolum basligi ayni zamanda sayfanin tek h1 i. */
  return <Contact t={t} lang={lang} id={sectionIds.contact} className="section-below-header" headingLevel="h1" />;
}
