(() => {
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelectorAll(".nav__links a");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );

  // Animated stat counters
  const stats = document.querySelectorAll(".stat[data-count]");
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = Math.floor(ease(t) * target);
      el.textContent = v.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    stats.forEach((s) => io.observe(s));
  } else {
    stats.forEach(animate);
  }

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
