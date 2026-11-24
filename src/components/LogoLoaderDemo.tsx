import React, { useEffect, useId, useRef, useState } from 'react';

const PERIOD = 5600;
const DRAW = 2650;
const ease = (v: number) => { const t = Math.max(0, Math.min(1, v)); return (1 - Math.cos(Math.PI * t)) / 2; };
type Contour = { d: string; x: number; len: number };

function traceExactLogo(image: HTMLImageElement): { paths: Contour[]; viewBox: string } {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas no disponible');
  context.drawImage(image, 0, 0);
  const { width: w, height: h } = canvas;
  const data = context.getImageData(0, 0, w, h).data;
  const inside = new Uint8Array(w * h);
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    if (data[i + 3] < 130 || data[i] + data[i + 1] + data[i + 2] < 200) continue;
    inside[y * w + x] = 1;
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  if (minX > maxX) throw new Error('El logo no contiene píxeles visibles');
  // Trace boundaries from the original pixels, including all counters of the lettering.
  // Every boundary edge is oriented in the same direction around an opaque area.
  const starts = new Map<number, number[]>();
  const v = (x: number, y: number) => y * (w + 1) + x;
  const edge = (a: number, b: number) => { const bucket = starts.get(a); if (bucket) bucket.push(b); else starts.set(a, [b]); };
  const has = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h && inside[y * w + x] === 1;
  for (let y = minY; y <= maxY; y++) for (let x = minX; x <= maxX; x++) {
    if (!has(x, y)) continue;
    if (!has(x, y - 1)) edge(v(x, y), v(x + 1, y));
    if (!has(x + 1, y)) edge(v(x + 1, y), v(x + 1, y + 1));
    if (!has(x, y + 1)) edge(v(x + 1, y + 1), v(x, y + 1));
    if (!has(x - 1, y)) edge(v(x, y + 1), v(x, y));
  }
  const contours: Contour[] = [];
  let safety = 0;
  while (starts.size && safety++ < 10000) {
    const first = starts.keys().next().value as number;
    let cur = first, points: [number, number][] = [];
    let length = 0;
    for (let n = 0; n < w * h; n++) {
      const x = cur % (w + 1), y = Math.floor(cur / (w + 1));
      if (points.length > 1) {
        const a = points[points.length - 2], b = points[points.length - 1];
        if ((a[0] === b[0] && b[0] === x) || (a[1] === b[1] && b[1] === y)) points.pop();
      }
      points.push([x, y]);
      const options = starts.get(cur);
      if (!options?.length) break;
      const next = options.pop()!;
      if (!options.length) starts.delete(cur);
      length += Math.hypot(next % (w + 1) - x, Math.floor(next / (w + 1)) - y);
      cur = next;
      if (cur === first) break;
    }
    if (cur !== first || points.length < 3 || length < 6) continue;
    const x = points.reduce((sum, p) => sum + p[0], 0) / points.length;
    contours.push({ x, len: length, d: 'M' + points.map(p => p.join(' ')).join(' L') + ' Z' });
  }
  return { paths: contours, viewBox: `${minX - 18} ${minY - 18} ${maxX - minX + 37} ${maxY - minY + 37}` };
}

