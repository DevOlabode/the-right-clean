import { readFileSync } from "node:fs";

const iconCache = new Map();

// Template helpers, available in every EJS template as `helpers.*`.
export default {
  // True when a site.json value is unconfirmed ("TODO", empty, null or undefined).
  isTodo(value) { return value == null || value === "" || String(value).trim().toUpperCase().startsWith("TODO"); },
  // "tel:" link for a phone number, or "" if it is still TODO.
  // 10-digit North American numbers get a +1 prefix.
  telHref(phone) {
    if (this.isTodo(phone)) return "";
    const digits = String(phone).replace(/[^\d+]/g, "");
    return "tel:" + (/^\d{10}$/.test(digits) ? "+1" + digits : digits);
  },
  // JSON-LD for the Home page. Only confirmed (non-TODO) fields are included.
  localBusinessSchema(site, services = []) {
    const known = (v) => !this.isTodo(v);
    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": site.url + "/#business",
      name: site.name,
      slogan: site.tagline,
      url: site.url + "/",
      logo: site.url + "/assets/icons/icon-512.png",
      image: site.url + "/assets/images/og-image.jpg",
      founder: { "@type": "Person", name: site.owner },
      sameAs: Object.values(site.socials || {}),
      knowsAbout: services.map((s) => s.title),
    };
    if (known(site.phone)) schema.telephone = site.phone;
    if (known(site.email) && site.emailConfirmed) schema.email = site.email;
    if (known(site.serviceArea)) schema.areaServed = site.serviceArea;
    if (known(site.openingHoursSchema)) schema.openingHours = site.openingHoursSchema;
    return schema;
  },
  // Inline SVG from the bootstrap-icons package (no icon font to download).
  icon(name, extraClass = "") {
    if (!iconCache.has(name)) {
      const svg = readFileSync(new URL(`../../node_modules/bootstrap-icons/icons/${name}.svg`, import.meta.url), "utf8");
      iconCache.set(name, svg.replace(/\s(width|height|class)="[^"]*"/g, ""));
    }
    return iconCache.get(name).replace("<svg", `<svg class="bi bi-${name}${extraClass ? " " + extraClass : ""}" aria-hidden="true" focusable="false"`);
  },
  year: new Date().getFullYear(),
};
