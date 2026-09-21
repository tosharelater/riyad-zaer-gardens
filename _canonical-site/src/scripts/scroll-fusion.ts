export function initScrollFusion(): void {
  if (!document.querySelector('[data-fusion-page]')) return;

  initHeaderScroll();
  initScrollProgress();
  initFusionReveal();
  initCounterReveal();
  initHeroCrossfadeOnly();
  initMediaReveal();
  initRowReveal();
  initTypoTicks();
  initTypoTitleLift();
  initFilmGallery();
  initGalleryParallax();
  initWaysParallax();
  initInView('[data-fill-track]', 'is-in');
  initInView('[data-phase-track]', 'is-in');
  initSplitParallax();
  initReasonsCycles();
  bindScrollLoop();
}

type ScrollTask = () => void;
const scrollTasks: ScrollTask[] = [];
let scrollTicking = false;
let scrollLoopBound = false;

function onScrollFrame(task: ScrollTask): void {
  scrollTasks.push(task);
}

function bindScrollLoop(): void {
  if (scrollLoopBound) return;
  scrollLoopBound = true;
  window.addEventListener(
    'scroll',
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        for (let i = 0; i < scrollTasks.length; i++) scrollTasks[i]();
        scrollTicking = false;
      });
    },
    { passive: true },
  );
}

function isNearViewport(el: HTMLElement, margin = 120): boolean {
  const rect = el.getBoundingClientRect();
  const view = window.innerHeight || 1;
  return rect.bottom > -margin && rect.top < view + margin;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('[data-fusion-header]');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScrollFrame(update);
  update();
}

function initScrollProgress(): void {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;

  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.setProperty('--progress', String(h > 0 ? window.scrollY / h : 0));
  };
  onScrollFrame(update);
  update();
}

function initFusionReveal(): void {
  const items = [...document.querySelectorAll<HTMLElement>('.reveal-fusion')];
  if (!items.length) return;

  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
  );

  items.forEach((el) => {
    const group = el.closest('[data-reveal-group]');
    const siblings = group ? [...group.querySelectorAll('.reveal-fusion')] : [el];
    const i = Math.max(0, siblings.indexOf(el));
    const isCopy = el.matches('p, li, details, .fusion-stat, .fusion-lead');
    const step = isCopy ? 95 : 75;
    el.style.setProperty('--reveal-delay', `${Math.min(i, 12) * step}ms`);
    observer.observe(el);
  });
}

function initCounterReveal(): void {
  const nums = document.querySelectorAll<HTMLElement>('[data-count-to]');
  if (!nums.length || prefersReducedMotion()) {
    nums.forEach((el) => {
      el.textContent = `${el.dataset.countTo ?? ''}${el.dataset.countSuffix ?? ''}`;
    });
    return;
  }

  const animate = (el: HTMLElement) => {
    const target = Number(el.dataset.countTo ?? 0);
    const suffix = el.dataset.countSuffix ?? '';
    const start = performance.now();
    const duration = 1280;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.55 },
  );

  nums.forEach((n) => observer.observe(n));
}

function initHeroCrossfadeOnly(): void {
  const root = document.querySelector('[data-hero-crossfade]');
  if (!root) return;
  const slides = root.querySelectorAll('img');
  if (!slides.length) return;

  root.classList.add('is-in');
  slides[0]?.classList.add('is-active');
  if (slides.length < 2 || prefersReducedMotion()) return;

  let index = 0;
  const hold = 6200;

  const cycle = () => {
    const next = (index + 1) % slides.length;
    slides[next]?.classList.add('is-active');
    slides[index]?.classList.remove('is-active');
    index = next;
  };

  window.setInterval(cycle, hold);
}

function initMediaReveal(): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-media-reveal]');
  if (!nodes.length) return;

  if (prefersReducedMotion()) {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.22 },
  );

  nodes.forEach((n) => observer.observe(n));
}

function initRowReveal(): void {
  const rows = document.querySelectorAll<HTMLElement>('[data-row-reveal]');
  if (!rows.length) return;

  if (prefersReducedMotion()) {
    rows.forEach((r) => r.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.28 },
  );

  rows.forEach((r) => observer.observe(r));
}

function initTypoTicks(): void {
  const ticks = document.querySelector<HTMLElement>('[data-typo-ticks]');
  const stack = document.querySelector<HTMLElement>('.typo-stack');
  const panels = document.querySelectorAll<HTMLElement>('[data-typo-tick]');
  if (!ticks || !panels.length) return;

  const buttons = [...ticks.querySelectorAll<HTMLButtonElement>('button')];

  const panelIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const i = Number(entry.target.getAttribute('data-typo-tick'));
        buttons.forEach((b, j) => b.classList.toggle('is-on', j === i));
      });
    },
    { threshold: 0.5 },
  );
  panels.forEach((p) => panelIo.observe(p));

  if (stack) {
    const stackIo = new IntersectionObserver(
      (entries) => {
        ticks.classList.toggle('is-on', entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.08 },
    );
    stackIo.observe(stack);
  }

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      panels[i]?.scrollIntoView({ block: 'start' });
    });
  });
}

