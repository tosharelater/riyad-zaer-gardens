/**
 * Scroll-scrubbed abstract “quartier” — lazy-loads Three.js when section nears viewport.
 * Brand: #002D2D #0A3D35 #C8B568 #D9C987 #F7F2E8
 */

const CREAM = 0xf7f2e8;
const CREAM_DEEP = 0xede4d4;
const BEIGE = 0xe8dfc8;
const STONE = 0xddd2bb;
const GROUND = 0x0a3d35;
const FOREST = 0x002d2d;
const GOLD = 0xc8b568;
const GOLD_PALE = 0xd9c987;
const WINDOW = 0x1a3f3a;
const FOLIAGE = 0x0e4a40;

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

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
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
  scene.background = new THREE.Color(0xefe8da);
  scene.fog = new THREE.Fog(0xefe8da, 18, 52);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 140);
  camera.position.set(16, 9, 18);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: mobile ? 'low-power' : 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = !mobile;
  if (!mobile) renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ——— Lighting: warm key, cool fill, gold rim ———
  const hemi = new THREE.HemisphereLight(0xfff4e4, 0x16332e, 0.72);
  scene.add(hemi);

  const amb = new THREE.AmbientLight(0xf3ead8, 0.22);
  scene.add(amb);

  const sun = new THREE.DirectionalLight(0xfff1d6, 1.55);
  sun.position.set(14, 24, 10);
  if (!mobile) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.00018;
    sun.shadow.normalBias = 0.04;
    sun.shadow.radius = 2.4;
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 60;
    sun.shadow.camera.left = -22;
    sun.shadow.camera.right = 22;
    sun.shadow.camera.top = 22;
    sun.shadow.camera.bottom = -22;
  }
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xc9ddd6, 0.38);
  fill.position.set(-12, 8, 6);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(GOLD_PALE, 0.48);
  rim.position.set(-8, 7, -14);
  scene.add(rim);

  const bounce = new THREE.PointLight(GOLD, 6.5, 22, 2);
  bounce.position.set(0, 3.2, 2);
  scene.add(bounce);

  // Ground
  const groundMat = new THREE.MeshStandardMaterial({
    color: GROUND,
    roughness: 0.94,
    metalness: 0.02,
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = !mobile;
  scene.add(ground);

  // Soft cream plaza disk
  const plaza = new THREE.Mesh(
    new THREE.CircleGeometry(10.4, 64),
    new THREE.MeshStandardMaterial({ color: CREAM_DEEP, roughness: 0.86, metalness: 0.05 })
  );
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.02;
  plaza.receiveShadow = !mobile;
  scene.add(plaza);

  const innerPlaza = new THREE.Mesh(
    new THREE.CircleGeometry(5.4, 48),
    new THREE.MeshStandardMaterial({ color: 0xe7dcc4, roughness: 0.8, metalness: 0.06 })
  );
  innerPlaza.rotation.x = -Math.PI / 2;
  innerPlaza.position.y = 0.035;
  innerPlaza.receiveShadow = !mobile;
  scene.add(innerPlaza);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: CREAM,
    roughness: 0.62,
    metalness: 0.08,
  });
  const beigeMat = new THREE.MeshStandardMaterial({
    color: BEIGE,
    roughness: 0.66,
    metalness: 0.07,
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    color: STONE,
    roughness: 0.7,
    metalness: 0.05,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: GOLD,
    roughness: 0.32,
    metalness: 0.62,
  });
  const forestMat = new THREE.MeshStandardMaterial({
    color: FOREST,
    roughness: 0.58,
    metalness: 0.1,
  });
  const windowMat = new THREE.MeshStandardMaterial({
    color: WINDOW,
    roughness: 0.22,
    metalness: 0.35,
  });
  const canopyMat = new THREE.MeshStandardMaterial({
    color: FOLIAGE,
    roughness: 0.85,
    metalness: 0.02,
  });
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x3a2a1c,
    roughness: 0.9,
    metalness: 0,
  });

  const root = new THREE.Group();
  scene.add(root);

  type BuildingSpec = {
    x: number;
    z: number;
    w: number;
    d: number;
    h: number;
    rot?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mat?: any;
    goldBand?: boolean;
    floors?: number;
  };

  const buildings: BuildingSpec[] = mobile
    ? [
        { x: -3.2, z: -1.5, w: 2.5, d: 2.3, h: 4.6, floors: 5 },
        { x: 0.2, z: 1.8, w: 2.9, d: 2.1, h: 6.0, mat: beigeMat, goldBand: true, floors: 6 },
        { x: 3.6, z: -0.8, w: 2.3, d: 2.5, h: 3.8, floors: 4 },
        { x: -1.0, z: -4.2, w: 3.1, d: 1.9, h: 3.3, mat: stoneMat, floors: 3 },
        { x: 2.4, z: 4.0, w: 1.9, d: 1.9, h: 3.0, floors: 3 },
      ]
    : [
        { x: -4.4, z: -2.1, w: 2.7, d: 2.5, h: 5.2, rot: 0.06, floors: 6 },
        { x: -1.5, z: 1.35, w: 2.3, d: 2.1, h: 3.6, mat: beigeMat, rot: -0.08, floors: 4 },
        { x: 1.7, z: -1.05, w: 2.9, d: 2.7, h: 6.6, goldBand: true, floors: 7 },
        { x: 4.55, z: 1.7, w: 2.1, d: 2.3, h: 4.3, mat: beigeMat, rot: 0.1, floors: 5 },
        { x: -3.15, z: 3.75, w: 2.5, d: 1.9, h: 3.1, floors: 3 },
        { x: 0.45, z: 4.35, w: 2.0, d: 2.0, h: 4.1, goldBand: true, rot: -0.04, floors: 4 },
        { x: 3.95, z: -3.7, w: 2.4, d: 2.1, h: 5.4, mat: stoneMat, floors: 6 },
        { x: -5.45, z: 0.55, w: 1.7, d: 1.7, h: 2.6, floors: 3 },
        { x: 5.75, z: -0.45, w: 1.8, d: 2.2, h: 3.4, mat: beigeMat, floors: 4 },
      ];

  const winGeoX = new THREE.BoxGeometry(0.08, 0.28, 0.22);
  const winGeoZ = new THREE.BoxGeometry(0.22, 0.28, 0.08);

  for (const b of buildings) {
    const group = new THREE.Group();
    group.position.set(b.x, 0, b.z);
    group.rotation.y = b.rot ?? 0;
    const mat = b.mat ?? bodyMat;

    // Podium / plinth — reads as a building base
    const plinth = new THREE.Mesh(
      new THREE.BoxGeometry(b.w + 0.22, 0.28, b.d + 0.22),
      forestMat
    );
    plinth.position.y = 0.14;
    plinth.castShadow = !mobile;
    plinth.receiveShadow = !mobile;
    group.add(plinth);

    // Main mass
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(b.w, b.h, b.d), mat);
    mesh.position.y = 0.28 + b.h / 2;
    mesh.castShadow = !mobile;
    mesh.receiveShadow = !mobile;
    group.add(mesh);

    // Slight upper setback so the silhouette isn't a single box
    const capH = Math.min(0.55, b.h * 0.12);
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(b.w * 0.82, capH, b.d * 0.82),
      mat
    );
    cap.position.y = 0.28 + b.h + capH / 2;
    cap.castShadow = !mobile;
    group.add(cap);

    // Roof slab accent
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(b.w * 0.88, 0.1, b.d * 0.88),
      goldMat
    );
    roof.position.y = 0.28 + b.h + capH + 0.05;
    roof.castShadow = !mobile;
    group.add(roof);

    if (b.goldBand) {
      const band = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 0.05, 0.12, b.d + 0.05),
        goldMat
      );
      band.position.y = 0.28 + b.h * 0.36;
      group.add(band);
    }

    // Window bays — skip on very small mobile counts
    if (!mobile || (b.floors ?? 0) >= 4) {
      const floors = b.floors ?? 4;
      const colsX = Math.max(2, Math.round(b.w / 0.7));
      const colsZ = Math.max(2, Math.round(b.d / 0.7));
      const startY = 0.28 + 0.55;
      const endY = 0.28 + b.h - 0.45;
      for (let f = 0; f < floors; f++) {
        const fy = startY + ((endY - startY) * f) / Math.max(floors - 1, 1);
        for (let c = 0; c < colsX; c++) {
          const zx = -b.w / 2 + 0.38 + (c * (b.w - 0.76)) / Math.max(colsX - 1, 1);
          const w1 = new THREE.Mesh(winGeoZ, windowMat);
          w1.position.set(zx, fy, b.d / 2 + 0.01);
          group.add(w1);
          const w2 = new THREE.Mesh(winGeoZ, windowMat);
          w2.position.set(zx, fy, -b.d / 2 - 0.01);
          group.add(w2);
        }
        for (let c = 0; c < colsZ; c++) {
          const zz = -b.d / 2 + 0.38 + (c * (b.d - 0.76)) / Math.max(colsZ - 1, 1);
          const w3 = new THREE.Mesh(winGeoX, windowMat);
          w3.position.set(b.w / 2 + 0.01, fy, zz);
          group.add(w3);
          const w4 = new THREE.Mesh(winGeoX, windowMat);
          w4.position.set(-b.w / 2 - 0.01, fy, zz);
          group.add(w4);
        }
      }
    }

    root.add(group);
  }

  // Arch gate motif (two pillars + curved lintel)
  const archGroup = new THREE.Group();
  archGroup.position.set(0, 0, 6.6);
  const pillarGeo = new THREE.BoxGeometry(0.38, 3.4, 0.38);
  const pL = new THREE.Mesh(pillarGeo, forestMat);
  pL.position.set(-1.4, 1.7, 0);
  pL.castShadow = !mobile;
  const pR = new THREE.Mesh(pillarGeo, forestMat);
  pR.position.set(1.4, 1.7, 0);
  pR.castShadow = !mobile;
  archGroup.add(pL, pR);

  const archCurve = new THREE.Mesh(
    new THREE.TorusGeometry(1.4, 0.14, 12, mobile ? 28 : 48, Math.PI),
    goldMat
  );
  archCurve.rotation.y = Math.PI / 2;
  archCurve.rotation.z = Math.PI / 2;
  archCurve.position.set(0, 3.4, 0);
  archCurve.castShadow = !mobile;
  archGroup.add(archCurve);

  const lintel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.16, 0.42), goldMat);
  lintel.position.set(0, 3.52, 0);
  archGroup.add(lintel);
  root.add(archGroup);

  // Low gold path
  const path = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.045, 15.5),
    new THREE.MeshStandardMaterial({ color: GOLD_PALE, roughness: 0.55, metalness: 0.28 })
  );
  path.position.set(0, 0.05, 0.35);
  path.receiveShadow = !mobile;
  root.add(path);

  // Courtyard trees
  const treePositions: [number, number][] = mobile
    ? [
        [-2.2, 2.6],
        [2.8, 2.2],
        [-0.6, -2.8],
      ]
    : [
        [-2.4, 2.7],
        [2.9, 2.35],
        [-0.7, -2.9],
        [5.1, 3.4],
        [-5.8, -2.4],
        [1.2, 5.6],
        [-4.8, 4.4],
      ];

  const canopyGeo = new THREE.SphereGeometry(0.55, mobile ? 8 : 12, mobile ? 6 : 10);
  const trunkGeo = new THREE.CylinderGeometry(0.07, 0.1, 0.7, 6);

  for (const [tx, tz] of treePositions) {
    const tree = new THREE.Group();
    tree.position.set(tx, 0, tz);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.35;
    trunk.castShadow = !mobile;
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.y = 1.05;
    canopy.scale.set(1, 0.85, 1);
    canopy.castShadow = !mobile;
    tree.add(trunk, canopy);
    root.add(tree);
  }

  if (fallback) fallback.hidden = true;
  canvas.hidden = false;
  section.classList.add('is-ready');

  let target = 0;
  let progress = 0;
  let raf = 0;
  let disposed = false;
  let inView = true;

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

  const setCamera = (tRaw: number) => {
    const t = smoothstep(tRaw);
    const angle = -0.62 + t * Math.PI * 1.22;
    const radius = 18.2 - t * 6.4;
    const y = 7.6 + Math.sin(t * Math.PI) * 2.15;
    camera.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    const lookY = 1.45 + t * 1.65;
    camera.lookAt(0.15, lookY, -0.35 + t * -1.05);
    root.rotation.y = t * 0.1;
    sun.position.set(14 - t * 4, 24, 10 + t * 3);
  };

  const tick = () => {
    if (disposed) return;
    raf = 0;
    const delta = target - progress;
    // Critically damped-ish lerp — smooth scrub, no stair-step
    progress += delta * (Math.abs(delta) > 0.002 ? 0.085 : 1);
    if (Math.abs(delta) <= 0.002) progress = target;
    setCamera(progress);
    renderer.render(scene, camera);
    if (inView && Math.abs(target - progress) > 0.0008) {
      raf = requestAnimationFrame(tick);
    }
  };

  const onScroll = () => {
    target = readProgress();
    if (!raf && inView) raf = requestAnimationFrame(tick);
  };

  resize();
  target = readProgress();
  progress = target;
  setCamera(progress);
  renderer.render(scene, camera);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resize);

  const vis = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting);
      if (!inView && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (inView) {
        onScroll();
      }
    },
    { threshold: 0 }
  );
  vis.observe(section);

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
