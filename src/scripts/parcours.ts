const CHAPTERS = ['arrive', 'live', 'choose', 'trust', 'talk'] as const;

export function initParcoursSpy() {
  const sections = CHAPTERS.map((id) => document.getElementById(id)).filter(
    (n): n is HTMLElement => !!n
  );
  if (!sections.length) return;

  const setActive = (id: string) => {
    document.querySelectorAll<HTMLElement>('[data-chapter]').forEach((el) => {
      const on = el.dataset.chapter === id;
      el.classList.toggle('is-current', on);
      if (el.tagName === 'A') {
        if (on) el.setAttribute('aria-current', 'location');
        else el.removeAttribute('aria-current');
      }
    });
  };

  if (!('IntersectionObserver' in window)) {
    setActive('arrive');
    return;
  }

  const ratios = new Map<string, number>();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
      });
      let best = 'arrive';
      let bestR = 0;
      ratios.forEach((r, id) => {
        if (r > bestR) {
          bestR = r;
          best = id;
        }
      });
      if (bestR > 0) setActive(best);
    },
    { threshold: [0.15, 0.35, 0.55, 0.75], rootMargin: '-12% 0px -35% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}
