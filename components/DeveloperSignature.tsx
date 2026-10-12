import { useState } from 'react';
import { gsap } from 'gsap';
import { ALL_ARTWORKS, type PhotoItem } from '../data/photography';

export default function DeveloperSignature() {
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <footer className="epilogue-section" id="developer" aria-label="Thông tin tác giả và bản quyền triển lãm">
      <div className="epilogue-backdrop" aria-hidden="true">
        <div className="epilogue-vignette" />
      </div>

      <div className="epilogue-content page-wrap">
        <div className="epilogue-header">
          <span className="epilogue-tag">THÔNG TIN DỰ ÁN</span>
          <h2 className="epilogue-title">
            VIETNAM IN MOTION.<br />
            <span className="font-serif text-accent">Nơi di sản ngàn năm gặp gỡ nghệ thuật chuyển động.</span>
          </h2>
          <p className="epilogue-manifesto">
            Triển lãm ảnh kỹ thuật số độc lập tôn vinh văn hóa, di sản kiến trúc và nhịp thở đô thị Việt Nam. Sử dụng nền tảng chuyển động GSAP làm công cụ kể chuyện thị giác đương đại.
          </p>
        </div>

        {/* Developer Signature Card */}
        <div className="developer-signature-box">
          <div className="dev-meta-main">
            <div className="dev-avatar-seal">
              <span>0C</span>
            </div>
            <div className="dev-titles">
              <h3 className="dev-name">Thực hiện bởi 0Cuong</h3>
              <p className="dev-role">Thiết kế trải nghiệm thị giác & Hoạt họa chuyển động GSAP.</p>
            </div>
          </div>

          <div className="dev-action-links">
            <a
              href="https://github.com/0Cuong/VN"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-link-btn btn-github"
            >
              <span className="btn-icon">⌥</span>
              <span>GitHub: 0Cuong/VN</span>
              <span className="link-arrow">↗</span>
            </a>

            <a
              href="https://www.facebook.com/share/19kRK8AiuD/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-link-btn btn-facebook"
            >
              <span className="btn-icon">✦</span>
              <span>Facebook</span>
              <span className="link-arrow">↗</span>
            </a>

            <button
              onClick={() => setShowCreditsModal(true)}
              className="dev-link-btn btn-credits"
            >
              <span className="btn-icon">📷</span>
              <span>Nguồn ảnh & Bản quyền</span>
              <span className="link-arrow">↗</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="epilogue-bottom-bar">
          <div className="epilogue-copyright">
            <span className="brand-mark">MOTION-LAB</span>
            <span>© 2026 0Cuong. Triển lãm kỹ thuật số độc lập.</span>
          </div>

          <button className="back-to-top-btn" onClick={handleScrollTop} aria-label="Cuộn lên đầu trang">
            <span>Về đầu trang</span>
            <span className="top-arrow">↑</span>
          </button>
        </div>
      </div>

      {/* Photography Attribution Modal */}
      {showCreditsModal && (
        <div
          className="credits-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="credits-title"
          onClick={() => setShowCreditsModal(false)}
        >
          <div className="credits-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="credits-modal-head">
              <div>
                <h3 id="credits-title">Nguồn ảnh & Giấy phép bản quyền</h3>
                <p className="credits-sub">
                  Toàn bộ 11 tác phẩm nhiếp ảnh trong triển lãm được trích dẫn minh bạch từ Wikimedia Commons theo các giấy phép Creative Commons (CC BY, CC BY-SA).
                </p>
              </div>
              <button
                className="credits-close-btn"
                onClick={() => setShowCreditsModal(false)}
                aria-label="Đóng cửa sổ"
              >
                ✕
              </button>
            </div>

            <div className="credits-table-scroll">
              <table className="credits-table">
                <thead>
                  <tr>
                    <th>Tác phẩm / Địa danh</th>
                    <th>Toạ độ</th>
                    <th>Nhiếp ảnh gia / Tác giả</th>
                    <th>Giấy phép</th>
                    <th>Trạng thái tải</th>
                    <th>Nguồn</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_ARTWORKS.map((item: PhotoItem) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.titleVi}</strong>
                        <br />
                        <span className="text-muted">{item.title}</span>
                      </td>
                      <td><code>{item.coordinates}</code></td>
                      <td>{item.photographer}</td>
                      <td><span className="license-pill">{item.license}</span></td>
                      <td><span className="storage-pill">✓ Bản địa hóa (0ms)</span></td>
                      <td>
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          Wikimedia ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="credits-modal-foot">
              <p>Tri ân cộng đồng nhiếp ảnh gia Wikimedia Commons đã lưu giữ những khoảnh khắc tư liệu tuyệt đẹp về đất nước và con người Việt Nam.</p>
              <button className="btn btn-primary" onClick={() => setShowCreditsModal(false)}>
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
