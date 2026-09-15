const VIDEO_HOST = '.arrive-media, .live-shot, .live-hero, .live-depth, .explore-cinema';

export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      const el = child as HTMLElement;
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up');
      el.style.setProperty('--reveal-delay', `${i * 110}ms`);
    });
  });

  const all = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduced || !all.length || !('IntersectionObserver' in window)) {
    all.forEach((n) => n.classList.add('is-in'));
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
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
  );
  all.forEach((n) => io.observe(n));
}

/** Soft Ken Burns on arrive collage when reduced-motion is off */
export function initParallax() {
  const hero = document.querySelector<HTMLElement>('.beat-arrive');
  if (!hero) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    hero.classList.add('hero--static', 'is-poster-only');
    return;
  }

  hero.classList.add('hero--cinematic');

  const layers = hero.querySelectorAll<HTMLElement>('[data-arrive-depth]');
  if (!layers.length) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, 1 - rect.bottom / (view + rect.height)));
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.arriveDepth || 0.2);
        layer.style.transform = `translate3d(0, ${progress * depth * -48}px, 0)`;
      });
      ticking = false;
    });
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/** Cadre de vie — images move slower than copy (real scroll parallax) */
export function initLiveParallax() {
  const section = document.querySelector<HTMLElement>('#live');
  if (!section) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    section.classList.add('is-parallax-off');
    return;
  }

  const targets = section.querySelectorAll<HTMLElement>('[data-live-parallax]');
  if (!targets.length) return;

  let ticking = false;
  const update = () => {
    const view = window.innerHeight || 1;
    targets.forEach((el) => {
      const speed = Number(el.dataset.liveParallax || 0.18);
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const offset = (mid - view / 2) * speed;
      el.style.setProperty('--live-y', `${offset.toFixed(2)}px`);
    });
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

export function initHeaderScroll() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  if (header.classList.contains('site-header--solid')) {
    header.classList.add('is-scrolled');
    return;
  }
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/** Mobile nav burger — toggles the full-links panel below the header. */
export function initMobileNav() {
  const burger = document.querySelector<HTMLButtonElement>('[data-nav-burger]');
  const panel = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (!burger || !panel) return;

  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('rzg-nav-open');
  };

  const open = () => {
    burger.setAttribute('aria-expanded', 'true');
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('rzg-nav-open');
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) close();
  });
}

/**
 * Chapter videos: poster-first, preload=none until in view.
 * prefers-reduced-motion → poster only.
 */
export function initChapterVideos() {
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('[data-chapter-video]'));
  if (!videos.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    videos.forEach((v) => {
      v.pause();
      v.removeAttribute('src');
      v.querySelectorAll('source').forEach((s) => s.remove());
      v.load();
      v.classList.add('is-poster-only');
      v.closest(VIDEO_HOST)?.classList.add('is-poster-only');
    });
    return;
  }

  const playSafe = async (v: HTMLVideoElement) => {
    try {
      v.muted = true;
      await v.play();
      v.classList.add('is-playing');
      v.closest(VIDEO_HOST)?.classList.add('is-video-playing');
    } catch {
      v.classList.remove('is-playing');
    }
  };

  const ensureSources = (v: HTMLVideoElement) => {
    if (v.dataset.armed === '1') return;
    v.dataset.armed = '1';
    v.load();
  };

  if (!('IntersectionObserver' in window)) {
    videos.forEach((v) => {
      ensureSources(v);
      playSafe(v);
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && e.intersectionRatio > 0.2) {
          ensureSources(v);
          playSafe(v);
        } else {
          v.pause();
          v.classList.remove('is-playing');
          v.closest(VIDEO_HOST)?.classList.remove('is-video-playing');
        }
      });
    },
    { threshold: [0, 0.2, 0.45], rootMargin: '8% 0px 8% 0px' }
  );
  videos.forEach((v) => io.observe(v));
}

/** Premium FAQ accordion (supports multiple roots) */
export function initFaq() {
  document.querySelectorAll<HTMLElement>('[data-faq]').forEach((root) => {
    root.querySelectorAll<HTMLButtonElement>('[data-faq-trigger]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest<HTMLElement>('[data-faq-item]');
        if (!item) return;
        const open = item.classList.contains('is-open');
        root.querySelectorAll<HTMLElement>('[data-faq-item]').forEach((other) => {
          other.classList.remove('is-open');
          const t = other.querySelector<HTMLButtonElement>('[data-faq-trigger]');
          const p = other.querySelector<HTMLElement>('[data-faq-panel]');
          t?.setAttribute('aria-expanded', 'false');
          p?.setAttribute('aria-hidden', 'true');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          item.querySelector<HTMLElement>('[data-faq-panel]')?.setAttribute('aria-hidden', 'false');
        }
      });
    });
  });
}
