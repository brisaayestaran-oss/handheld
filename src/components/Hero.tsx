import React, { useState, useRef } from 'react';
import { buildGeneralWhatsAppLink } from '../config/brand';
import { MessageCircle, ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';

export interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const VIDEO_URL = 'https://res.cloudinary.com/obf69dry/video/upload/v1791766356/Generated_Video_October_11_2026_-_9_48PM.mp4';
  const POSTER_IMAGE = '/assets/consoles/steam-deck/steam-deck-hero.png';

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="inicio"
      className="relative w-full min-h-screen bg-[#050507] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Ambient Electric Blue & Tech Violet Backlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[650px] lg:w-[900px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-[#3678FF]/20 to-[#7655FF]/15 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none -z-10" />

      {/* ================= EDITORIAL HEADLINE & CTAS ================= */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center mt-4 sm:mt-8">
        {/* Subtle Kicker Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-4 sm:mb-6 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#3678FF] shadow-[0_0_8px_#3678FF]" />
          <span className="text-[11px] sm:text-xs font-mono-tech text-[#C8CAD1] uppercase tracking-wider">
            HANDHELD · HARDWARE SELECCIONADO EN ARGENTINA
          </span>
        </div>

        {/* TÍTULO PRINCIPAL: EXACTO SEGÚN REQUERIMIENTO */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-black font-display tracking-tight text-white max-w-4xl leading-[1.05] sm:leading-[0.98] uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
          ENCONTRÁ TU PRÓXIMA CONSOLA
        </h1>

        {/* SUBTÍTULO ELEGANTE Y COMERCIAL */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#C8CAD1] max-w-2xl font-normal leading-relaxed text-balance drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] px-2">
          Steam Deck y Lenovo Legion Go, en una experiencia premium para descubrir tu próxima consola portátil.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto px-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold font-display tracking-widest uppercase text-white bg-gradient-to-r from-[#3678FF] to-[#2563EB] hover:from-[#4384FF] hover:to-[#1D4ED8] rounded-xl transition-all shadow-[0_0_35px_rgba(54,120,255,0.4)] flex items-center justify-center gap-2.5 active:scale-95"
          >
            <span>EXPLORAR CONSOLAS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={buildGeneralWhatsAppLink('Consulta desde el Hero')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold font-display tracking-widest uppercase text-white bg-[#101115]/90 hover:bg-[#181B26] border border-white/[0.12] hover:border-white/[0.25] rounded-xl transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-xl backdrop-blur-md"
          >
            <MessageCircle className="w-4 h-4 text-[#3678FF]" />
            <span>CONSULTAR POR WHATSAPP</span>
          </a>
        </div>
      </div>

      {/* ================= PROTAGONIST VIDEO STAGE ================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-8 sm:my-10 flex flex-col items-center justify-center">
        {/* Soft floor shadow */}
        <div
          className="absolute -bottom-6 w-[85%] h-12 sm:h-20 rounded-[100%] blur-3xl pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.98) 40%, rgba(54,120,255,0.2) 75%, transparent 90%)'
          }}
        />

        {/* Video Frame */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0B0F] border border-white/[0.12] shadow-[0_25px_65px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.05] group">
          {/* Subtle specular rim light */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

          {!videoError ? (
            <div className="relative aspect-video w-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                poster={POSTER_IMAGE}
                onError={() => setVideoError(true)}
                className="w-full h-full object-contain sm:object-cover bg-black"
              >
                Tu navegador no soporta reproducción de video HTML5.
              </video>

              {/* Optional Subtle Audio Toggle Button (Non-intrusive) */}
              <button
                onClick={toggleSound}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 p-2 sm:p-2.5 rounded-xl bg-black/60 hover:bg-black/85 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
                title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#3678FF]" />}
              </button>
            </div>
          ) : (
            /* Fallback static official image */
            <div className="relative aspect-video w-full flex items-center justify-center p-6 bg-[#08090C]">
              <img
                src={POSTER_IMAGE}
                alt="Steam Deck OLED"
                className="max-h-[300px] sm:max-h-[420px] w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTTOM EXPLORE CUE ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 mt-2">
        <button
          onClick={onExplore}
          className="flex items-center gap-2 text-xs font-mono-tech text-[#C8CAD1]/70 hover:text-white transition-colors py-2 px-4 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06]"
        >
          <span>EXPLORAR CATÁLOGO & HARDWARE</span>
          <ChevronDown className="w-4 h-4 text-[#3678FF] animate-bounce" />
        </button>
      </div>
    </section>
  );
};
