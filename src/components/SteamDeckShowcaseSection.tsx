import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const SteamDeckShowcaseSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let loaded = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || document.visibilityState !== 'visible' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || (navigator as Navigator & {connection?: {saveData?:boolean}}).connection?.saveData) {
        video.pause(); return;
      }
      if (!loaded) {
        loaded = true;
        const source = document.createElement('source');
        source.src = '/Steam%20deck/lifestyle_airplane.webm';
        source.type = 'video/webm';
        video.append(source);
        video.load();
      }
      void video.play().catch(() => {});
    }, {rootMargin:'80px 0px',threshold:0.15});
    observer.observe(video);
    const onHidden = () => { if (document.hidden) video.pause(); };
    document.addEventListener('visibilitychange',onHidden);
    return () => {observer.disconnect();document.removeEventListener('visibilitychange',onHidden);video.pause();};
  },[]);
  return (
    <section aria-label="Experiencia de juego portátil" className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-6 overflow-hidden rounded-[1.75rem] border border-white/[.08] bg-[#0E1728]/75 p-4 sm:p-7 lg:grid-cols-[.85fr_1.15fr]">
        <div className="p-2 sm:p-5">
          <p className="text-[11px] font-bold uppercase tracking-[.24em] text-[#92B4FF]">LA EXPERIENCIA HANDHELD</p>
          <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-white sm:text-5xl">Jugá donde quieras.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#B7C7DF]">Tus juegos favoritos, estés donde estés. Elegí una consola según la pantalla, el sistema y los juegos que usás.</p>
          <a href="#catalogo" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10">Ver consolas disponibles <ArrowUpRight size={17}/></a>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#080D19]">
          <img src="/optimized/lifestyle_camping.webp" loading="lazy" decoding="async" width="1200" height="675" alt="Personas jugando con una consola portátil" className="absolute inset-0 h-full w-full object-cover"/>
          <video ref={videoRef} muted loop playsInline preload="none" disablePictureInPicture aria-label="Video de una consola portátil en un viaje" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080D19]/25 to-transparent" />
        </div>
      </div>
    </section>
  );
};
