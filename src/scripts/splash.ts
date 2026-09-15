/** Hold splash fully visible for exactly HOLD_MS, then fade out. Always on every visit. */
const HOLD_MS = 3000;
const HOLD_REDUCED_MS = 1000;
const FADE_REMOVE_BUFFER_MS = 500;

/** Editorial splash: exact 3000ms hold (1s if prefers-reduced-motion), then fade. No skip storage. */
export function initSplash() {
  const root = document.getElementById('rzg-splash');
  const html = document.documentElement;

  if (!root) {
    html.classList.remove('rzg-splash-pending');
    html.classList.add('rzg-splash-done');
    document.body.classList.remove('rzg-splash-open');
    return;
  }

  // Always show — never skip via localStorage / sessionStorage
  html.classList.add('rzg-splash-pending');
  html.classList.remove('rzg-splash-done');
  document.body.classList.add('rzg-splash-open');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hold = reduced ? HOLD_REDUCED_MS : HOLD_MS;

  if (reduced) {
    root.classList.add('is-static');
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.add('is-animate');
      });
    });
  }

  window.setTimeout(() => dismiss(root), hold);
}

function dismiss(root: HTMLElement) {
  root.classList.add('is-out');
  root.style.pointerEvents = 'none';
  document.body.classList.remove('rzg-splash-open');

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
