import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { HERO_PHOTO, type PhotoItem } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroSceneProps {
  motionActive: boolean;
  onExplore: () => void;
  onOpenArtwork: (photo: PhotoItem) => void;
}

export default function HeroScene({
  motionActive,
  onExplore,
  onOpenArtwork,
}: HeroSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  const heroImageInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // If motion is explicitly deactivated, keep clean static state
      if (!motionActive) return;

      const mm = gsap.matchMedia(containerRef);

      mm.add(
        {
          isDesktop: '(min-width: 769px)',
          isMobile: '(max-width: 768px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions!;

          if (reduceMotion) {
            // Respect accessibility: ensure immediate static legibility
            gsap.set(
              [
                heroImageWrapRef.current,
                '.hero-horizon-line',
                '.hero-editorial-header',
                '.hero-title-word',
                '.hero-kicker-wrap',
                '.hero-narrative-wrap',
                '.hero-action-group > *',
                '.hero-meta-item',
                '.hero-scroll-cue',
              ],
              {
                autoAlpha: 1,
                y: 0,
                yPercent: 0,
                scale: 1,
                clipPath: 'none',
              }
            );
            return;
          }

          // Layer 1: Entrance choreography — Horizon Unveil
          const entranceTl = gsap.timeline({
            defaults: { ease: 'power3.out' },
          });

          // Cinematic horizon aperture reveal
          entranceTl
            .fromTo(
              heroImageWrapRef.current,
              { clipPath: 'inset(12% 0% 12% 0%)', scale: 1.08 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
                duration: 1.6,
                ease: 'power3.inOut',
              }
            )
            // Delicate mountain horizon datum line draws across
            .fromTo(
              '.hero-horizon-line',
              { scaleX: 0, opacity: 0 },
              { scaleX: 1, opacity: 1, duration: 1.3, ease: 'power2.out' },
              '-=1.2'
            )
            // Editorial header index slides gently into place
            .fromTo(
              '.hero-editorial-header',
              { y: -16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.8 },
              '-=1.0'
            )
            // Headline words rise from their masked lines
            .fromTo(
              '.hero-title-word',
              { yPercent: 110, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 1.0,
                stagger: 0.08,
                ease: 'power4.out',
              },
              '-=0.8'
            )
            // Kicker & curator narrative fade in
            .fromTo(
              ['.hero-kicker-wrap', '.hero-narrative-wrap'],
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 },
              '-=0.7'
            )
            // Action button pair
            .fromTo(
              '.hero-action-group > *',
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
              '-=0.6'
            )
            // Bottom curator metadata items
            .fromTo(
              '.hero-meta-item',
              { y: 12, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06 },
              '-=0.5'
            )
            // Scroll cue indicator
            .fromTo(
              '.hero-scroll-cue',
              { y: 12, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.7 },
              '-=0.4'
            );

          // Layer 2: Living state — Single subtle atmospheric breathing of the 85mm dawn frame
          const livingTween = gsap.to(heroImageInnerRef.current, {
            scale: 1.03,
            yPercent: 1.2,
            duration: 14,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.6,
          });

          // Layer 3: Scroll-linked response
          const imageParallax = gsap.to(heroImageInnerRef.current, {
            yPercent: 12,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          });

          const textParallax = gsap.to('.hero-centerpiece', {
            yPercent: -8,
            autoAlpha: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          });

          return () => {
            entranceTl.kill();
            livingTween.kill();
            imageParallax.kill();
            textParallax.kill();
          };
        }
      );
    },
    { scope: containerRef, dependencies: [motionActive], revertOnUpdate: true }
  );

  return (
    <section
      className="hero-section"
      ref={containerRef}
      id="top"
      aria-label="Phần mở đầu — Chân trời Ba Vì"
    >
      {/* Background photographic canvas with cinematic atmospheric grade */}
      <div className="hero-image-wrap" ref={heroImageWrapRef}>
        <div className="hero-image-inner" ref={heroImageInnerRef}>
          <ImageWithFallback
            photo={HERO_PHOTO}
            priority={true}
            aspectRatio="16/9"
            showExif={false}
            className="hero-main-photo"
            onOpenDetail={() => onOpenArtwork(HERO_PHOTO)}
          />
        </div>

        {/* Atmospheric Dawn Gradient Overlay */}
        <div className="hero-atmosphere-overlay" aria-hidden="true" />

        {/* Horizon datum line: single delicate architectural horizon line */}
        <div className="hero-horizon-line" aria-hidden="true" />
      </div>

      {/* Foreground Editorial Container */}
      <div className="hero-container page-wrap">
        {/* Top Editorial Index & Coordinates */}
        <header className="hero-editorial-header">
          <div className="hero-edition-pill">
            <span className="pill-status-dot" aria-hidden="true" />
            <span className="pill-tag">GIÁM TUYỂN 01</span>
            <span className="pill-divider" aria-hidden="true">/</span>
            <span className="pill-title">KHẮC HỌA ĐƯƠNG ĐẠI</span>
          </div>

          <div
            className="hero-coordinates-meta"
            title="Toạ độ chụp đỉnh Ba Vì từ bờ sông Hồng"
          >
            <span className="coord-icon" aria-hidden="true">⌖</span>
            <span className="coord-text">{HERO_PHOTO.coordinates}</span>
          </div>
        </header>

        {/* Centerpiece: Typographic Architecture & Story */}
        <div className="hero-centerpiece">
          <div className="hero-kicker-wrap">
            <p className="hero-kicker">
              CHÂN TRỜI THỦ ĐÔ VÀ ĐỈNH BA VÌ ĐÓN BÌNH MINH
            </p>
          </div>

          <h1 className="hero-main-title">
            <span className="hero-title-line">
              <span className="hero-title-word word-vietnam">VIETNAM</span>
            </span>
            <span className="hero-title-line">
              <span className="hero-title-word word-in">IN</span>
              <span className="hero-title-word word-motion hero-title-serif">
                MOTION<span className="hero-period">.</span>
              </span>
            </span>
          </h1>

          <div className="hero-narrative-wrap">
            <p className="hero-subtitle">
              {HERO_PHOTO.narrative}
            </p>
            <p className="hero-sub-en">
              {HERO_PHOTO.subtitle}
            </p>
          </div>

          {/* Action Pair */}
          <div className="hero-action-group">
            <button
              type="button"
              className="btn btn-primary hero-btn-primary"
              onClick={onExplore}
              aria-label="Khám phá hành trình triển lãm ảnh"
            >
              <span>Khám phá triển lãm</span>
              <span className="btn-icon" aria-hidden="true">↓</span>
            </button>

            <button
              type="button"
              className="btn btn-outline hero-btn-artwork"
              onClick={() => onOpenArtwork(HERO_PHOTO)}
              aria-label={`Chiêm ngưỡng tác phẩm mở màn: ${HERO_PHOTO.titleVi}`}
            >
              <span className="btn-icon-lens" aria-hidden="true">⊙</span>
              <span>Chiêm ngưỡng tác phẩm</span>
            </button>
          </div>
        </div>

        {/* Bottom Curator Strip: Photographic Ledger */}
        <footer className="hero-bottom-strip">
          <div className="hero-meta-item">
            <span className="meta-label">ĐỊA DANH // THỜI ĐIỂM</span>
            <span className="meta-val">
              {HERO_PHOTO.location} · {HERO_PHOTO.year}
            </span>
          </div>

          <div className="hero-meta-item">
            <span className="meta-label">THÔNG SỐ QUANG HỌC</span>
            <span className="meta-val">
              {HERO_PHOTO.exif.focal} · {HERO_PHOTO.exif.aperture} · {HERO_PHOTO.exif.shutter} · ISO {HERO_PHOTO.exif.iso}
            </span>
          </div>

          <div className="hero-meta-item">
            <span className="meta-label">BẢN QUYỀN & LƯU TRỮ</span>
            <span className="meta-val">
              {HERO_PHOTO.license} · {HERO_PHOTO.photographer}
            </span>
          </div>

          <div
            className="hero-scroll-cue"
            onClick={onExplore}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onExplore();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Cuộn xuống để khám phá triển lãm"
          >
            <span className="scroll-track" aria-hidden="true">
              <span className="scroll-indicator-bar" />
            </span>
            <span className="scroll-text">CUỘN ĐỂ KHÁM PHÁ</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
