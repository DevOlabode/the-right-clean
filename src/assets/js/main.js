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
  initReveal();
});

// Fade sections in as they scroll into view. Content is visible without JS (see .js in head.ejs).
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach((el) => io.observe(el));
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
