// Video's staan op Cloudflare R2 (via een custom domain als CDN), niet op
// Vercel: dat scheelt bandbreedte en houdt de repo klein.
//
// VITE_VIDEO_BASE_URL wijst naar de R2-bucket, bv. https://media.tvm-productions.nl
// Zonder die variabele (lokaal ontwikkelen) worden de bestanden uit
// public/videos/ geladen, zodat alles blijft werken zonder R2-toegang.
const VIDEO_BASE_URL = (import.meta.env.VITE_VIDEO_BASE_URL ?? "").replace(/\/+$/, "");

export function videoUrl(path) {
  return `${VIDEO_BASE_URL}${path}`;
}
