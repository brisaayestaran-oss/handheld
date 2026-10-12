import React from 'react';
import { InventoryMetrics } from '../../types/inventory';
import {
  PackageCheck,
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Boxes,
  Plus,
  Eye,
  FileSpreadsheet,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

interface Props {
  metrics: InventoryMetrics;
  onNavigateToTab: (tab: 'inventory' | 'sales' | 'schema' | 'logs') => void;
  onOpenCreateUnit: () => void;
}

export const AdminDashboard: React.FC<Props> = ({
  metrics,
  onNavigateToTab,
  onOpenCreateUnit
}) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner with Quick Action */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#101218] via-[#141824] to-[#101218] border border-white/[0.1] shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3678FF]/10 border border-[#3678FF]/20 text-[11px] font-mono-tech text-[#3678FF]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PANEL DE CONTROL ACTIVO</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white">
            Hola, Administradora
          </h2>
          <p className="text-xs sm:text-sm text-[#C8CAD1]/80 max-w-xl leading-relaxed">
            Tenés <strong className="text-white">{metrics.availableCount} consolas disponibles</strong> listas para vender y <strong className="text-amber-400">{metrics.reservedCount} reservadas</strong>. El catálogo público se sincroniza en tiempo real con este panel.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCreateUnit}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#3678FF] hover:bg-[#2563EB] text-white font-bold font-display text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(54,120,255,0.35)] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Ingresar Nueva Consola</span>
          </button>

          <button
            onClick={() => onNavigateToTab('inventory')}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.1] font-display text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Boxes className="w-4 h-4 text-[#3678FF]" />
            <span>Ver Inventario</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid: Units & Status */}
      <div>
        <h3 className="text-xs font-mono-tech uppercase tracking-wider text-[#C8CAD1]/70 mb-3 px-1">
          Estado del Inventario por Unidad
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Disponibles */}
          <div
            onClick={() => onNavigateToTab('inventory')}
            className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08] hover:border-[#3678FF]/40 cursor-pointer transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-mono-tech text-emerald-400 font-semibold uppercase">
                Disponibles
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <PackageCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">
              {metrics.availableCount}
            </div>
            <div className="mt-1 text-[11px] text-[#C8CAD1]/60">
              Listas para entrega inmediata
            </div>
          </div>

          {/* Card 2: Reservadas */}
          <div
            onClick={() => onNavigateToTab('inventory')}
            className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08] hover:border-amber-400/40 cursor-pointer transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-mono-tech text-amber-400 font-semibold uppercase">
                Reservadas
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">
              {metrics.reservedCount}
            </div>
            <div className="mt-1 text-[11px] text-[#C8CAD1]/60">
              Con seña o cliente asignado
            </div>
          </div>

          {/* Card 3: Vendidas */}
          <div
            onClick={() => onNavigateToTab('sales')}
            className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08] hover:border-purple-400/40 cursor-pointer transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-mono-tech text-purple-400 font-semibold uppercase">
                Vendidas
              </span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">
              {metrics.soldCount}
            </div>
            <div className="mt-1 text-[11px] text-[#C8CAD1]/60">
              Operaciones finalizadas
            </div>
          </div>

          {/* Card 4: Publicadas en Web */}
          <div
            onClick={() => onNavigateToTab('inventory')}
            className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08] hover:border-[#3678FF]/40 cursor-pointer transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs font-mono-tech text-[#3678FF] font-semibold uppercase">
                En Catálogo Web
              </span>
              <div className="p-2 rounded-xl bg-[#3678FF]/10 text-[#3678FF] group-hover:scale-110 transition-transform">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-display text-white">
              {metrics.publishedCount}
            </div>
            <div className="mt-1 text-[11px] text-[#C8CAD1]/60">
              Visibles para clientes
            </div>
          </div>
        </div>
      </div>

      {/* Secondary KPI Grid: Financial & Commercial Analytics */}
      <div>
        <h3 className="text-xs font-mono-tech uppercase tracking-wider text-[#C8CAD1]/70 mb-3 px-1">
          Rendimiento Financiero & Métricas Reales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Financial Card 1: Inversión en Stock Activo */}
          <div className="p-6 rounded-2xl bg-[#101115] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-tech text-[#C8CAD1]/70 uppercase">
                Inversión en Inventario
              </span>
              <DollarSign className="w-4 h-4 text-[#3678FF]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">
              US$ {metrics.inventoryInvestmentUSD.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-[#C8CAD1]/60 leading-relaxed">
              Costo de compra acumulado de las consolas disponibles y reservadas en posesión del negocio.
            </p>
          </div>

          {/* Financial Card 2: Ingresos Totales por Ventas */}
          <div className="p-6 rounded-2xl bg-[#101115] border border-white/[0.08] relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-tech text-emerald-400 uppercase">
                Ingresos por Ventas
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-white">
              US$ {metrics.totalRevenueUSD.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-[#C8CAD1]/60 leading-relaxed">
              Monto total facturado por las {metrics.soldCount} unidades comercializadas y cerradas.
            </p>
          </div>

          {/* Financial Card 3: Ganancia Bruta Real */}
          <div className="p-6 rounded-2xl bg-[#101115] border border-emerald-500/20 bg-gradient-to-b from-[#101115] to-emerald-950/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-tech text-emerald-400 uppercase font-bold">
                Ganancia Bruta Real
              </span>
              <span className="text-xs font-mono-tech px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                +{metrics.averageGrossMargin}% Margen
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-400">
              US$ {metrics.totalGrossProfitUSD.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-[#C8CAD1]/60 leading-relaxed">
              Diferencia exacta entre precio de venta final y costo original de compra (sin estimaciones infladas).
            </p>
          </div>
        </div>
      </div>

      {/* Operational Highlights & Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#3678FF]/10 text-[#3678FF] shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-display text-white">
              Control Unitario Individual
            </h4>
            <p className="mt-1 text-xs text-[#C8CAD1]/70 leading-relaxed">
              Cada consola tiene su propio código interno (ej. UNT-001) y número de serie privado. Aunque ingresen tres Steam Deck OLED idénticas, cada una se controla por separado para garantizar trazabilidad.
            </p>
            <button
              onClick={() => onNavigateToTab('inventory')}
              className="mt-3 text-xs font-mono-tech text-[#3678FF] hover:underline flex items-center gap-1"
            >
              <span>Gestionar listado de unidades</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-display text-white">
              Apartado de Vendidas Auditable
            </h4>
            <p className="mt-1 text-xs text-[#C8CAD1]/70 leading-relaxed">
              Las consolas vendidas nunca se borran. Se archivan con su fecha, precio final y ganancia. Si cometés un error al marcar una venta, podés revertirla con un clic de forma auditada.
            </p>
            <button
              onClick={() => onNavigateToTab('sales')}
              className="mt-3 text-xs font-mono-tech text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>Ver historial de vendidas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
