import React, { useState, useMemo } from 'react';
import { InventoryUnit, InventoryStatus } from '../../types/inventory';
import {
  Search,
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  CheckCircle2,
  Lock,
  Calendar,
  Filter,
  Check
} from 'lucide-react';

interface Props {
  units: InventoryUnit[];
  onOpenCreate: () => void;
  onEditUnit: (unit: InventoryUnit) => void;
  onDeleteUnit: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onOpenSellModal: (unit: InventoryUnit) => void;
  onOpenReserveModal: (unit: InventoryUnit) => void;
}

export const AdminInventoryList: React.FC<Props> = ({
  units,
  onOpenCreate,
  onEditUnit,
  onDeleteUnit,
  onToggleVisibility,
  onOpenSellModal,
  onOpenReserveModal
}) => {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('Todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todas');
  const [showPrivateData, setShowPrivateData] = useState(false);

  const brands = ['Todas', 'Valve', 'Lenovo'];
  const statuses = ['Todas', 'DISPONIBLE', 'RESERVADA', 'VENDIDA'];

  const filteredUnits = useMemo(() => {
    return units.filter((u) => {
      const matchBrand = selectedBrand === 'Todas' || u.brand === selectedBrand;
      const matchStatus = selectedStatus === 'Todas' || u.status === selectedStatus;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        u.unitCode.toLowerCase().includes(q) ||
        u.model.toLowerCase().includes(q) ||
        u.capacity.toLowerCase().includes(q) ||
        u.serialNumber.toLowerCase().includes(q) ||
        (u.customerName && u.customerName.toLowerCase().includes(q));

      return matchBrand && matchStatus && matchSearch;
    });
  }, [units, selectedBrand, selectedStatus, search]);

  const getStatusBadge = (status: InventoryStatus) => {
    switch (status) {
      case 'DISPONIBLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            DISPONIBLE
          </span>
        );
      case 'RESERVADA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            RESERVADA
          </span>
        );
      case 'VENDIDA':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Check className="w-3 h-3" />
            VENDIDA
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Controls & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Inventario por Unidad ({filteredUnits.length} de {units.length})
          </h2>
          <p className="text-xs text-[#C8CAD1]/70">
            Cada consola cuenta con identificación individual, serie y costos privados.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowPrivateData(!showPrivateData)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono-tech transition-colors flex items-center gap-2 ${
              showPrivateData
                ? 'bg-[#3678FF]/15 border-[#3678FF]/40 text-[#3678FF]'
                : 'bg-white/[0.04] border-white/[0.1] text-white/70 hover:text-white'
            }`}
            title="Mostrar u ocultar números de serie y costos de compra"
          >
            {showPrivateData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {showPrivateData ? 'Ocultar Costos y Series' : 'Ver Costos y Series'}
            </span>
          </button>

          <button
            onClick={onOpenCreate}
            className="px-4 py-2.5 rounded-xl bg-[#3678FF] hover:bg-[#2563EB] text-white font-bold font-display text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(54,120,255,0.3)] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Ingresar Consola</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#101115] border border-white/[0.08] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Brand tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#08090C] rounded-xl border border-white/[0.06] overflow-x-auto">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedBrand === b
                  ? 'bg-[#20232B] text-white shadow-sm border border-white/[0.1]'
                  : 'text-[#C8CAD1]/70 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#08090C] rounded-xl border border-white/[0.06] overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedStatus === s
                  ? 'bg-[#20232B] text-white shadow-sm border border-white/[0.1]'
                  : 'text-[#C8CAD1]/70 hover:text-white'
              }`}
            >
              {s === 'Todas' ? 'Todos los Estados' : s}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-[#C8CAD1]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por código, serie o modelo..."
            className="w-full bg-[#08090C] text-white placeholder-[#C8CAD1]/40 text-xs rounded-xl pl-9 pr-4 py-2 border border-white/[0.08] focus:outline-none focus:border-[#3678FF]"
          />
        </div>
      </div>

      {/* Responsive Units List: Modern Touch-friendly Cards for Mobile, Grid for Desktop */}
      {filteredUnits.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#101115] border border-white/[0.08]">
          <Filter className="w-8 h-8 text-[#C8CAD1]/30 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-display">No hay consolas con estos filtros</h3>
          <p className="mt-1 text-xs text-[#C8CAD1]/60">Probá limpiando los filtros o agregá una nueva consola.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredUnits.map((u) => {
            const estimatedProfit = u.salePriceUSD - u.purchasePriceUSD;
            const margin = Math.round((estimatedProfit / u.purchasePriceUSD) * 100);

            return (
              <div
                key={u.id}
                className="p-5 rounded-2xl bg-[#101115] border border-white/[0.08] hover:border-white/[0.2] transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Header: Unit Code & Status */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#3678FF]/15 text-[#3678FF] text-xs font-mono-tech font-bold">
                        {u.unitCode}
                      </span>
                      <span className="text-[10px] font-mono-tech text-white/50 uppercase">
                        {u.brand}
                      </span>
                    </div>
                    <div>{getStatusBadge(u.status)}</div>
                  </div>

                  {/* Thumbnail & Product Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl bg-black/50 border border-white/[0.06] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={u.primaryImage || '/assets/consoles/steam-deck/steam-deck-hero.png'}
                        alt={u.model}
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white font-display truncate">
                        {u.model}
                      </h4>
                      <div className="text-xs font-mono-tech text-[#3678FF] font-semibold mt-0.5">
                        {u.capacity}
                      </div>
                      <div className="text-[11px] text-[#C8CAD1]/70 truncate mt-1">
                        {u.physicalCondition}
                      </div>
                      <div className="text-[10px] font-mono-tech text-white/40 mt-0.5">
                        {u.commercialCondition}
                      </div>
                    </div>
                  </div>

                  {/* Reservation Note if active */}
                  {u.status === 'RESERVADA' && u.reservedForCustomer && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                      <span className="font-bold block">Reservada para: {u.reservedForCustomer}</span>
                      <span className="text-[11px] text-amber-200/70">
                        Seña: US$ {u.reservationDepositUSD || 0} · Hasta: {u.reservedUntil || 'A definir'}
                      </span>
                    </div>
                  )}

                  {/* Sold details if active */}
                  {u.status === 'VENDIDA' && (
                    <div className="mt-3 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                      <span className="font-bold block">
                        Venta cerrada el {u.saleDate} {u.customerName ? `a ${u.customerName}` : ''}
                      </span>
                      <span className="text-[11px] text-purple-200/80">
                        Precio final: US$ {u.finalSalePriceUSD} · Ganancia: US$ {u.grossProfitUSD}
                      </span>
                    </div>
                  )}

                  {/* Private Data Strip (Serial number & Cost) */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5 text-xs">
                    {/* Serial Number */}
                    <div className="flex items-center justify-between text-[11px] font-mono-tech">
                      <span className="text-white/40 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-white/30" />
                        Nº Serie Privado:
                      </span>
                      <span className="text-white/80">
                        {showPrivateData ? u.serialNumber : '••••••••••••'}
                      </span>
                    </div>

                    {/* Cost & Sale Price Breakdown */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/40 font-mono-tech">
                        Costo Compra:
                      </span>
                      <span className="text-white font-mono-tech">
                        {showPrivateData ? `US$ ${u.purchasePriceUSD}` : 'US$ •••'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
                      <span className="font-bold text-white font-mono-tech">
                        Precio Venta:
                      </span>
                      <div className="text-right">
                        <span className="font-bold text-white font-display text-sm">
                          US$ {u.salePriceUSD}
                        </span>
                        {showPrivateData && (
                          <span className="block text-[10px] font-mono-tech text-emerald-400">
                            +US$ {estimatedProfit} (+{margin}%)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Internal notes excerpt */}
                  {u.internalNotes && (
                    <div className="mt-2.5 p-2 rounded-lg bg-black/40 text-[11px] text-[#C8CAD1]/70 italic truncate">
                      "{u.internalNotes}"
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {/* Public Visibility Toggle */}
                    <button
                      onClick={() => onToggleVisibility(u.id)}
                      className={`p-2 rounded-lg border text-xs transition-colors ${
                        u.isPublic
                          ? 'bg-white/[0.04] text-white/80 border-white/[0.08] hover:bg-white/[0.08]'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}
                      title={u.isPublic ? 'Publicado en catálogo web' : 'Oculto en catálogo web'}
                    >
                      {u.isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onEditUnit(u)}
                      className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.08] transition-colors"
                      title="Editar información de la consola"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteUnit(u.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                      title="Eliminar del inventario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-1.5">
                    {u.status === 'DISPONIBLE' && (
                      <>
                        <button
                          onClick={() => onOpenReserveModal(u)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-[11px] font-mono-tech font-bold transition-all"
                        >
                          Reservar
                        </button>
                        <button
                          onClick={() => onOpenSellModal(u)}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono-tech text-[11px] font-bold transition-all shadow-md flex items-center gap-1"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Vender</span>
                        </button>
                      </>
                    )}

                    {u.status === 'RESERVADA' && (
                      <button
                        onClick={() => onOpenSellModal(u)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono-tech text-[11px] font-bold transition-all shadow-md flex items-center gap-1"
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Cerrar Venta</span>
                      </button>
                    )}

                    {u.status === 'VENDIDA' && (
                      <span className="text-[11px] font-mono-tech text-purple-400 font-bold px-2 py-1 bg-purple-500/10 rounded-lg">
                        Finalizada
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
