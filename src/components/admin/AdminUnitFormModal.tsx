import React, { useState, useEffect } from 'react';
import { InventoryUnit, ConsoleBrand, PhysicalCondition, InventoryStatus } from '../../types/inventory';
import { inventoryService } from '../../services/inventoryService';
import {
  X,
  Upload,
  Camera,
  Image as ImageIcon,
  Check,
  Star,
  Trash2,
  Lock,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  unit: InventoryUnit | null; // Null means create mode
  onClose: () => void;
  onSaved: () => void;
}

export const AdminUnitFormModal: React.FC<Props> = ({
  isOpen,
  unit,
  onClose,
  onSaved
}) => {
  const [unitCode, setUnitCode] = useState('');
  const [brand, setBrand] = useState<ConsoleBrand>('Valve');
  const [model, setModel] = useState('Steam Deck OLED');
  const [capacity, setCapacity] = useState('512 GB NVMe');
  const [serialNumber, setSerialNumber] = useState('');
  const [physicalCondition, setPhysicalCondition] = useState<PhysicalCondition>('Impecable (10/10 - Como Nuevo)');
  const [commercialCondition, setCommercialCondition] = useState('Reacondicionado Certificado');
  const [purchasePriceUSD, setPurchasePriceUSD] = useState<number>(600);
  const [salePriceUSD, setSalePriceUSD] = useState<number>(800);
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [images, setImages] = useState<string[]>([]);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [internalNotes, setInternalNotes] = useState('');
  const [status, setStatus] = useState<InventoryStatus>('DISPONIBLE');
  const [isPublic, setIsPublic] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (unit) {
      setUnitCode(unit.unitCode);
      setBrand(unit.brand);
      setModel(unit.model);
      setCapacity(unit.capacity);
      setSerialNumber(unit.serialNumber);
      setPhysicalCondition(unit.physicalCondition);
      setCommercialCondition(unit.commercialCondition);
      setPurchasePriceUSD(unit.purchasePriceUSD);
      setSalePriceUSD(unit.salePriceUSD);
      setEntryDate(unit.entryDate);
      setImages(unit.images || []);
      setPrimaryImage(unit.primaryImage || unit.images?.[0] || '');
      setInternalNotes(unit.internalNotes || '');
      setStatus(unit.status);
      setIsPublic(unit.isPublic);
    } else {
      // Auto-suggest next unit code e.g. UNT-006
      const count = inventoryService.getAllUnits().length + 1;
      const nextCode = `UNT-${String(count).padStart(3, '0')}`;
      setUnitCode(nextCode);
      setBrand('Valve');
      setModel('Steam Deck OLED');
      setCapacity('512 GB NVMe');
      setSerialNumber('');
      setPhysicalCondition('Impecable (10/10 - Como Nuevo)');
      setCommercialCondition('Reacondicionado Certificado');
      setPurchasePriceUSD(600);
      setSalePriceUSD(800);
      setEntryDate(new Date().toISOString().split('T')[0]);
      setImages(['/assets/consoles/steam-deck/steam-deck-hero.png']);
      setPrimaryImage('/assets/consoles/steam-deck/steam-deck-hero.png');
      setInternalNotes('');
      setStatus('DISPONIBLE');
      setIsPublic(true);
    }
    setError(null);
  }, [unit, isOpen]);

  if (!isOpen) return null;

  // Handle multi-image upload with Canvas optimization
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const optimizedDataUrl = await inventoryService.optimizeImageFile(file);
        newImages.push(optimizedDataUrl);
      }

      const updatedList = [...images, ...newImages];
      setImages(updatedList);
      if (!primaryImage && updatedList.length > 0) {
        setPrimaryImage(updatedList[0]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al procesar fotografías';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (img: string) => {
    const remaining = images.filter((i) => i !== img);
    setImages(remaining);
    if (primaryImage === img) {
      setPrimaryImage(remaining[0] || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!unitCode.trim()) {
      setError('Completá el código interno de la unidad (ej. UNT-001).');
      return;
    }
    if (!serialNumber.trim()) {
      setError('Completá el número de serie privado para auditoría.');
      return;
    }
    if (purchasePriceUSD <= 0 || salePriceUSD <= 0) {
      setError('Los precios deben ser mayores a 0.');
      return;
    }

    const payload = {
      unitCode: unitCode.trim().toUpperCase(),
      brand,
      model,
      capacity,
      serialNumber: serialNumber.trim(),
      physicalCondition,
      commercialCondition,
      purchasePriceUSD: Number(purchasePriceUSD),
      salePriceUSD: Number(salePriceUSD),
      salePriceARSApprox: Math.round(Number(salePriceUSD) * 1200),
      entryDate,
      images: images.length > 0 ? images : [brand === 'Lenovo' ? '/assets/consoles/lenovo-legion-go/legion-go-card.png' : '/assets/consoles/steam-deck/steam-deck-hero.png'],
      primaryImage: primaryImage || (brand === 'Lenovo' ? '/assets/consoles/lenovo-legion-go/legion-go-card.png' : '/assets/consoles/steam-deck/steam-deck-hero.png'),
      internalNotes,
      status,
      isPublic,
      category: 'Consolas Portátiles' as const
    };

    if (unit) {
      inventoryService.updateUnit(unit.id, payload);
    } else {
      inventoryService.addUnit(payload);
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#101115] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#08090C]">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              {unit ? `Editar Unidad ${unit.unitCode}` : 'Ingresar Nueva Consola al Inventario'}
            </h3>
            <span className="text-[11px] font-mono-tech text-[#C8CAD1]/60">
              Control individual de hardware y trazabilidad privada
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#C8CAD1]">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Identification & Model */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3678FF] font-bold border-b border-white/[0.06] pb-1.5">
              1. Identificación de Unidad
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Código Interno *
                </label>
                <input
                  type="text"
                  value={unitCode}
                  onChange={(e) => setUnitCode(e.target.value)}
                  placeholder="UNT-001"
                  required
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Marca *
                </label>
                <select
                  value={brand}
                  onChange={(e) => {
                    const b = e.target.value as ConsoleBrand;
                    setBrand(b);
                    if (b === 'Lenovo') {
                      setModel('Lenovo Legion Go Z1 Extreme');
                    } else if (b === 'Valve') {
                      setModel('Steam Deck OLED');
                    }
                  }}
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                >
                  <option value="Valve">Valve</option>
                  <option value="Lenovo">Lenovo</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Modelo *
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                >
                  {brand === 'Valve' ? (
                    <>
                      <option value="Steam Deck OLED">Steam Deck OLED</option>
                      <option value="Steam Deck LCD">Steam Deck LCD</option>
                    </>
                  ) : (
                    <>
                      <option value="Lenovo Legion Go Z1 Extreme">Lenovo Legion Go Z1 Extreme</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Capacidad de Almacenamiento *
                </label>
                <select
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                >
                  <option value="256 GB NVMe">256 GB NVMe</option>
                  <option value="512 GB NVMe">512 GB NVMe</option>
                  <option value="1 TB NVMe">1 TB NVMe</option>
                  <option value="1 TB NVMe (Vidrio Grabado)">1 TB NVMe (Vidrio Grabado)</option>
                  <option value="2 TB NVMe">2 TB NVMe</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-400" />
                    Número de Serie (Privado) *
                  </span>
                  <span className="text-[10px] text-white/40">Nunca público</span>
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Ej: FX89-SD512-XXXX"
                  required
                  className="w-full bg-[#08090C] text-white font-mono-tech text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Physical & Commercial Condition */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3678FF] font-bold border-b border-white/[0.06] pb-1.5">
              2. Estado Físico & Condición
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Estado Físico de esta Unidad *
                </label>
                <select
                  value={physicalCondition}
                  onChange={(e) => setPhysicalCondition(e.target.value as PhysicalCondition)}
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                >
                  <option value="Impecable (10/10 - Como Nuevo)">Impecable (10/10 - Como Nuevo)</option>
                  <option value="Excelente (9.5/10 - Mínimas marcas leves)">Excelente (9.5/10 - Mínimas marcas leves)</option>
                  <option value="Muy Bueno (9/10 - Desgaste estético menor)">Muy Bueno (9/10 - Desgaste estético menor)</option>
                  <option value="Bueno (8.5/10 - Marcas visibles de uso)">Bueno (8.5/10 - Marcas visibles de uso)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Condición Comercial
                </label>
                <input
                  type="text"
                  value={commercialCondition}
                  disabled
                  className="w-full bg-white/[0.03] text-white/70 text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.06] cursor-not-allowed"
                />
                <span className="text-[10px] text-white/40 block mt-1">
                  Exclusivamente "Reacondicionado Certificado" por requerimiento.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Financials & Pricing */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3678FF] font-bold border-b border-white/[0.06] pb-1.5">
              3. Precios y Fecha de Ingreso
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5 flex items-center justify-between">
                  <span>Costo de Compra (USD) *</span>
                  <Lock className="w-3 h-3 text-amber-400" />
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-mono-tech">US$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={purchasePriceUSD}
                    onChange={(e) => setPurchasePriceUSD(Number(e.target.value))}
                    min="1"
                    step="1"
                    required
                    className="w-full bg-[#08090C] text-white font-mono-tech text-xs rounded-xl pl-11 pr-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                  />
                </div>
                <span className="text-[10px] text-white/40 block mt-1">Privado (para calcular ganancia)</span>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Precio de Venta al Público (USD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-mono-tech">US$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={salePriceUSD}
                    onChange={(e) => setSalePriceUSD(Number(e.target.value))}
                    min="1"
                    step="1"
                    required
                    className="w-full bg-[#08090C] text-white font-mono-tech text-xs rounded-xl pl-11 pr-3 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                  />
                </div>
                <span className="text-[10px] text-emerald-400 block mt-1">
                  Ganancia estimada: +US$ {salePriceUSD - purchasePriceUSD}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Fecha de Ingreso *
                </label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  required
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Multi-Photo Upload & Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3678FF] font-bold">
                4. Fotografías Reales de la Consola
              </h4>
              <span className="text-[10px] font-mono-tech text-[#C8CAD1]/60">
                Optimización automática a WebP/JPEG
              </span>
            </div>

            {/* Upload Buttons: Camera & Gallery */}
            <div className="p-4 rounded-2xl bg-[#08090C] border border-dashed border-white/[0.15] text-center flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#3678FF] hover:bg-[#2563EB] text-white font-bold text-xs font-display uppercase tracking-wider transition-all flex items-center gap-2 shadow-md">
                  <Camera className="w-4 h-4" />
                  <span>Cámara / Galería</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    capture="environment"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-display text-xs uppercase tracking-wider border border-white/[0.1] transition-all flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#3678FF]" />
                  <span>Subir Archivos</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {uploading && (
                <div className="text-xs text-[#3678FF] font-mono-tech animate-pulse">
                  Optimizando y procesando imágenes...
                </div>
              )}
            </div>

            {/* Uploaded Gallery Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {images.map((img, idx) => {
                  const isPrimary = primaryImage === img;
                  return (
                    <div
                      key={idx}
                      className={`relative aspect-square rounded-xl bg-black/60 border overflow-hidden p-1 flex items-center justify-center group ${
                        isPrimary ? 'border-[#3678FF] ring-2 ring-[#3678FF]/30' : 'border-white/[0.1]'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />

                      {/* Primary badge */}
                      {isPrimary && (
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#3678FF] text-[9px] font-mono-tech text-white font-bold flex items-center gap-1 shadow">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Principal</span>
                        </div>
                      )}

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(img)}
                            className="p-1.5 rounded-lg bg-[#3678FF] text-white text-[10px] font-mono-tech"
                            title="Hacer foto principal"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img)}
                          className="p-1.5 rounded-lg bg-red-500 text-white"
                          title="Eliminar foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 5: Status, Visibility & Private Notes */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono-tech uppercase tracking-wider text-[#3678FF] font-bold border-b border-white/[0.06] pb-1.5">
              5. Estado y Observaciones Internas
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5">
                  Estado Actual de Inventario *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InventoryStatus)}
                  className="w-full bg-[#08090C] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
                >
                  <option value="DISPONIBLE">DISPONIBLE (Lista para venta)</option>
                  <option value="RESERVADA">RESERVADA (Apartada con cliente)</option>
                  <option value="VENDIDA">VENDIDA (Operación finalizada)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3678FF] focus:ring-[#3678FF] bg-[#08090C] border-white/20"
                  />
                  <span className="text-xs text-white font-medium">
                    Publicada en el Catálogo Web
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-tech text-white/80 mb-1.5 flex items-center justify-between">
                <span>Observaciones Internas (Privadas)</span>
                <Lock className="w-3 h-3 text-amber-400" />
              </label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={3}
                placeholder="Notas de testeo, ciclos de batería, accesorios incluidos, procedencia..."
                className="w-full bg-[#08090C] text-white text-xs rounded-xl p-3 border border-white/[0.1] focus:outline-none focus:border-[#3678FF]"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-display text-xs uppercase tracking-wider transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#3678FF] hover:bg-[#2563EB] text-white font-bold font-display text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(54,120,255,0.35)] flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{unit ? 'Guardar Cambios' : 'Ingresar Consola'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
