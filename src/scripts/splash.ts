const STORAGE_KEY = 'rzg-splash-seen';

/** Hold splash fully visible for exactly HOLD_MS, then fade out. */
const HOLD_MS = 3000;
const HOLD_REDUCED_MS = 1000;
const FADE_REMOVE_BUFFER_MS = 500;

function hasSeenSplash(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function markSplashSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* private mode — still dismiss */
  }
}

/** Editorial splash: exact 3000ms hold (1s max if prefers-reduced-motion), then fade. */
export function initSplash() {
  const root = document.getElementById('rzg-splash');
  const html = document.documentElement;
  const alreadyDone = html.classList.contains('rzg-splash-done') || hasSeenSplash();

  if (alreadyDone) {
    html.classList.remove('rzg-splash-pending');
    html.classList.add('rzg-splash-done');
    document.body.classList.remove('rzg-splash-open');
    if (root) cleanup(root);
    return;
  }

  if (!root) return;

  html.classList.add('rzg-splash-pending');
  html.classList.remove('rzg-splash-done');
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
  markSplashSeen();

  root.classList.add('is-out');
  root.style.pointerEvents = 'none';
  document.body.classList.remove('rzg-splash-open');
  // Keep html.rzg-splash-pending through the fade so display:none does not kill opacity.

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    document.documentElement.classList.remove('rzg-splash-pending');
    document.documentElement.classList.add('rzg-splash-done');
    if (root.isConnected) root.remove();
  };

  root.addEventListener('transitionend', (e) => {
    if (e.target === root && e.propertyName === 'opacity') finish();
  });
  window.setTimeout(finish, FADE_REMOVE_BUFFER_MS);
}

function cleanup(root: HTMLElement) {
  document.body.classList.remove('rzg-splash-open');
  document.documentElement.classList.remove('rzg-splash-pending');
  document.documentElement.classList.add('rzg-splash-done');
  root.style.pointerEvents = 'none';
  root.remove();
}
