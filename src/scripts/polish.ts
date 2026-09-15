const VIDEO_HOST = '.arrive-media, .live-shot, .live-hero, .explore-cinema';

export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      const el = child as HTMLElement;
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up');
      el.style.setProperty('--reveal-delay', `${i * 95}ms`);
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
    { threshold: 0.06, rootMargin: '0px 0px -4% 0px' }
  );
  all.forEach((n) => io.observe(n));
}

/** Soft Ken Burns fallback on arrive poster when video unavailable / reduced motion */
export function initParallax() {
  const hero = document.querySelector<HTMLElement>('.beat-arrive, .chapter-arrive');
  if (!hero) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    hero.classList.add('hero--static', 'is-poster-only');
    return;
  }

  const video = hero.querySelector<HTMLVideoElement>('[data-chapter-video]');
  if (video) {
    hero.classList.add('hero--static');
    return;
  }

  const poster = hero.querySelector<HTMLImageElement>('.arrive-media img');
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

/**
 * Hero videos: poster-first, preload=none until in view.
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
