import React from 'react';
import { ArrowRight, Zap, MonitorPlay, Split, MousePointer, Sliders } from 'lucide-react';
import { Product } from '../types/catalog';

interface Props {
  onSelectProduct: (product: Product) => void;
  legionGoProduct: Product;
}

export const LegionGoSection: React.FC<Props> = ({ onSelectProduct, legionGoProduct }) => {
  const highlights = [
    {
      icon: Zap,
      title: 'Procesador AMD Ryzen Z1 Extreme',
      description: '8 núcleos Zen 4, 16 hilos hasta 5.1 GHz y 12 unidades gráficas RDNA 3. Potencia masiva para correr títulos AAA a resoluciones altas.'
    },
    {
      icon: MonitorPlay,
      title: 'Pantalla 8.8" QHD+ PureSight a 144Hz',
      description: 'Resolución de 2560 x 1600 con relación 16:10 y 500 nits. Un área de visión colosal con nitidez absoluta y fluidez extrema.'
    },
    {
      icon: Split,
      title: 'Mandos TrueStrike Desmontables',
      description: 'Palancas con efecto Hall inmunes al drift. Desacoplá los mandos para jugar relajado en modo mesa con su pie de apoyo integrado.'
    },
    {
      icon: MousePointer,
      title: 'Modo FPS Mouse Exclusivo',
      description: 'El mando derecho se inserta en su base magnética incluida para transformarse en un mouse vertical con sensor óptico de alta precisión.'
    },
    {
      icon: Sliders,
      title: 'Windows 11 Completo & Libertad Total',
      description: 'Instalá Xbox Game Pass nativo, Epic Games Store, emuladores y plataformas de PC sin restricciones ni bloqueos de sistema.'
    }
  ];

  return (
    <section id="legion-go" className="relative py-28 bg-[#08090C] border-t border-white/[0.05] overflow-hidden">
      {/* Background soft ambient gradient */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#7655FF]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono-tech text-[#7655FF] uppercase tracking-widest block mb-3">
            02. EXTREME PERFORMANCE
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight uppercase">
            POTENCIA SIN <br />
            <span className="bg-gradient-to-r from-white via-[#C8CAD1] to-[#7655FF] bg-clip-text text-transparent">
              COMPROMISOS.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#C8CAD1] leading-relaxed">
            Lenovo Legion Go combina la fuerza bruta del silicio AMD Ryzen Z1 Extreme
            con una pantalla descomunal de 8.8 pulgadas y la versatilidad de los mandos desmontables TrueStrike.
          </p>
        </div>

        {/* Big Visual & Key Details Split (Exactly identical structure to Steam Deck) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase Card (Exactly identical dimensions, background, border and padding as Steam Deck) */}
          <div className="lg:col-span-7 relative group">
            <div className="p-4 sm:p-8 rounded-3xl bg-[#101115]/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-sm">
              {/* Corner badge */}
              <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono-tech text-white/70">
                <span className="w-2 h-2 rounded-full bg-[#7655FF]" />
                <span>LENOVO LEGION GO · 8,8" QHD+ · 144HZ</span>
              </div>

              {/* Console official photo with studio lighting (Proportional to Steam Deck, no deformation) */}
              <div className="mt-8 mb-4 relative min-h-[240px] flex items-center justify-center transform transition-all duration-500 group-hover:scale-[1.02]">
                <img
                  src="/assets/consoles/lenovo-legion-go/legion-go-card.png"
                  alt="Lenovo Legion Go Original AMD Ryzen Z1 Extreme"
                  className="w-full max-h-[260px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom quick spec strip (Exact 3 indicators requested by user) */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/[0.08] text-center">
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-white">144 Hz</div>
                  <div className="text-[11px] font-mono-tech text-[#C8CAD1]/60 uppercase">TASA DE REFRESCO</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-white">49,2 Wh</div>
                  <div className="text-[11px] font-mono-tech text-[#C8CAD1]/60 uppercase">BATERÍA</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold font-display text-white">8,8"</div>
                  <div className="text-[11px] font-mono-tech text-[#C8CAD1]/60 uppercase">PANTALLA QHD+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Breakdown (Consistent with Steam Deck) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-[#7655FF]/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-[#7655FF]/10 text-[#7655FF] group-hover:bg-[#7655FF] group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-display group-hover:text-[#7655FF] transition-colors">
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
                onClick={() => onSelectProduct(legionGoProduct)}
                className="w-full py-4 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#101115] hover:bg-[#1A1C24] border border-[#7655FF]/40 hover:border-[#7655FF] rounded-xl transition-all shadow-[0_0_30px_rgba(118,85,255,0.15)] flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>DESCUBRIR LEGION GO</span>
                <ArrowRight className="w-4 h-4 text-[#7655FF] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
