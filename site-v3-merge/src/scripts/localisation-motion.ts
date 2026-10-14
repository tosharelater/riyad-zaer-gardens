import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-loc-page]');
if (root) bootLoc(root);

function bootLoc(root: HTMLElement) {
  const stops = gsap.utils.toArray<HTMLElement>('[data-stop]', root);
  if (reduce) return;

  gsap.fromTo(
    stops,
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.querySelector('.access-grid'), start: 'top 80%', once: true },
    },
  );

  const frame = root.querySelector<HTMLElement>('[data-map-frame]');
  if (frame) {
    gsap.fromTo(
      frame,
      { clipPath: 'inset(8% 6% 8% 6%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top 90%', end: 'top 35%', scrub: 0.7 },
      },
    );
  }

  gsap.fromTo(
    root.querySelectorAll('.near li'),
    { autoAlpha: 0, x: -18 },
    {
      autoAlpha: 1,
      x: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.querySelector('.near'), start: 'top 85%', once: true },
    },
  );

  ScrollTrigger.refresh();
}
