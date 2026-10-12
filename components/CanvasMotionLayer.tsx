/**
 * CanvasMotionLayer — Canvas 2D decorative particle system
 * Sits fixed behind all content, pointer-events:none, z-index:2
 * Driven by GSAP ticker; scene params stored in refs to avoid React re-renders.
 */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

type Scene = 'hero' | 'heritage' | 'city' | 'everyday' | 'outro';

interface Props {
  scene: Scene;
  motionActive: boolean;
  scrollProgress: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  maxLife: number;
}

interface SceneState {
  intensity: number;   // 0–1, particle emission rate
  speed: number;       // base speed multiplier
  dirX: number;        // base horizontal drift
  dirY: number;        // base vertical drift
  hue: number;         // hue rotation offset (degrees)
  saturation: number;  // 0-100
}

/** Target values for each scene — GSAP tweens sceneState to these. */
const SCENE_TARGETS: Record<Scene, SceneState> = {
  hero:      { intensity: 1.0, speed: 0.6,  dirX:  0.2,  dirY: -0.5, hue: 40,  saturation: 55 },
  heritage:  { intensity: 0.3, speed: 0.25, dirX:  0.3,  dirY: -0.3, hue: 30,  saturation: 60 },
  city:      { intensity: 0.85,speed: 1.1,  dirX: -1.0,  dirY: -0.1, hue: 0,   saturation: 70 },
  everyday:  { intensity: 0.08,speed: 0.15, dirX:  0.0,  dirY: -0.15,hue: 45,  saturation: 30 },
  outro:     { intensity: 0.04,speed: 0.1,  dirX:  0.0,  dirY: -0.1, hue: 42,  saturation: 20 },
};

/** Desktop max particle count per scene */
const SCENE_MAX_DESKTOP: Record<Scene, number> = {
  hero: 160, heritage: 40, city: 120, everyday: 20, outro: 10,
};
const SCENE_MAX_MOBILE: Record<Scene, number> = {
  hero: 60,  heritage: 15, city: 45,  everyday: 8,  outro: 4,
};

function isMobile() {
  return window.innerWidth < 768;
}

