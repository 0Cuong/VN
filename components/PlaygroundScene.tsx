import { useState, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MOTION_EXPERIMENTS, type MotionExperiment, type PhotoItem } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface PlaygroundSceneProps {
  motionActive: boolean;
  onOpenArtwork?: (photo: PhotoItem) => void;
}

export default function PlaygroundScene({ motionActive, onOpenArtwork }: PlaygroundSceneProps) {
  const [activeExp, setActiveExp] = useState<MotionExperiment>(MOTION_EXPERIMENTS[0]);
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);

  // Magnetic Grid quickTo setters map
  const magnetSetters = useRef<WeakMap<HTMLElement, { x: (v: number) => void; y: (v: number) => void; scale: (v: number) => void }>>(new WeakMap());

  const { contextSafe } = useGSAP(() => {
    if (!stageRef.current || !motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stage = stageRef.current;
    gsap.killTweensOf(stage.querySelectorAll('.playground-anim-target'));

    if (activeExp.id === 'exp-mask') {
      const maskEl = stage.querySelector<HTMLElement>('.playground-mask-target');
      if (maskEl) {
        gsap.fromTo(
          maskEl,
          { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', scale: 1.15 },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 1.3, ease: 'power4.out' }
        );
      }
    } else if (activeExp.id === 'exp-kinetic') {
      const letters = stage.querySelectorAll<HTMLElement>('.kinetic-char');
      gsap.fromTo(
        letters,
        { yPercent: 120, rotateX: -85, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1, stagger: { each: 0.04, from: 'center' }, ease: 'elastic.out(1, 0.5)' }
      );
    } else if (activeExp.id === 'exp-curtain') {
      const leftWipe = stage.querySelector<HTMLElement>('.curtain-left');
      const rightWipe = stage.querySelector<HTMLElement>('.curtain-right');
      if (leftWipe && rightWipe) {
        gsap.fromTo(
          [leftWipe, rightWipe],
          { scaleX: 1 },
          { scaleX: 0, duration: 1.1, stagger: 0.15, ease: 'expo.inOut' }
        );
      }
    }
  }, { scope: containerRef, dependencies: [activeExp.id, motionActive], revertOnUpdate: true });

  // 3D Perspective Tilt for experiment 02
  const handleStagePointerMove = contextSafe((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (activeExp.id === 'exp-perspective' && tiltCardRef.current) {
      const rect = tiltCardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(tiltCardRef.current, {
        rotateY: x * 24,
        rotateX: -y * 24,
        transformPerspective: 900,
        ease: 'power2.out',
        duration: 0.4,
      });

      const depthLayer = tiltCardRef.current.querySelector<HTMLElement>('.tilt-depth-layer');
      if (depthLayer) {
        gsap.to(depthLayer, {
          x: x * 35,
          y: y * 35,
          ease: 'power2.out',
          duration: 0.4,
        });
      }
    }

    // Magnetic grid interaction
    if (activeExp.id === 'exp-mask') {
      const currentTarget = e.currentTarget as HTMLElement;
      const grid = currentTarget.querySelector('.magnet-dots-matrix') as HTMLElement | null;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const dots = grid.querySelectorAll('.magnet-dot');
      const cols = 7;
      const cellW = rect.width / cols;
      const cellH = rect.height / cols;

      dots.forEach((dot: any, idx: number) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const dotCenterX = rect.left + cellW * (col + 0.5);
        const dotCenterY = rect.top + cellH * (row + 0.5);
        const dx = e.clientX - dotCenterX;
        const dy = e.clientY - dotCenterY;
        const dist = Math.hypot(dx, dy);
        const maxDist = 120;
        const force = Math.max(0, 1 - dist / maxDist);

        let setters = magnetSetters.current.get(dot);
        if (!setters) {
          setters = {
            x: gsap.quickTo(dot, 'x', { duration: 0.2, ease: 'power3.out' }),
            y: gsap.quickTo(dot, 'y', { duration: 0.2, ease: 'power3.out' }),
            scale: gsap.quickTo(dot, 'scale', { duration: 0.2, ease: 'power3.out' }),
          };
          magnetSetters.current.set(dot, setters);
        }

        setters.x(dx * force * -0.2);
        setters.y(dy * force * -0.2);
        setters.scale(1 + force * 1.8);
      });
    }
  });

  const handleStagePointerLeave = contextSafe(() => {
    if (activeExp.id === 'exp-perspective' && tiltCardRef.current) {
      gsap.to(tiltCardRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      const depthLayer = tiltCardRef.current.querySelector<HTMLElement>('.tilt-depth-layer');
      if (depthLayer) {
        gsap.to(depthLayer, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
      }
    }

    if (stageRef.current) {
      const dots = stageRef.current.querySelectorAll<HTMLElement>('.magnet-dot');
      dots.forEach((dot) => {
        const setters = magnetSetters.current.get(dot);
        if (setters) {
          setters.x(0);
          setters.y(0);
          setters.scale(1);
        }
      });
    }
  });

  const triggerReplay = contextSafe(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;
    if (activeExp.id === 'exp-mask') {
      const maskEl = stage.querySelector<HTMLElement>('.playground-mask-target');
      if (maskEl) {
        gsap.fromTo(
          maskEl,
          { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', scale: 1.15 },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 1.3, ease: 'power4.out' }
        );
      }
    } else if (activeExp.id === 'exp-kinetic') {
      const letters = stage.querySelectorAll<HTMLElement>('.kinetic-char');
      gsap.fromTo(
        letters,
        { yPercent: 120, rotateX: -85, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1, stagger: { each: 0.04, from: 'center' }, ease: 'elastic.out(1, 0.5)' }
      );
    } else if (activeExp.id === 'exp-curtain') {
      const leftWipe = stage.querySelector<HTMLElement>('.curtain-left');
      const rightWipe = stage.querySelector<HTMLElement>('.curtain-right');
      if (leftWipe && rightWipe) {
        gsap.fromTo(
          [leftWipe, rightWipe],
          { scaleX: 1 },
          { scaleX: 0, duration: 1.1, stagger: 0.15, ease: 'expo.inOut' }
        );
      }
    }
  });

  return (
    <section className="playground-section section-dark" ref={containerRef} id="playground" aria-labelledby="playground-title">
      <div className="page-wrap">
        <header className="playground-intro section-heading">
          <div className="section-meta-top">
            <span className="section-idx">PHÂN CẢNH 05 // THỬ NGHIỆM CHUYỂN ĐỘNG</span>
            <span className="section-badge-accent">GSAP MOTION ENGINEERING</span>
          </div>

          <h2 id="playground-title" className="section-title">
            Phòng thí nghiệm GSAP.<br />
            <span className="font-serif text-accent">Nơi chuyển động có linh hồn.</span>
          </h2>

          <p className="section-lead">
            Không phô trương kỹ xảo vô nghĩa. Mỗi thí nghiệm dưới đây đều giải quyết một bài toán thị giác: tạo chiều sâu, kiểm soát nhịp chuyển cảnh, và mang đến phản hồi xúc giác tinh tế cho người dùng.
          </p>
        </header>

        {/* Studio Layout: Selector on Left, Interactive Stage on Right */}
        <div className="playground-studio">
          {/* Left: Study Selector */}
          <div className="playground-nav" role="tablist" aria-label="Danh sách thí nghiệm chuyển động">
            {MOTION_EXPERIMENTS.map((exp) => (
              <button
                key={exp.id}
                role="tab"
                aria-selected={activeExp.id === exp.id}
                className={`exp-tab-btn ${activeExp.id === exp.id ? 'is-active' : ''}`}
                onClick={() => setActiveExp(exp)}
              >
                <div className="exp-tab-head">
                  <span className="exp-num">{exp.number}</span>
                  <span className="exp-tech">{exp.technique}</span>
                </div>
                <h3 className="exp-title">{exp.titleVi}</h3>
                <p className="exp-desc">{exp.description}</p>
                <div className="exp-code-badge">
                  <code>{exp.gsapApi}</code>
                </div>
                {exp.motionRationale && (
                  <p className="exp-pedagogy-note">✦ {exp.motionRationale}</p>
                )}
              </button>
            ))}
          </div>

          {/* Right: Live Interactive Stage */}
          <div
            className="playground-stage-wrapper"
            ref={stageRef}
            onPointerMove={handleStagePointerMove}
            onPointerLeave={handleStagePointerLeave}
          >
            <div className="stage-top-bar">
              <span className="stage-label">LIVE GSAP STAGE // STUDY {activeExp.number}</span>
              <button className="stage-replay-btn" onClick={triggerReplay} title="Chạy lại animation">
                <span>Phát lại</span>
                <span>↻</span>
              </button>
            </div>

            <div className="stage-viewport">
              {/* Study 01: Polygonal Clip-Path */}
              {activeExp.id === 'exp-mask' && (
                <div className="stage-demo-box demo-mask">
                  <div className="playground-mask-target playground-anim-target">
                    <ImageWithFallback
                      key={`mask-${activeExp.image.id}`}
                      photo={activeExp.image}
                      aspectRatio="16/10"
                      className="stage-photo"
                      showExif={false}
                      onOpenDetail={onOpenArtwork ? () => onOpenArtwork(activeExp.image) : undefined}
                    />
                  </div>
                  <div className="stage-hud-meta">
                    <span className="hud-tag">POLYGONAL APERTURE SHUTTER</span>
                    <span className="hud-coords">{activeExp.image.coordinates}</span>
                  </div>
                  {/* Subtle matrix dots */}
                  <div className="magnet-dots-matrix" aria-hidden="true">
                    {Array.from({ length: 49 }, (_, i) => (
                      <span key={i} className="magnet-dot" />
                    ))}
                  </div>
                </div>
              )}

              {/* Study 02: 3D Perspective Tilt */}
              {activeExp.id === 'exp-perspective' && (
                <div className="stage-demo-box demo-tilt">
                  <div className="tilt-card-wrapper" ref={tiltCardRef}>
                    <ImageWithFallback
                      key={`tilt-${activeExp.image.id}`}
                      photo={activeExp.image}
                      aspectRatio="16/10"
                      className="stage-photo"
                      showExif={false}
                      onOpenDetail={onOpenArtwork ? () => onOpenArtwork(activeExp.image) : undefined}
                    />
                    <div className="tilt-depth-layer">
                      <span className="tilt-monolith-tag">LANDMARK 81 // 461.2M</span>
                      <h4 className="tilt-monolith-title">CHIỀU SÂU THỊ SAI</h4>
                    </div>
                  </div>
                  <p className="stage-hint">✦ Di chuyển con trỏ qua khung hình để cảm nhận chiều sâu 3D (GSAP quickTo)</p>
                </div>
              )}

              {/* Study 03: Kinetic Typography */}
              {activeExp.id === 'exp-kinetic' && (
                <div className="stage-demo-box demo-kinetic">
                  <div className="stage-bg-dim">
                    <ImageWithFallback
                      key={`kinetic-${activeExp.image.id}`}
                      photo={activeExp.image}
                      aspectRatio="16/10"
                      className="stage-photo"
                      showExif={false}
                      onOpenDetail={onOpenArtwork ? () => onOpenArtwork(activeExp.image) : undefined}
                    />
                  </div>
                  <div className="kinetic-text-board" aria-label="VIỆT NAM ĐƯƠNG ĐẠI">
                    <div className="kinetic-word-row">
                      {'VIỆT'.split('').map((char, i) => (
                        <span key={i} className="kinetic-char playground-anim-target">{char}</span>
                      ))}
                      <span className="kinetic-char space">&nbsp;</span>
                      {'NAM'.split('').map((char, i) => (
                        <span key={i} className="kinetic-char playground-anim-target">{char}</span>
                      ))}
                    </div>
                    <div className="kinetic-word-row sub">
                      {'CONTEMPORARY'.split('').map((char, i) => (
                        <span key={i} className="kinetic-char playground-anim-target">{char}</span>
                      ))}
                    </div>
                  </div>
                  <p className="stage-hint">✦ Staggering glyph elasticity với điểm xuất phát đối xứng từ trung tâm</p>
                </div>
              )}

              {/* Study 04: Split Curtain Wipe */}
              {activeExp.id === 'exp-curtain' && (
                <div className="stage-demo-box demo-curtain">
                  <div className="curtain-underlay">
                    <ImageWithFallback
                      key={`curtain-${activeExp.image.id}`}
                      photo={activeExp.image}
                      aspectRatio="16/10"
                      className="stage-photo"
                      showExif={false}
                      onOpenDetail={onOpenArtwork ? () => onOpenArtwork(activeExp.image) : undefined}
                    />
                    <div className="curtain-caption">
                      <span className="badge">SLOW DRIP CAFE</span>
                      <h4>KHOẢNG LẶNG ĐỜI THƯỜNG</h4>
                    </div>
                  </div>
                  <div className="curtain-left curtain-wipe playground-anim-target" />
                  <div className="curtain-right curtain-wipe playground-anim-target" />
                  <p className="stage-hint">✦ Dual-wipe sơn mài đảo chiều tạo cảm giác kéo rèm nhà hát</p>
                </div>
              )}
            </div>

            <div className="stage-foot-bar">
              <span className="foot-status">GSAP ENGINE: V3.14+ • HARDWARE ACCELERATED</span>
              <span className="foot-study">STUDY: {activeExp.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
