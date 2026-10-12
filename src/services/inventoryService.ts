import { InventoryUnit, SaleRecord, AuditLog, InventoryMetrics, InventoryStatus } from '../types/inventory';
import { Product } from '../types/catalog';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

const INVENTORY_STORAGE_KEY = 'handheld_inventory_units_v1';
const SALES_STORAGE_KEY = 'handheld_sales_history_v1';
const AUDIT_STORAGE_KEY = 'handheld_audit_logs_v1';

// Initial seed units based on approved authentic inventory (Valve & Lenovo)
const INITIAL_UNITS: InventoryUnit[] = [
  {
    id: 'unit-sd-oled-001',
    unitCode: 'UNT-001',
    brand: 'Valve',
    model: 'Steam Deck OLED',
    capacity: '512 GB NVMe',
    serialNumber: 'FX89-SD512-4421',
    physicalCondition: 'Impecable (10/10 - Como Nuevo)',
    commercialCondition: 'Reacondicionado Certificado',
    purchasePriceUSD: 590,
    salePriceUSD: 790,
    salePriceARSApprox: 948000,
    entryDate: '2026-09-15',
    images: ['/assets/consoles/steam-deck/steam-deck-hero.png'],
    primaryImage: '/assets/consoles/steam-deck/steam-deck-hero.png',
    internalNotes: 'Unidad probada con 15 ciclos de carga, batería al 100% de salud. Sticks sin zona muerta.',
    status: 'DISPONIBLE',
    isPublic: true,
    category: 'Consolas Portátiles',
    createdAt: '2026-09-15T14:30:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'unit-sd-oled-002',
    unitCode: 'UNT-002',
    brand: 'Valve',
    model: 'Steam Deck OLED',
    capacity: '1 TB NVMe (Vidrio Grabado)',
    serialNumber: 'FX91-SD1TB-8832',
    physicalCondition: 'Impecable (10/10 - Como Nuevo)',
    commercialCondition: 'Reacondicionado Certificado',
    purchasePriceUSD: 710,
    salePriceUSD: 940,
    salePriceARSApprox: 1128000,
    entryDate: '2026-09-20',
    images: ['/assets/consoles/steam-deck/steam-deck-hero.png'],
    primaryImage: '/assets/consoles/steam-deck/steam-deck-hero.png',
    internalNotes: 'Edición con pantalla anti-reflejos de vidrio grabado al ácido. Pantalla sin píxeles muertos.',
    status: 'DISPONIBLE',
    isPublic: true,
    category: 'Consolas Portátiles',
    createdAt: '2026-09-20T16:00:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'unit-legion-go-003',
    unitCode: 'UNT-003',
    brand: 'Lenovo',
    model: 'Lenovo Legion Go Z1 Extreme',
    capacity: '512 GB NVMe',
    serialNumber: 'LNV-GOZ1-2091',
    physicalCondition: 'Excelente (9.5/10 - Mínimas marcas leves)',
    commercialCondition: 'Reacondicionado Certificado',
    purchasePriceUSD: 660,
    salePriceUSD: 850,
    salePriceARSApprox: 1020000,
    entryDate: '2026-09-25',
    images: ['/assets/consoles/lenovo-legion-go/legion-go-card.png'],
    primaryImage: '/assets/consoles/lenovo-legion-go/legion-go-card.png',
    internalNotes: 'Mandos TrueStrike testeados con sensor óptico en modo vertical. Bisagra de pie firme.',
    status: 'DISPONIBLE',
    isPublic: true,
    category: 'Consolas Portátiles',
    createdAt: '2026-09-25T11:20:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'unit-legion-go-004',
    unitCode: 'UNT-004',
    brand: 'Lenovo',
    model: 'Lenovo Legion Go Z1 Extreme',
    capacity: '1 TB NVMe',
    serialNumber: 'LNV-GOZ1-5512',
    physicalCondition: 'Impecable (10/10 - Como Nuevo)',
    commercialCondition: 'Reacondicionado Certificado',
    purchasePriceUSD: 740,
    salePriceUSD: 960,
    salePriceARSApprox: 1152000,
    entryDate: '2026-10-02',
    images: ['/assets/consoles/lenovo-legion-go/legion-go-card.png'],
    primaryImage: '/assets/consoles/lenovo-legion-go/legion-go-card.png',
    internalNotes: 'Upgrade de SSD NVMe PCIe 4.0 de alta velocidad a 1TB. Windows 11 Home limpio instalado.',
    status: 'RESERVADA',
    isPublic: true,
    reservationDate: '2026-10-09',
    reservedUntil: '2026-10-14',
    reservedForCustomer: 'Agustín R. (Seña confirmada)',
    reservationDepositUSD: 100,
    category: 'Consolas Portátiles',
    createdAt: '2026-10-02T10:00:00Z',
    updatedAt: '2026-10-09T18:00:00Z'
  },
  {
    id: 'unit-sd-lcd-005',
    unitCode: 'UNT-005',
    brand: 'Valve',
    model: 'Steam Deck LCD',
    capacity: '256 GB NVMe',
    serialNumber: 'FX55-SDL256-1109',
    physicalCondition: 'Excelente (9.5/10 - Mínimas marcas leves)',
    commercialCondition: 'Reacondicionado Certificado',
    purchasePriceUSD: 390,
    salePriceUSD: 520,
    salePriceARSApprox: 624000,
    entryDate: '2026-08-10',
    images: ['/assets/consoles/steam-deck/steam-deck-hero.png'],
    primaryImage: '/assets/consoles/steam-deck/steam-deck-hero.png',
    internalNotes: 'Vendida con éxito a cliente de Córdoba. Entregada con funda original y cargador.',
    status: 'VENDIDA',
    isPublic: false,
    saleDate: '2026-09-02',
    finalSalePriceUSD: 520,
    grossProfitUSD: 130,
    saleNotes: 'Cobro por transferencia bancaria. Envío asegurado por Andreani.',
    customerName: 'Mariano G. (Córdoba)',
    category: 'Consolas Portátiles',
    createdAt: '2026-08-10T12:00:00Z',
    updatedAt: '2026-09-02T16:30:00Z'
  }
];

