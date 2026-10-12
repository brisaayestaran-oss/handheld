import { ConsoleBrand, ProductCategory } from './catalog';

export type { ConsoleBrand, ProductCategory };

export type InventoryStatus = 'DISPONIBLE' | 'RESERVADA' | 'VENDIDA';

export type PhysicalCondition =
  | 'Impecable (10/10 - Como Nuevo)'
  | 'Excelente (9.5/10 - Mínimas marcas leves)'
  | 'Muy Bueno (9/10 - Desgaste estético menor)'
  | 'Bueno (8.5/10 - Marcas visibles de uso)';

export interface InventoryUnit {
  id: string; // UUID or unique ID
  unitCode: string; // e.g. "UNT-001", "UNT-002"
  brand: ConsoleBrand;
  model: string; // e.g. "Steam Deck OLED", "Lenovo Legion Go Z1 Extreme"
  capacity: string; // e.g. "512 GB NVMe", "1 TB NVMe"
  serialNumber: string; // Private, never exposed to public
  physicalCondition: PhysicalCondition;
  commercialCondition: string; // e.g. "Reacondicionado Certificado"
  purchasePriceUSD: number; // Private cost
  salePriceUSD: number; // Public sale price
  salePriceARSApprox?: number; // Estimated local currency
  entryDate: string; // ISO date string "YYYY-MM-DD"
  images: string[]; // List of image URLs or base64 data URLs
  primaryImage: string; // Main image URL
  internalNotes: string; // Private observations
  status: InventoryStatus;
  isPublic: boolean; // Publish or unpublish without deleting
  category: ProductCategory;
  
  // Sale details (when status === 'VENDIDA')
  saleDate?: string;
  finalSalePriceUSD?: number;
  grossProfitUSD?: number;
  saleNotes?: string;
  customerName?: string;
  
  // Reservation details (when status === 'RESERVADA')
  reservationDate?: string;
  reservedUntil?: string;
  reservedForCustomer?: string;
  reservationDepositUSD?: number;

  createdAt: string;
  updatedAt: string;
}

export interface SaleRecord {
  id: string;
  unitId: string;
  unitCode: string;
  brand: string;
  model: string;
  capacity: string;
  serialNumber: string;
  purchasePriceUSD: number;
  finalSalePriceUSD: number;
  grossProfitUSD: number;
  profitMarginPercent: number;
  saleDate: string;
  customerName?: string;
  saleNotes?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'SALE_COMPLETED' | 'SALE_REVERTED' | 'IMAGE_UPLOAD';
  entityId: string;
  details: string;
  timestamp: string;
  user: string;
}

export interface InventoryMetrics {
  totalUnits: number;
  availableCount: number;
  reservedCount: number;
  soldCount: number;
  publishedCount: number;
  inventoryInvestmentUSD: number; // Cost of currently active inventory (DISPONIBLE + RESERVADA)
  totalRevenueUSD: number; // Sum of finalSalePriceUSD for sold units
  totalGrossProfitUSD: number; // Sum of grossProfitUSD for sold units
  averageGrossMargin: number; // %
}
