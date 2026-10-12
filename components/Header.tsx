import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  motionActive: boolean;
  onToggleMotion: () => void;
}

export default function Header({ motionActive, onToggleMotion }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: any, targetId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: targetId, offsetY: 70 },
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
            onClick={(e: any) => handleNavClick(e, '#top')}
            aria-label="MOTION-LAB — Trang chủ"
          >
            <span className="wordmark-badge">VN</span>
            <div className="wordmark-text">
              <span className="wordmark-brand">MOTION<span className="wordmark-dot">.</span>LAB</span>
              <span className="wordmark-sub">BY 0CUONG</span>
            </div>
          </a>

          <nav className="desktop-nav" aria-label="Điều hướng chính">
            <a href="#heritage" onClick={(e: any) => handleNavClick(e, '#heritage')}>
              <span className="nav-num">01</span> Di sản
            </a>
            <a href="#modern-city" onClick={(e: any) => handleNavClick(e, '#modern-city')}>
              <span className="nav-num">02</span> Đô thị
            </a>
            <a href="#everyday" onClick={(e: any) => handleNavClick(e, '#everyday')}>
              <span className="nav-num">03</span> Đời thường
            </a>
            <a href="#playground" onClick={(e: any) => handleNavClick(e, '#playground')}>
              <span className="nav-num">04</span> Motion Lab
            </a>
            <a href="#developer" onClick={(e: any) => handleNavClick(e, '#developer')}>
              <span className="nav-num">05</span> Tác giả
            </a>
          </nav>

          <div className="header-controls">
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

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-menu-inner">
          <p className="mobile-menu-tag">TRIỂN LÃM SỐ — VIỆT NAM ĐƯƠNG ĐẠI</p>
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <a href="#heritage" onClick={(e: any) => handleNavClick(e, '#heritage')}>
              <span>01 / DI SẢN TRƯỜNG TỒN</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#modern-city" onClick={(e: any) => handleNavClick(e, '#modern-city')}>
              <span>02 / ĐÔ THỊ ĐƯƠNG ĐẠI</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#everyday" onClick={(e: any) => handleNavClick(e, '#everyday')}>
              <span>03 / NHỊP SỐNG ĐỜI THƯỜNG</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#playground" onClick={(e: any) => handleNavClick(e, '#playground')}>
              <span>04 / GSAP MOTION PLAYGROUND</span>
              <span className="arrow">↗</span>
            </a>
            <a href="#developer" onClick={(e: any) => handleNavClick(e, '#developer')}>
              <span>05 / 0CUONG & CREDITS</span>
              <span className="arrow">↗</span>
            </a>
          </nav>
          <div className="mobile-menu-footer">
            <p>MOTION-LAB × VIETNAMESE CONTEMPORARY CULTURE</p>
            <p className="coords">21°02'N 105°51'E • 10°46'N 106°42'E</p>
          </div>
        </div>
      </div>
    </>
  );
}
