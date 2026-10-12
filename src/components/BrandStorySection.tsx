import React from 'react';
import { brandConfig } from '../config/brand';
import { HandheldLogo } from './HandheldLogo';
import { ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const pillars = [
    {
      icon: Eye,
      title: 'Especialización Exclusiva',
      desc: 'No vendemos electrodomésticos genéricos. Nuestro foco absoluto es el ecosistema de consolas portátiles de PC: conocemos cada arquitectura, versión de BIOS y configuración al detalle.'
    },
    {
      icon: HeartHandshake,
      title: 'Asesoramiento Personalizado',
      desc: 'Te ayudamos a elegir la consola que verdaderamente coincide con tu catálogo de juegos, tu tiempo disponible y tus expectativas de batería, antes de que gastes un solo peso.'
    },
    {
      icon: ShieldCheck,
      title: 'Transparencia Técnica Real',
      desc: 'Sin letras chicas. Informamos con total claridad el estado exacto de cada equipo reacondicionado certificado, sus capacidades técnicas y compatibilidades con cada launcher.'
    },
    {
      icon: Sparkles,
      title: 'Pasión por el Gaming',
      desc: 'Probamos cada hardware nosotros mismos. Compartimos configuraciones óptimas de TDP, ajustes de rendimiento por juego y guías para que le saques el 100% desde el primer día.'
    }
  ];

  return (
    <section id="nosotros" className="relative py-28 bg-[#08090C] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <HandheldLogo size="lg" showWordmark={true} withGlow={true} />
          </div>
          <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-3">
            04. NUESTRA VISIÓN
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight uppercase">
            TECNOLOGÍA PARA LOS QUE <br />
            <span className="bg-gradient-to-r from-white via-[#C8CAD1] to-white/70 bg-clip-text text-transparent">
              QUIEREN MÁS.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#C8CAD1] leading-relaxed">
            {brandConfig.brandName} nace con un objetivo claro: acercar a los jugadores de Argentina
            el mejor hardware portátil internacional con asesoramiento honesto y comunicación directa.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
