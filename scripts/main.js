// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Sidebar toggle (mobile)
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    sidebarToggle.setAttribute("aria-expanded", isOpen);
    sidebarToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
  // Close sidebar when a nav link is clicked (for in-page anchors)
  document.querySelectorAll(".sidebar-links a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        sidebar.classList.remove("open");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.setAttribute("aria-label", "Open menu");
      }
    });
  });
}

// Smooth scroll for in-page links
const prefersReducedMotion =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
});
