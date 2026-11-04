// Close the mobile menu after a link is tapped, and shade the header once the page scrolls.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("mainNav");

  nav?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    })
  );

  const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  initQuoteForm();
  initTabs();
  initHours();
});

// "What's included" tabs. Without JS every panel shows.
function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (step) { e.preventDefault(); select(tabs[(i + step + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
    select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
  });
}

// Business hours: highlight today and show "Open now / Closed now", in Edmonton time.
function initHours() {
  const keys = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Edmonton", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(new Date()).map((p) => [p.type, p.value]));
  const today = keys[["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday)];
  const now = `${parts.hour}:${parts.minute}`;

  document.querySelectorAll(`[data-hours-table] tr[data-day="${today}"]`).forEach((tr) => tr.classList.add("is-today"));

  const status = document.querySelector("[data-open-status]");
  if (!status) return;
  const week = JSON.parse(status.dataset.hours); // Monday first: [open, close] or [null, null]
  const idx = (keys.indexOf(today) + 6) % 7;
  const [open, close] = week[idx];
  const isOpen = open && now >= open && now < close;
  const fmt = (t) => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${ap}`; };
  let text;
  if (isOpen) text = `Open now · until ${fmt(close)}`;
  else {
    // next opening
    for (let d = 0; d < 7; d++) {
      const j = (idx + d) % 7, [o] = week[j];
      if (!o || (d === 0 && now >= o)) continue;
      const day = d === 0 ? "today" : d === 1 ? "tomorrow" : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][j];
      text = `Closed now · opens ${day} at ${fmt(o)}`;
      break;
    }
  }
  if (text) { status.textContent = text; status.classList.toggle("is-open", Boolean(isOpen)); }
}

// Quote form enhancements. The form still posts normally without JavaScript.
function initQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;

  // Pre-select a service from /quote/?service=<slug>
  const slug = new URLSearchParams(location.search).get("service");
  const option = slug && form.querySelector(`option[data-slug="${CSS.escape(slug)}"]`);
  if (option) option.selected = true;

  // No past dates (local date in YYYY-MM-DD)
  const date = form.querySelector('input[type="date"]');
  if (date) date.min = new Date().toLocaleDateString("en-CA");

  const summary = document.getElementById("form-errors");
  const button = form.querySelector('button[type="submit"]');
  const label = button.querySelector(".btn-label");
  const idleText = label.textContent;

  // Use our own messages instead of the browser's bubbles
  form.noValidate = true;

  const markField = (el) => {
    if (!el.willValidate) return;
    el.setAttribute("aria-invalid", String(!el.checkValidity()));
  };

  form.addEventListener("submit", (event) => {
    const invalid = [...form.elements].filter((el) => el.willValidate && !el.checkValidity());
    form.classList.add("was-validated");
    [...form.elements].forEach(markField);

    if (invalid.length) {
      event.preventDefault();
      summary.textContent = invalid.length === 1
        ? "Please fix 1 field before sending."
        : `Please fix ${invalid.length} fields before sending.`;
      summary.hidden = false;
      invalid[0].focus();
      return;
    }

    summary.hidden = true;
    button.disabled = true;
    label.textContent = "Sending…";

    // Demo mode (no Web3Forms key yet): don't send anything, just show the thank-you page.
    if (form.dataset.demo) {
      event.preventDefault();
      setTimeout(() => location.assign("/thank-you/"), 700);
    }
  });

  // Update a field's state as soon as the visitor fixes it
  form.addEventListener("input", (e) => form.classList.contains("was-validated") && markField(e.target));
  form.addEventListener("change", (e) => form.classList.contains("was-validated") && markField(e.target));

  // Re-enable the button if the visitor comes back with the Back button
  window.addEventListener("pageshow", () => {
    button.disabled = false;
    label.textContent = idleText;
  });
}
