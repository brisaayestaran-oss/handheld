import React, { useEffect, useRef } from 'react';

export const SteamDeckRotationSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let isVisible = false;
    let sourceLoaded = false;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && document.visibilityState === 'visible') {
        if (!sourceLoaded) {
          sourceLoaded = true;
          const source = document.createElement('source');
          source.src = '/Steam%20deck/steamdeck_rotation_25s.mp4';
          source.type = 'video/mp4';
          video.appendChild(source);
          video.load();
        }
        void video.play().catch(() => {});
      }
      else video.pause();
    }, { threshold: 0.2 });
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') video.pause();
      else if (isVisible) void video.play().catch(() => {});
    };
    observer.observe(video);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10" aria-label="Conocé cada detalle de Steam Deck">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[.2em] text-[#8FA9FF]">CONOCÉ CADA DETALLE</p>
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden bg-[#050507]">
        <video ref={videoRef} className="block aspect-video w-full object-contain"
          muted loop playsInline preload="none" disablePictureInPicture
          aria-label="Rotación continua de la Steam Deck">

        </video>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-[#050507] to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#050507] to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#050507] to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-[#050507] to-transparent" />
      </div>
    </section>
  );
};
