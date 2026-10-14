import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-projet-page]');
if (root && !reduce) bootProjet(root);

function bootProjet(root: HTMLElement) {
  gsap.fromTo(
    root.querySelectorAll('[data-chapter]'),
    { autoAlpha: 0, y: 28 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.querySelector('.chapters-grid'), start: 'top 80%', once: true },
    },
  );

  // Courtyard statement surfaces line by line
  const cour = root.querySelector<HTMLElement>('[data-cour-scene]');
  if (cour) {
    gsap.fromTo(
      cour.querySelectorAll('[data-cour-line]'),
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: cour, start: 'top 70%', once: true },
      },
    );
  }

  const stagger = (sel: string, trigger: string, from: gsap.TweenVars) =>
    gsap.fromTo(
      root.querySelectorAll(sel),
      { autoAlpha: 0, ...from },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector(trigger), start: 'top 78%', once: true },
      },
    );

  stagger('[data-amenity]', '.amenity-grid', { y: 32 });
  stagger('[data-mission]', '[data-missions]', { x: -20 });
  stagger('[data-fiche-row]', '.fiche-table', { y: 16 });

  ScrollTrigger.refresh();
}
