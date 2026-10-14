/** One FAQ details open at a time */

const roots = document.querySelectorAll<HTMLElement>('[data-faq]');

roots.forEach((root) => {
  root.addEventListener('toggle', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLDetailsElement) || !target.open) return;
    root.querySelectorAll('details[open]').forEach((el) => {
      if (el !== target) el.removeAttribute('open');
    });
  }, true);
});
