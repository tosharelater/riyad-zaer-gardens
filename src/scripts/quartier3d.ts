/**
 * Scroll-scrubbed abstract “quartier” — lazy-loads Three.js when section nears viewport.
 * Brand: #002D2D #0A3D35 #C8B568 #D9C987 #F7F2E8
 */

const CREAM = 0xf7f2e8;
const CREAM_DEEP = 0xede4d4;
const BEIGE = 0xe8dfc8;
const GROUND = 0x0a3d35;
const FOREST = 0x002d2d;
const GOLD = 0xc8b568;
const GOLD_PALE = 0xd9c987;

type ThreeModule = typeof import('three');

export function initQuartier() {
  const section = document.querySelector<HTMLElement>('[data-quartier]');
  if (!section) return;

  const canvas = section.querySelector<HTMLCanvasElement>('[data-quartier-canvas]');
  const fallback = section.querySelector<HTMLElement>('[data-quartier-fallback]');
  const sticky = section.querySelector<HTMLElement>('[data-quartier-sticky]');
  if (!canvas || !sticky) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile =
    window.matchMedia('(max-width: 720px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;

  if (reduced) {
    showStatic(section, canvas, fallback);
    return;
  }

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    void boot(section, canvas, sticky, fallback, mobile);
  };

  if (!('IntersectionObserver' in window)) {
    start();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        start();
      }
    },
    { rootMargin: '280px 0px', threshold: 0.01 }
  );
  io.observe(section);
}

function showStatic(
  section: HTMLElement,
  canvas: HTMLCanvasElement,
  fallback: HTMLElement | null
) {
  section.classList.add('is-static');
  canvas.hidden = true;
  if (fallback) fallback.hidden = false;
}

