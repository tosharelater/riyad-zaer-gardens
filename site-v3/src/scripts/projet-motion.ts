import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.querySelector<HTMLElement>('[data-projet-page]');
if (!root || reduce) {
  // no-op: keep static page readable
} else {
  bootProjet(root);
}

function bootProjet(root: HTMLElement) {
  const mm = gsap.matchMedia();

  // Hero title clip + lead rise (page-specific, stronger than default)
  const hero = root.querySelector<HTMLElement>('[data-projet-hero]');
  if (hero) {
    const title = hero.querySelector('.ph-title');
    const leads = hero.querySelectorAll('.ph-lead, .ph-kick');
    gsap.fromTo(
      title,
      { clipPath: 'inset(100% 0 0 0)', y: 40 },
      { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.25, ease: 'power4.out', delay: 0.15 },
    );
    gsap.fromTo(
      leads,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.45 },
    );
  }

  // Stats rail: numbers scale in with scrub
  const stats = root.querySelectorAll<HTMLElement>('[data-stat] .n');
  stats.forEach((el) => {
    const end = el.dataset.value ?? el.textContent ?? '0';
    const isNum = /^\d+$/.test(end);
    if (!isNum) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: Number(end),
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
  });

  // Sticky conception chapters — desktop only
  mm.add('(min-width: 901px)', () => {
    const stage = root.querySelector<HTMLElement>('[data-chapters]');
    const panels = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    const images = gsap.utils.toArray<HTMLElement>('[data-chapter-img]');
    if (!stage || panels.length < 2) return;

    gsap.set(images, { autoAlpha: 0, scale: 1.08 });
    gsap.set(images[0], { autoAlpha: 1, scale: 1 });
    gsap.set(panels, { autoAlpha: 0, y: 28 });
    gsap.set(panels[0], { autoAlpha: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => `+=${panels.length * 90}%`,
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    panels.forEach((panel, i) => {
      if (i === 0) return;
      const prev = panels[i - 1];
      tl.to(prev, { autoAlpha: 0, y: -28, duration: 0.5, ease: 'power2.inOut' }, i)
        .to(images[i - 1], { autoAlpha: 0, scale: 1.05, duration: 0.5, ease: 'power2.inOut' }, i)
        .fromTo(
          panel,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          i + 0.05,
        )
        .fromTo(
          images[i],
          { autoAlpha: 0, scale: 1.1 },
          { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power2.out' },
          i + 0.05,
        );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });

  // Mobile: simple staggered chapter reveal
  mm.add('(max-width: 900px)', () => {
    gsap.utils.toArray<HTMLElement>('[data-chapter]').forEach((panel) => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
        },
      );
    });
  });

  // Courtyard: text layers scrub while image zooms
  const cour = root.querySelector<HTMLElement>('[data-cour-scene]');
  if (cour) {
    const img = cour.querySelector('img');
    const copy = cour.querySelectorAll('[data-cour-line]');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: cour,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      );
    }
    copy.forEach((line, i) => {
      gsap.fromTo(
        line,
        { autoAlpha: 0, y: 50, filter: 'blur(6px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            once: true,
          },
          delay: i * 0.05,
        },
      );
    });
  }

  // Amenities: horizontal drift on desktop
  mm.add('(min-width: 901px)', () => {
    const track = root.querySelector<HTMLElement>('[data-amenity-track]');
    const wrap = root.querySelector<HTMLElement>('[data-amenity-wrap]');
    if (!track || !wrap) return;

    const total = track.scrollWidth - wrap.clientWidth;
    if (total <= 0) return;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - wrap.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top 70%',
        end: () => `+=${Math.min(total + 200, 1400)}`,
        scrub: 0.9,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });

  // Syndic list: draw-in stagger
  gsap.fromTo(
    root.querySelectorAll('[data-mission]'),
    { autoAlpha: 0, x: -24 },
    {
      autoAlpha: 1,
      x: 0,
      stagger: 0.08,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.querySelector('[data-missions]'),
        start: 'top 80%',
        once: true,
      },
    },
  );

  // Fiche rows: wipe in
  gsap.fromTo(
    root.querySelectorAll('[data-fiche-row]'),
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.045,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: root.querySelector('[data-fiche]'),
        start: 'top 78%',
        once: true,
      },
    },
  );

  // Floating progress dots for chapters (desktop)
  const dots = root.querySelectorAll<HTMLElement>('[data-chapter-dot]');
  if (dots.length) {
    const stage = root.querySelector<HTMLElement>('[data-chapters]');
    if (stage) {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: () => `+=${Math.max(dots.length, 1) * 85}%`,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            dots.length - 1,
            Math.floor(self.progress * dots.length),
          );
          dots.forEach((d, i) => d.classList.toggle('is-on', i === idx));
        },
      });
    }
  }

  ScrollTrigger.refresh();
}
