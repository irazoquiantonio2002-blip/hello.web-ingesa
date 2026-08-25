const WHATSAPP_NUMBER = "529513626643";

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initReveal();
  initMarquee();
  initStats();
  initHeroCanvas();
  initWhatsAppForm();
  setFooterYear();
});

function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("is-hidden");
    }, 450);
  });
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mob-menu");

  if (!navbar) return;

  const syncScrollState = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncScrollState();
  window.addEventListener("scroll", syncScrollState, { passive: true });

  if (!hamburger || !mobileMenu) return;

  const closeMenu = () => {
    hamburger.classList.remove("is-active");
    mobileMenu.classList.remove("is-open");
    navbar.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
  };

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    hamburger.classList.toggle("is-active", isOpen);
    navbar.classList.toggle("menu-open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initMarquee() {
  const marquee = document.getElementById("marquee");
  if (!marquee) return;

  const crops = [
    "Aguacate Hass",
    "Durazno",
    "Limón",
    "Naranja",
    "Manzana",
    "Mango petacón y ataúlfo",
    "Peras",
    "Café Sarchimor",
    "Jitomate",
    "Cebolla",
    "Chile"
  ];

  const items = [...crops, ...crops].map((crop) => `<span>${crop}</span>`).join("");
  marquee.innerHTML = items;
}

function initStats() {
  const stats = document.querySelectorAll(".stat-num");
  if (!stats.length) return;

  const animateNumber = (node) => {
    const target = Number(node.dataset.count || "0");
    const suffix = node.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      node.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateNumber(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let animationFrame = null;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const seedParticles = () => {
    particles.length = 0;
    const total = Math.min(74, Math.max(32, Math.floor(width / 20)));

    for (let i = 0; i < total; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 0.8,
        speed: Math.random() * 0.35 + 0.12,
        drift: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.34 + 0.1
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += particle.drift;

      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = Math.random() * width;
      }

      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(247, 198, 95, ${particle.alpha})`;
      ctx.ellipse(
        particle.x,
        particle.y,
        particle.size * 1.7,
        particle.size,
        Math.PI / 5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    animationFrame = requestAnimationFrame(draw);
  };

  const boot = () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    resize();
    seedParticles();
    draw();
  };

  boot();
  window.addEventListener("resize", boot);
}

function initWhatsAppForm() {
  const form = document.getElementById("wa-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("f-name");
    const interest = document.getElementById("f-interest");
    const message = document.getElementById("f-msg");

    if (!name.value.trim() || !message.value.trim()) {
      [name, message].forEach((field) => {
        if (!field.value.trim()) field.focus();
      });
      form.reportValidity();
      return;
    }

    const text = [
      "Hola, visité el sitio web de INGESA y quiero solicitar una cotización.",
      `Nombre: ${name.value.trim()}`,
      `Interés: ${interest.value}`,
      `Detalle: ${message.value.trim()}`
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
  });
}

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}
