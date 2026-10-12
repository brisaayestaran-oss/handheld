import React, { useState } from 'react';
import { Monitor, Battery, Cpu, Gamepad2, Sparkles, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<'screen' | 'os' | 'controls' | 'cooling'>('screen');

  const tabs = [
    { id: 'screen' as const, label: 'Tecnología de Pantalla' },
    { id: 'os' as const, label: 'Ecosistema & Sistema Operativo' },
    { id: 'controls' as const, label: 'Controles & Ergonomía' },
    { id: 'cooling' as const, label: 'Arquitectura & Refrigeración' }
  ];

  return (
    <section id="experiencia" className="relative py-28 bg-[#050507] border-t border-white/[0.05] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#3678FF]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono-tech text-[#3678FF] uppercase tracking-widest block mb-3">
            03. INGENIERÍA DE EXPERIENCIA
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-tight uppercase">
            LA LIBERTAD DE JUGAR <br />
            <span className="bg-gradient-to-r from-white via-[#C8CAD1] to-white/70 bg-clip-text text-transparent">
              ESTÁ EN TUS MANOS.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#C8CAD1] leading-relaxed">
            Elegir la consola adecuada depende de tu estilo de juego. Compará en tiempo real
            las dos filosofías dominantes del hardware portátil.
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-[#101115] rounded-2xl border border-white/[0.08]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#20232B] text-white shadow-md border border-white/[0.12]'
                    : 'text-[#C8CAD1]/70 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Cards (2-column head-to-head architectural showdown) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Steam Deck Approach */}
          <div className="p-8 rounded-3xl bg-[#101115] border border-white/[0.08] hover:border-[#3678FF]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#C8CAD1]/70 pb-4 border-b border-white/[0.06]">
                <span className="text-[#3678FF] font-bold">FILOSOFÍA CONSOLA INTEGRADA</span>
                <span>VALVE STEAM DECK</span>
              </div>

              {activeTab === 'screen' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">Panel OLED HDR 90Hz</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    Prioriza el contraste infinito, la fidelidad de color absoluta (110% DCI-P3) y la eficiencia energética. Los 1280x800 píxeles son ideales para la APU, entregando 60 a 90 FPS fluidos con tiempos de batería récord.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Negros 0.0 nits con brillo pico HDR de 1000 nits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Respuesta táctil y de píxel de 0.1 milisegundos</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'os' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">SteamOS 3.5 con Proton</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    Experiencia inmediata estilo consola. Suspensión instantánea en medio de una partida (Sleep/Resume en 1 segundo), sincronización automática de partidas en la nube de Steam y compatibilidad verificada sin lidiar con drivers.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Cero bloatware: interfaz ultra fluida sin ventanas emergentes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Modo escritorio Arch Linux con un solo toque</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'controls' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">Ergonomía de Mano & Trackpads</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    Diseñada para no forzar las muñecas durante sesiones de 4 horas continuas. Sus dos trackpads con motores hápticos LRA permiten jugar a Age of Empires, Civilization o títulos de puntería con comodidad inigualable.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>4 botones traseros de agarre programables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Giroscopio asistido capacitivo de alta precisión</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'cooling' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">Silicio de 6nm y 15W Silencioso</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    El nuevo disipador más grande y el ventilador silencioso mantienen la consola fresca a revoluciones bajas. El TDP de 15W asegura que la temperatura en las manos permanezca siempre confortable.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Hasta 12 horas en emulación y títulos indie</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#3678FF]" />
                      <span>Flujo de aire optimizado alejado del usuario</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono-tech text-[#C8CAD1]/50">
              RECOMENDADA: Para quien busca facilidad, ergonomía impecable y jugar la biblioteca de Steam al instante.
            </div>
          </div>

          {/* Card 2: Lenovo Legion Go Approach */}
          <div className="p-8 rounded-3xl bg-[#101115] border border-white/[0.08] hover:border-[#7655FF]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#C8CAD1]/70 pb-4 border-b border-white/[0.06]">
                <span className="text-[#7655FF] font-bold">FILOSOFÍA POTENCIA TOTAL</span>
                <span>LENOVO LEGION GO</span>
              </div>

              {activeTab === 'screen' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">Pantalla 8.8" QHD+ a 144Hz</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    La pantalla más grande del segmento con resolución nativa de 2560 x 1600. Permite un nivel de detalle fotográfico inaudito para shooters, simuladores y películas, con tasa de 144Hz ultra suave.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Espacio de color 97% DCI-P3 con 500 nits de brillo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Panel táctil de 10 puntos de respuesta inmediata</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'os' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">Windows 11 Home Sin Restricciones</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    Libertad total. Ejecutá Xbox Game Pass con juegos instalados localmente, Fortnite con Easy Anti-Cheat, Genshin Impact, Call of Duty Warzone, clientes de emulación y cualquier software de Windows que uses a diario.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Legion Space para acceso centralizado a launchers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Compatible con todos los sistemas anti-trampas</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'controls' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">TrueStrike & Modo Mouse FPS</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    Mandos desacoplables con joysticks de efecto Hall magnéticos (anti-drift permanente). El mando derecho se convierte en mouse de agarre vertical para apuntado competitivo en Counter Strike o Apex Legends.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Soporte kickstand integrado para modo mesa</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Trackpad óptico y rueda de desplazamiento física</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'cooling' && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-2xl font-bold font-display text-white">AMD Z1 Extreme & Coldfront</h4>
                  <p className="text-sm text-[#C8CAD1] leading-relaxed">
                    Hasta 30W de potencia en modo personalizado. El sistema térmico Legion Coldfront con aspas de polímero de cristal líquido disipa el calor eficientemente en largas sesiones de juego exigente.
                  </p>
                  <ul className="space-y-2.5 text-xs text-[#C8CAD1]/90 pt-2 font-mono-tech">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Dos puertos USB 4.0 con velocidades de 40 Gbps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#7655FF]" />
                      <span>Carga rápida Super Rapid Charge</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono-tech text-[#C8CAD1]/50">
              RECOMENDADA: Para quien busca máxima potencia, pantalla gigante y jugar Game Pass o juegos con anti-cheat.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
interface Props {}
