import { BrandConfig } from '../types/catalog';

export const brandConfig: BrandConfig = {
  brandName: 'HANDHELD',
  logoUrl: '/logos/handheld.png',
  brandTagline: 'TECNOLOGÍA QUE TRANSFORMA TU FORMA DE JUGAR.',
  brandPositioning: 'Consolas portátiles Steam Deck y Lenovo Legion Go de caja abierta y poco uso. Consultá precios, fotos reales y condiciones de cada unidad.',
  country: 'Argentina',
  city: 'Buenos Aires',
  whatsappNumber: '5492216687883',
  whatsappDisplay: '+54 9 221 668-7883',
  instagramHandle: '@handheld.ar',
  instagramUrl: 'https://www.instagram.com/handheld.ar/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61574035456129',
  tiktokHandle: '@handheld_gaming',
  tiktokUrl: 'https://tiktok.com',
  shippingNotice: 'Consultá cobertura, costo y plazo de entrega antes de pagar.',
  demoCatalogDisclaimer: 'Imágenes ilustrativas y precios orientativos. Equipos de caja abierta, usados con poco uso. Disponibilidad, estado, accesorios, pagos y garantía a confirmar por unidad.'
};

export function buildWhatsAppLink(brand: string, model: string, capacity: string): string {
  const message = `Hola, quiero consultar por la ${brand} ${model} ${capacity}. ¿Me pasás fotos reales de la unidad, estado, accesorios incluidos, precio final, medios de pago, garantía y envío?`;
  return `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(topic?: string): string {
  const message = topic 
    ? `Hola, me contacto desde la web de ${brandConfig.brandName} para consultar sobre: ${topic}.`
    : `Hola, me contacto desde la web de ${brandConfig.brandName}. Quisiera recibir asesoramiento sobre las consolas portátiles disponibles.`;
  return `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}