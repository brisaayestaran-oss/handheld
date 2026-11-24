import React from 'react';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppLink } from '../config/brand';
import { FloatingSteamDeck } from './FloatingSteamDeck';

export interface HeroProps { onExplore: () => void; }

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
  <section id="inicio" className="relative isolate overflow-hidden bg-[#050A15] text-white scroll-mt-20">
    {/* Dos zonas independientes: el movimiento del video nunca invade el texto. */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-20 h-72 bg-[radial-gradient(ellipse_at_center,rgba(43,83,171,0.14),transparent_72%)]" />
    <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-5 pt-20 text-center sm:pt-28 lg:pt-28">
      <p className="mb-4 font-mono-tech text-[10px] font-semibold uppercase tracking-[.24em] text-[#B4C9EF] sm:text-xs">
        <span className="inline-flex items-center gap-3 rounded-full border border-[#8AC7FF]/30 bg-[#74ACDF]/[.08] px-4 py-2 text-xs font-bold tracking-[.12em] text-[#D3E9FF]">
          <span aria-label="Bandera argentina" className="inline-flex h-5 w-8 items-center justify-center overflow-hidden rounded-sm bg-[linear-gradient(to_bottom,#74ACDF_0%,#74ACDF_33%,#FFFFFF_33%,#FFFFFF_66%,#74ACDF_66%)]"><span className="h-1.5 w-1.5 rounded-full bg-[#E3B945]"/></span>
          EMPRENDIMIENTO ARGENTINO
        </span>
      </p>
      <h1 className="w-full max-w-5xl font-display text-[clamp(2rem,6vw,5rem)] font-black uppercase leading-[1.04] tracking-tight text-white sm:leading-[.98]">
        <span className="block">ENCONTRÁ TU</span>
        <span className="block">PRÓXIMA CONSOLA</span>
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#E1E7F6] sm:text-lg">
        Descubrí la consola que va con vos. Tu próxima aventura empieza acá.
      </p>
      <div className="mx-auto mt-5 flex w-full max-w-[650px] flex-col justify-center gap-2 sm:mt-7 sm:w-auto sm:flex-row">
        <button type="button" onClick={onExplore}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#3678FF] px-6 py-3.5 text-xs font-bold uppercase text-white transition-colors hover:bg-[#2563EB] sm:text-sm">
          EXPLORAR CONSOLAS <ArrowRight size={16} />
        </button>
        <a href={buildGeneralWhatsAppLink('Consulta desde portada')} target="_blank" rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-[#0B1020]/90 px-6 py-3.5 text-xs font-bold uppercase text-white transition-colors hover:border-[#7AA6FF] sm:text-sm">
          <MessageCircle size={16} className="text-[#5691FF]" /> CONSULTAR POR WHATSAPP
        </a>
      </div>
    </div>

    {/* Imagen original de Steam Deck con suspensión y parallax sutil. */}
    <FloatingSteamDeck />
    <div className="relative z-20 -mt-5 flex justify-center px-5 pb-6 sm:-mt-10 sm:pb-8">
      <button type="button" onClick={onExplore}
        className="inline-flex items-center gap-3 rounded-full border border-[#A1B5ED]/35 bg-[#070C18]/85 px-5 py-3 text-[11px] font-bold uppercase tracking-[.13em] text-white transition-colors hover:border-[#91B2FF]">
        DESLIZÁ PARA EXPLORAR <ChevronDown size={16} />
      </button>
    </div>
  </section>
  );
};
