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
  year: new Date().getFullYear(),
};
