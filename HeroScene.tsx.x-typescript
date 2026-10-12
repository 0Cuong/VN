import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { HERO_PHOTO } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface HeroSceneProps {
  motionActive: boolean;
  onExplore: () => void;
}

export default function HeroScene({ motionActive, onExplore }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero image reveal with cinematic clip-path mask
    tl.fromTo(
      heroImageWrapRef.current,
      { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.12 },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 1.6, ease: 'power4.inOut' }
    )
      .from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 }, '-=0.8')
      .from('.hero-title-word', { yPercent: 120, rotateX: -45, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.6')
      .from('.hero-subtitle', { y: 24, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-meta-strip > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
      .from('.hero-action-group > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4')
      .from('.hero-scroll-cue', { y: 15, opacity: 0, duration: 0.8 }, '-=0.3');

    // Scroll parallax for hero background image
    gsap.to('.hero-image-inner', {
      yPercent: 20,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }, { scope: containerRef, dependencies: [motionActive], revertOnUpdate: true });

  const replayHeroIntro = contextSafe(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      heroImageWrapRef.current,
      { clipPath: 'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)', scale: 1.08 },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, duration: 1.4, ease: 'power4.inOut' }
    )
      .fromTo('.hero-title-word', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power4.out' }, '-=0.7')
      .fromTo('.hero-subtitle, .hero-action-group', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.4');
  });

  return (
    <section className="hero-section" ref={containerRef} id="top" aria-label="Phần mở đầu điện ảnh">
      {/* Background cinematic photograph */}
      <div className="hero-image-wrap" ref={heroImageWrapRef}>
        <div className="hero-image-inner">
          <ImageWithFallback
            photo={HERO_PHOTO}
            priority={true}
            aspectRatio="16/9"
            showExif={false}
            className="hero-main-photo"
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
      </div>

      <div className="hero-container page-wrap">
        <div className="hero-top-meta">
          <div className="hero-badge">
            <span className="badge-pulse" />
            <span className="badge-text">VIETNAM — WHERE HERITAGE MEETS MOTION</span>
          </div>
          <span className="hero-vol">EDITION 2026 // VOL. 01</span>
        </div>

        <div className="hero-center-content">
          <p className="hero-kicker">MOTION-LAB / AN INDEPENDENT GSAP EXHIBITION</p>
          <h1 className="hero-main-title">
            <span className="hero-title-row">
              <span className="hero-title-word">VIETNAM</span>
              <span className="hero-title-word text-accent">IN</span>
            </span>
            <span className="hero-title-row">
              <span className="hero-title-word hero-title-serif">MOTION<span className="hero-period">.</span></span>
            </span>
          </h1>

          <p className="hero-subtitle">
            Một đối thoại sống động giữa di sản ngàn năm và nhịp đập đô thị hiện đại.
            <br className="desktop-break" />
            <span className="hero-sub-en">A living dialogue between heritage and the modern city.</span>
          </p>

          <div className="hero-action-group">
            <button className="btn btn-primary" onClick={onExplore}>
              <span>Khám phá triển lãm</span>
              <span className="btn-icon">↓</span>
            </button>

            <button className="btn btn-outline" onClick={replayHeroIntro}>
              <span className="replay-icon">↻</span>
              <span>Phát lại hiệu ứng mở màn</span>
            </button>
          </div>
        </div>

        <div className="hero-bottom-strip">
          <div className="hero-meta-item">
            <span className="meta-label">TOẠ ĐỘ ĐỊA LÝ</span>
            <span className="meta-val">{HERO_PHOTO.coordinates}</span>
          </div>

          <div className="hero-meta-item">
            <span className="meta-label">CHỦ ĐỀ KHỞI ĐẦU</span>
            <span className="meta-val">BÌNH MINH BA VÌ & THỦ ĐÔ HÀ NỘI</span>
          </div>

          <div className="hero-meta-item">
            <span className="meta-label">KỸ THUẬT</span>
            <span className="meta-val">GSAP 3 • SCROLLTRIGGER • PARALLAX</span>
          </div>

          <div className="hero-scroll-cue" onClick={onExplore} role="button" tabIndex={0}>
            <span className="scroll-indicator-bar" />
            <span className="scroll-text">CUỘN ĐỂ KHÁM PHÁ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
