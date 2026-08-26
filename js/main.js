const WHATSAPP_NUMBER = "529513626643";

const DETAIL_PLACEHOLDERS = {
  "Aguacate Hass (Nutrición y Manejo)": "Ej. 250 árboles de 1 a 3 años, requiero plan de nutrición para amarre de fruto...",
  "Café (Sanidad y Vivero)": "Ej. 1.5 hectáreas, problemas con plagas y deficiencia nutricional...",
  "Plántulas de Jitomate": "Ej. Cotización de 3,000 plántulas para trasplante en octubre...",
  "Invernaderos (Construcción o Mantenimiento)": "Ej. Cambio de plástico térmico y mallas en estructura de 1,000 m²...",
  "Asesoría Integral / Diagnóstico General": "Ej. Cuéntanos brevemente tu cultivo, superficie y necesidad principal..."
};

const WHATSAPP_TEMPLATES = {
  "Aguacate Hass (Nutrición y Manejo)": {
    intro: "¡Hola, equipo de INGESA! Solicito asesoría técnica para mi huerta de aguacate Hass.",
    detailLabel: "Número de árboles / Hectáreas",
    closing: "Quedo a la espera de su respuesta."
  },
  "Café (Sanidad y Vivero)": {
    intro: "¡Hola, equipo de INGESA! Me interesa asistencia técnica para cultivo de café.",
    detailLabel: "Número de plantas / Superficie",
    closing: "Agradezco su atención."
  },
  "Plántulas de Jitomate": {
    intro: "¡Hola, equipo de INGESA! Busco cotizar plántula e insumos para jitomate.",
    detailLabel: "Superficie / Densidad",
    closing: "Quedo atento a la cotización."
  },
  "Invernaderos (Construcción o Mantenimiento)": {
    intro: "¡Hola, equipo de INGESA! Solicito cotización para proyecto de invernadero.",
    detailLabel: "Medidas aproximadas",
    closing: "Espero su orientación técnica, gracias."
  },
  "Asesoría Integral / Diagnóstico General": {
    intro: "¡Hola, equipo de INGESA! Me interesa recibir información y cotización para mi proyecto agrícola.",
    detailLabel: "Cultivo / Proyecto",
    closing: "Quedo atento a su respuesta, gracias."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initReveal();
  initMarquee();
  initStats();
  initHeroCanvas();
  initWhatsAppForm();
  initGallery();
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

  const name = document.getElementById("f-name");
  const phone = document.getElementById("f-phone");
  const location = document.getElementById("f-location");
  const interest = document.getElementById("f-interest");
  const detail = document.getElementById("f-detail");
  const message = document.getElementById("f-msg");

  const syncDetailPlaceholder = () => {
    if (!interest || !detail) return;
    detail.placeholder = DETAIL_PLACEHOLDERS[interest.value] || "";
  };

  if (interest && detail) {
    interest.addEventListener("change", syncDetailPlaceholder);
    syncDetailPlaceholder();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = [name, phone];
    const missing = requiredFields.filter((field) => field && !field.value.trim());

    if (missing.length) {
      missing.forEach((field) => field.focus());
      form.reportValidity();
      return;
    }

    const template = WHATSAPP_TEMPLATES[interest.value] || WHATSAPP_TEMPLATES["Asesoría Integral / Diagnóstico General"];

    const lines = [
      template.intro,
      `Nombre: ${name.value.trim()}`,
      `Teléfono: ${phone.value.trim()}`,
      `Ubicación: ${location.value.trim() || "No especificada"}`
    ];

    if (detail.value.trim()) {
      lines.push(`${template.detailLabel}: ${detail.value.trim()}`);
    }

    if (message.value.trim()) {
      lines.push(`Mensaje: ${message.value.trim()}`);
    }

    lines.push(template.closing);

    const text = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
    syncDetailPlaceholder();
  });
}

function initGallery() {
  const thumbs = Array.from(document.querySelectorAll(".gal-thumb"));
  const lightbox = document.getElementById("lightbox");
  if (!thumbs.length || !lightbox) return;

  const lbImg = lightbox.querySelector(".lb-img");
  const btnClose = lightbox.querySelector(".lb-close");
  const btnPrev = lightbox.querySelector(".lb-prev");
  const btnNext = lightbox.querySelector(".lb-next");

  let activeGroup = [];
  let activeIndex = 0;

  const show = () => {
    const thumb = activeGroup[activeIndex];
    if (!thumb) return;
    lbImg.src = thumb.dataset.full;
    lbImg.alt = thumb.querySelector("img").alt;
  };

  const open = (groupThumbs, index) => {
    activeGroup = groupThumbs;
    activeIndex = index;
    show();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    btnClose.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lbImg.src = "";
  };

  const step = (delta) => {
    if (!activeGroup.length) return;
    activeIndex = (activeIndex + delta + activeGroup.length) % activeGroup.length;
    show();
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const group = thumb.closest("[data-gallery]");
      const groupThumbs = group
        ? Array.from(group.querySelectorAll(".gal-thumb"))
        : thumbs;
      open(groupThumbs, groupThumbs.indexOf(thumb));
    });
  });

  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", () => step(-1));
  btnNext.addEventListener("click", () => step(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });
}

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}
