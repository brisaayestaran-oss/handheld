import React from 'react';

interface Props {
  className?: string;
  isOled?: boolean;
  interactive?: boolean;
}

export const SteamDeckVisual: React.FC<Props> = ({ className = '', isOled = true, interactive = false }) => {
  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#3678FF]/20 via-[#7655FF]/5 to-transparent blur-3xl -z-10 pointer-events-none transform scale-90" />

      {/* SVG High-Fidelity Console Illustration */}
      <svg
        viewBox="0 0 1000 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
      >
        <defs>
          {/* Chassis Gradients */}
          <linearGradient id="sd-chassis-grad" x1="500" y1="20" x2="500" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E2028" />
            <stop offset="15%" stopColor="#131418" />
            <stop offset="85%" stopColor="#0D0E11" />
            <stop offset="100%" stopColor="#181A20" />
          </linearGradient>

          <linearGradient id="sd-rim-light" x1="100" y1="0" x2="900" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3678FF" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="70%" stopColor="#7655FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3678FF" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="sd-screen-bezel" x1="280" y1="70" x2="720" y2="390" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#16171C" />
            <stop offset="100%" stopColor="#0B0C0E" />
          </linearGradient>

          {/* OLED Screen Visual Gradient */}
          <linearGradient id="oled-screen-art" x1="290" y1="80" x2="710" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D1117" />
            <stop offset="30%" stopColor="#111B38" />
            <stop offset="70%" stopColor="#1F1538" />
            <stop offset="100%" stopColor="#090D1A" />
          </linearGradient>

          {/* Grip Texture */}
          <pattern id="sd-grip-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.75" fill="#2A2D36" opacity="0.35" />
          </pattern>
        </defs>

        {/* Outer Console Chassis Body with Steam Deck Ergonomic Contour */}
        <path
          d="M 120 40 
             C 220 30, 780 30, 880 40 
             C 940 46, 980 90, 985 170 
             C 990 250, 970 360, 915 425 
             C 885 455, 840 455, 780 445 
             C 650 440, 350 440, 220 445 
             C 160 455, 115 455, 85 425 
             C 30 360, 10 250, 15 170 
             C 20 90, 60 46, 120 40 Z"
          fill="url(#sd-chassis-grad)"
          stroke="url(#sd-rim-light)"
          strokeWidth="2.5"
        />

        {/* Ergonomic Hand Grips Texture Area */}
        <path
          d="M 25 180 C 20 260, 35 370, 90 420 C 130 450, 170 445, 185 400 C 160 300, 150 200, 155 120 C 120 120, 35 130, 25 180 Z"
          fill="url(#sd-grip-pattern)"
        />
        <path
          d="M 975 180 C 980 260, 965 370, 910 420 C 870 450, 830 445, 815 400 C 840 300, 850 200, 845 120 C 880 120, 965 130, 975 180 Z"
          fill="url(#sd-grip-pattern)"
        />

        {/* Top Vent & Trigger Accents */}
        <path d="M 360 32 L 640 32 L 635 40 L 365 40 Z" fill="#0C0D10" stroke="#262933" strokeWidth="1" />
        <rect x="380" y="34" width="40" height="4" rx="1" fill="#1C1E26" />
        <rect x="430" y="34" width="40" height="4" rx="1" fill="#1C1E26" />
        <rect x="480" y="34" width="40" height="4" rx="1" fill="#1C1E26" />
        <rect x="530" y="34" width="40" height="4" rx="1" fill="#1C1E26" />
        <rect x="580" y="34" width="40" height="4" rx="1" fill="#1C1E26" />

        {/* L1 & R1 Shoulder Bumpers */}
        <path d="M 115 38 C 160 33, 220 33, 230 45 L 220 52 C 180 43, 130 45, 105 48 Z" fill="#2A2D38" stroke="#3A3E4D" strokeWidth="1" />
        <path d="M 885 38 C 840 33, 780 33, 770 45 L 780 52 C 820 43, 870 45, 895 48 Z" fill="#2A2D38" stroke="#3A3E4D" strokeWidth="1" />

        {/* Screen Bezel (Sleeker and thinner for OLED) */}
        <rect
          x={isOled ? "265" : "255"}
          y={isOled ? "65" : "60"}
          width={isOled ? "470" : "490"}
          height={isOled ? "330" : "340"}
          rx="12"
          fill="url(#sd-screen-bezel)"
          stroke="#2B2E38"
          strokeWidth="1.5"
        />

        {/* Active Display Panel (OLED 7.4" 16:10 ratio) */}
        <rect
          x={isOled ? "280" : "275"}
          y={isOled ? "78" : "75"}
          width={isOled ? "440" : "450"}
          height={isOled ? "304" : "310"}
          rx="6"
          fill="url(#oled-screen-art)"
          stroke="#000000"
          strokeWidth="2"
        />

        {/* Screen Content: Cinematic In-Game HUD Graphics */}
        <g opacity="0.95">
          {/* Subtle Grid / Starfield Horizon */}
          <line x1="280" y1="230" x2="720" y2="230" stroke="#3678FF" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="500" cy="180" r="45" fill="none" stroke="#7655FF" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.6" />
          <circle cx="500" cy="180" r="6" fill="#3678FF" opacity="0.8" />
          
          {/* Neon Horizon Peaks */}
          <path d="M 285 280 L 370 210 L 450 250 L 520 195 L 610 260 L 715 220" stroke="#3678FF" strokeWidth="2" fill="none" opacity="0.85" />
          <path d="M 285 295 L 390 240 L 480 270 L 560 225 L 650 275 L 715 250" stroke="#7655FF" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* HDR Vivid Atmosphere Glow */}
          <circle cx="620" cy="140" r="30" fill="#3678FF" opacity="0.25" filter="blur(8px)" />
          <circle cx="380" cy="150" r="25" fill="#7655FF" opacity="0.25" filter="blur(8px)" />

          {/* Game UI Header */}
          <rect x="295" y="90" width="85" height="18" rx="4" fill="#05070D" opacity="0.85" />
          <text x="303" y="103" fill="#C8CAD1" fontSize="9" fontFamily="monospace" fontWeight="600">FPS: 90.0</text>

          <rect x="635" y="90" width="75" height="18" rx="4" fill="#05070D" opacity="0.85" />
          <text x="643" y="103" fill="#3678FF" fontSize="9" fontFamily="monospace" fontWeight="600">HDR 1000n</text>

          {/* Center Title overlay */}
          <text x="500" y="320" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="sans-serif" fontWeight="800" letterSpacing="3">
            STEAM DECK OLED
          </text>
          <text x="500" y="340" textAnchor="middle" fill="#8E92A2" fontSize="9" fontFamily="monospace" letterSpacing="1">
            90HZ HDR · 6NM CUSTOM APU · STEAMOS 3.5
          </text>
        </g>

        {/* Screen Glass Specular Reflection Highlight */}
        <path
          d="M 280 78 L 440 78 L 320 382 L 280 382 Z"
          fill="url(#sd-rim-light)"
          opacity="0.08"
        />

        {/* LEFT CONTROLS */}
        {/* Left Analog Stick */}
        <g transform="translate(145, 130)">
          <circle cx="0" cy="0" r="38" fill="#15171D" stroke="#2E323D" strokeWidth="2" />
          <circle cx="0" cy="0" r="31" fill="#1C1E26" stroke="#0F1014" strokeWidth="2" />
          <circle cx="0" cy="0" r="25" fill="#161820" stroke="#3678FF" strokeWidth="1" strokeOpacity="0.4" />
          {/* Thumbstick Grip Ridges */}
          <circle cx="0" cy="0" r="16" fill="#1E202A" />
          <circle cx="0" cy="0" r="7" fill="#121318" />
        </g>

        {/* Left D-PAD */}
        <g transform="translate(145, 230)">
          {/* Base */}
          <circle cx="0" cy="0" r="36" fill="#111216" opacity="0.5" />
          {/* Up, Down, Left, Right Arms */}
          <path
            d="M -9 -34 L 9 -34 L 9 -9 L 34 -9 L 34 9 L 9 9 L 9 34 L -9 34 L -9 9 L -34 9 L -34 -9 L -9 -9 Z"
            fill="#1E2028"
            stroke="#2F3340"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="0" r="6" fill="#14151B" />
        </g>

        {/* Left Haptic Trackpad */}
        <g transform="translate(195, 305)">
          <rect x="-35" y="-35" width="70" height="70" rx="8" fill="#14151A" stroke="#2C303D" strokeWidth="1.5" />
          <rect x="-30" y="-30" width="60" height="60" rx="6" fill="#171920" stroke="#222530" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.5" fill="#3678FF" opacity="0.6" />
        </g>

        {/* View / Menu Buttons */}
        <circle cx="215" cy="80" r="8" fill="#1D1F27" stroke="#313543" strokeWidth="1" />
        {/* Steam Button */}
        <g transform="translate(200, 395)">
          <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#161820" stroke="#2B2F3D" strokeWidth="1" />
          <text x="0" y="3.5" textAnchor="middle" fill="#8E92A2" fontSize="7.5" fontWeight="700" letterSpacing="0.5">STEAM</text>
        </g>

        {/* RIGHT CONTROLS */}
        {/* ABXY Action Buttons */}
        <g transform="translate(855, 130)">
          {/* Y Button */}
          <circle cx="0" cy="-26" r="11" fill="#1F222C" stroke="#363A4A" strokeWidth="1.2" />
          <text x="0" y="-22" textAnchor="middle" fill="#C8CAD1" fontSize="10" fontWeight="700">Y</text>

          {/* B Button */}
          <circle cx="26" cy="0" r="11" fill="#1F222C" stroke="#363A4A" strokeWidth="1.2" />
          <text x="0.5" y="3.5" textAnchor="middle" transform="translate(26, 0)" fill="#E05252" fontSize="10" fontWeight="700">B</text>

          {/* A Button */}
          <circle cx="0" cy="26" r="11" fill="#1F222C" stroke="#363A4A" strokeWidth="1.2" />
          <text x="0" y="30" textAnchor="middle" fill="#4ADE80" fontSize="10" fontWeight="700">A</text>

          {/* X Button */}
          <circle cx="-26" cy="0" r="11" fill="#1F222C" stroke="#363A4A" strokeWidth="1.2" />
          <text x="0" y="3.5" textAnchor="middle" transform="translate(-26, 0)" fill="#60A5FA" fontSize="10" fontWeight="700">X</text>
        </g>

        {/* Right Analog Stick */}
        <g transform="translate(855, 230)">
          <circle cx="0" cy="0" r="38" fill="#15171D" stroke="#2E323D" strokeWidth="2" />
          <circle cx="0" cy="0" r="31" fill="#1C1E26" stroke="#0F1014" strokeWidth="2" />
          <circle cx="0" cy="0" r="25" fill="#161820" stroke="#7655FF" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="16" fill="#1E202A" />
          <circle cx="0" cy="0" r="7" fill="#121318" />
        </g>

        {/* Right Haptic Trackpad */}
        <g transform="translate(805, 305)">
          <rect x="-35" y="-35" width="70" height="70" rx="8" fill="#14151A" stroke="#2C303D" strokeWidth="1.5" />
          <rect x="-30" y="-30" width="60" height="60" rx="6" fill="#171920" stroke="#222530" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.5" fill="#7655FF" opacity="0.6" />
        </g>

        {/* Quick Access (...) Button */}
        <g transform="translate(800, 395)">
          <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#161820" stroke="#2B2F3D" strokeWidth="1" />
          <text x="0" y="3.5" textAnchor="middle" fill="#8E92A2" fontSize="9" fontWeight="900" letterSpacing="1">•••</text>
        </g>

        {/* Options Button */}
        <circle cx="785" cy="80" r="8" fill="#1D1F27" stroke="#313543" strokeWidth="1" />

        {/* Stereo Speaker Slits */}
        <g opacity="0.5">
          <circle cx="270" cy="380" r="1.5" fill="#C8CAD1" />
          <circle cx="276" cy="380" r="1.5" fill="#C8CAD1" />
          <circle cx="282" cy="380" r="1.5" fill="#C8CAD1" />
          <circle cx="718" cy="380" r="1.5" fill="#C8CAD1" />
          <circle cx="724" cy="380" r="1.5" fill="#C8CAD1" />
          <circle cx="730" cy="380" r="1.5" fill="#C8CAD1" />
        </g>
      </svg>
    </div>
  );
};