class InventoryService {
  private units: InventoryUnit[] = [];
  private sales: SaleRecord[] = [];
  private auditLogs: AuditLog[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedUnits = localStorage.getItem(INVENTORY_STORAGE_KEY);
      if (storedUnits) {
        this.units = JSON.parse(storedUnits);
      } else {
        this.units = INITIAL_UNITS;
        this.saveToStorage();
      }

      const storedSales = localStorage.getItem(SALES_STORAGE_KEY);
      if (storedSales) {
        this.sales = JSON.parse(storedSales);
      } else {
        // Derive initial sales from initial sold units
        this.sales = this.units
          .filter(u => u.status === 'VENDIDA')
          .map(u => ({
            id: `sale-${u.id}`,
            unitId: u.id,
            unitCode: u.unitCode,
            brand: u.brand,
            model: u.model,
            capacity: u.capacity,
            serialNumber: u.serialNumber,
            purchasePriceUSD: u.purchasePriceUSD,
            finalSalePriceUSD: u.finalSalePriceUSD || u.salePriceUSD,
            grossProfitUSD: u.grossProfitUSD || ((u.finalSalePriceUSD || u.salePriceUSD) - u.purchasePriceUSD),
            profitMarginPercent: Math.round((((u.grossProfitUSD || 0) / (u.purchasePriceUSD || 1)) * 100)),
            saleDate: u.saleDate || new Date().toISOString().split('T')[0],
            customerName: u.customerName,
            saleNotes: u.saleNotes,
            createdAt: u.updatedAt
          }));
        localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(this.sales));
      }

