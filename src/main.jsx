import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

const mo = new MutationObserver(() => {
  document.querySelectorAll(".reveal:not(.revealed)").forEach((el) => io.observe(el));
});

mo.observe(document.documentElement, { childList: true, subtree: true });

document.querySelectorAll(".reveal:not(.revealed)").forEach((el) => io.observe(el));

if ("modelContext" in navigator) {
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "get_site_info",
        description: "Get information about Brezilya'ya Hoş Geldiniz — Turkish-Brazilian tourism and VIP transfer services by GRUPOEKER",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          company: "GRUPOEKER",
          brand: "Brezilya'ya Hoş Geldiniz",
          founded: 2010,
          location: "Santos / São Paulo, Brazil",
          iata: "96120975",
          languages: ["Turkish", "Portuguese", "English", "Spanish"],
          services: [
            "Tourism and Flight Reservations",
            "Multilingual Guiding and Field Coordination",
            "MICE, B2B and Trade Fair Operations",
            "VIP Transfer and Car Rental",
          ],
          website: "https://www.brezilyayahosgeldiniz.com",
        }),
      },
      {
        name: "get_destinations",
        description: "Get list of Brazilian destinations served",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          destinations: [
            { name: "Rio de Janeiro", slug: "/Rio-de-Janeiro/" },
            { name: "São Paulo", slug: "/Sao-Paulo/" },
            { name: "Brasília", slug: "/Brasilia/" },
            { name: "Salvador", slug: "/Salvador/" },
            { name: "Fortaleza", slug: "/Fortaleza/" },
            { name: "Foz do Iguaçu", slug: "/Foz-do-Iguacu/" },
            { name: "Vitória", slug: "/Vitoria/" },
            { name: "Maceió", slug: "/Maceio/" },
            { name: "Florianópolis", slug: "/Florianopolis/" },
          ],
        }),
      },
      {
        name: "get_contact",
        description: "Get contact information for booking, tours and transfers",
        inputSchema: { type: "object", properties: {} },
        execute: async () => ({
          whatsapp: "https://wa.me/5511959590530",
          phone: ["+55 11 95959-0530", "+55 13 99132-3038"],
          email: "eker@eker.com.br",
          tourismAddress: "Praça Visc. de Mauá, 42 – Sala 93, Santos – SP, Brazil",
          contactPage: "https://www.brezilyayahosgeldiniz.com/iletisim/",
        }),
      },
    ],
  });
}
