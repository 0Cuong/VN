import { useState, useEffect } from 'react';
import type { PhotoItem } from '../data/photography';

interface ImageWithFallbackProps {
  photo: PhotoItem;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  showExif?: boolean;
  onOpenDetail?: (photo: PhotoItem) => void;
}

export default function ImageWithFallback({
  photo,
  className = '',
  priority = false,
  aspectRatio = '16/10',
  showExif = true,
  onOpenDetail,
}: ImageWithFallbackProps) {
  const [loadStage, setLoadStage] = useState<'local' | 'remote' | 'fallback'>('local');
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state whenever the photo prop changes (essential for carousel & tab switching)
  useEffect(() => {
    setLoadStage('local');
    setIsLoaded(false);
  }, [photo.id, photo.imageUrl]);

  const getSource = () => {
    if (loadStage === 'local') return photo.imageUrl;
    if (loadStage === 'remote') return photo.sourceUrl && photo.sourceUrl.endsWith('.jpg') ? photo.sourceUrl : photo.fallbackUrl;
    return photo.fallbackUrl;
  };

  const handleError = () => {
    if (loadStage === 'local') {
      setLoadStage('remote');
    } else if (loadStage === 'remote') {
      setLoadStage('fallback');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onOpenDetail) {
      e.preventDefault();
      onOpenDetail(photo);
    }
  };

  return (
    <figure
      className={`photo-frame ${className} ${isLoaded ? 'is-loaded' : 'is-loading'}`}
      style={{ aspectRatio }}
      data-photo-id={photo.id}
      tabIndex={onOpenDetail ? 0 : undefined}
      role={onOpenDetail ? 'button' : undefined}
      aria-label={onOpenDetail ? `Khám phá tác phẩm: ${photo.titleVi}` : undefined}
      onClick={() => onOpenDetail?.(photo)}
      onKeyDown={handleKeyDown}
    >
      {/* Warm lacquer shimmer placeholder */}
      <div className="photo-placeholder" aria-hidden="true">
        <span className="photo-spinner" />
        <span className="placeholder-brand">MOTION-LAB // VIETNAM</span>
      </div>

      <img
        key={`${photo.id}-${loadStage}`}
        src={getSource()}
        alt={`${photo.titleVi} — ${photo.title} (${photo.location})`}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className="photo-img"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />

      <div className="photo-scrim" aria-hidden="true" />

      {onOpenDetail && (
        <div className="photo-explore-pill" aria-hidden="true">
          <span>Khám phá tác phẩm</span>
          <span className="pill-arrow">→</span>
        </div>
      )}

      {showExif && (
        <figcaption className="photo-metadata">
          <div className="photo-meta-header">
            <span className="photo-meta-tag">{photo.tag}</span>
            <span className="photo-meta-coords">{photo.coordinates}</span>
          </div>
          <div className="photo-meta-body">
            <h4 className="photo-meta-title">{photo.titleVi}</h4>
            <p className="photo-meta-loc">{photo.location} • {photo.year}</p>
          </div>
          <div className="photo-meta-footer">
            <span className="photo-meta-author">© {photo.photographer} ({photo.license})</span>
            {photo.exif.focal && (
              <span className="photo-meta-exif">
                {photo.exif.focal} • {photo.exif.aperture} • ISO {photo.exif.iso}
              </span>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  );
}
