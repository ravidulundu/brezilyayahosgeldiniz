import { company, routes } from "../data/content.js";
import Icon from "./Icon.jsx";

const INFO_ROWS = [
  { key: "tourism", icon: "MapPin", field: "addressTourism", subtitle: "Eker Agencia de Viagens e Organizacoes de Eventos Ltda / A La Turca Travel & MICE", phone: company.phones[0], email: "alaturca@alaturca.com.br" },
  { key: "rental", icon: "Car", field: "addressRental", subtitle: "Eker Locacao de Veiculos e Servico de Transporte de Passageiros Ltda / Kirmizibeyaz do Brasil Rent a Car & Shuttle", phone: company.phones[1], email: "eker@eker.com.br" },
];

export default function Contact({ t, id, className = "" }) {
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

  const infoValues = {
    addressTourism: company.addressTourism,
    addressRental: company.addressRental,
  };

  return (
    <section id={id} className={`section contact-section ${className}`.trim()}>
      <div className="container contact-grid">
        <div className="contact-panel">
          <div className="contact-panel-dots" aria-hidden="true" />
          <div className="contact-panel-inner">
            <div className="contact-accent-line" />
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <dl className="contact-info-list">
              {INFO_ROWS.map(({ key, icon, field, subtitle, phone, email }) => (
                <div className="contact-info-row" key={key}>
                  <div className="contact-info-icon">
                    <Icon name={icon} size={15} />
                  </div>
                  <div>
                    <dt>{t[key]}</dt>
                    <dd>{infoValues[field]}</dd>
                    {phone && <dd className="contact-info-extra"><Icon name="Phone" size={11} />{phone}</dd>}
                    {email && <dd className="contact-info-extra"><Icon name="Mail" size={11} />{email}</dd>}
                    {subtitle && <dd className="contact-info-subtitle">{subtitle}</dd>}
                  </div>
                </div>
              ))}
            </dl>
            <div className="contact-iata-badge">
              <Icon name="ShieldCheck" size={13} />
              <span>{company.iata}</span>
            </div>
          </div>
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
            <a className="button button-light" href={company.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="MessageCircle" />
              {t.whatsappLabel}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
