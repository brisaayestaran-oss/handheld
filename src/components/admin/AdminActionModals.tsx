import React, { useState } from 'react';
import { InventoryUnit } from '../../types/inventory';
import { X, DollarSign, Clock, RotateCcw, AlertTriangle, Check, ShieldCheck } from 'lucide-react';

interface SellModalProps {
  isOpen: boolean;
  unit: InventoryUnit | null;
  onClose: () => void;
  onConfirm: (unitId: string, finalPriceUSD: number, saleDate: string, customerName?: string, notes?: string) => void;
}

export const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  unit,
  onClose,
  onConfirm
}) => {
  const [finalPrice, setFinalPrice] = useState<number>(unit?.salePriceUSD || 0);
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (unit) {
      setFinalPrice(unit.salePriceUSD);
      setSaleDate(new Date().toISOString().split('T')[0]);
      setCustomerName(unit.reservedForCustomer || '');
      setNotes('');
    }
  }, [unit]);

  if (!isOpen || !unit) return null;

  const cost = unit.purchasePriceUSD;
  const profit = finalPrice - cost;
  const margin = cost > 0 ? Math.round((profit / cost) * 100) : 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(unit.id, Number(finalPrice), saleDate, customerName.trim(), notes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#101115] border border-white/[0.12] rounded-3xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Registrar Venta de Unidad</h3>
              <span className="text-[11px] font-mono-tech text-[#C8CAD1]/60">{unit.unitCode} · {unit.model}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/60 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#C8CAD1]">
          <div>
            <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
              Precio Final de Venta Acordado (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-mono-tech">US$</span>
              <input
                type="number"
                inputMode="decimal"
                value={finalPrice}
                onChange={(e) => setFinalPrice(Number(e.target.value))}
                required
                className="w-full bg-[#08090C] text-white font-mono-tech text-xs rounded-xl pl-11 pr-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
              />
            </div>
          </div>

          {/* Real-time Profit Preview */}
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">Costo original de compra:</span>
              <span className="text-white font-mono-tech font-bold">US$ {cost}</span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-purple-500/20">
              <span className="text-purple-300 font-bold">Ganancia Bruta Real:</span>
              <span className="text-purple-300 font-mono-tech font-bold text-sm">
                +US$ {profit} (+{margin}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
                Fecha de Venta *
              </label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                required
                className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3 py-2 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
                Cliente / Comprador
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nombre o WhatsApp"
                className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3 py-2 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
              Notas de la Operación (Pago, Envío)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Transferencia bancaria + Correo Andreani"
              className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3 py-2 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
            />
          </div>

          <p className="text-[11px] text-[#C8CAD1]/60 leading-relaxed">
            Al confirmar, la consola pasará a la sección <strong>Vendidas</strong> y dejará de figurar disponible en el catálogo público inmediatamente.
          </p>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-display uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-display text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar Venta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ReserveModalProps {
  isOpen: boolean;
  unit: InventoryUnit | null;
  onClose: () => void;
  onConfirm: (unitId: string, customerName: string, depositUSD: number, reservedUntil?: string) => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({
  isOpen,
  unit,
  onClose,
  onConfirm
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deposit, setDeposit] = useState<number>(100);
  const [reservedUntil, setReservedUntil] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  if (!isOpen || !unit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    onConfirm(unit.id, customerName.trim(), Number(deposit), reservedUntil);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#101115] border border-white/[0.12] rounded-3xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Reservar Consola</h3>
              <span className="text-[11px] font-mono-tech text-[#C8CAD1]/60">{unit.unitCode} · {unit.model}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/60 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#C8CAD1]">
          <div>
            <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
              Nombre / Contacto del Cliente *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej: Martín Rodríguez (WhatsApp)"
              required
              className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
                Seña / Depósito (USD)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                min="0"
                className="w-full bg-[#08090C] text-white font-mono-tech text-xs rounded-xl px-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
                Reservar Hasta
              </label>
              <input
                type="date"
                value={reservedUntil}
                onChange={(e) => setReservedUntil(e.target.value)}
                className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-display uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-display text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apartar Consola</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface RevertSaleModalProps {
  isOpen: boolean;
  unit: InventoryUnit | null;
  onClose: () => void;
  onConfirm: (unitId: string, reason: string) => void;
}

export const RevertSaleModal: React.FC<RevertSaleModalProps> = ({
  isOpen,
  unit,
  onClose,
  onConfirm
}) => {
  const [reason, setReason] = useState('Error involuntario de carga');

  if (!isOpen || !unit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(unit.id, reason.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#101115] border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">Corregir Venta Registrada por Error</h3>
            <span className="text-[11px] font-mono-tech text-[#C8CAD1]/60">Acción auditable para {unit.unitCode}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#C8CAD1]">
          <p className="leading-relaxed text-[#C8CAD1]/80">
            Esta acción devolverá la consola <strong>{unit.unitCode} ({unit.model})</strong> al estado <strong>DISPONIBLE</strong> en el inventario y eliminará el registro contable de venta.
          </p>

          <div>
            <label className="block text-[11px] font-mono-tech text-white/80 mb-1">
              Motivo de la Corrección *
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-display uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-display text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Revertir Venta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
