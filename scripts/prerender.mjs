// Runs after both the client build (`vite build`) and the SSR build
// (`vite build --ssr src/entry-server.jsx --outDir dist-ssr`).
// Renders every known route to static HTML so crawlers that don't execute
// JS (and the very first paint for everyone else) get real per-page
// <title>/description/canonical/OG/JSON-LD plus fully rendered content.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url)) + "/..";
const distDir = join(root, "dist");
const ssrEntry = join(root, "dist-ssr", "entry-server.js");

const { render, getAllRoutes } = await import(ssrEntry);

const template = readFileSync(join(distDir, "index.html"), "utf-8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageHtml(route) {
  const { html, meta } = render(route);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  const image = escapeHtml(meta.image);

  return template
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${image}" />`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

function writeRoute(route) {
  const outPath = route === "/" ? join(distDir, "index.html") : join(distDir, route.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, pageHtml(route));
}

const routes = getAllRoutes();
for (const route of routes) writeRoute(route);

// Real 404 page (see vercel.json for the routing that serves this with a 404 status).
writeFileSync(join(distDir, "404.html"), pageHtml("/__unknown__"));

const SITE_URL = "https://tvmproductions.nl";
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n")}\n</urlset>\n`;
writeFileSync(join(distDir, "sitemap.xml"), sitemap);

if (existsSync(join(root, "dist-ssr"))) rmSync(join(root, "dist-ssr"), { recursive: true, force: true });

console.log(`Prerendered ${routes.length} routes + 404.html + sitemap.xml`);
