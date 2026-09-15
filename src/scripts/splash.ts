const STORAGE_KEY = 'rzg-splash-seen';

/** Editorial splash: ~2.4–3.2s reveal, then fade out and remove from DOM. */
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
    cleanup(root, false);
    return;
  }

  document.documentElement.classList.add('rzg-splash-pending');
  document.body.classList.add('rzg-splash-open');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    root.classList.add('is-static');
    window.setTimeout(() => dismiss(root), 600);
    return;
  }

  // Double rAF so initial styles paint before the animate class
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.add('is-animate');
    });
  });

  // Total sequence ≈ 2.8s then fade-out begins
  window.setTimeout(() => dismiss(root), 2800);
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
  window.setTimeout(remove, 800);
}

function cleanup(root: HTMLElement, animate: boolean) {
  document.body.classList.remove('rzg-splash-open');
  document.documentElement.classList.remove('rzg-splash-pending');
  document.documentElement.classList.add('rzg-splash-done');
  root.style.pointerEvents = 'none';
  if (!animate) {
    root.remove();
    return;
  }
  root.classList.add('is-out');
  window.setTimeout(() => root.remove(), 100);
}