export default function LogoLoaderDemo() {
  const instance = useId().replace(/:/g, '');
  const sectionRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [geometry, setGeometry] = useState<{ paths: Contour[]; viewBox: string } | null>(null);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const pausedRef = useRef(false);
  const reducedRef = useRef(reduced);
  const progressRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const renderRef = useRef<(ms: number) => void>(() => {});
  const visibleRef = useRef(true);
  const hiddenRef = useRef(document.visibilityState !== 'visible');

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = '/handheld.png';
    image.decode().then(() => {
      if (!cancelled) { setGeometry(traceExactLogo(image)); setReady(true); }
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => {
      reducedRef.current = query.matches;
      setReduced(query.matches);
      if (query.matches) renderRef.current(4000);
      else renderRef.current(progressRef.current);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0.01 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    const visibility = () => { hiddenRef.current = document.visibilityState !== 'visible'; };
    document.addEventListener('visibilitychange', visibility);
    const onHide = () => { hiddenRef.current = true; };
    const onShow = () => { hiddenRef.current = document.visibilityState !== 'visible'; };
    window.addEventListener('pagehide', onHide);
    window.addEventListener('pageshow', onShow);
    return () => {
      observer.disconnect(); document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', onHide); window.removeEventListener('pageshow', onShow);
    };
  }, []);

  useEffect(() => {
    if (!geometry || !ready) return;
    const outlines = document.getElementById(instance + '-outline');
    const filled = document.getElementById(instance + '-filled');
    const lockup = document.getElementById(instance + '-lockup');
    renderRef.current = (ms: number) => {
      const t = reducedRef.current ? 4000 : ms % PERIOD;
      for (let i = 0; i < geometry.paths.length; i++) {
        const path = pathRefs.current[i];
        if (!path) continue;
        const contour = geometry.paths[i];
        const boxX = Number(geometry.viewBox.split(' ')[0]);
        const boxW = Number(geometry.viewBox.split(' ')[2]);
        const stagger = Math.min(360, Math.max(0, ((contour.x - boxX) / boxW) * 360));
        const p = ease((t - stagger) / DRAW);
        path.style.strokeDasharray = String(contour.len);
        path.style.strokeDashoffset = String(contour.len * (1 - p));
      }
      const fill = ease((t - 3100) / 700);
      if (outlines) outlines.style.opacity = String(1 - fill);
      if (filled) filled.style.opacity = String(fill);
      if (lockup) lockup.style.opacity = String(1 - ease((t - 5000) / 600));
    };
    if (reducedRef.current) renderRef.current(4000);
    else renderRef.current(progressRef.current);
    let last: number | null = null;
    const tick = (time: number) => {
      if (last === null) last = time;
      const delta = Math.min(time - last, 100);
      last = time;
      if (!reducedRef.current && !pausedRef.current && visibleRef.current && !hiddenRef.current) {
        progressRef.current = (progressRef.current + delta) % PERIOD;
        renderRef.current(progressRef.current);
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, [geometry, ready, instance]);

  const toggle = () => { if (reduced) return; pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); };
  const replay = () => { if (reduced) return; progressRef.current = 0; pausedRef.current = false; setPaused(false); renderRef.current(0); };

  return (
    <main ref={sectionRef} className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#182b35] text-[#faf6f9]" aria-label="Demostración de animación del logo completo de HANDHELD">
      <div className="flex w-[84vw] max-w-[620px] items-center justify-center sm:w-[58vw]">
        {geometry && ready ? (
          <svg role="img" aria-label="HANDHELD, símbolo de consola y nombre completo de la marca" viewBox={geometry.viewBox} className="block h-auto w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            <g id={instance + '-lockup'}>
              <g id={instance + '-outline'} fill="none" stroke="#f5edde" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                {geometry.paths.map((contour, i) => <path key={i} d={contour.d} ref={el => { pathRefs.current[i] = el; }} />)}
              </g>
              <g id={instance + '-filled'} style={{ opacity: 0 }}>
                <image href="/handheld.png" x="0" y="0" width="1101" height="591" />
              </g>
            </g>
          </svg>
        ) : failed ? (
          <div role="img" aria-label="HANDHELD, símbolo de consola y nombre completo de la marca" className="text-center text-3xl font-bold tracking-widest text-[#faf6f9] sm:text-5xl">HANDHELD</div>
        ) : (
          <span className="sr-only">Cargando logotipo de HANDHELD</span>
        )}
      </div>
      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        <button type="button" onClick={toggle} disabled={!ready || reduced || failed} className="rounded-md px-3 py-2 text-xs text-[#faf6f9] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30" aria-label={paused ? 'Reproducir animación' : 'Pausar animación'}>{paused ? 'Play' : 'Pause'}</button>
        <button type="button" onClick={replay} disabled={!ready || reduced || failed} className="rounded-md px-3 py-2 text-xs text-[#faf6f9] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30" aria-label="Reiniciar animación">Replay</button>
      </div>
    </main>
  );
}
