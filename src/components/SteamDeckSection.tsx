import React from 'react';
import { SteamDeckVisual } from './visuals/SteamDeckVisual';
import { ArrowRight, Cpu, Monitor, BatteryCharging, Gamepad2, Layers } from 'lucide-react';
import { Product } from '../types/catalog';

interface Props {
  onSelectProduct: (product: Product) => void;
  steamDeckProduct: Product;
}

export const SteamDeckSection: React.FC<Props> = ({ onSelectProduct, steamDeckProduct }) => {
  const highlights = [
    {
      icon: Gamepad2,
      title: 'Tu Biblioteca de Steam Completa',
      description: 'Iniciá sesión y accedé de inmediato a tus juegos, partidas guardadas en la nube y logros. Sin suscripciones forzadas ni intermediarios.'
    },
    {
      icon: Monitor,
      title: 'Pantalla OLED HDR de 90Hz',
      description: 'Negros puros, contraste infinito y tiempo de respuesta ultra veloz de 0.1ms. Colores calibrados de fábrica para una inmersión visual sin precedentes.'
    },
    {
      icon: Cpu,
      title: 'APU AMD 6nm de Alta Eficiencia',
      description: 'Arquitectura Zen 2 y gráficos RDNA 2 optimizados para un rendimiento constante en 15W, permitiendo jugar títulos AAA modernos con temperaturas controladas.'
    },
    {
      icon: BatteryCharging,
      title: 'Batería de 50 Wh Optimizada',
      description: 'Hasta un 50% más de autonomía respecto a la generación LCD. Carga rápida mediante USB-C Power Delivery con cargador de 45W incluido.'
    },
    {
      icon: Layers,
      title: 'Ergonomía & Trackpads Hápticos',
      description: 'Diseñada con agarres esculpidos para no cansar las muñecas. Los trackpads duales permiten jugar títulos de estrategia y shooters con precisión de mouse.'
    }
  ];

  return (
    <section id="steam-deck" className="relative py-28 bg-[#08090C] border-t border-white/[0.05] overflow-hidden">
      {/* Background soft ambient gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#3678FF]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-3">
            01. VALVETECH FLAGSHIP
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight uppercase">
            TU BIBLIOTECA. TU MUNDO. <br />
            <span className="bg-gradient-to-r from-white via-[#C8CAD1] to-white/70 bg-clip-text text-transparent">
              DONDE QUIERAS.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#C8CAD1] leading-relaxed">
            La consola que democratizó el PC gaming portátil. Sin comprometer la comodidad,
            con SteamOS y compatibilidad con miles de títulos verificados.
          </p>
        </div>

        {/* Big Visual & Key Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-7 relative group">
            <div className="p-4 sm:p-8 rounded-3xl bg-[#101115]/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-sm">
              {/* Corner badge */}
              <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono-tech text-white/70">
                <span className="w-2 h-2 rounded-full bg-[#3678FF]" />
                <span>STEAM DECK OLED · 7.4" 90HZ</span>
              </div>

              {/* Console official photo with studio lighting */}
              <div className="mt-8 mb-4 relative min-h-[240px] flex items-center justify-center transform transition-all duration-500 group-hover:scale-[1.02]">
                <img
                  src="/assets/consoles/steam-deck/steam-deck-hero.png"
                  alt="Valve Steam Deck OLED Fotografía Oficial"
                  className="w-full max-h-[260px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom quick spec strip */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/[0.08] text-center">
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-white">90 Hz</div>
                  <div className="text-[11px] font-mono-tech text-[#C8CAD1]/60">TASA REFRESCO</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-white">50 Wh</div>
                  <div className="text-[11px] font-mono-tech text-[#C8CAD1]/60">BATERÍA AMPLIADA</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-white">640 g</div>
                  <div className="text-[11px] font-mono-tech text-[#C8CAD1]/60">PESO REDUCIDO</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Feature Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-[#3678FF]/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-[#3678FF]/10 text-[#3678FF] group-hover:bg-[#3678FF] group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-display group-hover:text-[#3678FF] transition-colors">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs text-[#C8CAD1]/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectProduct(steamDeckProduct)}
                className="w-full py-4 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#101115] hover:bg-[#1A1C24] border border-[#3678FF]/40 hover:border-[#3678FF] rounded-xl transition-all shadow-[0_0_30px_rgba(54,120,255,0.15)] flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>DESCUBRIR STEAM DECK</span>
                <ArrowRight className="w-4 h-4 text-[#3678FF] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
