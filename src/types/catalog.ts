export type ConsoleBrand = 'Valve' | 'Lenovo' | 'ASUS ROG' | 'Nintendo' | 'Otras';

export type ProductCondition = 'Reacondicionado Certificado' | 'Usado Seleccionado';

export type AvailabilityStatus = 'Disponible Inmediato' | 'Bajo Pedido (48-72h)' | 'Agotado Temporal';

export type ProductCategory = 'Consolas Portátiles' | 'Docks & Hubs' | 'Fundas & Protección' | 'Almacenamiento SSD' | 'Accesorios Gaming';

export interface ProductSpecs {
  processor: string;
  graphics: string;
  ram: string;
  storageType: string;
  display: string;
  refreshRate: string;
  battery: string;
  weight: string;
  os: string;
  ports: string;
  connectivity: string;
  dimensions: string;
  features: string[];
}

export interface StorageVariant {
  capacity: string;
  priceUSD: number;
  priceARSApprox: number;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  brand: ConsoleBrand;
  name: string;
  model: string;
  subtitle: string;
  slug: string;
  condition: ProductCondition;
  category: ProductCategory;
  isFeatured: boolean;
  displayOrder: number;
  availability: AvailabilityStatus;
  shortDescription: string;
  fullDescription: string;
  keyHighlights: string[];
  specs: ProductSpecs;
  variants: StorageVariant[];
  selectedVariantIndex?: number;
  accentColor: string;
  badge?: string;
  galleryImages: {
    title: string;
    description: string;
    type: 'front' | 'side' | 'back' | 'screen' | 'controls' | 'action';
  }[];
}

export interface BrandConfig {
  brandName: string;
  logoUrl: string;
  brandTagline: string;
  brandPositioning: string;
  country: string;
  city: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  instagramHandle: string;
  instagramUrl: string;
  tiktokHandle: string;
  tiktokUrl: string;
  shippingNotice: string;
  demoCatalogDisclaimer: string;
}
