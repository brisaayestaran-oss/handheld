import React, { useState, useMemo } from 'react';
import { Product } from '../types/catalog';
import { brandConfig, buildWhatsAppLink } from '../config/brand';
import { recordInterest } from '../services/interestAnalytics';
import { SteamDeckVisual } from './visuals/SteamDeckVisual';
import { LegionGoVisual } from './visuals/LegionGoVisual';
import { Search, MessageCircle, ArrowUpRight, Check, SlidersHorizontal, Info } from 'lucide-react';

interface Props {
  loading?: boolean;
  loadError?: string;
  products: Product[];
  fetchedAt?: string;
  onSelectProduct: (product: Product, variantIndex?: number) => void;
}

export const CatalogSection: React.FC<Props> = ({ products, fetchedAt = '', onSelectProduct, loading = false, loadError = '' }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVariantByProduct, setSelectedVariantByProduct] = useState<Record<string, number>>({});

  const brands = ['Todas', 'Valve', 'Lenovo'];


  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;

      const matchQuery =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchBrand && matchQuery;
    });
  }, [products, selectedBrand, searchQuery]);

  const handleSelectVariant = (productId: string, variantIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedVariantByProduct((prev) => ({
      ...prev,
      [productId]: variantIndex
    }));
  };

  return (
    <section id="catalogo" className="relative scroll-mt-20 py-8 sm:py-12 bg-transparent">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#3678FF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-2">
              CONSOLAS PORTÁTILES · CAJA ABIERTA Y USADAS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              ELEGÍ TU CONSOLA
            </h2>
            <p className="mt-3 text-sm text-[#AFC0DC]">{loading ? 'Actualizando disponibilidad…' : `${products.length} ${products.length === 1 ? 'consola disponible' : 'consolas disponibles'} para consultar`}</p>
            {fetchedAt && !loading && <p className="mt-1 text-[11px] text-[#849BBF]">Última consulta de stock: {new Date(fetchedAt).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}{loadError ? ' · actualización pendiente' : ''}</p>}

          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8CAD1]/60">
            <Info className="w-4 h-4 text-[#3678FF]" />
            <span>Consultá stock y cotización diaria por WhatsApp</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#101115] border border-white/[0.08] mb-6 sm:mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Brand Tabs (Segmented interactive buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#050507] rounded-xl border border-white/[0.06] overflow-x-auto">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedBrand === brand
                    ? 'bg-[#20232B] text-white shadow-sm border border-white/[0.12]'
                    : 'text-[#C8CAD1] hover:text-white'
                }`}
              >
                {brand === 'Todas' ? 'Todas las Marcas' : brand}
              </button>
            ))}
          </div>

          {/* Condition Tabs */}
          {/* Estado de todos los equipos: caja abierta y poco uso. */}
          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-[#C8CAD1]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por modelo o chip..."
              className="w-full bg-[#050507] text-white placeholder-[#C8CAD1]/40 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-white/[0.08] focus:outline-none focus:border-[#3678FF] transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid (Spacious, modern, non-generic) */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-white/[0.06] rounded-3xl bg-[#101115]/50">
            <SlidersHorizontal className="w-10 h-10 text-[#C8CAD1]/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white font-display">{loading ? 'Cargando consolas disponibles…' : loadError ? 'No pudimos actualizar el catálogo' : products.length === 0 ? 'No hay consolas disponibles en este momento' : 'No encontramos consolas con esos filtros'}</h3>
            <p className="mt-1 text-xs text-[#C8CAD1]/60">{loading ? 'Estamos consultando el inventario actualizado.' : loadError ? 'La conexión con el inventario falló. Podés consultar por WhatsApp.' : products.length === 0 ? 'Consultá por WhatsApp para conocer próximas unidades.' : 'Probá restablecer la búsqueda o consultar directamente por WhatsApp.'}</p>
            {!loading && !loadError && products.length > 0 && <button
              onClick={() => {
                setSelectedBrand('Todas');
                setSearchQuery('');
              }}
              className="mt-6 px-5 py-2.5 text-xs font-bold text-white bg-[#20232B] hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              Restablecer Filtros
            </button>}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filteredProducts.map((product) => {
              const activeVariantIdx = selectedVariantByProduct[product.id] ?? 0;
              const currentVariant = product.variants[activeVariantIdx] || product.variants[0];
              const whatsappUrl = buildWhatsAppLink(product.brand, product.model, currentVariant.capacity);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product, activeVariantIdx)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[#91B3FF]/[0.13] bg-[linear-gradient(155deg,#142039,#101115_55%)] shadow-[0_12px_34px_rgba(0,0,0,.22)] transition-[border-color,box-shadow] duration-200 hover:border-[#6B96F0]/50 hover:shadow-[0_18px_50px_rgba(0,0,0,.35)] cursor-pointer"
                >
                  {/* Card Header & Visual Container */}
                  <div className="p-4 sm:p-5 pb-2">
                    {/* Top unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-[#C8CAD1]/70 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech tracking-wider uppercase text-white font-semibold">
                          {product.brand}
                        </span>
                        <span className="text-[11px] font-mono-tech text-[#C8CAD1]/50">· {product.condition}</span>
                      </div>
                      <div><span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">En stock · planilla</span></div>
                    </div>

                    {/* Real Console Photography Display */}
                    <div className="flex min-h-[205px] items-center justify-center rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(56,106,209,.16),transparent_70%)] px-3 py-5 sm:min-h-[220px]">
                      <img
                        src={
                          product.realPhotos?.[0] || (product.brand === 'Lenovo'
                            ? '/optimized/legion-go-official-main.webp'
                            : !/oled/i.test(product.model) ? '/Steam%20deck/steamdeck_renderings/rendering07.webp' : '/Steam%20deck/steam_deck_oled/press_front_home.webp')
                        }
                        alt={`${product.name} · ${product.realPhotos?.length ? 'foto real de la unidad' : 'imagen ilustrativa del modelo'}`}
                        className="max-h-[205px] w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,.55)] transition-transform duration-300 group-hover:scale-[1.025]"
                        loading="lazy" decoding="async" width="400" height="220" referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Card Content & Variant Selector */}
                  <div className="p-4 sm:p-5 pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black font-display text-white group-hover:text-[#3678FF] transition-colors">
                        {product.name}
                      </h3>
                      {!product.packageDetails && <p className="mt-2 text-xs leading-relaxed text-[#B8C6DE] line-clamp-2">{product.model}</p>}
                      {product.packageDetails && <p className="mt-3 rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-xs leading-relaxed text-[#D1DEEF]"><span className="font-bold text-white">Presentación / accesorios: </span>{product.packageDetails}</p>}
                      {product.fullDescription && product.fullDescription !== product.model && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#9EAFCA]">{product.fullDescription}</p>}

                      {!product.realPhotos?.length && <p className="mt-2 text-[11px] text-[#9DB4D5]">Imagen ilustrativa · Solicitá fotos de esta unidad.</p>}
                      {/* Storage Variants selector (Clickable buttons) */}
                      {product.variants.length > 1 && (
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <span className="text-sm font-semibold text-white uppercase tracking-wider block mb-3">
                            Almacenamiento:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {product.variants.map((variant, idx) => (
                              <button
                                key={variant.sku}
                                onClick={(e) => handleSelectVariant(product.id, idx, e)}
                                className={`min-h-11 px-4 py-2 text-sm font-semibold rounded-xl border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87AAFF] ${
                                  activeVariantIdx === idx
                                    ? 'bg-[#3678FF] text-white border-[#7EA5FF] shadow-[0_0_18px_rgba(54,120,255,.35)]'
                                    : 'bg-[#20232B] text-white border-white/20 hover:border-white/50 hover:bg-white/[0.12]'
                                }`}
                              >
                                {variant.capacity}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pricing & Footer Actions */}
                    <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-mono-tech text-[#C8CAD1]/50 uppercase tracking-wider">
                          Precio directo · sin envío
                        </div>
                        <div className="whitespace-nowrap text-[clamp(1.15rem,4.4vw,1.5rem)] font-black font-display text-white tabular-nums tracking-tight">
                          $ {Number(currentVariant.priceARSApprox).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Direct WhatsApp button */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => { e.stopPropagation(); recordInterest('purchase_click', { id: currentVariant.sku, name: product.name, capacity: currentVariant.capacity }, 'whatsapp'); }}
                          title="Consultar disponibilidad por WhatsApp" aria-label={`Consultar por WhatsApp sobre ${product.name}, ${currentVariant.capacity}`}
                          className="min-h-11 min-w-11 flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-[#3678FF] hover:text-white text-[#3678FF] border border-white/[0.08] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* View console CTA */}
                        <button
                          onClick={() => onSelectProduct(product, activeVariantIdx)}
                          className="min-h-11 px-4 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-white bg-[#3678FF] hover:bg-[#2563EB] rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                        >
                          <span>VER CONSOLA</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};