import React, { useState, useMemo } from 'react';
import { Product, ConsoleBrand, ProductCondition } from '../types/catalog';
import { brandConfig, buildWhatsAppLink } from '../config/brand';
import { SteamDeckVisual } from './visuals/SteamDeckVisual';
import { LegionGoVisual } from './visuals/LegionGoVisual';
import { Search, MessageCircle, ArrowUpRight, Check, SlidersHorizontal, Info } from 'lucide-react';

interface Props {
  products: Product[];
  onSelectProduct: (product: Product, variantIndex?: number) => void;
}

export const CatalogSection: React.FC<Props> = ({ products, onSelectProduct }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [selectedCondition, setSelectedCondition] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVariantByProduct, setSelectedVariantByProduct] = useState<Record<string, number>>({});

  const brands = ['Todas', 'Valve', 'Lenovo'];
  const conditions = ['Todos', 'Reacondicionado Certificado'];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchBrand = selectedBrand === 'Todas' || product.brand === selectedBrand;
      const matchCondition = selectedCondition === 'Todos' || product.condition === selectedCondition;
      const matchQuery =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchBrand && matchCondition && matchQuery;
    });
  }, [products, selectedBrand, selectedCondition, searchQuery]);

  const handleSelectVariant = (productId: string, variantIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedVariantByProduct((prev) => ({
      ...prev,
      [productId]: variantIndex
    }));
  };

  return (
    <section id="catalogo" className="relative py-28 bg-[#08090C] border-t border-white/[0.05]">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#3678FF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-2">
              CATÁLOGO OFICIAL · STOCK EN ARGENTINA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase">
              HARDWARE SELECCIONADO
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#C8CAD1]/70 max-w-xl">
              Consolas portátiles reacondicionadas certificadas con testeo exhaustivo de más de 30 puntos.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C8CAD1]/60">
            <Info className="w-4 h-4 text-[#3678FF]" />
            <span>Valores de catálogo de demostración · Consulta stock y cotización diaria por WhatsApp</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#101115] border border-white/[0.08] mb-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Brand Tabs (Segmented interactive buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#050507] rounded-xl border border-white/[0.06]">
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
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#050507] rounded-xl border border-white/[0.06]">
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => setSelectedCondition(cond)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCondition === cond
                    ? 'bg-[#20232B] text-white shadow-sm border border-white/[0.12]'
                    : 'text-[#C8CAD1] hover:text-white'
                }`}
              >
                {cond === 'Todos' ? 'Todos los Estados' : cond}
              </button>
            ))}
          </div>

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
            <h3 className="text-lg font-bold text-white font-display">No encontramos consolas con esos filtros</h3>
            <p className="mt-1 text-xs text-[#C8CAD1]/60">Probá restablecer la búsqueda o consultar directamente por WhatsApp.</p>
            <button
              onClick={() => {
                setSelectedBrand('Todas');
                setSelectedCondition('Todos');
                setSearchQuery('');
              }}
              className="mt-6 px-5 py-2.5 text-xs font-bold text-white bg-[#20232B] hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const activeVariantIdx = selectedVariantByProduct[product.id] ?? 0;
              const currentVariant = product.variants[activeVariantIdx] || product.variants[0];
              const whatsappUrl = buildWhatsAppLink(product.brand, product.model, currentVariant.capacity);

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product, activeVariantIdx)}
                  className="group relative flex flex-col justify-between rounded-3xl bg-[#101115] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer"
                >
                  {/* Card Header & Visual Container */}
                  <div className="p-6 pb-2">
                    {/* Top unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-[#C8CAD1]/70 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tech tracking-wider uppercase text-white font-semibold">
                          {product.brand}
                        </span>
                        <span className="text-[11px] font-mono-tech text-[#C8CAD1]/50">· {product.condition}</span>
                      </div>
                      <div>
                        {product.availability === 'Disponible Inmediato' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Disponible
                          </span>
                        ) : product.availability === 'Bajo Pedido (48-72h)' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            Bajo Pedido
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech text-white/50 border border-white/10">
                            Sin Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Real Console Photography Display */}
                    <div className="py-6 px-2 flex items-center justify-center min-h-[200px] transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={
                          product.brand === 'Lenovo'
                            ? '/assets/consoles/lenovo-legion-go/legion-go-official-main.png'
                            : '/assets/consoles/steam-deck/steam-deck-hero.png'
                        }
                        alt={`${product.name} Oficial`}
                        className="w-full max-h-[170px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] contrast-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Card Content & Variant Selector */}
                  <div className="p-6 pt-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black font-display text-white group-hover:text-[#3678FF] transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#C8CAD1]/70 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Storage Variants selector (Clickable buttons) */}
                      {product.variants.length > 1 && (
                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                          <span className="text-[10px] font-mono-tech text-[#C8CAD1]/50 uppercase tracking-wider block mb-2">
                            Almacenamiento:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {product.variants.map((variant, idx) => (
                              <button
                                key={variant.sku}
                                onClick={(e) => handleSelectVariant(product.id, idx, e)}
                                className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-md transition-all ${
                                  activeVariantIdx === idx
                                    ? 'bg-white text-black font-bold'
                                    : 'bg-[#20232B] text-[#C8CAD1] hover:text-white hover:bg-white/[0.08]'
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
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-mono-tech text-[#C8CAD1]/50 uppercase tracking-wider">
                          Precio de Venta
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black font-display text-white tabular-nums tracking-tight">
                            US$ {currentVariant.priceUSD}
                          </span>
                          <span className="text-[11px] font-mono-tech text-[#C8CAD1]/50">
                            (~${(currentVariant.priceARSApprox / 1000).toFixed(0)}k ARS)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Direct WhatsApp button */}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Consultar disponibilidad por WhatsApp"
                          className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-[#3678FF] hover:text-white text-[#3678FF] border border-white/[0.08] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* View console CTA */}
                        <button
                          onClick={() => onSelectProduct(product, activeVariantIdx)}
                          className="px-3.5 py-2.5 text-xs font-bold font-display uppercase tracking-wider text-white bg-[#20232B] group-hover:bg-[#3678FF] rounded-xl transition-all flex items-center gap-1.5 shrink-0"
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
