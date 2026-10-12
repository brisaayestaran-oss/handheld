import React, { useState, useEffect } from 'react';
import { brandConfig, buildGeneralWhatsAppLink } from '../config/brand';
import { HandheldLogo } from './HandheldLogo';
import { MessageCircle, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface Props {
  onOpenCatalog: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenCatalog, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Steam Deck', href: '#steam-deck' },
    { label: 'Legion Go', href: '#legion-go' },
    { label: 'Catálogo', href: '#catalogo', onClick: onOpenCatalog },
    { label: 'Experiencia', href: '#experiencia' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050507]/85 backdrop-blur-2xl border-b border-white/[0.08] py-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
            : 'bg-gradient-to-b from-[#050507]/90 via-[#050507]/40 to-transparent py-5 sm:py-6'
        }`}
      >
        {/* Subtle top ambient hairline sheen */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#3678FF]/40 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 md:gap-8">
          {/* Zone 1: High-Impact Brand Identity & Logo */}
          <a
            href="#inicio"
            className="group flex items-center shrink-0 focus:outline-none"
            aria-label="Handheld Inicio"
          >
            <HandheldLogo size="md" showWordmark={true} withGlow={true} />
          </a>

          {/* Zone 2: Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-xs font-semibold tracking-wider text-[#C8CAD1]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="hover:text-white transition-colors tracking-widest uppercase whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gradient-to-r after:from-[#3678FF] after:to-[#7655FF] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: High-Priority Action Zone */}
          <div className="flex items-center gap-3 shrink-0">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                title="Panel de Administración Privado"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono-tech text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Admin</span>
              </button>
            )}

            {/* High-Impact WhatsApp Primary Button */}
            <a
              href={buildGeneralWhatsAppLink('Consulta desde cabecera')}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-white bg-gradient-to-r from-[#101218] via-[#141824] to-[#101218] hover:from-[#151A28] hover:to-[#182038] border border-[#3678FF]/50 hover:border-[#3678FF] rounded-xl transition-all shadow-[0_0_25px_rgba(54,120,255,0.25)] hover:shadow-[0_0_35px_rgba(54,120,255,0.45)] whitespace-nowrap shrink-0 group active:scale-95 overflow-hidden"
            >
              {/* Button inner sheen animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

              <MessageCircle className="w-4 h-4 text-[#3678FF] group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_#3678FF]" />
              <span className="hidden sm:inline">CONSULTAR POR WHATSAPP</span>
              <span className="sm:hidden">WHATSAPP</span>
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050507]/98 backdrop-blur-3xl lg:hidden pt-28 px-6 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <HandheldLogo size="md" showWordmark={true} />
              <span className="text-[10px] font-mono-tech text-[#3678FF] uppercase tracking-widest">
                ARGENTINA
              </span>
            </div>

            <div className="flex flex-col space-y-4 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-2xl font-black font-display text-white/90 hover:text-white py-2 flex items-center justify-between border-b border-white/[0.04] transition-colors"
                >
                  <span className="tracking-wide uppercase">{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-white/30" />
                </a>
              ))}

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-xl font-bold font-display text-[#3678FF] hover:text-white py-2 flex items-center justify-between border-b border-white/[0.04] transition-colors text-left"
                >
                  <span className="tracking-wide uppercase">Administración Privada</span>
                  <ArrowUpRight className="w-5 h-5 text-[#3678FF]" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 pt-8">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#C8CAD1]/70 leading-relaxed font-mono-tech">
              {brandConfig.shippingNotice}
            </div>
            <a
              href={buildGeneralWhatsAppLink('Consulta desde menú móvil')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 px-4 text-xs font-bold font-display uppercase tracking-wider text-white bg-[#3678FF] hover:bg-[#2563EB] rounded-xl transition-colors shadow-lg shadow-[#3678FF]/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>HABLEMOS POR WHATSAPP</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
