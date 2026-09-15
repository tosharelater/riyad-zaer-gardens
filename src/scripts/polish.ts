export function initReveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!nodes.length || !('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  nodes.forEach((n) => io.observe(n));
}

export function initParallax() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    hero.classList.add('hero--static');
    return;
  }

  const poster = hero.querySelector<HTMLImageElement>('.hero-poster, .hero-kb img, [data-parallax]');
  const enableMotion = () => {
    hero.classList.add('hero--cinematic');
  };

  // Poster first: start slow Ken Burns / sweeps only after LCP image is ready
  if (poster) {
    if (poster.complete && poster.naturalWidth > 0) {
      requestAnimationFrame(enableMotion);
    } else {
      poster.addEventListener('load', () => requestAnimationFrame(enableMotion), { once: true });
      poster.addEventListener('error', enableMotion, { once: true });
    }
  } else {
    enableMotion();
  }

  const layers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-parallax-layer]')
  );
  if (!layers.length) {
    const legacy = document.querySelector<HTMLElement>('[data-parallax]');
    if (legacy) layers.push(legacy);
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const heroH = hero.offsetHeight || 1;
      const progress = Math.min(Math.max(y / heroH, 0), 1);

      layers.forEach((el) => {
        const speed = Number(el.dataset.speed || '0.22');
        const drift = Math.min(y * speed, 140);
        const scale = Number(el.dataset.scale || '1.12');
        el.style.setProperty('--px', `${drift}px`);
        el.style.setProperty('--ps', String(scale + progress * 0.04));
      });

      hero.style.setProperty('--scroll-p', String(progress));
      ticking = false;
    });
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initHeaderScroll() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
