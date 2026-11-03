// Template helpers, available in every EJS template as `helpers.*`.
export default {
  // True when a site.json value is unconfirmed ("TODO", empty, null or undefined).
  isTodo(value) { return value == null || value === "" || String(value).trim().toUpperCase().startsWith("TODO"); },
  // "tel:" link for a phone number, or "" if it is still TODO.
  telHref(phone) { return this.isTodo(phone) ? "" : "tel:" + String(phone).replace(/[^\d+]/g, ""); },
  year: new Date().getFullYear(),
};
