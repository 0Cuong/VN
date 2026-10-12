import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SpaceSceneProps {
  paused?: boolean;
}

export default function SpaceScene({ paused = false }: SpaceSceneProps) {
  const pausedRef = useRef<boolean>(paused);
  const startAnimationRef = useRef<(() => void) | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) startAnimationRef.current?.();
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reducedMotion, powerPreference: 'low-power' });
    } catch {
      host.classList.add('webgl-unavailable');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.setSize(host.clientWidth || window.innerWidth, host.clientHeight || window.innerHeight);
    if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
      (renderer as any).outputColorSpace = THREE.SRGBColorSpace;
    }
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.7);

    // Warm lacquer gold and amber ambient lighting
    const ambient = new THREE.AmbientLight(0xf4f0e8, 0.9);
    scene.add(ambient);

    const lacquerLight = new THREE.PointLight(0xb52b26, 16, 18);
    lacquerLight.position.set(3.5, 2.5, 4);
    scene.add(lacquerLight);

    const goldLight = new THREE.PointLight(0xb69a62, 14, 16);
    goldLight.position.set(-4, -2, 2);
    scene.add(goldLight);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    // Knot geometry with lacquer gold aesthetic
    const torusGeometry = new THREE.TorusKnotGeometry(1.15, 0.28, 220, 26, 2, 5);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb69a62,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      iridescence: 0.5,
      iridescenceIOR: 1.35,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    sculpture.add(torus);

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.008, 6, 180),
      new THREE.MeshBasicMaterial({ color: 0xb52b26, transparent: true, opacity: 0.55 })
    );
    halo.rotation.set(1.15, 0.2, -0.3);
    sculpture.add(halo);

    // Ambient floating particles
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.5 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.68;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 1.5;

      const tint = Math.random();
      // Warm gold to subtle ivory speckles
      colors[i * 3] = 0.72 + tint * 0.25;
      colors[i * 3 + 1] = 0.6 + tint * 0.2;
      colors[i * 3 + 2] = 0.38 + tint * 0.3;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.016,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const onPointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 0.55;
      pointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 0.35;
    };

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    };

    host.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      frame = 0;
      if (!reducedMotion && !pausedRef.current) {
        targetX += (pointerY - targetX) * 0.025;
        targetY += (pointerX - targetY) * 0.025;
        sculpture.rotation.x = targetX * 0.55 + Math.sin(performance.now() * 0.0002) * 0.08;
        sculpture.rotation.y += 0.0022;
        sculpture.rotation.z = targetY * 0.2;
        stars.rotation.y -= 0.00012;
        stars.rotation.x = targetX * 0.08;
      }
      renderer.render(scene, camera);
      if (!reducedMotion && !pausedRef.current) frame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!reducedMotion && !pausedRef.current && frame === 0) frame = window.requestAnimationFrame(animate);
    };

    startAnimationRef.current = startAnimation;
    renderer.render(scene, camera);
    startAnimation();

    return () => {
      window.cancelAnimationFrame(frame);
      startAnimationRef.current = null;
      host.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      torusGeometry.dispose();
      torusMaterial.dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      sculpture.clear();
      scene.clear();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="space-scene" ref={hostRef} aria-hidden="true" />;
}