function initTypoTitleLift(): void {
  const title = document.querySelector<HTMLElement>('.typo-panel--title');
  const inner = title?.querySelector<HTMLElement>('.typo-title-inner');
  const heading = title?.querySelector<HTMLElement>('.fusion-h2');
  const next = title?.nextElementSibling as HTMLElement | null;
  if (!title || !inner || !heading || !next) return;

  const update = () => {
    if (prefersReducedMotion() || !isNearViewport(title, 200)) {
      if (prefersReducedMotion()) inner.style.transform = '';
      return;
    }
    const currentY = new DOMMatrix(getComputedStyle(inner).transform).m42;
    const naturalBottom = heading.getBoundingClientRect().bottom - currentY;
    const clearance = Math.max(88, Math.round(window.innerHeight * 0.14));
    const overlap = naturalBottom + clearance - next.getBoundingClientRect().top;
    inner.style.transform = overlap > 0 ? `translate3d(0, ${-overlap}px, 0)` : '';
  };

  onScrollFrame(update);
  update();
}

function initFilmGallery(): void {
  const root = document.querySelector<HTMLElement>('[data-film-gallery]');
  if (!root) return;

  const strip = root.querySelector<HTMLElement>('.film-strip, .gallery-arc-block') ?? root;
  const preview = root.querySelector<HTMLElement>('[data-film-preview]');
  const layerA = preview?.querySelector<HTMLImageElement>('[data-film-a]');
  const layerB = preview?.querySelector<HTMLImageElement>('[data-film-b]');
  const thumbs = [...root.querySelectorAll<HTMLImageElement>('[data-film-i]')];
  if (!preview || !layerA || !layerB || !thumbs.length) return;

  const sources = [...new Set(thumbs.map((img) => img.getAttribute('src') || ''))].filter(Boolean);
  if (!sources.length) return;

  let index = 0;
  let usingA = true;
  let cycleTimer = 0;
  let startTimer = 0;
  let inView = false;
  const arc = root.querySelector<HTMLElement>('.gallery-arc');

  const markHot = (i: number) => {
    thumbs.forEach((thumb) => {
      thumb.classList.toggle('is-hot', Number(thumb.dataset.filmI) === i);
    });
  };

  const show = (i: number) => {
    index = (i + sources.length) % sources.length;
    const incoming = usingA ? layerB : layerA;
    const outgoing = usingA ? layerA : layerB;
    incoming.src = sources[index];
    incoming.classList.add('is-show');
    outgoing.classList.remove('is-show');
    usingA = !usingA;
    markHot(index);
  };

  const stopCycle = () => {
    window.clearTimeout(startTimer);
    window.clearInterval(cycleTimer);
    startTimer = 0;
    cycleTimer = 0;
  };

  const setPaused = (paused: boolean) => {
    root.classList.toggle('is-paused', paused);
    strip.classList.toggle('is-paused', paused);
    arc?.classList.toggle('is-live', !paused && inView);
  };

  const close = () => {
    stopCycle();
    preview.classList.remove('is-on');
    thumbs.forEach((thumb) => thumb.classList.remove('is-hot'));
    layerA.classList.remove('is-show');
    layerB.classList.remove('is-show');
    setPaused(!inView);
  };

  const open = (i: number) => {
    stopCycle();
    setPaused(true);
    preview.classList.add('is-on');
    show(i);
    if (prefersReducedMotion()) return;
    startTimer = window.setTimeout(() => {
      cycleTimer = window.setInterval(() => show(index + 1), 2000);
    }, 2000);
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener('mouseenter', () => {
      open(Number(thumb.dataset.filmI) || 0);
    });
  });

  root.addEventListener('mouseleave', close);

  /* Pause infinite wheel when off-screen — biggest gallery win */
  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting);
      if (!preview.classList.contains('is-on')) setPaused(!inView);
      else arc?.classList.toggle('is-live', false);
    },
    { rootMargin: '80px 0px', threshold: 0.01 },
  );
  io.observe(root);
  setPaused(true);
}

function initSplitParallax(): void {
  if (prefersReducedMotion()) return;
  const frames = [...document.querySelectorAll<HTMLElement>('.fusion-split > .fusion-media')];
  if (!frames.length) return;

  const update = () => {
    const view = window.innerHeight || 1;
    frames.forEach((frame) => {
      if (!isNearViewport(frame)) return;
      const img = frame.querySelector<HTMLElement>('img');
      if (!img) return;
      const rect = frame.getBoundingClientRect();
      const progress = (view / 2 - (rect.top + rect.height / 2)) / view;
      const shift = Math.max(-28, Math.min(28, progress * 42));
      img.style.translate = `0 ${shift}px`;
    });
  };

  onScrollFrame(update);
  update();
}

