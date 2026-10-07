import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-contact-page]');
if (!root || reduce) {
  // static
} else {
  bootContact(root);
}

function bootContact(root: HTMLElement) {
  const fields = root.querySelectorAll<HTMLElement>('[data-field]');
  gsap.fromTo(
    fields,
    { autoAlpha: 0, y: 22 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.querySelector('[data-contact-form]'),
        start: 'top 80%',
        once: true,
      },
    },
  );

  const aside = root.querySelector<HTMLElement>('[data-contact-aside]');
  if (aside) {
    gsap.fromTo(
      aside.children,
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: aside, start: 'top 82%', once: true },
      },
    );
  }

  ScrollTrigger.refresh();
}
