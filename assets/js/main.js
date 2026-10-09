const WHATSAPP_NUMBER = "56940957863";

function initMainScript() {
  const waWidget = document.getElementById("waWidget");
  const waFab = document.getElementById("waFab");
  const waPanel = document.getElementById("waPanel");
  const waClose = document.getElementById("waClose");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  /* ============ WHATSAPP WIDGET ============ */
  function setWhatsAppOpen(open) {
    if (!waWidget) return;
    waWidget.classList.toggle("is-open", open);
    if (waFab) waFab.setAttribute("aria-expanded", String(open));
    if (waPanel) waPanel.setAttribute("aria-hidden", String(!open));
    if (open && waClose) {
      requestAnimationFrame(() => {
        try { waClose.focus({ preventScroll: true }); } catch(e) { waClose.focus(); }
      });
    }
  }

  if (waFab) {
    waFab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setWhatsAppOpen(!waWidget.classList.contains("is-open"));
    });
  }
  if (waClose) {
    waClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      setWhatsAppOpen(false);
      if (waFab) waFab.focus();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && waWidget && waWidget.classList.contains("is-open")) {
      setWhatsAppOpen(false);
      if (waFab) waFab.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      waWidget &&
      waWidget.classList.contains("is-open") &&
      !waWidget.contains(event.target) &&
      !event.target.closest("[data-open-chat]")
    ) {
      setWhatsAppOpen(false);
    }
  });

  /* ============ MENÚ HAMBURGUESA ============ */
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = !mainNav.classList.contains("is-open");
      mainNav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  /* ============ ANCLAS INTERNAS CON FALLBACK MANUAL ============ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

      try {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      } catch (err) {
        window.scrollTo(0, targetTop);
      }

      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });

  /* ============ AÑO DINÁMICO ============ */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============ FALLBACK PARA iOS ============ */
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.querySelectorAll('a, button, summary, .offer-cta, .faq-list summary').forEach((el) => {
      el.style.cursor = "pointer";
    });
  }
}
