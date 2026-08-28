import { StrictMode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import App from "./App.jsx";

export function renderRoute(pathname) {
  return renderToStaticMarkup(
    <StrictMode>
      <App initialPathname={pathname} />
    </StrictMode>,
  );
}
