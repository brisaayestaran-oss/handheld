import React from 'react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { HandheldLogo } from './HandheldLogo';
import { Instagram, Video, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/[0.08] text-[#C8CAD1] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <HandheldLogo size="lg" showWordmark={true} withGlow={true} />
            <p className="text-xs font-mono-tech text-white/90 uppercase tracking-wider">
              {brandConfig.brandTagline}
            </p>
            <p className="text-xs text-[#C8CAD1]/70 leading-relaxed max-w-sm">
              {brandConfig.brandPositioning}
            </p>
            <div className="text-[11px] font-mono-tech text-[#C8CAD1]/50">
              {brandConfig.city}, {brandConfig.country}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono-tech uppercase tracking-wider text-white font-semibold">
              Explorar
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Portada Inmersiva</a>
              </li>
              <li>
                <a href="#steam-deck" className="hover:text-white transition-colors">Steam Deck OLED</a>
              </li>
              <li>
                <a href="#legion-go" className="hover:text-white transition-colors">Lenovo Legion Go Z1E</a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">Catálogo de Consolas</a>
              </li>
              <li>
                <a href="#experiencia" className="hover:text-white transition-colors">Comparativa de Sistemas</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">Contacto & Preguntas</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Contact */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono-tech uppercase tracking-wider text-white font-semibold">
              Atención & Redes
            </div>
            <p className="text-xs text-[#C8CAD1]/70 leading-relaxed">
              Atención directa por WhatsApp para reservas, consultas técnicas de juegos y coordinación de envíos.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white border border-white/[0.08] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-white border border-white/[0.08] transition-colors"
                aria-label="TikTok"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-[#3678FF] border border-white/[0.08] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#C8CAD1]/50">
          <div className="text-[11px] font-mono-tech">
            {brandConfig.demoCatalogDisclaimer}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono-tech">
              © {new Date().getFullYear()} {brandConfig.brandName}. Todos los derechos reservados.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 text-white/60 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-mono-tech"
              aria-label="Volver arriba"
            >
              <span>ARRIBA</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
