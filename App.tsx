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
import ArtworkDetailModal from './components/ArtworkDetailModal';
import CanvasMotionLayer from './components/CanvasMotionLayer';
import { ALL_ARTWORKS, type PhotoItem } from './data/photography';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

type Scene = 'hero' | 'heritage' | 'city' | 'everyday' | 'outro';

// Maps section IDs to canvas scenes
const SECTION_SCENE_MAP: Array<{ id: string; scene: Scene }> = [
  { id: 'top',         scene: 'hero' },
  { id: 'heritage',    scene: 'heritage' },
  { id: 'modern-city', scene: 'city' },
  { id: 'everyday',    scene: 'everyday' },
  { id: 'playground',  scene: 'outro' },
  { id: 'developer',   scene: 'outro' },
];

export default function App() {
  const [motionActive, setMotionActive] = useState<boolean>(true);
  const [selectedArtwork, setSelectedArtwork] = useState<PhotoItem | null>(null);
  const [currentScene, setCurrentScene] = useState<Scene>('hero');
  const [pageScrollProgress, setPageScrollProgress] = useState(0);

  const appRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
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

  // Scene detection via IntersectionObserver — no scroll hijacking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_SCENE_MAP.forEach(({ id, scene }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentScene(scene);
            }
          });
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Scroll progress (passive, no hijacking)
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) {
        setPageScrollProgress(Math.min(window.scrollY / docH, 1));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const { contextSafe } = useGSAP(() => {
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
  }, { scope: appRef });

  const handleExplore = contextSafe(() => {
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: '#heritage', offsetY: 64 },
      ease: 'power3.inOut',
    });
  });

  const toggleMotion = () => {
    setMotionActive((prev) => {
      const next = !prev;
      if (!next) {
        ScrollTrigger.getAll().forEach((st) => st.disable(false, true));
      } else {
        ScrollTrigger.getAll().forEach((st) => st.enable());
        ScrollTrigger.refresh();
      }
      return next;
    });
  };

  return (
    <div className={`app-wrapper ${motionActive ? 'motion-enabled' : 'motion-reduced'}`} ref={appRef}>
      {/* Canvas 2D decorative motion layer — sits behind everything */}
      <CanvasMotionLayer
        scene={currentScene}
        motionActive={motionActive}
        scrollProgress={pageScrollProgress}
      />

      {/* Subtle photographic film grain overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Desktop Custom Cursor */}
      <CustomCursor enabled={motionActive} />

      {/* Site Header & Navigation */}
      <Header
        motionActive={motionActive}
        onToggleMotion={toggleMotion}
      />

      <main>
        {/* Scene 01 — Cinematic Opening */}
        <HeroScene
          motionActive={motionActive}
          onExplore={handleExplore}
          onOpenArtwork={setSelectedArtwork}
        />

        {/* Scene 02 — Heritage, Still Alive */}
        <HeritageScene
          motionActive={motionActive}
          onOpenArtwork={setSelectedArtwork}
        />

        {/* Scene 03 — The Modern City */}
        <ModernCityScene
          motionActive={motionActive}
          onOpenArtwork={setSelectedArtwork}
        />

        {/* Scene 04 — Everyday Vietnam */}
        <EverydayScene
          motionActive={motionActive}
          onOpenArtwork={setSelectedArtwork}
        />

        {/* Scene 05 — Motion Playground with SpaceScene ambient sculpture */}
        <div className="playground-section-container">
          <div className="space-sculpture-layer" aria-hidden="true">
            <SpaceScene paused={!motionActive} />
          </div>
          <PlaygroundScene
            motionActive={motionActive}
            onOpenArtwork={setSelectedArtwork}
          />
        </div>

        {/* Scene 06 — Developer Signature & Credits */}
        <DeveloperSignature />
      </main>

      {/* Artwork Curator Dossier & Lightbox Modal */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          allArtworks={ALL_ARTWORKS}
          onSelectArtwork={setSelectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}
