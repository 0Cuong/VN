import { useEffect, useState, useRef } from 'react';
import type { PhotoItem } from '../data/photography';
import ImageWithFallback from './ImageWithFallback';

interface ArtworkDetailModalProps {
  artwork: PhotoItem | null;
  allArtworks: PhotoItem[];
  onSelectArtwork: (artwork: PhotoItem) => void;
  onClose: () => void;
}

export default function ArtworkDetailModal({
  artwork,
  allArtworks,
  onSelectArtwork,
  onClose,
}: ArtworkDetailModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, onClose]);

  // Scroll to top when artwork changes
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [artwork?.id]);

  if (!artwork) return null;

  const currentIndex = allArtworks.findIndex((item) => item.id === artwork.id);
  const prevArtwork = currentIndex > 0 ? allArtworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < allArtworks.length - 1 ? allArtworks[currentIndex + 1] : null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '#' + artwork.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="artwork-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artwork-modal-title"
      onClick={onClose}
    >
      <div
        className="artwork-modal-container"
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <header className="artwork-modal-header">
          <div className="artwork-header-left">
            <span className="exhibition-tag">MOTION-LAB // HỒ SƠ TÁC PHẨM</span>
            <span className="artwork-header-coords">{artwork.coordinates}</span>
          </div>

          <div className="artwork-header-tools">
            <button
              className="tool-btn btn-zoom"
              onClick={() => setLightboxOpen(true)}
              title="Phóng to ảnh toàn màn hình"
            >
              <span className="tool-icon">🔍</span>
              <span className="tool-text">Phóng to</span>
            </button>

            <button
              className="tool-btn btn-share"
              onClick={handleCopyLink}
              title="Sao chép liên kết tác phẩm"
            >
              <span className="tool-icon">{copiedLink ? '✓' : '⎘'}</span>
              <span className="tool-text">{copiedLink ? 'Đã chép' : 'Chia sẻ'}</span>
            </button>

            <button
              className="tool-btn btn-close"
              onClick={onClose}
              aria-label="Đóng cửa sổ"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Modal Main Body */}
        <div className="artwork-modal-body">
          {/* Main Visual Frame */}
          <div
            className="artwork-visual-container"
            onClick={() => setLightboxOpen(true)}
            title="Nhấp để xem kích thước lớn"
          >
            <ImageWithFallback
              photo={artwork}
              priority={true}
              aspectRatio="16/10"
              showExif={false}
              className="artwork-main-img"
            />
            <div className="artwork-zoom-prompt" aria-hidden="true">
              <span>✦ Nhấp để phóng to chi tiết ảnh</span>
            </div>
          </div>

          {/* Title & Exhibition Meta */}
          <div className="artwork-info-header">
            <div className="artwork-tag-pill">{artwork.tag}</div>
            <h2 id="artwork-modal-title" className="artwork-title-vi">
              {artwork.titleVi}
            </h2>
            <p className="artwork-title-en">{artwork.title}</p>
            <div className="artwork-loc-strip">
              <span>📍 {artwork.location}</span>
              <span>•</span>
              <span>Năm sáng tác: {artwork.year}</span>
            </div>
          </div>

          {/* EXIF Camera Specs Grid */}
          <div className="artwork-exif-grid">
            <div className="exif-cell">
              <span className="exif-label">TIÊU CỰ</span>
              <span className="exif-value">{artwork.exif.focal || 'Chưa cập nhật'}</span>
            </div>
            <div className="exif-cell">
              <span className="exif-label">KHẨU ĐỘ</span>
              <span className="exif-value">{artwork.exif.aperture || 'Chưa cập nhật'}</span>
            </div>
            <div className="exif-cell">
              <span className="exif-label">ĐỘ NHẠY SÁNG</span>
              <span className="exif-value">ISO {artwork.exif.iso || 'Chưa cập nhật'}</span>
            </div>
            <div className="exif-cell">
              <span className="exif-label">MÀN TRẬP</span>
              <span className="exif-value">{artwork.exif.shutter || 'Chưa cập nhật'}</span>
            </div>
          </div>

          {/* Curator's Dossier Section */}
          <div className="curator-dossier-box">
            <h3 className="dossier-heading">Ghi chú giám tuyển & Câu chuyện thị giác</h3>
            <p className="dossier-narrative">{artwork.narrative}</p>

            {artwork.curator && (
              <div className="curator-details-list">
                <div className="curator-item">
                  <span className="curator-item-title">✦ Ý NGHĨA VĂN HÓA & THỜI ĐẠI:</span>
                  <p>{artwork.curator.significance}</p>
                </div>
                <div className="curator-item">
                  <span className="curator-item-title">✦ PHÂN TÍCH GÓC MÁY & ÁNH SÁNG:</span>
                  <p>{artwork.curator.visualAnalysis}</p>
                </div>
                <div className="curator-item">
                  <span className="curator-item-title">✦ BỐI CẢNH THỰC ĐỊA:</span>
                  <p>{artwork.curator.locationContext}</p>
                </div>
              </div>
            )}
          </div>

          {/* Attribution & Rights */}
          <div className="artwork-copyright-box">
            <div className="copy-left">
              <span className="copy-label">BẢN QUYỀN & TÁC GIẢ</span>
              <p className="copy-val">© {artwork.photographer} ({artwork.license})</p>
            </div>
            <div className="copy-right">
              <span className="copy-pill">✓ Bản địa hóa (0ms latency)</span>
              <a
                href={artwork.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="copy-link"
              >
                Wikimedia Commons ↗
              </a>
            </div>
          </div>

          {/* Navigation between Artworks */}
          <nav className="artwork-nav-bar" aria-label="Điều hướng các tác phẩm">
            {prevArtwork ? (
              <button
                className="art-nav-btn prev"
                onClick={() => onSelectArtwork(prevArtwork)}
              >
                <span className="nav-dir">← TÁC PHẨM TRƯỚC</span>
                <span className="nav-name">{prevArtwork.titleVi}</span>
              </button>
            ) : (
              <div className="art-nav-btn disabled" aria-hidden="true">
                <span className="nav-dir">TÁC PHẨM TRƯỚC</span>
                <span className="nav-name">Đầu triển lãm</span>
              </div>
            )}

            {nextArtwork ? (
              <button
                className="art-nav-btn next"
                onClick={() => onSelectArtwork(nextArtwork)}
              >
                <span className="nav-dir">TÁC PHẨM TIẾP THEO →</span>
                <span className="nav-name">{nextArtwork.titleVi}</span>
              </button>
            ) : (
              <div className="art-nav-btn disabled" aria-hidden="true">
                <span className="nav-dir">TÁC PHẨM TIẾP THEO</span>
                <span className="nav-name">Cuối triển lãm</span>
              </div>
            )}
          </nav>
        </div>

        {/* Modal Footer */}
        <footer className="artwork-modal-footer">
          <div className="footer-status">
            <span>MOTION-LAB · VIETNAM IN MOTION</span>
            <span>•</span>
            <span>0CUONG EXHIBITION</span>
          </div>
          <button className="btn btn-outline" onClick={onClose}>
            Đóng lại
          </button>
        </footer>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-label="Phóng to ảnh"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={artwork.imageUrl}
              alt={artwork.titleVi}
              className="lightbox-image"
            />
            <div className="lightbox-bar">
              <div className="lightbox-desc">
                <strong>{artwork.titleVi}</strong> — {artwork.location}
              </div>
              <button
                className="lightbox-close-btn"
                onClick={() => setLightboxOpen(false)}
              >
                Đóng ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