export default function CanvasMotionLayer({ scene, motionActive, scrollProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sceneStateRef = useRef<SceneState>({ ...SCENE_TARGETS.hero });
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const activeRef = useRef(false);   // true when ticker is running
  const tickerIdRef = useRef<gsap.TickerCallback | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);

  // ── Resize handler ────────────────────────────────────────────────────────
  const applySize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mobile = isMobile();
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2.0);
    const w = window.innerWidth;
    const h = window.innerHeight;
    sizeRef.current = { w, h, dpr };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
  };

  // ── Particle factory ───────────────────────────────────────────────────────
  const spawnParticle = (scene: Scene): Particle => {
    const { w, h } = sizeRef.current;
    const state = sceneStateRef.current;
    const mobile = isMobile();

    // Different spawn positions per scene
    let x: number, y: number;
    if (scene === 'hero') {
      // Spawn spread across top 2/3 of screen
      x = Math.random() * w;
      y = Math.random() * h * 0.7;
    } else if (scene === 'city') {
      // Enter from right edge
      x = w + 10;
      y = Math.random() * h;
    } else {
      x = Math.random() * w;
      y = Math.random() * h;
    }

    const speed = state.speed * (0.5 + Math.random() * 0.8);
    const angle = Math.atan2(state.dirY, state.dirX) + (Math.random() - 0.5) * 1.2;
    const maxLife = 120 + Math.random() * 180;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 0,
      size: mobile ? 1 + Math.random() * 1.5 : 1 + Math.random() * 2.2,
      life: 0,
      maxLife,
    };
  };

  // ── Render loop tick ───────────────────────────────────────────────────────
  const tick = (time: number, deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h, dpr } = sizeRef.current;
    const state = sceneStateRef.current;
    const particles = particlesRef.current;
    const mobile = isMobile();
    const maxCount = mobile ? SCENE_MAX_MOBILE[scene] : SCENE_MAX_DESKTOP[scene];

    // dt clamped to avoid huge jumps on tab switch
    const dt = Math.min(deltaTime / 16.67, 3);

    // Clear
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Spawn new particles
    const spawnCount = Math.floor(state.intensity * 3 * dt);
    for (let i = 0; i < spawnCount; i++) {
      if (particles.length < maxCount) {
        particles.push(spawnParticle(scene));
      }
    }

    // Update & draw
    const baseColor = scene === 'city'
      ? `hsla(${6 + state.hue}, ${state.saturation}%, 60%,`
      : `hsla(${38 + state.hue}, ${state.saturation}%, 78%,`;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;

      // Fade in/out
      const t = p.life / p.maxLife;
      if (t < 0.2) {
        p.alpha = t / 0.2;
      } else if (t > 0.7) {
        p.alpha = 1 - (t - 0.7) / 0.3;
      } else {
        p.alpha = 1;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Heritage: slight curve (Bézier feel via sinusoidal drift)
      if (scene === 'heritage') {
        p.vx += Math.sin(p.life * 0.08) * 0.005;
      }

      // Remove dead particles
      if (p.life >= p.maxLife || p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const finalAlpha = p.alpha * Math.min(state.intensity + 0.1, 1) * 0.65;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${baseColor}${finalAlpha})`;
      ctx.fill();
    }

    void time; // suppress unused-warning
  };

  // ── Start / stop ticker ────────────────────────────────────────────────────
  const startTicker = () => {
    if (activeRef.current) return;
    if (reducedMotionRef.current) return;
    activeRef.current = true;
    const fn: gsap.TickerCallback = (time, deltaTime) => tick(time, deltaTime);
    tickerIdRef.current = fn;
    gsap.ticker.add(fn);
  };

  const stopTicker = () => {
    if (!activeRef.current) return;
    activeRef.current = false;
    if (tickerIdRef.current) {
      gsap.ticker.remove(tickerIdRef.current);
      tickerIdRef.current = null;
    }
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const { dpr, w, h } = sizeRef.current;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
      }
    }
    particlesRef.current = [];
  };

  // ── Tween to new scene ─────────────────────────────────────────────────────
  const transitionToScene = (s: Scene) => {
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(sceneStateRef.current, {
      duration: 1.4,
      ease: 'power2.inOut',
      ...SCENE_TARGETS[s],
    });
  };

  // ── Effects ────────────────────────────────────────────────────────────────

  // Initial setup: size, reduced-motion, visibility
  useEffect(() => {
    // Fail-safe: check canvas context
    try {
      const testCtx = canvasRef.current?.getContext('2d');
      if (!testCtx) return; // silently bail
    } catch {
      return;
    }

    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    applySize();

    // ResizeObserver (debounced)
    const ro = new ResizeObserver(() => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        applySize();
        particlesRef.current = [];
      }, 120);
    });
    ro.observe(document.documentElement);

    // visibilitychange
    const onVisibility = () => {
      if (document.hidden) {
        stopTicker();
      } else if (motionActive && !reducedMotionRef.current) {
        startTicker();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // prefers-reduced-motion change
    const mqListener = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) stopTicker();
      else if (motionActive) startTicker();
    };
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', mqListener);

    return () => {
      stopTicker();
      if (tweenRef.current) tweenRef.current.kill();
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      mq.removeEventListener('change', mqListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // motionActive changes
  useEffect(() => {
    if (motionActive && !reducedMotionRef.current) {
      startTicker();
    } else {
      stopTicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionActive]);

  // scene changes → smooth transition
  useEffect(() => {
    transitionToScene(scene);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // scrollProgress available for future use (drives nothing now to avoid scroll hijacking)
  useEffect(() => {
    void scrollProgress;
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="canvas-motion-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
