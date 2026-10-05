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

const syncChrome = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  nav?.classList.toggle('is-solid', nav.hasAttribute('data-always-solid') || y > 40);
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
  .querySelectorAll<HTMLElement>('[data-split] .display, [data-split] h2, h1.hero-title')
  .forEach(splitWords);

function heroScene() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const img = document.querySelector<HTMLElement>('[data-hero-media] img');
  const copy = document.querySelector<HTMLElement>('[data-hero] .hero-copy');
  const scroll = document.querySelector<HTMLElement>('.hero-scroll');
  if (!hero || !img) return;

  gsap.fromTo(
    'h1.hero-title .w > span',
    { yPercent: 115 },
    { yPercent: 0, duration: 1.15, stagger: 0.06, ease: 'power3.out', delay: 0.22 },
  );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9,
      },
    })
    .to(img, { scale: 1.1, yPercent: 12, ease: 'none' }, 0)
    .to(copy, { y: 90, autoAlpha: 0, ease: 'none' }, 0);

  if (scroll) {
    gsap.to(scroll, {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: '10% top',
        end: '35% top',
        scrub: true,
      },
    });
  }
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

  gsap.fromTo(
    '.proof-rail li',
    { autoAlpha: 0, y: 10 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.proof', start: 'top 92%', once: true },
    },
  );
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
    const to = Number(dt?.dataset.to || '0');

    gsap.fromTo(
      item,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: board,
          start: 'top 80%',
          once: true,
        },
      },
    );

    if (!dt) return;
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: board,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: to,
          duration: 1.7,
          delay: 0.12 + i * 0.12,
          ease: 'power3.out',
          onUpdate: () => {
            dt.textContent = String(Math.round(obj.v));
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
  if (cards.length) {
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
    rail.scrollBy({ left: dir * step(), behavior: 'smooth' });
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

  // Shift+wheel / trackpad horizontal
  rail.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        rail.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    },
    { passive: false },
  );

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

function aidScene() {
  const ticket = document.querySelector<HTMLElement>('.aid-ticket');
  const after = document.querySelector<HTMLElement>('.aid-row.is-after');
  if (!ticket || !after) return;

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
  gsap.utils.toArray<HTMLElement>('.ways-list li').forEach((li, i) => {
    const num = li.querySelector('.ways-n');
    const title = li.querySelector('h3');

    gsap.fromTo(
      li,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: li,
          start: 'top 88%',
          once: true,
        },
      },
    );

    if (num) {
      gsap.fromTo(
        num,
        { y: 28, autoAlpha: 0.15 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: li,
            start: 'top 88%',
            once: true,
          },
        },
      );
    }

    if (title) {
      gsap.fromTo(
        title,
        { y: 18 },
        {
          y: 0,
          duration: 0.85,
          delay: 0.1 + i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: li,
            start: 'top 88%',
            once: true,
          },
        },
      );
    }
  });
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
      { x: 40, autoAlpha: 0.5 },
      {
        x: 0,
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

function pageHeroParallax() {
  const hero = document.querySelector<HTMLElement>('[data-page-hero]');
  const img = hero?.querySelector<HTMLElement>('.ph-media img');
  if (!hero || !img) return;

  gsap.to(img, {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
  });
}

function boot() {
  if (reduce) {
    document.querySelectorAll<HTMLElement>('h1.hero-title .w > span').forEach((s) => {
      s.style.transform = 'none';
    });
    return;
  }

  heroScene();
  pageHeroParallax();
  enterOnce();
  mediaDepth();
  figuresScene();
  visionHorizontal();
  reasonsScene();
  aidScene();
  waysScene();
  lieuScene();
  commerceScene();
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
