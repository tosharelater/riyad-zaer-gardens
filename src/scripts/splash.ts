const STORAGE_KEY = 'rzg-splash-seen';

/** Hold splash fully visible for exactly HOLD_MS, then fade out. */
const HOLD_MS = 3000;
const HOLD_REDUCED_MS = 1000;
const FADE_REMOVE_BUFFER_MS = 500;

/** Editorial splash: exact 3000ms hold (1s max if prefers-reduced-motion), then fade. */
export function initSplash() {
  const root = document.getElementById('rzg-splash');
  if (!root) return;

  let seen = false;
  try {
    seen = sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    seen = false;
  }

  if (seen || document.documentElement.classList.contains('rzg-splash-done')) {
    cleanup(root);
    return;
  }

  document.documentElement.classList.add('rzg-splash-pending');
  document.body.classList.add('rzg-splash-open');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hold = reduced ? HOLD_REDUCED_MS : HOLD_MS;

  if (reduced) {
    root.classList.add('is-static');
  } else {
    // Double rAF so initial styles paint before the animate class
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.add('is-animate');
      });
    });
  }

  window.setTimeout(() => dismiss(root), hold);
}

function dismiss(root: HTMLElement) {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* private mode — still dismiss */
  }

  root.classList.add('is-out');
  root.style.pointerEvents = 'none';
  document.body.classList.remove('rzg-splash-open');
  document.documentElement.classList.remove('rzg-splash-pending');
  document.documentElement.classList.add('rzg-splash-done');

  const remove = () => {
    if (root.isConnected) root.remove();
  };

  root.addEventListener('transitionend', (e) => {
    if (e.target === root && e.propertyName === 'opacity') remove();
  });
  window.setTimeout(remove, FADE_REMOVE_BUFFER_MS);
}

function cleanup(root: HTMLElement) {
  document.body.classList.remove('rzg-splash-open');
  document.documentElement.classList.remove('rzg-splash-pending');
  document.documentElement.classList.add('rzg-splash-done');
  root.style.pointerEvents = 'none';
  root.remove();
}
