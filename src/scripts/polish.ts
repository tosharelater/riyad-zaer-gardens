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

/** Soft Ken Burns on hero only — no parallax layers / sparkle */
export function initParallax() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    hero.classList.add('hero--static');
    return;
  }

  const poster = hero.querySelector<HTMLImageElement>('.hero-poster, .hero-kb img');
  const enableMotion = () => {
    hero.classList.add('hero--cinematic');
  };

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
