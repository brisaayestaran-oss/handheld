import React, { useState } from 'react';
import { Product } from '../types/catalog';
import { brandConfig } from '../config/brand';
import { X, Database, ShieldAlert, Check, Plus, Edit3, Eye, Sliders } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProductPrice?: (productId: string, variantIndex: number, newPriceUSD: number) => void;
  onToggleAvailability?: (productId: string) => void;
}

export const AdminPreviewDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  products,
  onUpdateProductPrice,
  onToggleAvailability
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'schema' | 'brand'>('inventory');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#101115] border-l border-white/[0.1] h-full flex flex-col justify-between shadow-2xl">
        {/* Top Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#3678FF]" />
            <div>
              <h2 className="text-base font-bold font-display text-white">
                Gestión de Catálogo · Preparación Arquitectura
              </h2>
              <span className="text-[11px] font-mono-tech text-[#C8CAD1]/60">
                Diseñado para futura integración directa con Supabase / Postgres
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="px-6 pt-4 flex gap-2 border-b border-white/[0.06]">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'inventory'
                ? 'border-[#3678FF] text-white'
                : 'border-transparent text-[#C8CAD1]/60 hover:text-white'
            }`}
          >
            Inventario & Precios Demo
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'brand'
                ? 'border-[#3678FF] text-white'
                : 'border-transparent text-[#C8CAD1]/60 hover:text-white'
            }`}
          >
            Configuración de Marca
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'schema'
                ? 'border-[#3678FF] text-white'
                : 'border-transparent text-[#C8CAD1]/60 hover:text-white'
            }`}
          >
            Esquema Supabase (SQL)
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6 text-xs text-[#C8CAD1]">
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#3678FF]/10 border border-[#3678FF]/20 text-xs text-[#C8CAD1] leading-relaxed">
                <span className="font-bold text-white block mb-0.5">Modo de Demostración Activo</span>
                Los cambios realizados aquí interactúan con el estado en memoria de la sesión para probar la reactividad del catálogo antes de enlazar la base de datos remota.
              </div>

              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono-tech text-[#3678FF] uppercase">{p.brand}</span>
                        <div className="text-sm font-bold text-white">{p.name}</div>
                      </div>
                      <span className="text-[11px] font-mono-tech px-2 py-0.5 bg-white/[0.06] rounded text-white/80">
                        {p.condition}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
                      {p.variants.map((v, vIdx) => (
                        <div key={v.sku} className="flex items-center justify-between text-[11px] font-mono-tech">
                          <span>{v.capacity} ({v.sku})</span>
                          <span className="text-white font-bold">US$ {v.priceUSD}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <div className="text-xs font-bold text-white uppercase font-mono-tech">
                  Variables Centralizadas (src/config/brand.ts)
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#C8CAD1]/60">Nombre de Marca:</span>
                    <span className="text-white font-mono-tech">{brandConfig.brandName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#C8CAD1]/60">WhatsApp Comercial:</span>
                    <span className="text-white font-mono-tech">{brandConfig.whatsappDisplay}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#C8CAD1]/60">Instagram:</span>
                    <span className="text-white font-mono-tech">{brandConfig.instagramHandle}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#C8CAD1]/60">TikTok:</span>
                    <span className="text-white font-mono-tech">{brandConfig.tiktokHandle}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-[#C8CAD1]/60">Territorio Envíos:</span>
                    <span className="text-white font-mono-tech">{brandConfig.shippingNotice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <p className="text-xs text-[#C8CAD1]/80">
                Estructura de tablas SQL lista para migrar a Supabase Database (PostgreSQL):
              </p>
              <pre className="p-4 rounded-xl bg-[#090A0D] border border-white/[0.08] text-[11px] font-mono-tech text-white/80 overflow-x-auto leading-relaxed">
{`-- Tabla: products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  condition TEXT NOT NULL,
  category TEXT NOT NULL,
  availability TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  specs JSONB NOT NULL,
  variants JSONB NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-tech text-[#C8CAD1]/60">
          <span>{products.length} productos configurados</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
};
