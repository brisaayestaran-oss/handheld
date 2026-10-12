export interface ConsoleAssetConfig {
  id: 'steam-deck-oled' | 'lenovo-legion-go';
  brand: string;
  name: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  // Official photography assets
  images: {
    hero: string;
    front: string;
    angle: string;
    controls: string;
  };
  // Future 3D GLB model path (null if not yet loaded)
  glbModelPath: string | null;
  has3DModel: boolean;
  specs: {
    display: string;
    refresh: string;
    resolution: string;
    processor: string;
    battery: string;
    weight: string;
    os: string;
  };
  highlights: string[];
}

export const CONSOLES_CONFIG: Record<'steam-deck-oled' | 'lenovo-legion-go', ConsoleAssetConfig> = {
  'steam-deck-oled': {
    id: 'steam-deck-oled',
    brand: 'Valve',
    name: 'Steam Deck OLED',
    badge: 'FLAGSHIP OLED HDR',
    accentColor: '#3678FF',
    glowColor: 'rgba(54, 120, 255, 0.25)',
    images: {
      hero: '/assets/consoles/steam-deck/steam-deck-hero.png',
      front: '/assets/consoles/steam-deck/steam-deck-oled-front.png',
      angle: '/assets/consoles/steam-deck/steam-deck-oled-angle.png',
      controls: '/assets/consoles/steam-deck/steam-deck-oled-controls.png'
    },
    // Set to null until genuine .glb model is integrated
    glbModelPath: null,
    has3DModel: false,
    specs: {
      display: '7.4" OLED HDR antirreflejos (1000 nits pico)',
      refresh: 'Hasta 90 Hz adaptativo',
      resolution: '1280 x 800 píxeles',
      processor: 'AMD Sephiroth personalizada de 6nm (Zen 2 + RDNA 2)',
      battery: '50 Wh (3 a 12 horas reales de autonomía)',
      weight: '640 gramos (30g más liviana)',
      os: 'SteamOS 3.5 con capa de compatibilidad Proton'
    },
    highlights: [
      'Negros 0.0 nits con panel OLED HDR de 90Hz',
      'APU de 6nm más eficiente y silenciosa',
      'Trackpads hápticos dobles con precisión de puntero',
      'Wi-Fi 6E tri-banda de ultra baja latencia'
    ]
  },
  'lenovo-legion-go': {
    id: 'lenovo-legion-go',
    brand: 'Lenovo',
    name: 'Lenovo Legion Go',
    badge: 'AMD RYZEN Z1 EXTREME',
    accentColor: '#7655FF',
    glowColor: 'rgba(118, 85, 255, 0.28)',
    images: {
      hero: '/assets/consoles/lenovo-legion-go/legion-go-official-main.png',
      front: '/assets/consoles/lenovo-legion-go/legion-go-official-main.png',
      angle: '/assets/consoles/lenovo-legion-go/legion-go-official-detail.png',
      controls: '/assets/consoles/lenovo-legion-go/legion-go-official-detached.png'
    },
    // Set to null until genuine .glb model is integrated
    glbModelPath: null,
    has3DModel: false,
    specs: {
      display: '8.8" QHD+ Lenovo PureSight (500 nits)',
      refresh: '144 Hz (conmutable a 60 Hz)',
      resolution: '2560 x 1600 (relación 16:10)',
      processor: 'AMD Ryzen Z1 Extreme (8 núcleos / 16 hilos hasta 5.1 GHz)',
      battery: '49.2 Wh con Super Rapid Charge',
      weight: '854 g (mandos acoplados) / 640 g (solo tablet)',
      os: 'Windows 11 Home completo'
    },
    highlights: [
      'Procesador AMD Ryzen Z1 Extreme con gráficos RDNA 3',
      'Pantalla gigante de 8.8" QHD+ a 144Hz',
      'Mandos TrueStrike desmontables con efecto Hall anti-drift',
      'Modo FPS exclusivo con sensor óptico de mouse'
    ]
  }
};
