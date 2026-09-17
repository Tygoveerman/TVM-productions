import { renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";
import { getMeta } from "./site/seo.js";

export function render(path) {
  const html = renderToStaticMarkup(<App path={path} />);
  const meta = getMeta(path);
  return { html, meta };
}

export { getAllRoutes, getSitemapRoutes, SITE_URL } from "./site/seo.js";
