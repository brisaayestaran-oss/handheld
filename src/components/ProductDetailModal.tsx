import React, { useState } from 'react';
import { Product } from '../types/catalog';
import { brandConfig, buildWhatsAppLink, buildGeneralWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';
import { SteamDeckVisual } from './visuals/SteamDeckVisual';
import { LegionGoVisual } from './visuals/LegionGoVisual';
import { X, MessageCircle, Check, ArrowRight, ShieldCheck, Zap, Info } from 'lucide-react';

interface Props {
  product: Product | null;
  initialVariantIndex?: number;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<Props> = ({
  product,
  initialVariantIndex = 0,
  onClose,
  onSelectRelated,
  allProducts
}) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(initialVariantIndex);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const whatsappUrl = buildWhatsAppLink(product.brand, product.model, currentVariant.capacity);

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#101115] border border-white/[0.12] rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] my-8">
        {/* Top bar with close button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#101115]/90 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8CAD1]">
            <span className="text-white font-bold">{product.brand}</span>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-10 max-h-[85vh] overflow-y-auto">
          {/* Top Section: Visual Gallery & Purchase Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Viewport & Thumbnails (Left) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="p-8 rounded-2xl bg-[#090A0D] border border-white/[0.06] flex items-center justify-center min-h-[300px] sm:min-h-[380px] relative overflow-hidden group">
                <img
                  src={
                    product.realPhotos?.[selectedGalleryIdx] || (product.brand === 'Lenovo'
                      ? '/assets/consoles/lenovo-legion-go/legion-go-official-main.png'
                      : product.id === 'steam-deck-lcd-refurbished' ? '/Steam%20deck/steamdeck_renderings/rendering07.webp' : '/Steam%20deck/steam_deck_oled/press_front_home.webp')
                  }
                  alt={`${product.name} · ${product.realPhotos?.length ? 'foto real de la unidad' : 'imagen ilustrativa'}`}
                  className="w-full max-h-[280px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] contrast-[1.03] transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtitle tag */}
                <div className="absolute bottom-4 left-4 right-4 text-center text-[11px] font-mono-tech text-[#C8CAD1]/50 bg-black/40 backdrop-blur-sm py-1 rounded">
                  {product.realPhotos?.length ? 'Foto real de esta unidad' : 'Imagen ilustrativa del modelo. Solicitá fotografías de la unidad.'}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.realPhotos?.length ? product.realPhotos.map((url,idx)=><button key={url} type="button" onClick={()=>setSelectedGalleryIdx(idx)} className={`shrink-0 rounded-xl border p-1 ${selectedGalleryIdx===idx?'border-[#78A9FF] bg-[#3678FF]/20':'border-white/20'}`}><img src={url} alt={`Foto real ${idx+1}`} className="h-16 w-20 rounded-lg object-cover" /></button>) : product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`px-3 py-2 rounded-xl text-left text-xs border transition-all whitespace-nowrap ${
                      selectedGalleryIdx === idx
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-[#C8CAD1]/60 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">{img.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Module & Specs Overview (Right) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#C8CAD1]/70 mb-2">
                  <span className="uppercase text-[#3678FF] font-semibold">{product.brand}</span>
                  <span>{product.condition}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                  {product.name}
                </h1>
                <p className="mt-1 text-xs text-[#C8CAD1] leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Variant Selector */}
                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <span className="text-sm font-semibold text-white uppercase tracking-wider block mb-3">
                    Seleccioná Capacidad de Almacenamiento:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.sku}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`min-h-16 p-4 rounded-xl border text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87AAFF] ${
                          selectedVariantIdx === idx
                            ? 'bg-[#3678FF] text-white border-[#83ABFF] shadow-[0_0_16px_rgba(54,120,255,.3)]'
                            : 'bg-white/[0.04] border-white/20 text-white hover:border-white/50'
                        }`}
                      >
                        <div className="text-sm font-bold">{v.capacity}</div>
                        <div className="text-sm font-black font-display mt-0.5 tabular-nums">
                          $ {Number(v.priceARSApprox).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-6 p-4 rounded-2xl bg-[#090A0D] border border-white/[0.06]">
                  <div className="text-[10px] font-mono-tech text-[#C8CAD1]/50 uppercase tracking-wider">
                    Precio directo · sin envío · confirmar
                  </div>
                  <div className="mt-1 whitespace-nowrap text-[clamp(1.4rem,6vw,1.875rem)] font-black font-display text-white tabular-nums tracking-tight">
                    $ {Number(currentVariant.priceARSApprox).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono-tech text-[#C8CAD1]/70">
                    <Check className="w-3.5 h-3.5 text-[#3678FF]" />
                    <span>Disponibilidad a confirmar</span>
                  </div>
                </div>

                {/* Direct WhatsApp Call to Action */}
                <div className="mt-6 space-y-3">
                  <a
                    href={whatsappUrl}
                    onClick={() => recordInterest('purchase_click', { id: currentVariant.sku, name: product.name, capacity: currentVariant.capacity }, 'whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 text-xs sm:text-sm font-black font-display uppercase tracking-wider text-white bg-[#3678FF] hover:bg-[#2563EB] rounded-xl transition-all shadow-[0_0_35px_rgba(54,120,255,0.35)] flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>CONSULTAR POR WHATSAPP</span>
                  </a>

                  <div className="rounded-xl bg-white/[0.04] px-4 py-3 text-xs text-[#C8CAD1]">
                    <p className="font-bold text-white">Elegí cómo comprar</p>
                    <p className="mt-1">El precio directo publicado no incluye envío. El precio y condiciones de Mercado Libre se confirman en la publicación correspondiente.</p>
                    <a href={buildGeneralWhatsAppLink('Solicito link y precio de Mercado Libre para ' + product.name + ' ' + currentVariant.capacity)}
                      onClick={() => recordInterest('purchase_click', { id: currentVariant.sku, name: product.name, capacity: currentVariant.capacity }, 'mercadolibre')}
                      target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-white/20 px-4 font-semibold text-white hover:bg-white/10">
                      SOLICITAR PUBLICACIÓN EN MERCADO LIBRE
                    </a>
                  </div>
                  <div className="text-[11px] font-mono-tech text-center text-[#C8CAD1]/50">
                    Mensaje preconfigurado: "Hola, quiero consultar por la {product.brand} {product.model} {currentVariant.capacity}. ¿Está disponible?"
                  </div>
                </div>
              </div>

              {/* Safety & Consultation Note */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-[#C8CAD1]/70 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#3678FF] shrink-0 mt-0.5" />
                <span>
                  Equipo de caja abierta y poco uso. Solicitá fotos reales, estado de la unidad, accesorios, garantía aplicable y condiciones de pago y entrega antes de confirmar.
                </span>
              </div>
            </div>
          </div>

          {/* Description & Key Highlights */}
          <div className="space-y-4 pt-6 border-t border-white/[0.08]">
            <h3 className="text-lg font-bold font-display text-white uppercase">
              Descripción & Puntos Clave
            </h3>
            <p className="text-sm text-[#C8CAD1] leading-relaxed">
              {product.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {product.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#C8CAD1]/90 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Zap className="w-3.5 h-3.5 text-[#3678FF] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technical Specifications Matrix */}
          <div className="space-y-4 pt-6 border-t border-white/[0.08]">
            <h3 className="text-lg font-bold font-display text-white uppercase">
              Ficha Técnica Completa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Procesador (CPU)</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.processor}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Gráficos (GPU)</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.graphics}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Memoria RAM</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.ram}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Almacenamiento</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.storageType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Pantalla</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.display}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Tasa de Refresco</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.refreshRate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Batería</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.battery}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Sistema Operativo</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.os}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Peso</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.weight}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-[#C8CAD1]/60 font-mono-tech">Puertos</span>
                <span className="text-white font-medium text-right max-w-[60%]">{product.specs.ports}</span>
              </div>
            </div>
          </div>

          {/* Related Consoles */}
          {relatedProducts.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <h3 className="text-sm font-bold font-mono-tech text-[#C8CAD1]/70 uppercase">
                Otras Opciones en Catálogo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/20 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="text-[10px] font-mono-tech text-[#3678FF] uppercase">{rel.brand}</div>
                      <div className="text-sm font-bold text-white font-display">{rel.name}</div>
                      <div className="text-xs text-[#C8CAD1]/60 mt-0.5">Desde $ {Number(rel.variants[0]?.priceARSApprox ?? 0).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};