      const storedLogs = localStorage.getItem(AUDIT_STORAGE_KEY);
      if (storedLogs) {
        this.auditLogs = JSON.parse(storedLogs);
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using fallback state:', e);
      this.units = INITIAL_UNITS;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(this.units));
      localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(this.sales));
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(this.auditLogs));
    } catch (e) {
      console.warn('Error saving inventory to localStorage:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  private logAudit(action: AuditLog['action'], entityId: string, details: string) {
    const log: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      entityId,
      details,
      timestamp: new Date().toISOString(),
      user: 'Administradora'
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 100) this.auditLogs.pop();
  }

  // ================= GETTERS =================

  public getAllUnits(): InventoryUnit[] {
    return [...this.units];
  }

  public getAvailableUnits(): InventoryUnit[] {
    return this.units.filter(u => u.status === 'DISPONIBLE');
  }

  public getReservedUnits(): InventoryUnit[] {
    return this.units.filter(u => u.status === 'RESERVADA');
  }

  public getSoldUnits(): InventoryUnit[] {
    return this.units.filter(u => u.status === 'VENDIDA');
  }

  public getSalesHistory(): SaleRecord[] {
    return [...this.sales].sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());
  }

  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs];
  }

  public getMetrics(): InventoryMetrics {
    const available = this.units.filter(u => u.status === 'DISPONIBLE');
    const reserved = this.units.filter(u => u.status === 'RESERVADA');
    const sold = this.units.filter(u => u.status === 'VENDIDA');
    const published = this.units.filter(u => u.isPublic && u.status === 'DISPONIBLE');

    const inventoryInvestmentUSD = [...available, ...reserved].reduce((sum, u) => sum + (u.purchasePriceUSD || 0), 0);
    const totalRevenueUSD = this.sales.reduce((sum, s) => sum + s.finalSalePriceUSD, 0);
    const totalGrossProfitUSD = this.sales.reduce((sum, s) => sum + s.grossProfitUSD, 0);
    const averageGrossMargin = totalRevenueUSD > 0 ? Math.round((totalGrossProfitUSD / totalRevenueUSD) * 100) : 0;

    return {
      totalUnits: this.units.length,
      availableCount: available.length,
      reservedCount: reserved.length,
      soldCount: sold.length,
      publishedCount: published.length,
      inventoryInvestmentUSD,
      totalRevenueUSD,
      totalGrossProfitUSD,
      averageGrossMargin
    };
  }

  // ================= MUTATIONS =================

  public addUnit(unitData: Omit<InventoryUnit, 'id' | 'createdAt' | 'updatedAt'>): InventoryUnit {
    const newUnit: InventoryUnit = {
      ...unitData,
      id: `unit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.units.unshift(newUnit);
    this.logAudit('CREATE', newUnit.id, `Unidad ${newUnit.unitCode} (${newUnit.model} ${newUnit.capacity}) ingresada al inventario.`);
    this.saveToStorage();
    return newUnit;
  }

  public updateUnit(id: string, updates: Partial<InventoryUnit>): InventoryUnit | null {
    const idx = this.units.findIndex(u => u.id === id);
    if (idx === -1) return null;

    const current = this.units[idx];
    const updated: InventoryUnit = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.units[idx] = updated;
    this.logAudit('UPDATE', id, `Modificación en unidad ${updated.unitCode}.`);
    this.saveToStorage();
    return updated;
  }

  public deleteUnit(id: string): boolean {
    const unit = this.units.find(u => u.id === id);
    if (!unit) return false;

    this.units = this.units.filter(u => u.id !== id);
    this.logAudit('DELETE', id, `Unidad ${unit.unitCode} (${unit.model}) eliminada del inventario.`);
    this.saveToStorage();
    return true;
  }

  // Action: Mark as Reserved
  public reserveUnit(id: string, customerName: string, depositUSD: number = 0, reservedUntil?: string): boolean {
    const unit = this.units.find(u => u.id === id);
    if (!unit) return false;

    unit.status = 'RESERVADA';
    unit.reservedForCustomer = customerName;
    unit.reservationDepositUSD = depositUSD;
    unit.reservationDate = new Date().toISOString().split('T')[0];
    unit.reservedUntil = reservedUntil || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    unit.updatedAt = new Date().toISOString();

    this.logAudit('STATUS_CHANGE', id, `Unidad ${unit.unitCode} reservada para ${customerName}. Seña: US$ ${depositUSD}.`);
    this.saveToStorage();
    return true;
  }

  // Action: Complete Sale
  public markAsSold(id: string, finalSalePriceUSD: number, saleDate?: string, customerName?: string, saleNotes?: string): boolean {
    const unit = this.units.find(u => u.id === id);
    if (!unit) return false;

    const actualSaleDate = saleDate || new Date().toISOString().split('T')[0];
    const grossProfitUSD = finalSalePriceUSD - unit.purchasePriceUSD;

    unit.status = 'VENDIDA';
    unit.isPublic = false; // Automatically not available for public sale
    unit.saleDate = actualSaleDate;
    unit.finalSalePriceUSD = finalSalePriceUSD;
    unit.grossProfitUSD = grossProfitUSD;
    unit.customerName = customerName;
    unit.saleNotes = saleNotes;
    unit.updatedAt = new Date().toISOString();

    // Create Sale record
    const saleRecord: SaleRecord = {
      id: `sale-${unit.id}-${Date.now()}`,
      unitId: unit.id,
      unitCode: unit.unitCode,
      brand: unit.brand,
      model: unit.model,
      capacity: unit.capacity,
      serialNumber: unit.serialNumber,
      purchasePriceUSD: unit.purchasePriceUSD,
      finalSalePriceUSD,
      grossProfitUSD,
      profitMarginPercent: unit.purchasePriceUSD > 0 ? Math.round((grossProfitUSD / unit.purchasePriceUSD) * 100) : 100,
      saleDate: actualSaleDate,
      customerName,
      saleNotes,
      createdAt: new Date().toISOString()
    };

    this.sales.unshift(saleRecord);
    this.logAudit('SALE_COMPLETED', id, `Venta registrada: Unidad ${unit.unitCode} por US$ ${finalSalePriceUSD} (Ganancia: US$ ${grossProfitUSD}).`);
    this.saveToStorage();
    return true;
  }

  // Action: Revert Sale (Authorized correction for accidental sale entry)
  public revertSale(unitId: string, reason: string): boolean {
    const unit = this.units.find(u => u.id === unitId);
    if (!unit || unit.status !== 'VENDIDA') return false;

    unit.status = 'DISPONIBLE';
    unit.isPublic = true;
    delete unit.saleDate;
    delete unit.finalSalePriceUSD;
    delete unit.grossProfitUSD;
    delete unit.saleNotes;
    delete unit.customerName;
    unit.updatedAt = new Date().toISOString();

    // Remove sale record
    this.sales = this.sales.filter(s => s.unitId !== unitId);

    this.logAudit('SALE_REVERTED', unitId, `Venta revertida para unidad ${unit.unitCode}. Motivo: ${reason}`);
    this.saveToStorage();
    return true;
  }

  // Action: Toggle Public Visibility
  public toggleVisibility(id: string): boolean {
    const unit = this.units.find(u => u.id === id);
    if (!unit) return false;

    unit.isPublic = !unit.isPublic;
    unit.updatedAt = new Date().toISOString();
    this.logAudit('UPDATE', id, `Visibilidad pública de unidad ${unit.unitCode} cambiada a ${unit.isPublic ? 'Publicada' : 'Oculta'}.`);
    this.saveToStorage();
    return true;
  }

  // ================= IMAGE OPTIMIZER =================
  /**
   * Optimizes a user-provided image file using Canvas to max width/height of 1600px with high quality JPEG/WebP.
   * Returns a clean data URL ready for display or cloud upload.
   */
  public async optimizeImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          resolve(optimizedDataUrl);
        };
        img.onerror = () => reject(new Error('No se pudo procesar la imagen.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
      reader.readAsDataURL(file);
    });
  }

  // ================= PUBLIC CATALOG SYNCHRONIZER =================
  /**
   * Maps current published, active inventory units into the public Product catalog.
   * If a product has 0 units available, it marks it accordingly.
   * Internal fields (serialNumber, purchasePriceUSD, internalNotes) are never exposed!
   */
  public getPublicCatalogProducts(fallbackProducts: Product[]): Product[] {
    const publishedUnits = this.units.filter(u => u.isPublic && u.status !== 'VENDIDA');

    return fallbackProducts.map(baseProduct => {
      // Find matching units for this base product
      const matchingUnits = publishedUnits.filter(u => {
        if (baseProduct.brand !== u.brand) return false;
        if (baseProduct.id === 'steam-deck-oled' && u.model.includes('Steam Deck OLED')) return true;
        if (baseProduct.id === 'lenovo-legion-go' && u.model.includes('Legion Go')) return true;
        if (baseProduct.id === 'steam-deck-lcd' && u.model.includes('Steam Deck LCD')) return true;
        return false;
      });

      // Update variant prices and stock based on real units
      const updatedVariants = baseProduct.variants.map(variant => {
        const unitsWithCapacity = matchingUnits.filter(u => u.capacity === variant.capacity);
        const availableCount = unitsWithCapacity.filter(u => u.status === 'DISPONIBLE').length;

        // If there's an active unit, sync the sale price
        const primaryUnit = unitsWithCapacity[0];
        const currentPriceUSD = primaryUnit ? primaryUnit.salePriceUSD : variant.priceUSD;
        const currentPriceARS = primaryUnit ? (primaryUnit.salePriceARSApprox || currentPriceUSD * 1200) : variant.priceARSApprox;

        return {
          ...variant,
          priceUSD: currentPriceUSD,
          priceARSApprox: currentPriceARS,
          inStock: availableCount > 0
        };
      });

      const totalAvailable = matchingUnits.filter(u => u.status === 'DISPONIBLE').length;
      const totalReserved = matchingUnits.filter(u => u.status === 'RESERVADA').length;

      let availability = baseProduct.availability;
      if (totalAvailable > 0) {
        availability = 'Disponible Inmediato';
      } else if (totalReserved > 0) {
        availability = 'Bajo Pedido (48-72h)';
      } else if (matchingUnits.length === 0) {
        availability = 'Agotado Temporal';
      }

      return {
        ...baseProduct,
        variants: updatedVariants,
        availability,
        condition: 'Reacondicionado Certificado'
      };
    });
  }
}

export const inventoryService = new InventoryService();
