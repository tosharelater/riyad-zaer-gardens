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
      v.closest('.arrive-media, .live-shot, .live-hero')?.classList.add('is-poster-only');
    });
    return;
  }

  const playSafe = async (v: HTMLVideoElement) => {
    try {
      v.muted = true;
      await v.play();
      v.classList.add('is-playing');
      v.closest('.arrive-media, .live-shot, .live-hero')?.classList.add('is-video-playing');
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
          v.closest('.arrive-media, .live-shot, .live-hero')?.classList.remove('is-video-playing');
        }
      });
    },
    { threshold: [0, 0.2, 0.45], rootMargin: '8% 0px 8% 0px' }
  );
  videos.forEach((v) => io.observe(v));
}
