import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-com-page]');
if (root) bootCommerce(root);

function bootCommerce(root: HTMLElement) {
  if (reduce) return;

  gsap.fromTo(
    root.querySelectorAll('[data-reason]'),
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.querySelector('.reasons-grid'), start: 'top 80%', once: true },
    },
  );

  gsap.fromTo(
    root.querySelectorAll('.offer .facts > div'),
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: root.querySelector('.offer .facts'), start: 'top 80%', once: true },
    },
  );

  ScrollTrigger.refresh();
}
