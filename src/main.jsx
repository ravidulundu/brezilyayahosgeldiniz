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
