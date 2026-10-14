import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-apt-page]');
if (root && !reduce) bootApt(root);

const NUM = /\d[\d\s  ]*\d/;
const toNum = (t: string | null | undefined) => Number((t?.match(NUM)?.[0] ?? '').replace(/\D/g, ''));
const group = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

function bootApt(root: HTMLElement) {
  // Typologies: the big letter rises, then the text.
  gsap.utils.toArray<HTMLElement>('[data-type]', root).forEach((type, i) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: type, start: 'top 78%', once: true },
      delay: i * 0.15,
    });
    tl.fromTo(type.querySelector('.type-mark'), { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out' })
      .fromTo(type.querySelector('.type-body'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, 0.35);
  });

  gsap.fromTo(
    root.querySelectorAll('[data-ruled] li'),
    { autoAlpha: 0, x: -18 },
    {
      autoAlpha: 1,
      x: 0,
      stagger: 0.07,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.querySelector('[data-ruled]'), start: 'top 80%', once: true },
    },
  );

  gsap.fromTo(
    root.querySelectorAll('.finish .facts > div'),
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: root.querySelector('.finish .facts'), start: 'top 80%', once: true },
    },
  );

  // Price: the aided price counts down from the full price.
  const from = root.querySelector<HTMLElement>('[data-price-from]');
  const to = root.querySelector<HTMLElement>('[data-price-to]');
  const a = toNum(from?.textContent);
  const b = toNum(to?.textContent);
  if (to && a && b && a > b) {
    const tpl = to.textContent ?? '';
    const fmt = (n: number) => tpl.replace(NUM, group(n));
    const obj = { v: a };
    to.textContent = fmt(a);
    ScrollTrigger.create({
      trigger: to,
      start: 'top 80%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: b,
          duration: 2,
          delay: 0.3,
          ease: 'power2.inOut',
          snap: { v: 1000 },
          onUpdate: () => {
            to.textContent = fmt(obj.v);
          },
        }),
    });
  }

  ScrollTrigger.refresh();
}
