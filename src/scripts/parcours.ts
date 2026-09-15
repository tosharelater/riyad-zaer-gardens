const CHAPTERS = ['arrive', 'live', 'choose', 'trust', 'talk'] as const;

export function initParcoursSpy() {
  const sections = CHAPTERS.map((id) => document.getElementById(id)).filter(
    (n): n is HTMLElement => !!n
  );
  if (!sections.length) return;

  let active = 'arrive';
  let raf = 0;

  const setActive = (id: string) => {
    if (id === active) return;
    active = id;
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

  const pickBest = () => {
    raf = 0;
    let best = active;
    let bestR = -1;
    // Prefer chapters nearer the upper third of the viewport when ratios tie
    ratios.forEach((r, id) => {
      if (r > bestR + 0.02) {
        bestR = r;
        best = id;
      }
    });
    if (bestR > 0.08) setActive(best);
  };

  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(pickBest);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
      });
      schedule();
    },
    {
      threshold: [0.08, 0.18, 0.28, 0.4, 0.55, 0.7, 0.85],
      rootMargin: '-10% 0px -40% 0px',
    }
  );
  sections.forEach((s) => io.observe(s));
  setActive('arrive');
}
