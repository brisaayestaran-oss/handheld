import React from 'react';
import { brandConfig } from '../config/brand';
import { HandheldLogo } from './HandheldLogo';
import { ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Especialización Exclusiva',
      desc: 'Nos especializamos en consolas portátiles y te ayudamos a comparar modelos.'
    },
    {
      icon: HeartHandshake,
      title: 'Asesoramiento Personalizado',
      desc: 'Te orientamos según los juegos que preferís, tu presupuesto y lo que necesitás.'
    },
    {
      icon: ShieldCheck,
      title: 'Transparencia Técnica Real',
      desc: 'Te contamos el estado, las características y la disponibilidad de cada equipo.'
    },
    {
      icon: Sparkles,
      title: 'Pasión por el Gaming',
      desc: 'Compartimos información y recomendaciones para que aproveches tu consola.'
    }
  ];

  return (
    <section id="nosotros" className="relative py-16 sm:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-3">
            ¿QUIÉNES SOMOS?
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-4xl font-black font-display text-white tracking-tight leading-tight uppercase">
            DESDE ARGENTINA, <br />
            <span className="text-[#80B7F0]">PARA TODOS LOS ARGENTINOS.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#C8CAD1] leading-relaxed">
            En HANDHELD queremos acercar consolas portátiles a jugadores de todo el país, con asesoramiento personalizado, información clara y atención cercana.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-sm:hidden">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#101115] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#3678FF] group-hover:scale-110 group-hover:bg-[#3678FF] group-hover:text-white transition-all mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#C8CAD1]/80 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};