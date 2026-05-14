import { company } from "../data/content.js";
import Icon from "./Icon.jsx";

const FEATURES = [
  ["Globe2", "operationsF1"],
  ["Languages", "operationsF2"],
  ["ShieldCheck", "operationsF3"],
];

export default function Operations({ t, id }) {
  return (
    <section id={id} className="section operations">
      <div className="container operations-grid">
        <div className="operations-copy">
          <p className="eyebrow">{t.operationsEyebrow}</p>
          <h2>{t.operationsTitle}</h2>
          <p className="operations-lead">{t.operationsText}</p>
        </div>
        <article className="operation-card">
          <Icon name="Users" className="gold" size={32} />
          <h3>{t.operationsCardTitle}</h3>
          <ul className="operation-features">
            {FEATURES.map(([icon, key]) => (
              <li key={key}>
                <Icon name={icon} size={15} />
                <span>{t[key]}</span>
              </li>
            ))}
          </ul>
          <a className="button button-primary" href={company.whatsapp} target="_blank" rel="noreferrer">
            <Icon name="MessageCircle" />
            {t.ctaPrimary}
          </a>
        </article>
      </div>
    </section>
  );
}
