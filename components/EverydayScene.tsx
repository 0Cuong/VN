import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { EVERYDAY_PHOTOS, type PhotoItem } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface EverydaySceneProps {
  motionActive: boolean;
}

export default function EverydayScene({ motionActive }: EverydaySceneProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem>(EVERYDAY_PHOTOS[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!motionActive || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.from('.everyday-intro .reveal-fade', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    gsap.from('.everyday-thumb-btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.everyday-selector-track',
        start: 'top 85%',
      },
    });
  }, { scope: sectionRef, dependencies: [motionActive], revertOnUpdate: true });

  const handleSelectPhoto = (photo: PhotoItem) => {
    if (selectedPhoto.id === photo.id) return;
    setSelectedPhoto(photo);

    if (detailRef.current && motionActive && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0.4, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  };

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

        {/* Interactive Curated Focal Showcase */}
        <div className="everyday-showcase" ref={detailRef}>
          <div className="everyday-main-display">
            <ImageWithFallback
              photo={selectedPhoto}
              aspectRatio="16/10"
              className="everyday-featured-img"
              showExif={false}
            />

            <div className="everyday-narrative-box">
              <div className="narrative-tag">{selectedPhoto.tag}</div>
              <h3 className="narrative-title">{selectedPhoto.titleVi}</h3>
              <p className="narrative-sub">{selectedPhoto.subtitle}</p>
              <p className="narrative-body">{selectedPhoto.narrative}</p>

              <div className="narrative-meta-footer">
                <div className="meta-col">
                  <span className="meta-label">ĐỊA ĐIỂM</span>
                  <span className="meta-val">{selectedPhoto.location}</span>
                </div>
                <div className="meta-col">
                  <span className="meta-label">TOẠ ĐỘ</span>
                  <span className="meta-val">{selectedPhoto.coordinates}</span>
                </div>
                <div className="meta-col">
                  <span className="meta-label">THÔNG SỐ ỐNG KÍNH</span>
                  <span className="meta-val">
                    {selectedPhoto.exif.focal} • {selectedPhoto.exif.aperture} • ISO {selectedPhoto.exif.iso}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="everyday-selector-track" role="tablist" aria-label="Chọn khoảnh khắc đời thường">
          {EVERYDAY_PHOTOS.map((item, index) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={selectedPhoto.id === item.id}
              className={`everyday-thumb-btn ${selectedPhoto.id === item.id ? 'is-active' : ''}`}
              onClick={() => handleSelectPhoto(item)}
            >
              <span className="thumb-idx">0{index + 1}</span>
              <div className="thumb-content">
                <span className="thumb-title">{item.titleVi}</span>
                <span className="thumb-tag">{item.tag}</span>
              </div>
              <span className="thumb-indicator" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
