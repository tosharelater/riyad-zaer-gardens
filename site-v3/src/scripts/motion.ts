import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

const lenis = reduce
  ? null
  : new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.95,
    });

lenis?.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis?.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

const bar = document.querySelector<HTMLElement>('[data-progress]');
const nav = document.querySelector<HTMLElement>('[data-top]');

let lastY = window.scrollY;
const syncChrome = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  nav?.classList.toggle('is-solid', nav.hasAttribute('data-always-solid') || y > 40);
  // Step out of the way while reading down, come back on the way up.
  const menuOpen = nav?.querySelector('[data-menu]')?.getAttribute('aria-expanded') === 'true';
  if (Math.abs(y - lastY) > 6) {
    nav?.classList.toggle('is-hidden', !menuOpen && y > lastY && y > window.innerHeight * 0.6);
    lastY = y;
  }
};
window.addEventListener('scroll', syncChrome, { passive: true });
lenis?.on('scroll', syncChrome);
syncChrome();

function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  const text = el.textContent?.trim() ?? '';
  if (!text) return;
  el.dataset.splitDone = '1';
  el.setAttribute('aria-label', text);
  el.innerHTML = text
    .split(/(\s+)/)
    .map((w) => (/^\s+$/.test(w) ? w : `<span class="w"><span>${w}</span></span>`))
    .join('');
}

document
  .querySelectorAll<HTMLElement>(
    '[data-split] .display, [data-split] h2, [data-hero-brand], h1[data-ph-title]',
  )
  .forEach(splitWords);

function heroScene() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  // Move the frame, not the <img>: the img's CSS settle animation owns its transform.
  const img = document.querySelector<HTMLElement>('[data-hero-media]');
  if (!hero || !img) return;

  gsap.fromTo(
    '[data-hero-brand] .w > span',
    // y: 0 clears the CSS pre-hide (translateY 110%) that GSAP reads in as an offset
    { yPercent: 115, y: 0 },
    { yPercent: 0, y: 0, duration: 1.3, stagger: 0.08, ease: 'power4.out', delay: 0.45 },
  );

  if (isDesktop() && window.matchMedia('(pointer: fine)').matches) {
    const px = gsap.quickTo(img, 'x', { duration: 1.6, ease: 'power3.out' });
    const py = gsap.quickTo(img, 'y', { duration: 1.6, ease: 'power3.out' });
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      px(((e.clientX - r.left) / r.width - 0.5) * -22);
      py(((e.clientY - r.top) / r.height - 0.5) * -14);
    });
  }

  gsap
    .timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9,
      },
    })
    .to(img, { yPercent: 10, ease: 'none' }, 0);
}

function enterOnce() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      },
    );
  });

  gsap.utils
    .toArray<HTMLElement>('[data-split] .display .w > span, [data-split] h2 .w > span')
    .forEach((span) => {
      if (span.closest('h1')) return;
      const parent = span.closest('[data-split], section');
      gsap.fromTo(
        span,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: parent || span, start: 'top 80%', once: true },
        },
      );
    });

}

function mediaDepth() {
  gsap.utils.toArray<HTMLElement>('[data-media]').forEach((fig) => {
    const img = fig.querySelector('img');
    if (!img) return;

    gsap.fromTo(
      fig,
      { clipPath: 'inset(12% 12% 12% 12% round 0px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: fig,
          start: 'top 92%',
          end: 'top 48%',
          scrub: 0.7,
        },
      },
    );

    gsap.fromTo(
      img,
      { scale: 1.2 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: fig,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

function figuresScene() {
  const board = document.querySelector<HTMLElement>('[data-figures-board]');
  const items = gsap.utils.toArray<HTMLElement>('.figures-item');
  if (!board || !items.length) return;

  items.forEach((item, i) => {
    const dt = item.querySelector<HTMLElement>('[data-count]');
    const to = Number(dt?.dataset.to || dt?.textContent || '0');
    if (dt) dt.dataset.to = String(to);

    gsap.fromTo(
      item,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: board,
          start: 'top 82%',
          once: true,
        },
      },
    );

    if (!dt || !to) return;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: board,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        dt.textContent = '0';
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          delay: 0.1 + i * 0.1,
          ease: 'power3.out',
          onUpdate: () => {
            dt.textContent = String(Math.round(obj.v));
          },
          onComplete: () => {
            dt.textContent = String(to);
          },
        });
      },
    });
  });
}

