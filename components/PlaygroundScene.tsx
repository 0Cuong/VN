import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  HERITAGE_PHOTOS,
  MODERN_CITY_PHOTOS,
  EVERYDAY_PHOTOS,
  type PhotoItem,
} from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface PlaygroundSceneProps {
  motionActive: boolean;
  onOpenArtwork?: (photo: PhotoItem) => void;
}

export default function PlaygroundScene({ motionActive, onOpenArtwork }: PlaygroundSceneProps) {
  const containerRef = useRef<HTMLElement>(null);

  // References for Act 1: Mask
  const maskStageRef = useRef<HTMLDivElement>(null);
  const magnetSetters = useRef<WeakMap<HTMLElement, { x: (v: number) => void; y: (v: number) => void; scale: (v: number) => void }>>(new WeakMap());

  // References for Act 2: 3D Tilt
  const tiltStageRef = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);

  // References for Act 3: Kinetic Type
  const kineticStageRef = useRef<HTMLDivElement>(null);

  // References for Act 4: Curtain Wipe
  const curtainStageRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Intro header reveal
    gsap.from('.playground-intro .reveal-fade', {
      y: 28,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 78%',
      },
    });

    // ── Act 01: Polygonal Aperture Reveal (Auto on scroll) ───────────────────
    if (maskStageRef.current) {
      const maskEl = maskStageRef.current.querySelector<HTMLElement>('.playground-mask-target');
      if (maskEl) {
        gsap.fromTo(
          maskEl,
          { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', scale: 1.15 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: maskStageRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }

    // ── Act 02: 3D Depth Monolith (Auto on scroll) ──────────────────────────
    if (tiltCardRef.current && tiltStageRef.current) {
      const card = tiltCardRef.current;
      gsap.fromTo(
        card,
        { rotateY: -12, rotateX: 10, scale: 0.94, opacity: 0.7 },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tiltStageRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }

    // ── Act 03: Kinetic Typography Choreography (Auto on scroll) ────────────
    if (kineticStageRef.current) {
      const letters = kineticStageRef.current.querySelectorAll<HTMLElement>('.kinetic-char');
      if (letters.length > 0) {
        gsap.fromTo(
          letters,
          { yPercent: 120, rotateX: -85, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: { each: 0.035, from: 'center' },
            ease: 'elastic.out(1, 0.45)',
            scrollTrigger: {
              trigger: kineticStageRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }

    // ── Act 04: Split Curtain Narrative Wipe (Auto on scroll) ───────────────
    if (curtainStageRef.current) {
      const leftWipe = curtainStageRef.current.querySelector<HTMLElement>('.curtain-left');
      const rightWipe = curtainStageRef.current.querySelector<HTMLElement>('.curtain-right');
      if (leftWipe && rightWipe) {
        gsap.fromTo(
          [leftWipe, rightWipe],
          { scaleX: 1 },
          {
            scaleX: 0,
            duration: 1.2,
            stagger: 0.14,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: curtainStageRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }
  }, { scope: containerRef, dependencies: [motionActive], revertOnUpdate: true });

  // ── Replay handlers for user-initiated replay ─────────────────────────────
  const replayMask = contextSafe(() => {
    if (!maskStageRef.current || !motionActive) return;
    const maskEl = maskStageRef.current.querySelector<HTMLElement>('.playground-mask-target');
    if (maskEl) {
      gsap.fromTo(
        maskEl,
        { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', scale: 1.15 },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 1.3, ease: 'power4.out' }
      );
    }
  });

  const replayTilt = contextSafe(() => {
    if (!tiltCardRef.current || !motionActive) return;
    gsap.fromTo(
      tiltCardRef.current,
      { rotateY: 16, rotateX: -12, scale: 0.95 },
      { rotateY: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
    );
  });

  const replayKinetic = contextSafe(() => {
    if (!kineticStageRef.current || !motionActive) return;
    const letters = kineticStageRef.current.querySelectorAll<HTMLElement>('.kinetic-char');
    gsap.fromTo(
      letters,
      { yPercent: 120, rotateX: -85, opacity: 0 },
      { yPercent: 0, rotateX: 0, opacity: 1, duration: 1, stagger: { each: 0.035, from: 'center' }, ease: 'elastic.out(1, 0.45)' }
    );
  });

  const replayCurtain = contextSafe(() => {
    if (!curtainStageRef.current || !motionActive) return;
    const leftWipe = curtainStageRef.current.querySelector<HTMLElement>('.curtain-left');
    const rightWipe = curtainStageRef.current.querySelector<HTMLElement>('.curtain-right');
    if (leftWipe && rightWipe) {
      gsap.fromTo(
        [leftWipe, rightWipe],
        { scaleX: 1 },
        { scaleX: 0, duration: 1.1, stagger: 0.15, ease: 'expo.inOut' }
      );
    }
  });

  // ── Interactive Tilt for Act 2 ────────────────────────────────────────────
  const handleTiltPointerMove = contextSafe((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(tiltCardRef.current, {
      rotateY: x * 22,
      rotateX: -y * 22,
      transformPerspective: 900,
      ease: 'power2.out',
      duration: 0.35,
    });

    const depthLayer = tiltCardRef.current.querySelector<HTMLElement>('.tilt-depth-layer');
    if (depthLayer) {
      gsap.to(depthLayer, {
        x: x * 30,
        y: y * 30,
        ease: 'power2.out',
        duration: 0.35,
      });
    }
  });

  const handleTiltPointerLeave = contextSafe(() => {
    if (!tiltCardRef.current) return;
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
  });

  // ── Interactive Matrix for Act 1 ──────────────────────────────────────────
  const handleMatrixPointerMove = contextSafe((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
      const maxDist = 110;
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

      setters.x(dx * force * -0.18);
      setters.y(dy * force * -0.18);
      setters.scale(1 + force * 1.6);
    });
  });

  const handleMatrixPointerLeave = contextSafe(() => {
    if (!maskStageRef.current) return;
    const dots = maskStageRef.current.querySelectorAll<HTMLElement>('.magnet-dot');
    dots.forEach((dot) => {
      const setters = magnetSetters.current.get(dot);
      if (setters) {
        setters.x(0);
        setters.y(0);
        setters.scale(1);
      }
    });
  });

  const incense = HERITAGE_PHOTOS[0];
  const landmark = MODERN_CITY_PHOTOS[1];
  const aodai = EVERYDAY_PHOTOS[1];
  const coffee = EVERYDAY_PHOTOS[0];

  return (
    <section className="playground-section section-dark" ref={containerRef} id="playground" aria-labelledby="playground-title">
      <div className="page-wrap">
        <header className="playground-intro section-heading">
          <div className="section-meta-top">
            <span className="section-idx reveal-fade">PHÂN CẢNH 05 // DẤU ẤN 0CUONG</span>
            <span className="section-badge-accent reveal-fade">DẤU ẤN CHUYỂN ĐỘNG</span>
          </div>

          <h2 id="playground-title" className="section-title reveal-fade">
            Triển lãm chuyển động GSAP.<br />
            <span className="font-serif text-accent">Nơi kỹ thuật thăng hoa cùng văn hóa.</span>
          </h2>

          <p className="section-lead reveal-fade">
            Không phô trương kỹ xảo vô nghĩa. Mỗi phân đoạn dưới đây tự động chuyển mình theo hành trình cuộn trang, mang đến chiều sâu không gian, nhịp thở điện ảnh và xúc cảm chân thực về đất nước Việt Nam.
          </p>
        </header>

        {/* Continuous 4-Act Motion Showcase Grid */}
        <div className="playground-showcase-grid">
          {/* ── Act 01: Polygonal Aperture Reveal ── */}
          <div
            className="playground-stage-wrapper showcase-card"
            ref={maskStageRef}
            onPointerMove={handleMatrixPointerMove}
            onPointerLeave={handleMatrixPointerLeave}
          >
            <div className="stage-top-bar">
              <span className="stage-label">01 // MỞ MÀN ĐA GIÁC CLIP-PATH</span>
              <button className="stage-replay-btn" onClick={replayMask} title="Phát lại hiệu ứng">
                <span>Phát lại</span>
                <span>↻</span>
              </button>
            </div>

            <div className="stage-viewport">
              <div className="stage-demo-box demo-mask">
                <div className="playground-mask-target">
                  <ImageWithFallback
                    photo={incense}
                    aspectRatio="16/10"
                    className="stage-photo"
                    showExif={false}
                    onOpenDetail={onOpenArtwork ? () => onOpenArtwork(incense) : undefined}
                  />
                </div>
                <div className="stage-hud-meta">
                  <span className="hud-tag">LÀNG HƯƠNG QUẢNG PHÚ CẦU</span>
                  <span className="hud-coords">{incense.location}</span>
                </div>
                <div className="magnet-dots-matrix" aria-hidden="true">
                  {Array.from({ length: 49 }, (_, i) => (
                    <span key={i} className="magnet-dot" />
                  ))}
                </div>
              </div>
            </div>

            <div className="stage-foot-bar">
              <div className="foot-info">
                <span className="foot-study">Hương đỏ làng nghề</span>
                <p className="foot-desc">Mở góc điện ảnh đa giác từ tâm khung hình mô phỏng màn trập máy ảnh.</p>
              </div>
              <div className="exp-code-badge">
                <code>clipPath + power4.out</code>
              </div>
            </div>
          </div>

          {/* ── Act 02: 3D Spatial Tilt & Monolith ── */}
          <div
            className="playground-stage-wrapper showcase-card"
            ref={tiltStageRef}
            onPointerMove={handleTiltPointerMove}
            onPointerLeave={handleTiltPointerLeave}
          >
            <div className="stage-top-bar">
              <span className="stage-label">02 // KHÔNG GIAN THỊ SAI 3D ĐA TẦNG</span>
              <button className="stage-replay-btn" onClick={replayTilt} title="Phát lại hiệu ứng">
                <span>Phát lại</span>
                <span>↻</span>
              </button>
            </div>

            <div className="stage-viewport">
              <div className="stage-demo-box demo-tilt">
                <div className="tilt-card-wrapper" ref={tiltCardRef}>
                  <ImageWithFallback
                    photo={landmark}
                    aspectRatio="16/10"
                    className="stage-photo"
                    showExif={false}
                    onOpenDetail={onOpenArtwork ? () => onOpenArtwork(landmark) : undefined}
                  />
                  <div className="tilt-depth-layer">
                    <span className="tilt-monolith-tag">LANDMARK 81 // 461.2M</span>
                    <h4 className="tilt-monolith-title">CHIỀU SÂU THỊ SAI</h4>
                  </div>
                </div>
                <p className="stage-hint">✦ Tự kích hoạt khi cuộn đến, kèm phản hồi thị sai con trỏ mượt mà (GSAP quickTo)</p>
              </div>
            </div>

            <div className="stage-foot-bar">
              <div className="foot-info">
                <span className="foot-study">Đỉnh cao Landmark 81</span>
                <p className="foot-desc">Tách lớp không gian tiền cảnh và hậu cảnh tạo cảm giác chiều sâu 3D chân thực.</p>
              </div>
              <div className="exp-code-badge">
                <code>quickTo + rotateX/Y</code>
              </div>
            </div>
          </div>

          {/* ── Act 03: Kinetic Typography Choreography ── */}
          <div
            className="playground-stage-wrapper showcase-card"
            ref={kineticStageRef}
          >
            <div className="stage-top-bar">
              <span className="stage-label">03 // VŨ ĐIỆU KÝ TỰ KINETIC TYPE</span>
              <button className="stage-replay-btn" onClick={replayKinetic} title="Phát lại hiệu ứng">
                <span>Phát lại</span>
                <span>↻</span>
              </button>
            </div>

            <div className="stage-viewport">
              <div className="stage-demo-box demo-kinetic">
                <div className="stage-bg-dim">
                  <ImageWithFallback
                    photo={aodai}
                    aspectRatio="16/10"
                    className="stage-photo"
                    showExif={false}
                    onOpenDetail={onOpenArtwork ? () => onOpenArtwork(aodai) : undefined}
                  />
                </div>
                <div className="kinetic-text-board" aria-label="VIỆT NAM ĐƯƠNG ĐẠI">
                  <div className="kinetic-word-row">
                    {'VIỆT'.split('').map((char, i) => (
                      <span key={i} className="kinetic-char">{char}</span>
                    ))}
                    <span className="kinetic-char space">&nbsp;</span>
                    {'NAM'.split('').map((char, i) => (
                      <span key={i} className="kinetic-char">{char}</span>
                    ))}
                  </div>
                  <div className="kinetic-word-row sub">
                    {'CONTEMPORARY'.split('').map((char, i) => (
                      <span key={i} className="kinetic-char">{char}</span>
                    ))}
                  </div>
                </div>
                <p className="stage-hint">✦ Ký tự bung xòe đàn hồi với điểm xuất phát đối xứng từ trung tâm</p>
              </div>
            </div>

            <div className="stage-foot-bar">
              <div className="foot-info">
                <span className="foot-study">Tà áo dài duyên dáng</span>
                <p className="foot-desc">Nhịp điệu đàn hồi mô phỏng tà lụa bay qua phố nhỏ Tràng An.</p>
              </div>
              <div className="exp-code-badge">
                <code>elastic.out + stagger</code>
              </div>
            </div>
          </div>

          {/* ── Act 04: Split Curtain Wipe ── */}
          <div
            className="playground-stage-wrapper showcase-card"
            ref={curtainStageRef}
          >
            <div className="stage-top-bar">
              <span className="stage-label">04 // CHUYỂN CẢNH RÈM ĐÔI ĐỐI XỨNG</span>
              <button className="stage-replay-btn" onClick={replayCurtain} title="Phát lại hiệu ứng">
                <span>Phát lại</span>
                <span>↻</span>
              </button>
            </div>

            <div className="stage-viewport">
              <div className="stage-demo-box demo-curtain">
                <div className="curtain-underlay">
                  <ImageWithFallback
                    photo={coffee}
                    aspectRatio="16/10"
                    className="stage-photo"
                    showExif={false}
                    onOpenDetail={onOpenArtwork ? () => onOpenArtwork(coffee) : undefined}
                  />
                  <div className="curtain-caption">
                    <span className="badge">SLOW DRIP CAFE</span>
                    <h4>KHOẢNG LẶNG ĐỜI THƯỜNG</h4>
                  </div>
                </div>
                <div className="curtain-left curtain-wipe" />
                <div className="curtain-right curtain-wipe" />
                <p className="stage-hint">✦ Hai vạt rèm sơn mài quét mở đối xứng hé lộ vẻ đẹp bình dị</p>
              </div>
            </div>

            <div className="stage-foot-bar">
              <div className="foot-info">
                <span className="foot-study">Cà phê phin chậm rãi</span>
                <p className="foot-desc">Hiệu ứng kéo rèm nhà hát với hàm gia tốc lũy thừa expo.inOut.</p>
              </div>
              <div className="exp-code-badge">
                <code>scaleX + expo.inOut</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