async function boot(
  section: HTMLElement,
  canvas: HTMLCanvasElement,
  sticky: HTMLElement,
  fallback: HTMLElement | null,
  mobile: boolean
) {
  let THREE: ThreeModule;
  try {
    THREE = await import('three');
  } catch {
    showStatic(section, canvas, fallback);
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0ebe0);
  scene.fog = new THREE.Fog(0xf0ebe0, 22, 58);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
  camera.position.set(16, 9, 18);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: mobile ? 'low-power' : 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !mobile;
  if (!mobile) renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  const hemi = new THREE.HemisphereLight(0xfff6e8, GROUND, 0.85);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff2d8, 1.15);
  sun.position.set(12, 22, 8);
  if (!mobile) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
  }
  scene.add(sun);
  const rim = new THREE.DirectionalLight(GOLD_PALE, 0.35);
  rim.position.set(-10, 6, -8);
  scene.add(rim);

  // Ground
  const groundMat = new THREE.MeshStandardMaterial({
    color: GROUND,
    roughness: 0.92,
    metalness: 0.02,
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = !mobile;
  scene.add(ground);

  // Soft cream plaza disk
  const plaza = new THREE.Mesh(
    new THREE.CircleGeometry(9.5, 48),
    new THREE.MeshStandardMaterial({ color: CREAM_DEEP, roughness: 0.88, metalness: 0.04 })
  );
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.02;
  plaza.receiveShadow = !mobile;
  scene.add(plaza);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: CREAM,
    roughness: 0.78,
    metalness: 0.05,
  });
  const beigeMat = new THREE.MeshStandardMaterial({
    color: BEIGE,
    roughness: 0.82,
    metalness: 0.04,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: GOLD,
    roughness: 0.42,
    metalness: 0.55,
  });
  const forestMat = new THREE.MeshStandardMaterial({
    color: FOREST,
    roughness: 0.7,
    metalness: 0.08,
  });

  const root = new THREE.Group();
  scene.add(root);

  type BuildingSpec = {
    x: number;
    z: number;
    w: number;
    d: number;
    h: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mat?: any;
    goldBand?: boolean;
  };

  const buildings: BuildingSpec[] = mobile
    ? [
        { x: -3.2, z: -1.5, w: 2.4, d: 2.2, h: 4.2 },
        { x: 0.2, z: 1.8, w: 2.8, d: 2.0, h: 5.6, mat: beigeMat, goldBand: true },
        { x: 3.6, z: -0.8, w: 2.2, d: 2.4, h: 3.6 },
        { x: -1.0, z: -4.2, w: 3.0, d: 1.8, h: 3.1, mat: beigeMat },
        { x: 2.4, z: 4.0, w: 1.8, d: 1.8, h: 2.8 },
      ]
    : [
        { x: -4.2, z: -2.0, w: 2.6, d: 2.4, h: 4.8 },
        { x: -1.4, z: 1.2, w: 2.2, d: 2.0, h: 3.4, mat: beigeMat },
        { x: 1.6, z: -1.0, w: 2.8, d: 2.6, h: 6.2, goldBand: true },
        { x: 4.4, z: 1.6, w: 2.0, d: 2.2, h: 4.0, mat: beigeMat },
        { x: -3.0, z: 3.6, w: 2.4, d: 1.8, h: 2.9 },
        { x: 0.4, z: 4.2, w: 1.9, d: 1.9, h: 3.8, goldBand: true },
        { x: 3.8, z: -3.6, w: 2.3, d: 2.0, h: 5.1, mat: beigeMat },
        { x: -5.2, z: 0.6, w: 1.6, d: 1.6, h: 2.4 },
        { x: 5.6, z: -0.4, w: 1.7, d: 2.1, h: 3.2 },
      ];

  for (const b of buildings) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(b.w, b.h, b.d),
      b.mat ?? bodyMat
    );
    mesh.position.set(b.x, b.h / 2, b.z);
    mesh.castShadow = !mobile;
    mesh.receiveShadow = !mobile;
    root.add(mesh);

    // Roof slab accent
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(b.w + 0.12, 0.12, b.d + 0.12),
      goldMat
    );
    roof.position.set(b.x, b.h + 0.06, b.z);
    roof.castShadow = !mobile;
    root.add(roof);

    if (b.goldBand) {
      const band = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 0.04, 0.14, b.d + 0.04),
        goldMat
      );
      band.position.set(b.x, b.h * 0.38, b.z);
      root.add(band);
    }
  }

  // Arch gate motif (two pillars + curved lintel approximation)
  const archGroup = new THREE.Group();
  archGroup.position.set(0, 0, 6.4);
  const pillarGeo = new THREE.BoxGeometry(0.35, 3.2, 0.35);
  const pL = new THREE.Mesh(pillarGeo, forestMat);
  pL.position.set(-1.35, 1.6, 0);
  const pR = new THREE.Mesh(pillarGeo, forestMat);
  pR.position.set(1.35, 1.6, 0);
  archGroup.add(pL, pR);

  const archCurve = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.16, 10, mobile ? 24 : 40, Math.PI),
    goldMat
  );
  archCurve.rotation.y = Math.PI / 2;
  archCurve.rotation.z = Math.PI / 2;
  archCurve.position.set(0, 3.2, 0);
  archGroup.add(archCurve);

  const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.18, 0.4), goldMat);
  lintel.position.set(0, 3.35, 0);
  archGroup.add(lintel);
  root.add(archGroup);

  // Low gold path
  const path = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.04, 14),
    new THREE.MeshStandardMaterial({ color: GOLD_PALE, roughness: 0.65, metalness: 0.2 })
  );
  path.position.set(0, 0.04, 0.5);
  root.add(path);

  if (fallback) fallback.hidden = true;
  canvas.hidden = false;
  section.classList.add('is-ready');

  let progress = 0;
  let raf = 0;
  let disposed = false;

  const resize = () => {
    const w = sticky.clientWidth || window.innerWidth;
    const h = sticky.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  const readProgress = () => {
    const rect = section.getBoundingClientRect();
    const total = Math.max(section.offsetHeight - window.innerHeight, 1);
    const scrolled = -rect.top;
    return Math.min(1, Math.max(0, scrolled / total));
  };

  const setCamera = (t: number) => {
    // Dolly + gentle orbit through the quartier
    const angle = -0.55 + t * Math.PI * 1.15;
    const radius = 17.5 - t * 5.5;
    const y = 7.2 + Math.sin(t * Math.PI) * 2.4;
    camera.position.set(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
    const lookY = 1.6 + t * 1.8;
    camera.lookAt(0.2, lookY, -0.4 + t * -1.2);
    root.rotation.y = t * 0.12;
  };

  const render = () => {
    if (disposed) return;
    setCamera(progress);
    renderer.render(scene, camera);
  };

  const onScroll = () => {
    progress = readProgress();
    if (!raf) {
      raf = requestAnimationFrame(() => {
        raf = 0;
        render();
      });
    }
  };

  resize();
  progress = readProgress();
  render();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resize);

  // Pause offscreen
  const vis = new IntersectionObserver(
    (entries) => {
      const on = entries.some((e) => e.isIntersecting);
      if (!on && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (on) {
        onScroll();
      }
    },
    { threshold: 0 }
  );
  vis.observe(section);

  // Cleanup if navigated away (SPA-less Astro still fine)
  const cleanup = () => {
    disposed = true;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', resize);
    vis.disconnect();
    if (raf) cancelAnimationFrame(raf);
    renderer.dispose();
  };
  window.addEventListener('pagehide', cleanup, { once: true });
}
