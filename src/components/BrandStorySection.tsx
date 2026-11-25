import React from 'react';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';

export const BrandStorySection: React.FC = () => (
  <section id="nosotros" className="relative isolate scroll-mt-20 overflow-hidden px-5 py-12 sm:px-8 sm:py-28">
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[580px] w-[850px] -translate-x-1/2 rounded-full bg-[#326AC4]/[.13] blur-[150px]" />
    <div className="relative mx-auto max-w-6xl border-t border-white/10 pt-8 sm:pt-16">
      <p className="text-xs font-bold uppercase tracking-[.25em] text-[#8EB5FF]">QUIÉNES SOMOS / HANDHELD ARGENTINA</p>
      <h2 className="mt-4 sm:mt-7 max-w-5xl font-display text-[clamp(2.5rem,7vw,7.3rem)] font-black uppercase leading-[.97] tracking-tight text-white">Desde Argentina,<span className="block text-[#8BB5FF]">para todos los argentinos.</span></h2>
      <div className="mt-6 grid items-start gap-6 sm:mt-12 lg:grid-cols-[1fr_.8fr] lg:gap-20">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-[#D7E2F4] sm:text-2xl">Nos apasiona el gaming portátil y queremos acercarte una forma distinta de jugar.</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#B3C4DE] sm:text-base">HANDHELD es un emprendimiento argentino. Escuchamos qué jugás, qué buscás y cuál es tu presupuesto para ayudarte a elegir tu próxima consola. Sin discursos complicados: una charla de persona a persona.</p>
        </div>
        <div className="border-l-2 border-[#6A9EFF]/65 pl-5 sm:pl-7">
          <p className="text-xs font-bold uppercase tracking-[.17em] text-[#91B7FF]">CERCA TUYO</p>
          <p className="mt-3 text-base leading-relaxed text-white">Conocé las fotos, los accesorios y las condiciones particulares de cada equipo antes de decidir.</p>
          <a href={buildGeneralWhatsAppLink('Quiero hablar con HANDHELD sobre una consola')} onClick={() => recordInterest('purchase_click',undefined,'whatsapp')} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#A7C7FF] hover:text-white">Hablemos por WhatsApp <ArrowUpRight size={17}/></a>
        </div>
      </div>
    </div>
  </section>
);

export const FollowUsSection: React.FC = () => (
  <section id="seguinos" aria-label="Seguinos en redes sociales" className="relative scroll-mt-20 px-5 py-7 sm:px-8 sm:py-14">
    <div className="mx-auto max-w-6xl rounded-2xl border border-[#7AA5F1]/20 bg-[#111C32]/75 px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#96B9FA]">COMUNIDAD HANDHELD</p>
          <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">¿Te apasiona el gaming portátil?</h2>
          <p className="mt-1 max-w-lg text-sm text-[#B9CBE6]">Seguinos para ver nuevas consolas, comparativas y próximos ingresos.</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-[390px] sm:gap-3">
          <a href={brandConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Seguir a HANDHELD en Instagram" className="group inline-flex min-h-14 min-w-0 items-center justify-center gap-2 rounded-xl border border-[#88B6FF] bg-[#3678FF] px-2 py-3 text-xs font-extrabold text-white shadow-[0_0_22px_rgba(54,120,255,.28)] transition-all hover:border-white hover:bg-[#2868E9] hover:shadow-[0_0_32px_rgba(54,120,255,.48)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8CBFF] sm:px-5 sm:text-sm"><Instagram size={20} className="shrink-0"/><span className="leading-tight">Seguir en Instagram</span><ArrowUpRight size={15} className="hidden shrink-0 sm:block"/></a>
          <a href={brandConfig.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Seguir a HANDHELD en Facebook" className="inline-flex min-h-14 min-w-0 items-center justify-center gap-2 rounded-xl border border-[#536B94] bg-[#142038] px-2 py-3 text-xs font-semibold text-[#E5EDFF] transition-all hover:border-[#8DB8FF] hover:bg-[#1C2B4A] sm:px-5 sm:text-sm"><Facebook size={20} className="shrink-0"/><span className="leading-tight">Facebook</span></a>
        </div>
      </div>
    </div>
  </section>
);
