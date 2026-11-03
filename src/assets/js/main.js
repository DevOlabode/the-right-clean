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
});
