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
  selectedBrand: 'Todas' | 'Valve' | 'Lenovo';
  onBrandChange: (brand: 'Todas' | 'Valve' | 'Lenovo') => void;
}

export const CatalogSection: React.FC<Props> = ({ products, fetchedAt = '', onSelectProduct, selectedBrand, onBrandChange, loading = false, loadError = '' }) => {
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
    }).sort((a, b) => {
      const priceA = Math.min(...a.variants.filter(v => v.inStock).map(v => v.priceARSApprox));
      const priceB = Math.min(...b.variants.filter(v => v.inStock).map(v => v.priceARSApprox));
      return priceA - priceB || a.name.localeCompare(b.name, 'es');
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
    <section id="catalogo" className="relative scroll-mt-16 py-6 sm:scroll-mt-20 sm:py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-6 mb-4 sm:mb-8">
          <div>
            <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-2">
              CONSOLAS PORTÁTILES · CAJA ABIERTA Y USADAS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              ELEGÍ TU CONSOLA
            </h2>
            <p className="mt-2 text-sm text-[#AFC0DC] sm:mt-3">{loading ? 'Actualizando disponibilidad…' : `${products.length} ${products.length === 1 ? 'consola disponible' : 'consolas disponibles'} para consultar`}</p>
            {fetchedAt && !loading && <p className="mt-1 text-[11px] text-[#849BBF]">Última consulta de stock: {new Date(fetchedAt).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}{loadError ? ' · actualización pendiente' : ''}</p>}

          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8CAD1]/60">
            <Info className="w-4 h-4 text-[#3678FF]" />
            <span>Consultá stock y cotización diaria por WhatsApp</span>
          </div>
        </div>

        {/* Filtros siempre al alcance dentro del catálogo, sin ocupar toda la pantalla. */}
        <nav aria-label="Filtrar consolas por marca" className="sticky top-[55px] z-30 -mx-4 mb-3 bg-[#050A15]/90 px-4 py-2 backdrop-blur-xl sm:hidden">
          <div className="flex w-full items-center justify-between gap-2">
            {brands.map((brand) => (
              <button key={brand} type="button"
                aria-pressed={selectedBrand === brand}
                onClick={() => onBrandChange(brand as 'Todas' | 'Valve' | 'Lenovo')}
                className={`min-h-10 flex-1 rounded-lg px-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87AAFF] ${selectedBrand === brand ? 'bg-[#3678FF] text-white' : 'bg-[#111B2D] text-[#C8D8F1]'}`}>
                {brand === 'Todas' ? 'Todas' : brand}
              </button>
            ))}
          </div>
        </nav>
        {/* Búsqueda, con los filtros de escritorio en su posición original. */}
        <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#101115] border border-white/[0.08] mb-4 sm:mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Brand Tabs (Segmented interactive buttons) */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 bg-[#050507] rounded-xl border border-white/[0.06] overflow-x-auto">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => onBrandChange(brand as 'Todas' | 'Valve' | 'Lenovo')}
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
                onBrandChange('Todas');
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
              const isLimitedEdition = /edici[oó]n limitada/i.test(product.name);
              const activeVariantIdx = selectedVariantByProduct[product.id] ?? 0;
              const currentVariant = product.variants[activeVariantIdx] || product.variants[0];
              const whatsappUrl = buildWhatsAppLink(product.brand, product.model, currentVariant.capacity);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product, activeVariantIdx)}
                  className={`group relative grid grid-cols-[112px_minmax(0,1fr)] sm:flex sm:flex-col justify-between overflow-hidden rounded-xl sm:rounded-[1.5rem] border bg-[linear-gradient(155deg,#142039,#101115_55%)] shadow-[0_12px_34px_rgba(0,0,0,.22)] transition-[border-color,box-shadow] duration-200 hover:shadow-[0_18px_50px_rgba(0,0,0,.35)] cursor-pointer ${isLimitedEdition ? 'border-[#A4BFFF]/75 ring-1 ring-inset ring-[#88A9EE]/25 shadow-[0_0_32px_rgba(100,146,255,.13)] hover:border-[#D0DFFF]' : 'border-[#91B3FF]/[0.13] hover:border-[#6B96F0]/50'}`}
                >
                  {/* Card Header & Visual Container */}
                  <div className="min-w-0 p-2 sm:p-5 pb-1 sm:pb-2">
                    {/* Top unboxed metadata */}
                    {isLimitedEdition && <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8DAFF4]/45 bg-[#2B436C]/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#DCE9FF]">Edición limitada</div>}
                    <div className="hidden sm:flex items-center justify-between text-xs text-[#C8CAD1]/70 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech tracking-wider uppercase text-white font-semibold">
                          {product.brand}
                        </span>
                        <span className="text-[11px] font-mono-tech text-[#C8CAD1]/50">· {product.condition}</span>
                      </div>
                      <div><span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">En stock · planilla</span></div>
                    </div>

                    {/* Real Console Photography Display */}
                    <div className="flex h-[122px] sm:h-auto sm:min-h-[220px] items-center justify-center rounded-lg sm:rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(56,106,209,.16),transparent_70%)] px-1 py-2 sm:px-3 sm:py-5">
                      <img
                        src={
                          product.realPhotos?.[0] || product.coverImage || (product.brand === 'Lenovo'
                            ? '/optimized/legion-go-official-main.webp'
                            : !/oled/i.test(product.model) ? '/Steam%20deck/steamdeck_renderings/rendering07.webp' : '/Steam%20deck/steam_deck_oled/press_front_home.webp')
                        }
                        alt={`${product.name} · ${product.realPhotos?.length ? 'foto real de la unidad' : 'imagen ilustrativa del modelo'}`}
                        className="max-h-[112px] sm:max-h-[205px] w-full scale-[1.12] sm:scale-100 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,.55)] transition-transform duration-300 group-hover:scale-[1.025]"
                        loading="lazy" decoding="async" width="400" height="220" referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Card Content & Variant Selector */}
                  <div className="min-w-0 p-3 sm:p-5 sm:pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-xl font-black font-display text-white group-hover:text-[#3678FF] transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-[10px] font-medium text-emerald-300 sm:hidden">En stock · {product.condition}</p>
                      {!product.packageDetails && <p className="mt-2 text-xs leading-relaxed text-[#B8C6DE] line-clamp-2">{product.model}</p>}
                      {product.packageDetails && <p className="mt-1.5 sm:mt-3 text-[11px] leading-snug line-clamp-2 sm:line-clamp-none sm:rounded-xl sm:border sm:border-white/10 sm:bg-white/[.035] sm:px-3 sm:py-2 sm:text-xs sm:leading-relaxed text-[#D1DEEF]"><span className="font-bold text-white">Presentación / accesorios: </span>{product.packageDetails}</p>}
                      {product.fullDescription && product.fullDescription !== product.model && <p className="mt-2 hidden sm:line-clamp-2 text-xs leading-relaxed text-[#9EAFCA]">{product.fullDescription}</p>}

                      {!product.realPhotos?.length && <p className="mt-2 hidden sm:block text-[11px] text-[#9DB4D5]">Imagen ilustrativa · Solicitá fotos de esta unidad.</p>}
                      <div className="mt-3 hidden sm:flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#AFC4E2]">
                        <span>{product.realPhotos?.length ? `${product.realPhotos.length} foto${product.realPhotos.length === 1 ? '' : 's'} real${product.realPhotos.length === 1 ? '' : 'es'} de esta unidad` : 'Fotos reales a solicitar'}</span>
                        <span aria-hidden="true">·</span>
                        <span>Entrega a coordinar por WhatsApp</span>
                      </div>
                      {/* Storage Variants selector (Clickable buttons) */}
                      {product.variants.length > 1 && (
                        <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-white/[0.06]">
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
                    <div className="mt-3 sm:mt-4 pt-2 sm:pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-mono-tech text-[#C8CAD1]/50 uppercase tracking-wider">
                          Precio directo · sin envío
                        </div>
                        <div className="whitespace-nowrap text-base sm:text-[clamp(1.15rem,4.4vw,1.5rem)] font-black font-display text-white tabular-nums tracking-tight">
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
                          className="hidden sm:flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-white/[0.04] hover:bg-[#3678FF] hover:text-white text-[#3678FF] border border-white/[0.08] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* View console CTA */}
                        <button
                          onClick={() => onSelectProduct(product, activeVariantIdx)}
                          className="min-h-10 sm:min-h-11 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-bold font-display uppercase tracking-wider text-white bg-[#3678FF] hover:bg-[#2563EB] rounded-xl transition-all flex items-center gap-1.5 shrink-0"
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