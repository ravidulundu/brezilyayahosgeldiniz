import { company } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function Operations({ t, id }) {
  return (
    <section id={id} className="section operations">
      <div className="container operations-grid">
        <div>
          <p className="eyebrow">{t.nav[3][0]}</p>
          <h2>{t.operationsTitle}</h2>
        </div>
        <article className="operation-card">
          <Icon name="Users" className="gold" />
          <h3>{t.operationsTitle}</h3>
          <p>{t.operationsText}</p>
          <a className="button button-primary" href={company.whatsapp}>
            <Icon name="MessageCircle" />
            {t.ctaPrimary}
          </a>
        </article>
      </div>
    </section>
  );
}
