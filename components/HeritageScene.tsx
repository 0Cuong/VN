import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { HERITAGE_PHOTOS, type PhotoItem } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface HeritageSceneProps {
  motionActive: boolean;
  onOpenArtwork: (photo: PhotoItem) => void;
}

export default function HeritageScene({ motionActive, onOpenArtwork }: HeritageSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Header reveal
    gsap.from('.heritage-heading .reveal-line', {
      yPercent: 100,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.heritage-heading',
        start: 'top 82%',
      },
    });

    // Asymmetrical photo cards reveal with clip-path
    const cards = gsap.utils.toArray<HTMLElement>('.heritage-card');
    cards.forEach((card, index) => {
      const img = card.querySelector('.photo-frame');
      const text = card.querySelector('.heritage-card-info');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        img,
        {
          clipPath: index % 2 === 0
            ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
            : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          scale: 1.08,
          opacity: 0.3,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      ).from(
        text,
        {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      // Parallax on card image
      gsap.to(card.querySelector('.photo-img'), {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    });
  }, { scope: sectionRef, dependencies: [motionActive], revertOnUpdate: true });

  const [incense, hoian, cathedral, thehuc] = HERITAGE_PHOTOS;

  return (
    <section className="heritage-section section-dark" ref={sectionRef} id="heritage" aria-labelledby="heritage-title">
      <div className="page-wrap">
        <header className="heritage-heading section-heading">
          <div className="section-meta-top">
            <span className="section-idx">PHÂN CẢNH 02 // CHUYÊN ĐỀ DI SẢN</span>
            <span className="section-badge-accent">HERITAGE, STILL ALIVE</span>
          </div>

          <h2 id="heritage-title" className="section-title">
            <span className="overflow-hidden">
              <span className="reveal-line">Di sản ngàn năm,</span>
            </span>
            <span className="overflow-hidden">
              <span className="reveal-line text-lacquer font-serif">hơi thở bất tận.</span>
            </span>
          </h2>

          <p className="section-lead">
            Văn hóa Việt Nam không nằm yên trong bảo tàng. Từng bó hương đỏ thắm, từng mái ngói phố cổ Hội An hay tường vôi rêu phong Hà Nội vẫn đang sống, đang kể câu chuyện của nguồn cội giữa dòng chảy thế kỷ XXI.
          </p>
        </header>

        {/* Editorial Asymmetric Grid */}
        <div className="heritage-grid">
          {/* Feature Card 1: Quang Phu Cau Incense Village */}
          <article className="heritage-card heritage-card-large">
            <div className="heritage-card-media">
              <ImageWithFallback
                photo={incense}
                aspectRatio="4/5"
                className="heritage-photo-hero"
                onOpenDetail={() => onOpenArtwork(incense)}
              />
            </div>
            <div className="heritage-card-info">
              <span className="heritage-sub-tag">LÀNG NGHỀ THỦ CÔNG</span>
              <h3 className="heritage-card-title">{incense.titleVi}</h3>
              <p className="heritage-card-desc">{incense.narrative}</p>
              <div className="heritage-card-meta">
                <span>📍 {incense.location}</span>
              </div>
              <button
                className="card-action-btn"
                onClick={() => onOpenArtwork(incense)}
              >
                <span>Khám phá tác phẩm</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </article>

          {/* Feature Card 2: Hoi An Ancient Harbor */}
          <article className="heritage-card heritage-card-side">
            <div className="heritage-card-media">
              <ImageWithFallback
                photo={hoian}
                aspectRatio="16/11"
                onOpenDetail={() => onOpenArtwork(hoian)}
              />
            </div>
            <div className="heritage-card-info">
              <span className="heritage-sub-tag">DI SẢN THẾ GIỚI UNESCO</span>
              <h3 className="heritage-card-title">{hoian.titleVi}</h3>
              <p className="heritage-card-desc">{hoian.narrative}</p>
              <div className="heritage-card-meta">
                <span>📍 {hoian.location}</span>
              </div>
              <button
                className="card-action-btn"
                onClick={() => onOpenArtwork(hoian)}
              >
                <span>Khám phá tác phẩm</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </article>

          {/* Feature Card 3: St. Joseph Cathedral Gothic Architecture */}
          <article className="heritage-card heritage-card-side">
            <div className="heritage-card-media">
              <ImageWithFallback
                photo={cathedral}
                aspectRatio="16/11"
                onOpenDetail={() => onOpenArtwork(cathedral)}
              />
            </div>
            <div className="heritage-card-info">
              <span className="heritage-sub-tag">KIẾN TRÚC THỜI GIAN</span>
              <h3 className="heritage-card-title">{cathedral.titleVi}</h3>
              <p className="heritage-card-desc">{cathedral.narrative}</p>
              <div className="heritage-card-meta">
                <span>📍 {cathedral.location}</span>
              </div>
              <button
                className="card-action-btn"
                onClick={() => onOpenArtwork(cathedral)}
              >
                <span>Khám phá tác phẩm</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </article>

          {/* Feature Card 4: The Huc Bridge */}
          <article className="heritage-card heritage-card-wide">
            <div className="heritage-card-media">
              <ImageWithFallback
                photo={thehuc}
                aspectRatio="21/9"
                onOpenDetail={() => onOpenArtwork(thehuc)}
              />
            </div>
            <div className="heritage-card-info">
              <span className="heritage-sub-tag">HỒ GƯƠM & THỦ ĐÔ NGHÌN NĂM</span>
              <h3 className="heritage-card-title">{thehuc.titleVi}</h3>
              <p className="heritage-card-desc">{thehuc.narrative}</p>
              <div className="heritage-card-meta">
                <span>📍 {thehuc.location}</span>
              </div>
              <button
                className="card-action-btn"
                onClick={() => onOpenArtwork(thehuc)}
              >
                <span>Khám phá tác phẩm</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
