import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { EVERYDAY_PHOTOS, type PhotoItem } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface EverydaySceneProps {
  motionActive: boolean;
  onOpenArtwork: (photo: PhotoItem) => void;
}

export default function EverydayScene({ motionActive, onOpenArtwork }: EverydaySceneProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Header reveal
    gsap.from('.everyday-intro .reveal-fade', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
      },
    });

    // Story items reveal in sequence
    const storyItems = gsap.utils.toArray<HTMLElement>('.everyday-story-item');
    storyItems.forEach((item) => {
      const media = item.querySelector('.everyday-story-media');
      const content = item.querySelector('.everyday-narrative-box');
      const img = item.querySelector('.photo-img');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        media,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0.4 },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1, duration: 1.2, ease: 'power3.out' }
      ).from(
        content,
        { y: 32, opacity: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.7'
      );

      // Subtle parallax on the image
      if (img) {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    });
  }, { scope: sectionRef, dependencies: [motionActive], revertOnUpdate: true });

  return (
    <section className="everyday-section section-light" ref={sectionRef} id="everyday" aria-labelledby="everyday-title">
      <div className="page-wrap">
        <header className="everyday-intro section-heading">
          <div className="section-meta-top">
            <span className="section-idx reveal-fade">PHÂN CẢNH 04 // KHOẢNG NGHỈ THỊ GIÁC</span>
            <span className="section-badge-accent reveal-fade">EVERYDAY VIETNAM</span>
          </div>

          <h2 id="everyday-title" className="section-title reveal-fade">
            Hồn cốt Việt Nam<br />
            <span className="font-serif text-lacquer">trong từng khoảnh khắc bình dị.</span>
          </h2>

          <p className="section-lead reveal-fade">
            Văn hóa không chỉ là những công trình vĩ đại, mà ẩn mình trong giọt cà phê phin tí tách buổi sớm, trong tà áo dài lụa bay qua phố nhỏ hay ánh đèn vàng ấm áp của những góc phố bình yên.
          </p>
        </header>

        {/* Editorial Story Stream: All 3 moments revealed in natural scroll flow */}
        <div className="everyday-story-stream">
          {EVERYDAY_PHOTOS.map((photo, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                key={photo.id}
                className={`everyday-story-item ${isReversed ? 'is-reversed' : ''}`}
              >
                <div className="everyday-story-media">
                  <ImageWithFallback
                    photo={photo}
                    aspectRatio={index === 1 ? '4/5' : '16/10'}
                    className="everyday-featured-img"
                    showExif={false}
                    onOpenDetail={() => onOpenArtwork(photo)}
                  />
                </div>

                <div className="everyday-narrative-box">
                  <div className="narrative-tag">
                    <span className="narrative-idx">0{index + 1} //</span> {photo.tag}
                  </div>
                  <h3 className="narrative-title">{photo.titleVi}</h3>
                  <p className="narrative-sub">{photo.subtitle}</p>
                  <p className="narrative-body">{photo.narrative}</p>

                  <div className="narrative-meta-footer">
                    <div className="meta-col">
                      <span className="meta-label">ĐỊA ĐIỂM</span>
                      <span className="meta-val">{photo.location}</span>
                    </div>
                    <div className="meta-col">
                      <span className="meta-label">NĂM CHỤP</span>
                      <span className="meta-val">{photo.year}</span>
                    </div>
                    <div className="meta-col">
                      <span className="meta-label">THÔNG SỐ ỐNG KÍNH</span>
                      <span className="meta-val">
                        {photo.exif.focal} • {photo.exif.aperture} • ISO {photo.exif.iso}
                      </span>
                    </div>
                  </div>

                  <div className="narrative-action-bar">
                    <button
                      className="btn btn-primary"
                      onClick={() => onOpenArtwork(photo)}
                    >
                      <span>Khám phá tác phẩm</span>
                      <span className="btn-icon">→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
