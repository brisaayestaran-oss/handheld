import React from 'react';

const IMAGE = '/Steam%20deck/deck_angled.png';
const cycle = 7;
const easing = (v: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, v)), 2);

export function FloatingSteamDeck() {
  const section = React.useRef<HTMLDivElement>(null);
  const tilt = React.useRef<HTMLDivElement>(null);
  const bob = React.useRef<HTMLDivElement>(null);
  const target = React.useRef({ x: 0, y: 0, z: 0 });
  const current = React.useRef({ x: 0, y: 0, z: 0 });
  const [decoded, setDecoded] = React.useState(false);
  const [reduced, setReduced] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = React.useState(false);
  const pausedRef = React.useRef(false);
  const time = React.useRef(0);
  const frame = React.useRef<number | null>(null);
  const visible = React.useRef(true);
  const hidden = React.useRef(document.hidden);
  const bounds = React.useRef<DOMRect | null>(null);
  const finePointer = React.useRef(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const reducedRef = React.useRef(reduced);

  React.useEffect(() => {
    const img = new Image();
    let cancelled = false;
    img.src = IMAGE;
    Promise.all([img.decode(), document.fonts.ready]).then(() => {
      if (!cancelled) setDecoded(true);
    }).catch(() => {
      if (!cancelled) setDecoded(true); // Browsers still expose fallback alt when artwork fails.
    });
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const p = window.matchMedia('(hover: hover) and (pointer: fine)');
    const changeMotion = () => {
      reducedRef.current = m.matches;
      setReduced(m.matches);
      if (m.matches) {
        target.current = { x: 0, y: 0, z: 0 };
        current.current = { x: 0, y: 0, z: 0 };
        if (tilt.current) tilt.current.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
        if (bob.current) bob.current.style.transform = 'translateY(0px)';
      }
    };
    const changePointer = () => { finePointer.current = p.matches; };
    m.addEventListener('change', changeMotion);
    p.addEventListener('change', changePointer);
    return () => { m.removeEventListener('change', changeMotion); p.removeEventListener('change', changePointer); };
  }, []);

  React.useEffect(() => {
    const el = section.current;
    if (!el) return;
    const updateBounds = () => { bounds.current = el.getBoundingClientRect(); };
    updateBounds();
    const resize = new ResizeObserver(updateBounds);
    resize.observe(el);
    const observer = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.01 });
    observer.observe(el);
    const onVisibility = () => { hidden.current = document.hidden; };
    const onPageHide = () => { hidden.current = true; };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onVisibility);
    return () => {
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onVisibility);
    };
  }, []);

  React.useEffect(() => {
    if (!decoded) return;
    let last: number | null = null;
    const step = (now: number) => {
      if (last === null) last = now;
      const delta = Math.min(100, Math.max(0, now - last));
      last = now;
      if (!reducedRef.current && !pausedRef.current && visible.current && !hidden.current) {
        time.current += delta / 1000;
        const lift = -16 * (1 - Math.cos(time.current * Math.PI * 2 / cycle)) / 2;
        if (bob.current) bob.current.style.transform = `translateY(${lift}px)`;
        const k = easing(Math.min(1, delta / 1300 * 3));
        for (const key of ['x', 'y', 'z'] as const) {
          current.current[key] += (target.current[key] - current.current[key]) * k;
        }
        if (tilt.current) {
          const { x, y, z } = current.current;
          tilt.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
        }
      }
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => { if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, [decoded]);

  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer.current || reducedRef.current || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    bounds.current = rect;
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    target.current = { x: -y * 8, y: x * 12, z: x * 4.8 };
  };
  const pointerLeave = () => { target.current = { x: 0, y: 0, z: 0 }; };
  const toggle = () => { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); };
  const replay = () => {
    time.current = 0;
    target.current = { x: 0, y: 0, z: 0 };
    current.current = { x: 0, y: 0, z: 0 };
    if (bob.current) bob.current.style.transform = 'translateY(0px)';
    if (tilt.current) tilt.current.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
    pausedRef.current = false; setPaused(false);
  };

  return (
    <div className="relative isolate mx-auto w-full max-w-[1500px] overflow-hidden px-2 sm:px-5" aria-label="Consola Steam Deck flotando suavemente">
      <div ref={section} onPointerMove={pointerMove} onPointerLeave={pointerLeave}
        className="relative mx-auto h-[270px] w-full max-w-[1160px] touch-pan-y sm:h-[380px] lg:h-[490px]"
        style={{ perspective: '1000px' }}>
        {/* Iluminación ambiental de estudio, sin marcos ni anillos decorativos. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[51%] h-[77%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(51,93,233,.32)_0%,rgba(87,41,167,.17)_36%,transparent_74%)] blur-[30px] sm:blur-[52px]" />
          <div className="absolute bottom-[13%] left-1/2 h-[6%] w-[58%] -translate-x-1/2 rounded-[50%] bg-[#4677FF]/25 blur-[23px]" />
          <div className="absolute inset-x-[20%] bottom-[4%] h-[1px] bg-gradient-to-r from-transparent via-[#5678FF]/20 to-transparent" />
        </div>
        <div ref={tilt} className="absolute inset-[9%_1%_9%] flex items-center justify-center sm:inset-[12%_4%_10%]"
          style={{ transformOrigin: 'center', willChange: reduced ? 'auto' : 'transform' }}>
          <div ref={bob} className="flex h-full w-full items-center justify-center"
            style={{ willChange: reduced ? 'auto' : 'transform' }}>
            <img src={IMAGE} alt="Steam Deck en perspectiva, consola portátil de Valve"
              className="h-full w-full object-contain drop-shadow-[0_30px_32px_rgba(15,25,55,0.48)]"
              decoding="async" loading="eager" fetchPriority="high" />
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-3 z-30 flex items-center gap-2 text-white/60 sm:right-7">
        <button type="button" onClick={toggle} disabled={reduced || !decoded}
          className="rounded-lg px-3 py-2 text-xs hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91B2FF] disabled:opacity-30"
          aria-label={paused ? 'Reproducir movimiento de la consola' : 'Pausar movimiento de la consola'}>{paused ? 'Play' : 'Pause'}</button>
        <button type="button" onClick={replay} disabled={reduced || !decoded}
          className="rounded-lg px-3 py-2 text-xs hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#91B2FF] disabled:opacity-30"
          aria-label="Reiniciar movimiento de la consola">Replay</button>
      </div>
    </div>
  );
}