function visionHorizontal() {
  const rail = document.querySelector<HTMLElement>('[data-vision-rail]');
  if (!rail) return;

  const cards = gsap.utils.toArray<HTMLElement>('[data-vision-rail] .vision-card');
  if (cards.length && !reduce) {
    gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vision',
          start: 'top 80%',
          once: true,
        },
      },
    );
  }

  const step = () => {
    const card = rail.querySelector<HTMLElement>('.vision-card');
    if (!card) return 320;
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap || '12') || 12;
    return card.getBoundingClientRect().width + gap;
  };

  const scrollByDir = (dir: number) => {
    const rtl = getComputedStyle(rail).direction === 'rtl' ? -1 : 1;
    rail.scrollBy({ left: dir * rtl * step(), behavior: reduce ? 'auto' : 'smooth' });
  };

  document.querySelector('[data-vision-prev]')?.addEventListener('click', () => scrollByDir(-1));
  document.querySelector('[data-vision-next]')?.addEventListener('click', () => scrollByDir(1));

  // Drag to scroll
  let pointerId = 0;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

  rail.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startScroll = rail.scrollLeft;
    dragged = false;
    rail.classList.add('is-dragging');
    rail.setPointerCapture(pointerId);
  });

  rail.addEventListener('pointermove', (e) => {
    if (!rail.classList.contains('is-dragging') || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    rail.scrollLeft = startScroll - dx;
  });

  const endDrag = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    rail.classList.remove('is-dragging');
    try {
      rail.releasePointerCapture(pointerId);
    } catch {
      /* ignore */
    }
  };

  rail.addEventListener('pointerup', endDrag);
  rail.addEventListener('pointercancel', endDrag);

  // Lightbox
  const dialog = document.querySelector<HTMLDialogElement>('[data-gallery-lightbox]');
  const img = dialog?.querySelector<HTMLImageElement>('[data-gallery-img]');
  const caption = dialog?.querySelector<HTMLElement>('[data-gallery-caption]');
  if (!dialog || !img || !caption) return;

  const items = cards.map((card) => {
    const image = card.querySelector('img');
    return {
      src: image?.currentSrc || image?.src || '',
      alt: image?.alt || '',
    };
  });

  let index = 0;

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    if (!item) return;
    img.src = item.src;
    img.alt = item.alt;
    caption.textContent = item.alt;
  };

  const openAt = (i: number) => {
    show(i);
    if (!dialog.open) dialog.showModal();
  };

  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (dragged) {
        e.preventDefault();
        dragged = false;
        return;
      }
      const i = Number(card.dataset.index || 0);
      openAt(i);
    });
  });

  dialog.querySelector('[data-gallery-close]')?.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(index + 1));

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  window.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

function reasonsScene() {
  const qs = gsap.utils.toArray<HTMLElement>('[data-reasons-q]');
  const copies = gsap.utils.toArray<HTMLElement>('[data-reasons-copy]');
  if (!qs.length) return;

  qs.forEach((q, i) => {
    const fromX = i % 2 === 0 ? -28 : 28;
    const fromY = i < 2 ? -28 : 28;
    gsap.fromTo(
      q,
      { autoAlpha: 0, x: fromX, y: fromY, scale: 0.86 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-reasons-orbit]',
          start: 'top 78%',
          once: true,
        },
      },
    );
  });

  copies.forEach((copy, i) => {
    const fromX = i % 2 === 0 ? -24 : 24;
    gsap.fromTo(
      copy,
      { autoAlpha: 0, x: fromX },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.9,
        delay: 0.18 + i * 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-reasons-orbit]',
          start: 'top 78%',
          once: true,
        },
      },
    );
  });
}

const NUM = /\d[\d\s\u202f\u00a0]*\d/;
const toNum = (t: string | null | undefined) => Number((t?.match(NUM)?.[0] ?? '').replace(/\D/g, ''));
const group = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f');

function aidScene() {
  const ticket = document.querySelector<HTMLElement>('.aid-ticket');
  const after = document.querySelector<HTMLElement>('.aid-row.is-after');
  if (!ticket || !after) return;

  // The aided price counts down from the full price: the saving, made visible.
  const target = after.querySelector<HTMLElement>('strong');
  const fromN = toNum(document.querySelector('.aid-row.is-before strong')?.textContent);
  const toN = toNum(target?.textContent);
  if (target && fromN && toN && fromN > toN) {
    const tpl = target.textContent ?? '';
    const fmt = (n: number) => tpl.replace(NUM, group(n));
    const obj = { v: fromN };
    target.textContent = fmt(fromN);
    ScrollTrigger.create({
      trigger: ticket,
      start: 'top 70%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: toN,
          duration: 2,
          delay: 0.35,
          ease: 'power2.inOut',
          snap: { v: 1000 },
          onUpdate: () => {
            target.textContent = fmt(obj.v);
          },
        }),
    });
  }

  gsap.fromTo(
    ticket,
    { y: 36, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.aid-ticket',
        start: 'top 88%',
        end: 'top 55%',
        scrub: 0.7,
      },
    },
  );

  gsap.fromTo(
    after,
    { y: 24 },
    {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.aid-ticket',
        start: 'top 80%',
        end: 'top 48%',
        scrub: 0.65,
      },
    },
  );
}

