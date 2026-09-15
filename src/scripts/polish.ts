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
    { threshold: 0.12 }
  );
  nodes.forEach((n) => io.observe(n));
}

export function initParallax() {
  const img = document.querySelector<HTMLElement>('[data-parallax]');
  if (!img) return;
  const onScroll = () => {
    const y = Math.min(window.scrollY * 0.18, 80);
    img.style.transform = `scale(1.08) translate3d(0, ${y}px, 0)`;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
