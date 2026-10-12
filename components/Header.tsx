import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  motionActive: boolean;
  onToggleMotion: () => void;
}

export default function Header({
  motionActive,
  onToggleMotion,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1.1,
        scrollTo: { y: targetId, offsetY: 72 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner page-wrap">
          <a
            className="wordmark"
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            aria-label="MOTION-LAB — Vietnam in Motion | 0Cuong"
          >
            <span className="wordmark-badge">VN</span>
            <div className="wordmark-text">
              <span className="wordmark-brand">MOTION<span className="wordmark-dot">.</span>LAB</span>
              <span className="wordmark-sub">BY 0CUONG</span>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="Điều hướng chính">
            <a href="#heritage" onClick={(e) => handleNavClick(e, '#heritage')}>
              <span className="nav-num">01</span> Di sản
            </a>
            <a href="#modern-city" onClick={(e) => handleNavClick(e, '#modern-city')}>
              <span className="nav-num">02</span> Đô thị
            </a>
            <a href="#everyday" onClick={(e) => handleNavClick(e, '#everyday')}>
              <span className="nav-num">03</span> Đời thường
            </a>
            <a href="#playground" onClick={(e) => handleNavClick(e, '#playground')}>
              <span className="nav-num">04</span> Chuyển động
            </a>
            <a href="#developer" onClick={(e) => handleNavClick(e, '#developer')}>
              <span className="nav-num">05</span> Tác giả & Bản quyền
            </a>
          </nav>

          <div className="header-controls">
            {/* Exhibition Counter Pill */}
            <div className="header-exhibition-pill" title="Triển lãm gồm 11 tác phẩm nhiếp ảnh qua 6 phân cảnh thị giác">
              <span className="pill-dot" />
              <span className="pill-text">11 TÁC PHẨM // 6 PHÂN CẢNH</span>
            </div>

            <button
              className="motion-toggle"
              onClick={onToggleMotion}
              aria-label={motionActive ? 'Tạm dừng hiệu ứng chuyển động' : 'Bật hiệu ứng chuyển động'}
              title={motionActive ? 'Motion: Active (Nhấp để tạm dừng)' : 'Motion: Paused (Nhấp để bật)'}
            >
              <span className={`motion-indicator ${motionActive ? 'is-active' : ''}`} />
              <span className="motion-label">{motionActive ? 'MOTION ON' : 'PAUSED'}</span>
            </button>

            <button
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="mobile-menu-inner">
          <p className="mobile-menu-tag">TRIỂN LÃM ẢNH VIỆT NAM ĐƯƠNG ĐẠI</p>
          <nav className="mobile-nav" aria-label="Điều hướng trên điện thoại">
            <a href="#heritage" onClick={(e) => handleNavClick(e, '#heritage')}>
              <span>01 / DI SẢN TRƯỜNG TỒN</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#modern-city" onClick={(e) => handleNavClick(e, '#modern-city')}>
              <span>02 / ĐÔ THỊ ĐƯƠNG ĐẠI</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#everyday" onClick={(e) => handleNavClick(e, '#everyday')}>
              <span>03 / KHOẢNG NGHỈ ĐỜI THƯỜNG</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#playground" onClick={(e) => handleNavClick(e, '#playground')}>
              <span>04 / DẤU ẤN CHUYỂN ĐỘNG</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#developer" onClick={(e) => handleNavClick(e, '#developer')}>
              <span>05 / TÁC GIẢ & TRA CỨU BẢN QUYỀN</span>
              <span className="arrow">↗</span>
            </a>
          </nav>
          <div className="mobile-menu-footer">
            <p>MOTION-LAB · 0CUONG</p>
            <p className="coords">21°02'N 105°51'E • 10°46'N 106°42'E</p>
          </div>
        </div>
      </div>
    </>
  );
}
