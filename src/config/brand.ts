import { BrandConfig } from '../types/catalog';

export const brandConfig: BrandConfig = {
  brandName: 'HANDHELD',
  logoUrl: '/handheld.png',
  brandTagline: 'TECNOLOGÍA QUE TRANSFORMA TU FORMA DE JUGAR.',
  brandPositioning: 'Consolas portátiles y tecnología gaming de alto rendimiento en Argentina. Especialistas en Steam Deck, Lenovo Legion Go y hardware gaming.',
  country: 'Argentina',
  city: 'Buenos Aires',
  whatsappNumber: '5491138409210',
  whatsappDisplay: '+54 9 11 3840-9210',
  instagramHandle: '@handheld.ar',
  instagramUrl: 'https://instagram.com',
  tiktokHandle: '@handheld_gaming',
  tiktokUrl: 'https://tiktok.com',
  shippingNotice: 'Envíos asegurados a todo el territorio argentino por Correo Argentino / Andreani Express.',
  demoCatalogDisclaimer: 'Valores y unidades de demostración para exhibición digital de catálogo. Consultá cotización del día y stock real por WhatsApp.'
};

export function buildWhatsAppLink(brand: string, model: string, capacity: string): string {
  const message = `Hola, quiero consultar por la ${brand} ${model} ${capacity}. ¿Está disponible?`;
  return `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(topic?: string): string {
  const message = topic 
    ? `Hola, me contacto desde la web de ${brandConfig.brandName} para consultar sobre: ${topic}.`
    : `Hola, me contacto desde la web de ${brandConfig.brandName}. Quisiera recibir asesoramiento sobre las consolas portátiles disponibles.`;
  return `https://wa.me/${brandConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
