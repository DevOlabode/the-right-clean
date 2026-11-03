// Template helpers, available in every EJS template as `helpers.*`.
export default {
  // True when a site.json value is unconfirmed ("TODO", empty, null or undefined).
  isTodo: (value) => value == null || value === "" || String(value).trim().toUpperCase().startsWith("TODO"),
  year: new Date().getFullYear(),
};
