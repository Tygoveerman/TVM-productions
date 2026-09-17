import { siteGraph } from "./schema.js";

// Eén <script type="application/ld+json"> per pagina met de basisentiteiten
// (bedrijf, Tygo, website) plus wat de pagina zelf toevoegt via `nodes`.
export default function JsonLd({ nodes = [] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph(nodes)) }} />;
}
