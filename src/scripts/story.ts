/** Cadre de vie — sticky fullscreen scroll storytelling */
export function initStoryScroll() {
  const root = document.querySelector<HTMLElement>('[data-story]');
  if (!root) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    root.classList.add('is-reduced');
    root.querySelectorAll<HTMLElement>('[data-story-beat]').forEach((beat) => {
      beat.classList.add('is-complete');
      const media = beat.querySelector<HTMLElement>('[data-story-media]');
      const copy = beat.querySelector<HTMLElement>('[data-story-copy]');
      if (media) {
        media.style.setProperty('--story-scale', '1');
        media.style.setProperty('--story-opacity', '1');
      }
      if (copy) {
        copy.style.setProperty('--copy-opacity', '1');
        copy.style.setProperty('--copy-y', '0px');
      }
    });
    return;
  }

  const beats = Array.from(root.querySelectorAll<HTMLElement>('[data-story-beat]'));
  if (!beats.length) return;

  let ticking = false;

  const update = () => {
    const view = window.innerHeight || 1;
    beats.forEach((beat) => {
      const rect = beat.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - view);
      // Progress 0 when sticky engages (beat top at viewport top), 1 when leaving
      const raw = -rect.top / scrollable;
      const p = Math.min(1, Math.max(0, raw));

      const media = beat.querySelector<HTMLElement>('[data-story-media]');
      const copy = beat.querySelector<HTMLElement>('[data-story-copy]');

      // 0–0.45: image grows to full; 0.35–0.7: copy fades in; hold after
      const scaleT = Math.min(1, p / 0.42);
      const scale = 0.78 + scaleT * 0.22; // 0.78 → 1
      const mediaOpacity = 0.55 + scaleT * 0.45;

      const copyT = Math.min(1, Math.max(0, (p - 0.38) / 0.32));
      const copyOpacity = copyT;
      const copyY = (1 - copyT) * 28;

      if (media) {
        media.style.setProperty('--story-scale', scale.toFixed(4));
        media.style.setProperty('--story-opacity', mediaOpacity.toFixed(4));
      }
      if (copy) {
        copy.style.setProperty('--copy-opacity', copyOpacity.toFixed(4));
        copy.style.setProperty('--copy-y', `${copyY.toFixed(1)}px`);
      }

      beat.classList.toggle('is-active', p > 0.02 && p < 0.98);
      beat.classList.toggle('is-complete', p >= 0.7);
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
