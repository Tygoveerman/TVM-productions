import Homepage from "./src/Homepage";
import SitePage from "./src/SitePages";

export default function App({ path } = {}) {
  const current = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  return current === "/" ? <Homepage /> : <SitePage path={current} />;
}
