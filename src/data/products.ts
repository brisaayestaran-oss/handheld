import { Product, ProductCategory } from '../types/catalog';

export const ALL_CATEGORIES: { id: ProductCategory; label: string; active: boolean }[] = [
  { id: 'Consolas Portátiles', label: 'Consolas Portátiles', active: true },
  { id: 'Docks & Hubs', label: 'Docks & Hubs', active: false },
  { id: 'Fundas & Protección', label: 'Fundas & Protección', active: false },
  { id: 'Almacenamiento SSD', label: 'Almacenamiento SSD', active: false },
  { id: 'Accesorios Gaming', label: 'Accesorios Gaming', active: false },
];

export const PRODUCTS: Product[] = [
  {
    id: 'steam-deck-oled',
    brand: 'Valve',
    name: 'Steam Deck OLED',
    model: 'OLED HDR 90Hz',
    subtitle: 'La cúspide del gaming portátil con negros puros y autonomía extendida',
    slug: 'steam-deck-oled',
    condition: 'Reacondicionado Certificado',
    category: 'Consolas Portátiles',
    isFeatured: true,
    displayOrder: 1,
    availability: 'Disponible Inmediato',
    shortDescription: 'Pantalla OLED HDR de 7.4 pulgadas a 90 Hz, APU Sephiroth de 6nm más eficiente, batería de 50Wh y Wi-Fi 6E de ultra baja latencia.',
    fullDescription: 'La Steam Deck OLED es la evolución definitiva del hardware de Valve. Diseñada específicamente para sesiones prolongadas de juego sin fatiga visual ni caídas de fotogramas, su panel OLED HDR entrega negros absolutos con contraste 1.000.000:1 y 1.000 nits de brillo pico. Gracias a su nuevo silicio de 6nm y su batería optimizada de 50 Wh, ofrece entre un 30% y un 50% más de tiempo de juego por carga.',
    keyHighlights: [
      'Pantalla OLED HDR de 7.4" (1280 x 800) a 90Hz con 1.000 nits de pico',
      'APU AMD Sephiroth personalizada de 6nm (Zen 2 + RDNA 2)',
      'Batería ampliada de 50 Wh (3 a 12 horas reales de juego)',
      'Módulo Wi-Fi 6E tri-banda y Bluetooth 5.3 con antena dedicada',
      'Ergonomía pulida con sticks de agarre optimizado y 30g menos de peso'
    ],
    specs: {
      processor: 'AMD Zen 2 de 4 núcleos / 8 hilos (2.4 - 3.5 GHz), proceso 6 nm',
      graphics: 'AMD RDNA 2 con 8 CUs (1.0 - 1.6 GHz, hasta 1.6 TFlops FP32)',
      ram: '16 GB LPDDR5 integrada de cuatro canales a 6400 MT/s',
      storageType: 'SSD NVMe PCIe Gen 3 x4 de alta velocidad + ranura MicroSD UHS-I',
      display: '7.4" OLED HDR antirreflejos (1000 nits pico HDR, 600 nits SDR)',
      refreshRate: 'Hasta 90 Hz adaptativo',
      battery: 'Batería de 50 Wh (3 a 12 horas estimadas de juego según título)',
      weight: 'Aprox. 640 gramos (30g más liviana que la versión LCD)',
      os: 'SteamOS 3.5 (Basado en Arch Linux con capa de compatibilidad Proton)',
      ports: 'USB-C con soporte DisplayPort 1.4 hasta 8K 60Hz / 4K 120Hz y PD 45W',
      connectivity: 'Wi-Fi 6E (2.4GHz, 5GHz y 6GHz 2x2 MIMO), Bluetooth 5.3',
      dimensions: '298 mm x 117 mm x 49 mm',
      features: [
        'Trackpads hápticos duales de alta precisión con respuesta LRA',
        'Giroscopio de 6 ejes IMU integrado',
        'Sticks analógicos capacitivos de tamaño completo',
        '4 botones traseros de agarre programables'
      ]
    },
    variants: [
      {
        capacity: '512 GB NVMe',
        priceUSD: 790,
        priceARSApprox: 948000,
        inStock: true,
        sku: 'SD-OLED-512'
      },
      {
        capacity: '1 TB NVMe (Vidrio Grabado)',
        priceUSD: 940,
        priceARSApprox: 1128000,
        inStock: true,
        sku: 'SD-OLED-1TB'
      }
    ],
    accentColor: '#3678FF',
    badge: 'Flagship OLED',
    galleryImages: [
      { title: 'Vista Frontal OLED', description: 'Bisel reducido de 7.4 pulgadas y mandos de textura premium.', type: 'front' },
      { title: 'Controles & Trackpads', description: 'Sticks capacitivos y trackpads hápticos duales.', type: 'controls' },
      { title: 'Refrigeración & Ergonomía', description: 'Ventilación rediseñada de 6nm con disipación silenciosa.', type: 'back' },
      { title: 'Pantalla HDR Activa', description: 'Negros puros y gama cromática DCI-P3 al 110%.', type: 'screen' }
    ]
  },
  {
    id: 'lenovo-legion-go',
    brand: 'Lenovo',
    name: 'Lenovo Legion Go',
    model: 'AMD Ryzen Z1 Extreme',
    subtitle: 'El titán del rendimiento con pantalla 8.8" QHD+ y mandos TrueStrike desmontables',
    slug: 'lenovo-legion-go',
    condition: 'Reacondicionado Certificado',
    category: 'Consolas Portátiles',
    isFeatured: true,
    displayOrder: 2,
    availability: 'Disponible Inmediato',
    shortDescription: 'Potencia descomunal con AMD Ryzen Z1 Extreme, descomunal panel 8.8" QHD+ a 144Hz, mandos desmontables y modo FPS mouse con sensor óptico.',
    fullDescription: 'La Lenovo Legion Go redefine la versatilidad gaming en formato portátil. Equipada con el procesador AMD Ryzen Z1 Extreme con 8 núcleos Zen 4 y 12 unidades de cómputo RDNA 3, ofrece potencia de calibre de escritorio en tus manos. Su enorme pantalla Lenovo PureSight de 8.8 pulgadas a 144 Hz y 2560x1600 de resolución deja boquiabierto a cualquier jugador. Sus mandos TrueStrike desmontables permiten jugar con kickstand en modo mesa o transformarse en un mouse de precisión vertical para shooters competitivos.',
    keyHighlights: [
      'Procesador AMD Ryzen Z1 Extreme (8 núcleos / 16 hilos hasta 5.1 GHz)',
      'Pantalla gigante de 8.8" QHD+ (2560 x 1600) IPS a 144Hz con 500 nits',
      'Mandos TrueStrike desmontables con efecto Hall antierrastre (Anti-Drift)',
      'Modo FPS exclusivo con sensor óptico de mouse en el mando derecho',
      'Windows 11 Home completo con soporte nativo para Xbox Game Pass, Epic, Battle.net y Steam'
    ],
    specs: {
      processor: 'AMD Ryzen Z1 Extreme con arquitectura Zen 4 (8 núcleos / 16 hilos, hasta 5.1 GHz)',
      graphics: 'AMD Radeon Graphics (RDNA 3, 12 CUs, hasta 2.7 GHz, hasta 8.6 TFlops FP32)',
      ram: '16 GB LPDDR5X a 7500 MHz de velocidad ultra rápida',
      storageType: 'SSD M.2 2242 PCIe 4.0 NVMe + lector de tarjetas MicroSD hasta 2TB',
      display: '8.8" QHD+ (2560x1600) 16:10 IPS, 144Hz, 500 nits, 97% DCI-P3, táctil de 10 puntos',
      refreshRate: '144 Hz (conmutable a 60 Hz)',
      battery: 'Batería de 49.2 Wh con tecnología Super Rapid Charge (70% en 30 min)',
      weight: '854 g (con mandos acoplados) / 640 g (solo unidad central con soporte)',
      os: 'Windows 11 Home (Libertad total para instalar cualquier launcher o software)',
      ports: '2x USB-C 4.0 (uno superior y uno inferior con DP 1.4 y PD 3.0), Jack 3.5mm combo',
      connectivity: 'Wi-Fi 6E (802.11ax 2x2), Bluetooth 5.2',
      dimensions: '299 mm x 131 mm x 41 mm (con mandos acoplados)',
      features: [
        'Joysticks con sensor magnético de efecto Hall (inmunes al drift)',
        'Trackpad óptico integrado en mando derecho',
        'Rueda de desplazamiento de mouse integrada',
        'Soporte metálico integrado trasero multiposición (Kickstand)'
      ]
    },
    variants: [
      {
        capacity: '512 GB NVMe Gen4',
        priceUSD: 850,
        priceARSApprox: 1020000,
        inStock: true,
        sku: 'LLG-Z1E-512'
      },
      {
        capacity: '1 TB NVMe Gen4',
        priceUSD: 980,
        priceARSApprox: 1176000,
        inStock: true,
        sku: 'LLG-Z1E-1TB'
      },
      {
        capacity: '2 TB NVMe Gen4 Ultra',
        priceUSD: 1150,
        priceARSApprox: 1380000,
        inStock: true,
        sku: 'LLG-Z1E-2TB'
      }
    ],
    accentColor: '#7655FF',
    badge: 'Potencia Z1 Extreme',
    galleryImages: [
      { title: 'Consola Completa Legion Go', description: 'Pantalla inmersiva de 8.8 pulgadas con TrueStrike acoplado.', type: 'front' },
      { title: 'Mandos Desmontables', description: 'Sistema de liberación rápida para juego libre o modo mesa.', type: 'controls' },
      { title: 'Modo FPS de Precisión', description: 'Base magnética incluida para apuntado estilo mouse vertical.', type: 'action' },
      { title: 'Reverso & Kickstand', description: 'Toma de aire masiva con doble heatpipe y pie de apoyo.', type: 'back' }
    ]
  },
  {
    id: 'steam-deck-lcd-refurbished',
    brand: 'Valve',
    name: 'Steam Deck LCD',
    model: 'LCD 60Hz Reacondicionado',
    subtitle: 'La puerta de entrada más inteligente al gaming portátil de PC',
    slug: 'steam-deck-lcd',
    condition: 'Reacondicionado Certificado',
    category: 'Consolas Portátiles',
    isFeatured: true,
    displayOrder: 3,
    availability: 'Disponible Inmediato',
    shortDescription: 'Excelente relación precio/calidad. Pantalla LCD 7" a 60Hz, APU AMD Zen 2 + RDNA 2, revisada exhaustivamente con garantía de funcionamiento.',
    fullDescription: 'La Steam Deck LCD original revolucionó para siempre la industria de los videojuegos portátiles. Estas unidades reacondicionadas certificadas han pasado por una inspección rigurosa de más de 30 puntos: calibración de joysticks y gatillos, comprobación de estado de batería superior al 95%, verificación de puertos y limpieza completa. Incluye cargador rápido original y funda protectora rígida.',
    keyHighlights: [
      'Relación precio-calidad insuperable para jugar títulos AAA de PC',
      'Pantalla IPS LCD brillante de 7" (1280 x 800) a 60 Hz',
      'APU AMD personalizada (Zen 2 + RDNA 2 de 15W)',
      'SteamOS preinstalado con acceso instantáneo a tu biblioteca',
      'Unidad testeada en banco de pruebas con garantía directa'
    ],
    specs: {
      processor: 'AMD Zen 2 de 4 núcleos / 8 hilos (2.4 - 3.5 GHz), proceso 7 nm',
      graphics: 'AMD RDNA 2 con 8 CUs (1.0 - 1.6 GHz, 1.6 TFlops FP32)',
      ram: '16 GB LPDDR5 integrada a 5500 MT/s',
      storageType: 'SSD NVMe PCIe Gen 3 x4 de alta velocidad + ranura MicroSD UHS-I',
      display: '7.0" IPS LCD táctil de 60 Hz (400 nits)',
      refreshRate: '60 Hz',
      battery: 'Batería de 40 Wh (2 a 8 horas según carga gráfica)',
      weight: 'Aprox. 669 gramos',
      os: 'SteamOS 3.5 (Compatibilidad Proton)',
      ports: 'USB-C con soporte DisplayPort 1.4 y Power Delivery 45W',
      connectivity: 'Wi-Fi 5 de doble banda (2.4GHz / 5GHz), Bluetooth 5.0',
      dimensions: '298 mm x 117 mm x 49 mm',
      features: [
        'Trackpads hápticos dobles',
        'Giroscopio de 6 ejes integrado',
        'Sticks analógicos capacitivos',
        '4 botones traseros de agarre'
      ]
    },
    variants: [
      {
        capacity: '256 GB NVMe',
        priceUSD: 520,
        priceARSApprox: 624000,
        inStock: true,
        sku: 'SD-LCD-256'
      },
      {
        capacity: '512 GB NVMe',
        priceUSD: 590,
        priceARSApprox: 708000,
        inStock: true,
        sku: 'SD-LCD-512'
      }
    ],
    accentColor: '#3678FF',
    badge: 'Best Value',
    galleryImages: [
      { title: 'Frontal Steam Deck LCD', description: 'Diseño clásico probado con millones de usuarios en el mundo.', type: 'front' },
      { title: 'Ergonomía de agarre', description: 'Curvatura diseñada para manos de cualquier tamaño.', type: 'controls' },
      { title: 'Detalle de gatillos', description: 'Gatillos analógicos L2/R2 y botones de hombro táctiles.', type: 'side' }
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getActiveCategories(): ProductCategory[] {
  const categoriesWithProducts = new Set<ProductCategory>();
  PRODUCTS.forEach(p => categoriesWithProducts.add(p.category));
  return ALL_CATEGORIES
    .filter(cat => categoriesWithProducts.has(cat.id))
    .map(c => c.id);
}
