document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const dropdownItems = document.querySelectorAll(".has-dropdown");
  const dropdownLinks = document.querySelectorAll(".has-dropdown > .nav-link");
  const mobileQuery = window.matchMedia("(max-width: 1023px)");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
    header.classList.toggle("is-open", body.classList.contains("nav-open"));
  };

  const closeMenu = () => {
    body.classList.remove("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const link = item.querySelector(".nav-link");
      if (link) link.setAttribute("aria-expanded", "false");
    });
    setHeaderState();
  };

  const openMenu = () => {
    body.classList.add("nav-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
    setHeaderState();
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (menuToggle && navPanel) {
    menuToggle.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  dropdownLinks.forEach((link) => {
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", (event) => {
      if (!mobileQuery.matches) return;

      event.preventDefault();
      const item = link.closest(".has-dropdown");
      if (!item) return;

      const isOpen = item.classList.contains("is-open");
      dropdownItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        const otherLink = otherItem.querySelector(".nav-link");
        if (otherLink) otherLink.setAttribute("aria-expanded", "false");
      });

      item.classList.toggle("is-open", !isOpen);
      link.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.querySelectorAll(".nav-panel a:not(.nav-link), .nav-panel a.nav-link:not(.dropdown-toggle)").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileQuery.matches) closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      closeMenu();
    }
  });

  mobileQuery.addEventListener("change", () => {
    closeMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      if (mobileQuery.matches) closeMenu();
    });
  });

  const animatedElements = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  }
});
