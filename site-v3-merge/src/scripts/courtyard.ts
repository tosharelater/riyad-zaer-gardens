import * as THREE from 'three';

/** Abstract courtyard massing — original RZ motif, not a product clone. */
export function mountCourtyard(canvas: HTMLCanvasElement) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersFine = window.matchMedia('(pointer: fine)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 4.6, 9.2);
  camera.lookAt(0, 0.4, 0);

  const gold = new THREE.Color('#c8b568');
  const forest = new THREE.Color('#0a3d35');
  const ink = new THREE.Color('#002d2d');

  const root = new THREE.Group();
  scene.add(root);

  const lineMat = new THREE.LineBasicMaterial({
    color: gold,
    transparent: true,
    opacity: 0.78,
  });
  const softMat = new THREE.MeshBasicMaterial({
    color: forest,
    transparent: true,
    opacity: 0.22,
    wireframe: true,
  });
  const fillMat = new THREE.MeshBasicMaterial({
    color: ink,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });

  const makeBoxEdges = (w: number, h: number, d: number, x: number, y: number, z: number) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const edges = new THREE.EdgesGeometry(geo);
    const lines = new THREE.LineSegments(edges, lineMat.clone());
    lines.position.set(x, y, z);
    const mesh = new THREE.Mesh(geo, softMat.clone());
    mesh.position.copy(lines.position);
    root.add(mesh, lines);
    return { mesh, lines };
  };

  // Courtyard plan: four blocks around an open center (cœur d'îlot)
  makeBoxEdges(2.2, 2.8, 1.1, -2.4, 1.4, -1.8);
  makeBoxEdges(2.2, 3.4, 1.1, 2.4, 1.7, -1.8);
  makeBoxEdges(1.1, 2.6, 2.4, -2.6, 1.3, 1.6);
  makeBoxEdges(1.1, 3.1, 2.4, 2.6, 1.55, 1.6);
  makeBoxEdges(5.4, 0.08, 4.2, 0, 0.04, 0); // ground plate

  // Garden core — low prism + vertical axis
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.7, 0.35, 6),
    fillMat,
  );
  core.position.set(0, 0.25, 0);
  root.add(core);

  const axisGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.1, 0),
    new THREE.Vector3(0, 3.2, 0),
  ]);
  const axis = new THREE.Line(axisGeo, lineMat.clone());
  root.add(axis);

  // Floating gold accents
  const accents: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.12 + i * 0.02, 0),
      new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.85 }),
    );
    const a = (i / 5) * Math.PI * 2;
    m.position.set(Math.cos(a) * 1.35, 0.9 + i * 0.25, Math.sin(a) * 1.1);
    root.add(m);
    accents.push(m);
  }

  const pointer = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const onMove = (e: PointerEvent) => {
    if (!prefersFine) return;
    const r = canvas.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  let scrollT = 0;
  const setScroll = (t: number) => {
    scrollT = t;
  };

  const resize = () => {
    const parent = canvas.parentElement;
    const w = parent?.clientWidth || canvas.clientWidth || 600;
    const h = parent?.clientHeight || canvas.clientHeight || 480;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  let raf = 0;
  const clock = new THREE.Clock();

  const tick = () => {
    const t = clock.getElapsedTime();
    pointer.x += (target.x - pointer.x) * 0.06;
    pointer.y += (target.y - pointer.y) * 0.06;

    if (!reduce) {
      root.rotation.y = pointer.x * 0.35 + scrollT * 0.9 + t * 0.08;
      root.rotation.x = -0.18 + pointer.y * 0.12 + scrollT * 0.15;
      root.position.y = Math.sin(t * 0.6) * 0.06;
      accents.forEach((m, i) => {
        m.rotation.x = t * 0.7 + i;
        m.rotation.y = t * 0.5 + i * 0.4;
        m.position.y = 0.9 + i * 0.25 + Math.sin(t * 1.2 + i) * 0.08;
      });
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return {
    setScroll,
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    },
  };
}