function initReasonsCycles(): void {
  const plan = document.querySelector<HTMLElement>('.fusion-plan--reasons');
  if (!plan) return;

  const rows = [...plan.querySelectorAll<HTMLElement>('.fusion-plan__row')];
  if (!rows.length) return;

  const size = () => {
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const base = mobile ? 72 : 92;
    // Measure content height with a temporary unset so stretch min-height doesn't inflate the reading
    const prev = plan.style.getPropertyValue('--cycle-d');
    plan.style.setProperty('--cycle-d', `${base}px`);
    let maxH = base;
    rows.forEach((row) => {
      const copy = row.querySelector<HTMLElement>('.fusion-plan__cell--copy');
      if (!copy) return;
      maxH = Math.max(maxH, copy.scrollHeight);
    });
    const next = `${maxH}px`;
    if (prev === next) {
      plan.style.setProperty('--cycle-d', next);
      return;
    }
    plan.style.setProperty('--cycle-d', next);
    rows.forEach((row) => row.style.removeProperty('--cycle-d'));
  };

  size();
  window.addEventListener('resize', size, { passive: true });
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(size);
    rows.forEach((row) => {
      const copy = row.querySelector('.fusion-plan__cell--copy');
      if (copy) ro.observe(copy);
    });
  }
}

function initReasonsParallax(): void {
  if (prefersReducedMotion()) return;
  const section = document.querySelector<HTMLElement>('[data-reasons-parallax]');
  if (!section) return;
  const bg = section.querySelector<HTMLElement>('.fusion-reasons__bg');
  const depths = [...section.querySelectorAll<HTMLElement>('[data-parallax-depth]')];

  const update = () => {
    if (!isNearViewport(section)) return;
    const rect = section.getBoundingClientRect();
    const view = window.innerHeight || 1;
    const progress = (view / 2 - (rect.top + rect.height / 2)) / view;
    if (bg) {
      bg.style.transform = `translate3d(0, ${Math.max(-36, Math.min(36, progress * 54))}px, 0)`;
    }
    depths.forEach((el) => {
      const depth = Number(el.dataset.parallaxDepth || 0.1);
      el.style.transform = `translate3d(0, ${Math.max(-18, Math.min(18, progress * depth * 120))}px, 0)`;
    });
  };

  onScrollFrame(update);
  update();
}

function initWaysParallax(): void {
  if (prefersReducedMotion()) return;
  const scene = document.querySelector<HTMLElement>('.fusion-ways-scene');
  if (!scene) return;
  const img = scene.querySelector<HTMLElement>('[data-ways-parallax-img]');
  const depths = [...scene.querySelectorAll<HTMLElement>('[data-parallax-depth]')];

  const update = () => {
    if (!isNearViewport(scene, 160)) return;
    const rect = scene.getBoundingClientRect();
    const view = window.innerHeight || 1;
    const total = rect.height + view;
    const progress = Math.max(-1, Math.min(1, (view / 2 - (rect.top + rect.height / 2)) / (total / 2)));
    if (img) {
      const y = progress * 48;
      const scale = 1.08 + Math.abs(progress) * 0.04;
      img.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
    }
    depths.forEach((el) => {
      const depth = Number(el.dataset.parallaxDepth || 0.1);
      const y = Math.max(-28, Math.min(28, progress * depth * 160));
      el.style.transform = `translate3d(0, ${y}px, 0)`;
    });
  };

  onScrollFrame(update);
  update();
}

function initGalleryParallax(): void {
  if (prefersReducedMotion()) return;
  const block = document.querySelector<HTMLElement>('[data-gallery-parallax]');
  const arc = block?.querySelector<HTMLElement>('.gallery-arc');
  if (!block || !arc) return;

  const update = () => {
    if (!isNearViewport(block)) return;
    const rect = block.getBoundingClientRect();
    const view = window.innerHeight || 1;
    const progress = (view / 2 - (rect.top + rect.height / 2)) / view;
    const y = Math.max(-18, Math.min(18, progress * 32));
    arc.style.setProperty('--parallax-y', `${y}px`);
  };

  onScrollFrame(update);
  update();
}

function initInView(selector: string, className: string): void {
  const nodes = document.querySelectorAll<HTMLElement>(selector);
  if (!nodes.length) return;

  if (prefersReducedMotion()) {
    nodes.forEach((n) => n.classList.add(className));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  nodes.forEach((n) => observer.observe(n));
}
