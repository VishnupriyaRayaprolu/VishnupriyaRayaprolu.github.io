// Theme toggle (dark/light mode)
const THEME_KEY = "portfolio-theme";

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY);
}

function setStoredTheme(theme) {
  if (theme) localStorage.setItem(THEME_KEY, theme);
  else localStorage.removeItem(THEME_KEY);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

function initTheme() {
  const stored = getStoredTheme();
  const theme = stored || getSystemTheme();
  applyTheme(theme);
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  setStoredTheme(next);
  updateThemeToggleLabel();
}

function updateThemeToggleLabel() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const isDark = document.documentElement.classList.contains("dark");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
  updateThemeToggleLabel();
}

initTheme();

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
    if (!href) return;

    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      return;
    }

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    // About/hero: scroll to top of page
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      return;
    }

    // Scroll so the section label + title align to the top of the viewport
    const label = target.querySelector(".section-label");
    const heading = target.querySelector("h1, h2");
    const scrollTarget = label || heading || target;
    scrollTarget.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

// Active section highlighting in sidebar
const sections = ["hero", "skills", "projects", "experience", "education", "contact"];
const sidebarLinks = document.querySelectorAll('.sidebar-links a[href^="#"]');

function updateActiveLink() {
  const scrollY = window.scrollY;
  let activeId = "hero";

  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i]);
    if (el && el.offsetTop <= scrollY + 150) {
      activeId = sections[i];
      break;
    }
  }

  sidebarLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const id = href ? href.slice(1) : "";
    link.classList.toggle("active", id === activeId);
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Copy email to clipboard
const copyBtn = document.getElementById("copy-email");
const emailEl = document.getElementById("contact-email");
if (copyBtn && emailEl) {
  copyBtn.addEventListener("click", async () => {
    const email = emailEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 2000);
    } catch (err) {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => {
        copyBtn.textContent = "Copy email";
      }, 2000);
    }
  });
}
