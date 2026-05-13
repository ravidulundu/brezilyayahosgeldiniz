import { socialLinks } from "../data/content.js";
import Icon from "./Icon.jsx";

export default function SocialLinks({ label }) {
  return (
    <div className="social-links" aria-label={label}>
      {socialLinks.map((item) => (
        <a key={item.name} href={item.url} target="_blank" rel="noreferrer" aria-label={item.name}>
          <Icon name={item.icon} size={20} />
        </a>
      ))}
    </div>
  );
}
