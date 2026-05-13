import { company, routes } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Contact({ t, id }) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `${t.formLabels[0]}: ${data.get("name") ?? ""}`,
      `${t.formLabels[1]}: ${data.get("city") ?? ""}`,
      `${t.formLabels[2]}: ${data.get("phone") ?? ""}`,
      `${t.formLabels[3]}: ${data.get("message") ?? ""}`,
      `LGPD consent: ${data.get("lgpdConsent") === "on" ? "yes" : "no"}`,
    ];
    const subject = encodeURIComponent(`${company.name} - ${t.contactTitle}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${company.emails[0]}?subject=${subject}&body=${body}`;
  }

  return (
    <section id={id} className="section contact-section">
      <div className="container contact-grid">
        <div className="contact-panel">
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <dl>
            <ContactRow label={t.tourism} value={company.addressTourism} />
            <ContactRow label={t.rental} value={company.addressRental} />
            <ContactRow label={t.phone} value={company.phones.join(" | ")} />
            <ContactRow label={t.email} value={company.emails.join(" | ")} />
          </dl>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {t.formLabels.map((label, index) => (
            <label key={label}>
              <span>{label}</span>
              {index === 3 ? (
                <textarea name="message" rows="5" required />
              ) : (
                <input name={["name", "city", "phone"][index]} required />
              )}
            </label>
          ))}
          <label className="consent">
            <input type="checkbox" name="lgpdConsent" required />
            <span>
              {t.consentLabel}{" "}
              <a href={routes.privacy} target="_blank" rel="noreferrer">
                {t.privacy}
              </a>
            </span>
          </label>
          <p className="notice">{t.legalNotice}</p>
          <div className="form-actions">
            <button className="button button-dark" type="submit">
              <Icon name="Send" />
              {t.submitLabel}
            </button>
            <a className="button button-light" href={company.whatsapp}>
              <Icon name="MessageCircle" />
              {t.whatsappLabel}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
