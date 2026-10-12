import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import Header from './components/Header';
import HeroScene from './components/HeroScene';
import HeritageScene from './components/HeritageScene';
import ModernCityScene from './components/ModernCityScene';
import EverydayScene from './components/EverydayScene';
import PlaygroundScene from './components/PlaygroundScene';
import DeveloperSignature from './components/DeveloperSignature';
import CustomCursor from './components/CustomCursor';
import SpaceScene from './components/SpaceScene';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export default function App() {
  const [motionActive, setMotionActive] = useState<boolean>(true);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setMotionActive(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setMotionActive(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { contextSafe } = useGSAP(() => {
    // Global ScrollTrigger setup
    ScrollTrigger.defaults({
      markers: false,
    });

    // Refresh ScrollTrigger when images load
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('load', () => {
        ScrollTrigger.refresh();
      }, { once: true });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, { scope: appRef });

  const handleExplore = contextSafe(() => {
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: '#heritage', offsetY: 60 },
      ease: 'power3.inOut',
    });
  });

  const toggleMotion = () => {
    setMotionActive((prev) => {
      const next = !prev;
      if (!next) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.play();
        ScrollTrigger.refresh();
      }
      return next;
    });
  };

  return (
    <div className={`app-wrapper ${motionActive ? 'motion-enabled' : 'motion-reduced'}`} ref={appRef} id="top">
      {/* Subtle photographic film grain overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Desktop Custom Cursor */}
      <CustomCursor enabled={motionActive} />

      {/* Site Header & Navigation */}
      <Header motionActive={motionActive} onToggleMotion={toggleMotion} />

      <main>
        {/* Scene 01 — Cinematic Opening */}
        <HeroScene motionActive={motionActive} onExplore={handleExplore} />

        {/* Scene 02 — Heritage, Still Alive */}
        <HeritageScene motionActive={motionActive} />

        {/* Scene 03 — The Modern City */}
        <ModernCityScene motionActive={motionActive} />

        {/* Scene 04 — Everyday Vietnam */}
        <EverydayScene motionActive={motionActive} />

        {/* Scene 05 — Motion Playground with SpaceScene ambient sculpture */}
        <div className="playground-section-container">
          <div className="space-sculpture-layer" aria-hidden="true">
            <SpaceScene paused={!motionActive} />
          </div>
          <PlaygroundScene motionActive={motionActive} />
        </div>

        {/* Scene 06 — Developer Signature & Credits */}
        <DeveloperSignature />
      </main>
    </div>
  );
}
