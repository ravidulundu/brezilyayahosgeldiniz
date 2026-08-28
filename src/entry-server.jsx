import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "./App.jsx";

export function renderRoute(pathname) {
  return renderToString(
    <StrictMode>
      <App initialPathname={pathname} />
    </StrictMode>,
  );
}
