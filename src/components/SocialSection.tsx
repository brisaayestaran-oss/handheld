import React from 'react';
import { brandConfig } from '../config/brand';
import { Instagram, Video, MessageCircle, ArrowUpRight } from 'lucide-react';

export const SocialSection: React.FC = () => {
  const socialCards = [
    {
      platform: 'Instagram',
      handle: brandConfig.instagramHandle,
      url: brandConfig.instagramUrl,
      icon: Instagram,
      accentColor: '#E1306C',
      tag: 'NOVEDADES & SETUPS',
      title: 'Instagram',
      description: 'Historias diarias de consolas disponibles, accesorios compatibles, fotos de setups portátiles y unboxings en detalle.'
    },
    {
      platform: 'TikTok',
      handle: brandConfig.tiktokHandle,
      url: brandConfig.tiktokUrl,
      icon: Video,
      accentColor: '#00F2FE',
      tag: 'BENCHMARKS & COMPARATIVAS',
      title: 'Pruebas de Rendimiento en Juego Real',
      description: 'Gameplays con contador de FPS en vivo en títulos exigentes: Cyberpunk 2077, Black Myth Wukong, Forza Horizon 5 y emuladores.'
    },
    {
      platform: 'WhatsApp',
      handle: brandConfig.whatsappDisplay,
      url: `https://wa.me/${brandConfig.whatsappNumber}`,
      icon: MessageCircle,
      accentColor: '#25D366',
      tag: 'CANAL DE ATENCIÓN DIRECTA',
      title: 'Canal oficial de WhatsApp',
      description: 'Consultá cotización diaria, reservá consolas bajo pedido y recibí soporte técnico mano a mano con especialistas.'
    }
  ];

  return (
    <section id="redes" className="relative py-28 bg-[#050507] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono-tech text-[#7655FF] uppercase tracking-widest block mb-3">
            05. CANALES OFICIALES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight uppercase">
            COMUNIDAD & REDES
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#C8CAD1] leading-relaxed">
            Sumate a nuestros canales para ver análisis de rendimiento, comparativas y enterarte de los nuevos ingresos de stock.
          </p>
        </div>

        {/* Social Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-3xl bg-[#101115] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ color: item.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech text-white/50 group-hover:text-white transition-colors">
                      <span>{item.platform}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-tech tracking-wider uppercase text-[#7655FF] font-semibold block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-[#3678FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#C8CAD1]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-tech text-white/70">
                  <span className="text-white/40">CANAL</span>
                  <span className="text-white font-semibold">{item.handle}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
