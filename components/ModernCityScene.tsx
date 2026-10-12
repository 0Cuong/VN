import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { MODERN_CITY_PHOTOS } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface ModernCitySceneProps {
  motionActive: boolean;
}

export default function ModernCityScene({ motionActive }: ModernCitySceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Numerical counter animation
    const statCounters = gsap.utils.toArray<HTMLElement>('.stat-number');
    statCounters.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-target') || '0');
      const isDecimal = targetVal % 1 !== 0;
      const proxy = { val: 0 };

      gsap.to(proxy, {
        val: targetVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.innerText = isDecimal ? proxy.val.toFixed(1) : Math.round(proxy.val).toString();
        },
      });
    });

    // Desktop Horizontal Track Pinning
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Individual layer parallax inside horizontal items
      gsap.utils.toArray<HTMLElement>('.city-slide-photo').forEach((photo) => {
        gsap.to(photo, {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            scrub: 1,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [motionActive], revertOnUpdate: true });

  const [skyline, landmark, traffic] = MODERN_CITY_PHOTOS;

  return (
    <section className="city-section" ref={containerRef} id="modern-city" aria-labelledby="city-title">
      <div className="city-intro-banner page-wrap">
        <div className="section-meta-top">
          <span className="section-idx">PHÂN CẢNH 03 // ĐÔ THỊ ĐƯƠNG ĐẠI</span>
          <span className="section-badge-accent">THE MODERN CITY IN MOTION</span>
        </div>

        <h2 id="city-title" className="section-title">
          Việt Nam đang chuyển động.<br />
          <span className="font-serif text-accent">Năng lượng của thời đại mới.</span>
        </h2>

        <p className="section-lead">
          Từ đỉnh Landmark 81 vươn cao 461.2 mét cho đến dòng thác xe máy cuộn trào trên những đại lộ Sài Gòn, Việt Nam hôm nay là bản trường ca của tốc độ, công nghệ và sức sống kiêu hãnh.
        </p>

        {/* Live Metrics Grid */}
        <div className="city-stats-grid">
          <div className="stat-card">
            <span className="stat-number" data-target="461.2">0</span>
            <span className="stat-unit">MÉT</span>
            <p className="stat-label">Chiều cao Landmark 81 — Tháp cao nhất Việt Nam</p>
          </div>
          <div className="stat-card">
            <span className="stat-number" data-target="100">0</span>
            <span className="stat-unit">TRIỆU+</span>
            <p className="stat-label">Dân số trẻ & năng động kiến tạo tương lai</p>
          </div>
          <div className="stat-card">
            <span className="stat-number" data-target="24">0</span>
            <span className="stat-unit">GIỜ</span>
            <p className="stat-label">Nhịp đập kinh tế không ngủ của các đại đô thị</p>
          </div>
        </div>
      </div>

      {/* Horizontal Storytelling Track (Desktop) / Vertically Stacked (Mobile) */}
      <div className="city-track-viewport">
        <div className="city-track-wrapper" ref={trackRef}>
          {/* Slide 1: Skyline */}
          <div className="city-slide">
            <div className="city-slide-media city-slide-photo">
              <ImageWithFallback
                photo={skyline}
                aspectRatio="16/10"
                className="city-photo"
              />
            </div>
            <div className="city-slide-content">
              <span className="slide-num">01 / TOÀN CẢNH ĐÔ THỊ</span>
              <h3 className="slide-title">{skyline.titleVi}</h3>
              <p className="slide-desc">{skyline.narrative}</p>
              <div className="slide-exif">
                <span>📍 {skyline.location}</span>
                <span>📷 {skyline.coordinates}</span>
              </div>
            </div>
          </div>

          {/* Slide 2: Landmark 81 */}
          <div className="city-slide">
            <div className="city-slide-media city-slide-photo">
              <ImageWithFallback
                photo={landmark}
                aspectRatio="10/16"
                className="city-photo"
              />
            </div>
            <div className="city-slide-content">
              <span className="slide-num">02 / ĐỈNH CAO KIẾN TRÚC</span>
              <h3 className="slide-title">{landmark.titleVi}</h3>
              <p className="slide-desc">{landmark.narrative}</p>
              <div className="slide-exif">
                <span>📍 {landmark.location}</span>
                <span>⚡ 461.2M • 81 TẦNG</span>
              </div>
            </div>
          </div>

          {/* Slide 3: Traffic Flow */}
          <div className="city-slide">
            <div className="city-slide-media city-slide-photo">
              <ImageWithFallback
                photo={traffic}
                aspectRatio="16/10"
                className="city-photo"
              />
            </div>
            <div className="city-slide-content">
              <span className="slide-num">03 / HUYẾT MẠCH ĐƯỜNG PHỐ</span>
              <h3 className="slide-title">{traffic.titleVi}</h3>
              <p className="slide-desc">{traffic.narrative}</p>
              <div className="slide-exif">
                <span>📍 {traffic.location}</span>
                <span>⇄ NHỊP THỞ GIAO THÔNG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
