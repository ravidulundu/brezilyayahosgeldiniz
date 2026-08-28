import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";

const rootElement = document.getElementById("root");
const application = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, application);
} else {
  createRoot(rootElement).render(application);
}

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  const observeReveals = (root) => {
    if (!(root instanceof Element)) return;
    if (root.matches(".reveal:not(.revealed)")) io.observe(root);
    root.querySelectorAll(".reveal:not(.revealed)").forEach((element) => io.observe(element));
  };

  const mo = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(observeReveals);
    }
  });

  mo.observe(document.documentElement, { childList: true, subtree: true });
  observeReveals(document.documentElement);

  window.addEventListener("pagehide", () => {
    mo.disconnect();
    io.disconnect();
  }, { once: true });
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("revealed"));
}

if (typeof navigator.modelContext?.provideContext === "function") {
  Promise.resolve(navigator.modelContext.provideContext({
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
  })).catch(() => {
    // Experimental browser integration must never affect the public site.
  });
}
