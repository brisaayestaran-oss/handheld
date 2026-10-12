import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Eye, Rotate3D, ZoomIn, ShieldCheck, Gamepad2, Layers } from 'lucide-react';

export interface ConsoleShowcaseModel {
  id: 'steam-deck-oled' | 'lenovo-legion-go' | 'steam-deck-lcd';
  label: string;
  badge: string;
  image: string;
  accentColor: string;
  glowColor: string;
  gameTitle: string;
  fps: string;
  panelText: string;
  apuText: string;
  batteryText: string;
  screenBox: {
    left: string;
    top: string;
    width: string;
    height: string;
    radius: string;
  };
  features: {
    title: string;
    value: string;
    pos: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }[];
}

interface Props {
  activeModel: ConsoleShowcaseModel;
  onExplore?: () => void;
}

export const ConsoleShowcase3D: React.FC<Props> = ({ activeModel }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, isHovered: false });
  // View mode: 'free' (follows mouse), 'front' (straight), 'angle' (dramatic perspective), 'zoom' (close-up)
  const [viewMode, setViewMode] = useState<'free' | 'front' | 'angle' | 'zoom'>('free');

  // Handle pointer tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || viewMode !== 'free') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, isHovered: false });
  };

  // Determine tilt rotations based on viewMode
  let rotX = 0;
  let rotY = 0;
  let scale = 1;
  let transZ = 0;

  if (viewMode === 'free') {
    // Subtle, elegant agency tilt (max 4.5° X, 7° Y)
    rotX = -mousePos.y * 4.5;
    rotY = mousePos.x * 6.5;
    scale = mousePos.isHovered ? 1.02 : 1;
    transZ = mousePos.isHovered ? 25 : 0;
  } else if (viewMode === 'front') {
    rotX = 0;
    rotY = 0;
    scale = 1;
  } else if (viewMode === 'angle') {
    rotX = -3.5;
    rotY = 7.5;
    scale = 1.03;
    transZ = 30;
  } else if (viewMode === 'zoom') {
    rotX = -2;
    rotY = 3;
    scale = 1.15;
    transZ = 60;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none py-6"
      style={{ perspective: '1600px' }}
    >
      {/* Interactive Viewport Angle Controls */}
      <div className="flex items-center gap-2 mb-6 z-30">
        <div className="p-1 rounded-xl bg-[#101115]/90 border border-white/[0.08] backdrop-blur-xl flex items-center gap-1 shadow-lg shadow-black/60">
          <button
            onClick={() => setViewMode('free')}
            className={`px-3 py-1.5 text-[11px] font-mono-tech rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'free'
                ? 'bg-[#3678FF] text-white font-bold shadow-[0_0_15px_rgba(54,120,255,0.4)]'
                : 'text-[#C8CAD1]/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Rotate3D className="w-3.5 h-3.5" />
            <span>Giro 3D Libre</span>
          </button>

          <button
            onClick={() => setViewMode('angle')}
            className={`px-3 py-1.5 text-[11px] font-mono-tech rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'angle'
                ? 'bg-[#3678FF] text-white font-bold shadow-[0_0_15px_rgba(54,120,255,0.4)]'
                : 'text-[#C8CAD1]/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ángulo Dinámico</span>
          </button>

          <button
            onClick={() => setViewMode('zoom')}
            className={`px-3 py-1.5 text-[11px] font-mono-tech rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'zoom'
                ? 'bg-[#3678FF] text-white font-bold shadow-[0_0_15px_rgba(54,120,255,0.4)]'
                : 'text-[#C8CAD1]/60 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Zoom Detalle</span>
          </button>
        </div>
      </div>

      {/* 3D Root Stage with Depth Layers */}
      <div
        className="relative w-full flex items-center justify-center transition-transform duration-300 ease-out animate-float-gentle"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale}) translateZ(${transZ}px)`
        }}
      >
        {/* Real Ground Contact Shadow */}
        <div
          className="absolute -bottom-8 sm:-bottom-12 w-[75%] sm:w-[85%] h-12 sm:h-20 rounded-[100%] blur-3xl pointer-events-none transition-all duration-500 -z-10"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.98) 30%, ${activeModel.glowColor} 70%, transparent 85%)`,
            transform: `translateZ(-50px) scaleX(${1 + mousePos.x * 0.05})`
          }}
        />

        {/* Ambient Backlight Halo */}
        <div
          className="absolute inset-0 rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-700 opacity-80"
          style={{
            backgroundColor: activeModel.glowColor,
            transform: 'translateZ(-80px)'
          }}
        />

        {/* ================= CONSOLE HARDWARE WRAPPER ================= */}
        <div className="relative w-full max-w-4xl px-2 sm:px-6">
          {/* REAL PRODUCT PHOTOGRAPHY BASE (Tactile materials, buttons, sticks, grips) */}
          <img
            key={activeModel.id}
            src={activeModel.image}
            alt={activeModel.label}
            className="w-full h-auto object-contain max-h-[380px] sm:max-h-[500px] md:max-h-[550px] mx-auto filter drop-shadow-[0_45px_70px_rgba(0,0,0,0.95)] contrast-[1.04] brightness-[1.01] pointer-events-none transition-opacity duration-300"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* ACTIVE ILLUMINATED IN-GAME OLED SCREEN OVERLAY */}
          {/* Aligned with pixel-perfect percentage coordinates onto the physical console screen */}
          <div
            className="absolute overflow-hidden shadow-inner transition-all duration-500"
            style={{
              left: activeModel.screenBox.left,
              top: activeModel.screenBox.top,
              width: activeModel.screenBox.width,
              height: activeModel.screenBox.height,
              borderRadius: activeModel.screenBox.radius,
              transform: 'translateZ(12px)',
              boxShadow: 'inset 0 0 16px rgba(0,0,0,0.9), 0 0 25px rgba(54,120,255,0.2)'
            }}
          >
            {/* Living Game Graphic Background */}
            <div className="relative w-full h-full bg-[#080B14] overflow-hidden">
              {/* Sci-Fi / Cyber Horizon gradient art */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `radial-gradient(ellipse at 50% 30%, ${
                    activeModel.id === 'lenovo-legion-go' ? '#7655FF' : '#3678FF'
                  } 0%, #151128 50%, #060810 100%)`
                }}
              />

              {/* Glowing Cyber Grid */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Neon Sun / Core */}
              <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-md opacity-80"
                style={{
                  background:
                    activeModel.id === 'lenovo-legion-go'
                      ? 'radial-gradient(circle, #7655FF 0%, #3678FF 70%, transparent 100%)'
                      : 'radial-gradient(circle, #FF2E74 0%, #3678FF 70%, transparent 100%)'
                }}
              />

              {/* Mountains Silhouettes */}
              <svg
                viewBox="0 0 400 200"
                className="absolute bottom-0 inset-x-0 w-full h-auto opacity-90"
                preserveAspectRatio="none"
              >
                <polygon points="0,200 60,110 130,160 200,90 270,140 340,105 400,170 400,200" fill="#0A0E1A" />
                <polyline points="0,200 60,110 130,160 200,90 270,140 340,105 400,170" fill="none" stroke={activeModel.accentColor} strokeWidth="1.5" opacity="0.8" />
              </svg>

              {/* Scanning Laser Sheen Animation */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{ top: '45%' }} />

              {/* Active Gaming HUD: Live FPS Counter & Panel Metrics */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono-tech font-bold text-white shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
                <span className="text-[#00F0FF]">{activeModel.fps}</span>
              </div>

              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono-tech font-bold text-white shadow-md">
                <span className="text-white/80">{activeModel.panelText}</span>
              </div>

              {/* Center Game Title Titlecard */}
              <div className="absolute bottom-3 inset-x-0 text-center px-2">
                <div className="text-[11px] sm:text-[13px] font-black font-display tracking-widest text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {activeModel.gameTitle}
                </div>
                <div className="text-[8px] sm:text-[9px] font-mono-tech text-white/70 tracking-wider">
                  {activeModel.batteryText}
                </div>
              </div>

              {/* Screen Glass Reflection Shimmer (Curved Specular Glare) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(125deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 65%)'
                }}
              />
            </div>
          </div>

          {/* LIGHT SWEEP SHEEN OVER HARDWARE CHASSIS */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
            style={{ mixBlendMode: 'screen', transform: 'translateZ(18px)' }}
          >
            <div className="w-[45%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-light-sweep" />
          </div>

          {/* ================= FLOATING 3D HUD SPATIAL CARDS ================= */}
          {/* Card 1: Top-Left Display Tech */}
          <div
            className="absolute -top-4 sm:top-2 -left-2 sm:-left-6 hidden md:flex items-center gap-2.5 p-3 rounded-2xl bg-[#101115]/85 border border-white/[0.12] backdrop-blur-xl shadow-xl transition-transform duration-300 pointer-events-none"
            style={{
              transform: `translateZ(45px) rotateY(${-rotY * 0.5}deg) rotateX(${-rotX * 0.5}deg)`
            }}
          >
            <div className="p-2 rounded-xl bg-white/[0.04] text-[#3678FF] border border-white/[0.08]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono-tech text-white/50 uppercase">TECNOLOGÍA DE PANEL</div>
              <div className="text-xs font-bold font-display text-white">{activeModel.panelText}</div>
            </div>
          </div>

          {/* Card 2: Top-Right APU Power */}
          <div
            className="absolute -top-4 sm:top-2 -right-2 sm:-right-6 hidden md:flex items-center gap-2.5 p-3 rounded-2xl bg-[#101115]/85 border border-white/[0.12] backdrop-blur-xl shadow-xl transition-transform duration-300 pointer-events-none"
            style={{
              transform: `translateZ(50px) rotateY(${-rotY * 0.5}deg) rotateX(${-rotX * 0.5}deg)`
            }}
          >
            <div className="p-2 rounded-xl bg-white/[0.04] text-[#7655FF] border border-white/[0.08]">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono-tech text-white/50 uppercase">PROCESAMIENTO</div>
              <div className="text-xs font-bold font-display text-white">{activeModel.apuText}</div>
            </div>
          </div>

          {/* Card 3: Bottom-Left Ecosystem */}
          <div
            className="absolute -bottom-4 sm:bottom-6 -left-2 sm:-left-4 hidden lg:flex items-center gap-2.5 p-3 rounded-2xl bg-[#101115]/85 border border-white/[0.12] backdrop-blur-xl shadow-xl transition-transform duration-300 pointer-events-none"
            style={{
              transform: `translateZ(40px) rotateY(${-rotY * 0.4}deg) rotateX(${-rotX * 0.4}deg)`
            }}
          >
            <div className="p-2 rounded-xl bg-white/[0.04] text-[#3678FF] border border-white/[0.08]">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono-tech text-white/50 uppercase">DISPONIBILIDAD</div>
              <div className="text-xs font-bold font-display text-white">Stock en Argentina</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
