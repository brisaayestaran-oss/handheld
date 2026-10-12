import React, { useState } from 'react';
import { SaleRecord, InventoryUnit } from '../../types/inventory';
import {
  CheckCircle2,
  Calendar,
  DollarSign,
  TrendingUp,
  User,
  RotateCcw,
  Search,
  Lock,
  FileText
} from 'lucide-react';

interface Props {
  sales: SaleRecord[];
  allUnits: InventoryUnit[];
  onOpenRevertModal: (unit: InventoryUnit) => void;
}

export const AdminSalesHistory: React.FC<Props> = ({
  sales,
  allUnits,
  onOpenRevertModal
}) => {
  const [search, setSearch] = useState('');

  const filteredSales = sales.filter((s) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      s.unitCode.toLowerCase().includes(q) ||
      s.model.toLowerCase().includes(q) ||
      s.serialNumber.toLowerCase().includes(q) ||
      (s.customerName && s.customerName.toLowerCase().includes(q))
    );
  });

  const totalRevenue = sales.reduce((acc, s) => acc + s.finalSalePriceUSD, 0);
  const totalCost = sales.reduce((acc, s) => acc + s.purchasePriceUSD, 0);
  const totalProfit = sales.reduce((acc, s) => acc + s.grossProfitUSD, 0);
  const averageMargin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Summary Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Apartado de Vendidas & Historial Contable
          </h2>
          <p className="text-xs text-[#C8CAD1]/70">
            Registro inmutable de operaciones cerradas con cálculo exacto de ganancia bruta.
          </p>
        </div>

        <div className="p-1 bg-[#101115] rounded-xl border border-white/[0.08] flex items-center gap-4 px-4 py-2">
          <div className="text-right">
            <span className="text-[10px] font-mono-tech text-white/50 block">GANANCIA BRUTA TOTAL</span>
            <span className="text-sm sm:text-base font-bold font-display text-emerald-400">
              US$ {totalProfit.toLocaleString()} <span className="text-xs text-emerald-300/70">({averageMargin}%)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08]">
          <span className="text-[11px] font-mono-tech text-white/50 block mb-1">
            CONSOLAS VENDIDAS
          </span>
          <div className="text-2xl font-bold font-display text-white">
            {sales.length} unidades
          </div>
          <div className="text-[11px] text-[#C8CAD1]/60 mt-1">
            Archivadas permanentemente en base de datos
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08]">
          <span className="text-[11px] font-mono-tech text-white/50 block mb-1">
            FACTURACIÓN BRUTA TOTAL
          </span>
          <div className="text-2xl font-bold font-display text-white">
            US$ {totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#C8CAD1]/60 mt-1">
            Costo de adquisición: US$ {totalCost.toLocaleString()}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#101115] to-emerald-950/20 border border-emerald-500/20">
          <span className="text-[11px] font-mono-tech text-emerald-400 block mb-1 font-bold">
            MARGEN DE BENEFICIO REAL
          </span>
          <div className="text-2xl font-bold font-display text-emerald-400">
            +{averageMargin}%
          </div>
          <div className="text-[11px] text-emerald-300/70 mt-1">
            Ganancia neta sobre costo original
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3.5 rounded-2xl bg-[#101115] border border-white/[0.08] flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-[#C8CAD1]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código de unidad, modelo, cliente o serie..."
            className="w-full bg-[#08090C] text-white placeholder-[#C8CAD1]/40 text-xs rounded-xl pl-9 pr-4 py-2 border border-white/[0.08] focus:outline-none focus:border-[#3678FF]"
          />
        </div>

        <span className="text-xs font-mono-tech text-white/50 hidden sm:inline">
          {filteredSales.length} operaciones
        </span>
      </div>

      {/* Sales Cards / Table */}
      {filteredSales.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101115] border border-white/[0.08]">
          <CheckCircle2 className="w-8 h-8 text-[#C8CAD1]/30 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-display">No hay ventas registradas</h3>
          <p className="mt-1 text-xs text-[#C8CAD1]/60">
            Cuando marques una consola como vendida desde el Inventario, aparecerá en esta sección.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSales.map((sale) => {
            const correspondingUnit = allUnits.find((u) => u.id === sale.unitId);

            return (
              <div
                key={sale.id}
                className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08] hover:border-purple-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Unit Identity & Customer */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono-tech font-bold">
                        {sale.unitCode}
                      </span>
                      <h4 className="text-sm font-bold text-white font-display">
                        {sale.model} · {sale.capacity}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-[#C8CAD1]/70">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-white/40" />
                        Fecha: {sale.saleDate}
                      </span>
                      {sale.customerName && (
                        <span className="flex items-center gap-1 text-white">
                          <User className="w-3.5 h-3.5 text-white/40" />
                          Cliente: {sale.customerName}
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono-tech text-[11px] text-white/50">
                        <Lock className="w-3 h-3 text-white/30" />
                        Serie: {sale.serialNumber}
                      </span>
                    </div>

                    {sale.saleNotes && (
                      <div className="mt-2 text-[11px] text-[#C8CAD1]/60 italic">
                        "{sale.saleNotes}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Financial Numbers & Revert Action */}
                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                  <div className="text-left md:text-right">
                    <div className="text-xs text-white/40 font-mono-tech">
                      Costo: US$ {sale.purchasePriceUSD}
                    </div>
                    <div className="text-sm font-bold text-white font-display">
                      Venta: US$ {sale.finalSalePriceUSD}
                    </div>
                    <div className="text-xs font-mono-tech text-emerald-400 font-bold">
                      +US$ {sale.grossProfitUSD} (+{sale.profitMarginPercent}%)
                    </div>
                  </div>

                  {/* Revert Sale Button (Authorized & Auditable) */}
                  {correspondingUnit && (
                    <button
                      onClick={() => onOpenRevertModal(correspondingUnit)}
                      className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-amber-500/15 text-white/60 hover:text-amber-400 border border-white/[0.08] hover:border-amber-500/30 text-xs font-mono-tech transition-colors flex items-center gap-1.5"
                      title="Corregir venta registrada por error (vuelve a estar disponible)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Corregir Error</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