function waysScene() {
  gsap.utils.toArray<HTMLElement>('.ways-list li').forEach((li) => {
    gsap.fromTo(
      li.children,
      { y: 36, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: li, start: 'top 88%', once: true },
      },
    );
  });
}

// Line icons trace themselves when they scroll into view.
function iconDraw() {
  const icons = [...document.querySelectorAll<SVGSVGElement>('main svg.icon')].filter(
    (svg) => !svg.closest('.btn'),
  );
  icons.forEach((svg) => {
    svg.classList.add('draw');
    svg.querySelectorAll('path, circle, rect, line, polyline, polygon, ellipse').forEach((el) => {
      el.setAttribute('pathLength', '1');
    });
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-drawn');
        io.unobserve(e.target);
      }),
    { threshold: 0.6 },
  );
  icons.forEach((svg) => io.observe(svg));
}

function countBig() {
  document.querySelectorAll<HTMLElement>('[data-count-big]').forEach((el) => {
    const to = Number(el.dataset.to);
    if (!to) return;
    const obj = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        }),
    });
  });
}

function footMark() {
  const mark = document.querySelector<HTMLElement>('[data-foot-mark]');
  if (!mark) return;
  gsap.fromTo(
    mark,
    { yPercent: 45, autoAlpha: 0 },
    {
      yPercent: 0,
      autoAlpha: 0.9,
      ease: 'none',
      scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom 85%', scrub: 0.8 },
    },
  );
}

function lieuScene() {
  const media = document.querySelector<HTMLElement>('.lieu-media img');
  const copy = document.querySelector<HTMLElement>('.lieu-overlay > div');
  if (media) {
    gsap.fromTo(
      media,
      { scale: 1.12 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.lieu',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  }
  if (copy) {
    gsap.fromTo(
      copy,
      { y: 50, autoAlpha: 0.4 },
      {
        y: 0,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.lieu',
          start: 'top 75%',
          end: 'top 35%',
          scrub: 0.7,
        },
      },
    );
  }
}

function commerceScene() {
  const media = document.querySelector<HTMLElement>('.commerce-media img');
  const panel = document.querySelector<HTMLElement>('.commerce-panel');
  if (media) {
    gsap.fromTo(
      media,
      { scale: 1.12 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.commerce',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  }
  if (panel) {
    gsap.fromTo(
      panel,
      { y: 60, autoAlpha: 0.5 },
      {
        y: 0,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.7,
        },
      },
    );
  }
}

function pageHeroScene() {
  const hero = document.querySelector<HTMLElement>('[data-page-hero]');
  if (!hero) return;
  // The frame moves; the <img> keeps its CSS settle animation.
  const frame = hero.querySelector<HTMLElement>('[data-ph-media]');

  gsap.fromTo(
    hero.querySelectorAll('[data-ph-title] .w > span'),
    { yPercent: 115, y: 0 },
    { yPercent: 0, y: 0, duration: 1.25, stagger: 0.07, ease: 'power4.out', delay: 0.4 },
  );

  gsap
    .timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.8 },
    })
    .to(frame, { yPercent: 8, ease: 'none' }, 0);

  hero.querySelectorAll<HTMLElement>('dt[data-count]').forEach((dt, i) => {
    const to = Number(dt.dataset.count);
    const tpl = dt.textContent ?? '';
    if (!to || !tpl.includes(String(to))) return;
    const obj = { v: 0 };
    dt.textContent = tpl.replace(String(to), '0');
    gsap.to(obj, {
      v: to,
      duration: 1.6,
      delay: 1.05 + i * 0.08,
      ease: 'power3.out',
      onUpdate: () => {
        dt.textContent = tpl.replace(String(to), String(Math.round(obj.v)));
      },
    });
  });
}

function boot() {
  if (reduce) {
    document.querySelectorAll<HTMLElement>('[data-hero-brand] .w > span, h1[data-ph-title] .w > span').forEach((s) => {
      s.style.transform = 'none';
    });
    visionHorizontal();
    return;
  }

  heroScene();
  pageHeroScene();
  enterOnce();
  mediaDepth();
  figuresScene();
  visionHorizontal();
  reasonsScene();
  aidScene();
  waysScene();
  lieuScene();
  commerceScene();
  footMark();
  countBig();
  iconDraw();
  ScrollTrigger.refresh();
}

if (document.documentElement.classList.contains('intro-lock')) {
  lenis?.stop();
  window.addEventListener(
    'rz:ready',
    () => {
      lenis?.start();
      boot();
    },
    { once: true },
  );
} else {
  boot();
}

let resizeTimer = 0;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis
      ? lenis.scrollTo(target as HTMLElement, { offset: -16 })
      : target.scrollIntoView({ behavior: 'smooth' });
  });
});
