import React from 'react';

interface Props {
  className?: string;
  detachedMode?: boolean;
}

export const LegionGoVisual: React.FC<Props> = ({ className = '', detachedMode = false }) => {
  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#7655FF]/20 via-[#3678FF]/5 to-transparent blur-3xl -z-10 pointer-events-none transform scale-90" />

      {/* SVG Console Illustration */}
      <svg
        viewBox="0 0 1020 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
      >
        <defs>
          {/* Legion Chassis Gradient */}
          <linearGradient id="llg-body-grad" x1="510" y1="20" x2="510" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1B1C22" />
            <stop offset="20%" stopColor="#121317" />
            <stop offset="80%" stopColor="#0B0C0E" />
            <stop offset="100%" stopColor="#16171D" />
          </linearGradient>

          {/* Controller Detachable Gradients */}
          <linearGradient id="llg-controller-grad" x1="100" y1="20" x2="100" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22242C" />
            <stop offset="50%" stopColor="#15161C" />
            <stop offset="100%" stopColor="#181A22" />
          </linearGradient>

          {/* Rim light */}
          <linearGradient id="llg-rim-light" x1="50" y1="0" x2="970" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7655FF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3678FF" stopOpacity="0.45" />
          </linearGradient>

          {/* RGB Ring Gradients */}
          <radialGradient id="rgb-halo-left" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#7655FF" stopOpacity="0" />
            <stop offset="85%" stopColor="#7655FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3678FF" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="rgb-halo-right" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#3678FF" stopOpacity="0" />
            <stop offset="85%" stopColor="#3678FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7655FF" stopOpacity="1" />
          </radialGradient>

          {/* 8.8" QHD+ Screen Visual */}
          <linearGradient id="llg-screen-art" x1="240" y1="50" x2="780" y2="430" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B0E16" />
            <stop offset="40%" stopColor="#151228" />
            <stop offset="70%" stopColor="#1A2038" />
            <stop offset="100%" stopColor="#070911" />
          </linearGradient>
        </defs>

        {/* ================= CENTRAL TABLET BODY (8.8" Display Unit) ================= */}
        <g id="central-tablet">
          {/* Main tablet body */}
          <rect
            x="215"
            y="40"
            width="590"
            height="400"
            rx="14"
            fill="url(#llg-body-grad)"
            stroke="url(#llg-rim-light)"
            strokeWidth="2"
          />

          {/* Top vents & Power / Volume */}
          <rect x="360" y="32" width="300" height="8" rx="2" fill="#0C0D11" stroke="#232631" strokeWidth="1" />
          <line x1="390" y1="36" x2="630" y2="36" stroke="#373B4B" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Top USB-C 4.0 Port */}
          <rect x="680" y="33" width="22" height="6" rx="2" fill="#050608" stroke="#3678FF" strokeWidth="1" />

          {/* Screen Outer Bezel */}
          <rect
            x="235"
            y="55"
            width="550"
            height="370"
            rx="8"
            fill="#090A0D"
            stroke="#1E2028"
            strokeWidth="1.5"
          />

          {/* Active 8.8" QHD+ 16:10 144Hz Screen */}
          <rect
            x="245"
            y="65"
            width="530"
            height="350"
            rx="4"
            fill="url(#llg-screen-art)"
            stroke="#000000"
            strokeWidth="1.5"
          />

          {/* In-Game Graphic / HUD Overlay */}
          <g opacity="0.95">
            {/* High-speed Cyber Grid */}
            <path d="M 245 280 L 510 200 L 775 280" stroke="#7655FF" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M 245 340 L 510 240 L 775 340" stroke="#3678FF" strokeWidth="2" fill="none" opacity="0.5" />
            <circle cx="510" cy="180" r="40" fill="none" stroke="#7655FF" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />

            {/* Top Stat bars */}
            <rect x="260" y="78" width="90" height="20" rx="4" fill="#06070B" opacity="0.9" />
            <text x="270" y="92" fill="#7655FF" fontSize="10" fontFamily="monospace" fontWeight="700">144.0 FPS</text>

            <rect x="660" y="78" width="100" height="20" rx="4" fill="#06070B" opacity="0.9" />
            <text x="670" y="92" fill="#3678FF" fontSize="10" fontFamily="monospace" fontWeight="700">2560 x 1600</text>

            {/* Center Legion Showcase Title */}
            <text x="510" y="360" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontFamily="sans-serif" fontWeight="900" letterSpacing="4">
              LEGION GO
            </text>
            <text x="510" y="385" textAnchor="middle" fill="#9BA1B5" fontSize="10" fontFamily="monospace" letterSpacing="1.5">
              AMD RYZEN Z1 EXTREME · 8.8" PURESIGHT 144HZ · WINDOWS 11
            </text>
          </g>

          {/* Glass reflection */}
          <path
            d="M 245 65 L 430 65 L 290 415 L 245 415 Z"
            fill="url(#llg-rim-light)"
            opacity="0.07"
          />
        </g>

        {/* ================= LEFT CONTROLLER (TrueStrike) ================= */}
        {/* Transform offset if detachedMode is true */}
        <g id="left-controller" transform={detachedMode ? 'translate(-40, 0)' : 'translate(0, 0)'}>
          {/* Main Left Controller Shell with angled ergonomic contour */}
          <path
            d="M 195 45 
               C 170 42, 110 45, 80 70 
               C 35 110, 20 230, 25 350 
               C 28 410, 55 450, 95 458 
               C 135 464, 180 445, 195 435 Z"
            fill="url(#llg-controller-grad)"
            stroke="url(#llg-rim-light)"
            strokeWidth="2"
          />

          {/* Detachment Seam & Indicator */}
          <line x1="205" y1="50" x2="205" y2="430" stroke="#2B2F3D" strokeWidth="2.5" />
          <rect x="198" y="225" width="8" height="30" rx="2" fill="#7655FF" opacity="0.8" />

          {/* Left Analog Stick with RGB Ring */}
          <g transform="translate(115, 145)">
            <circle cx="0" cy="0" r="38" fill="url(#rgb-halo-left)" />
            <circle cx="0" cy="0" r="32" fill="#14151B" stroke="#2D303B" strokeWidth="2" />
            <circle cx="0" cy="0" r="24" fill="#1C1E26" />
            <circle cx="0" cy="0" r="16" fill="#111216" />
          </g>

          {/* Legion L Button */}
          <g transform="translate(170, 90)">
            <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#181A22" stroke="#363A48" strokeWidth="1" />
            <text x="0" y="3.5" textAnchor="middle" fill="#7655FF" fontSize="7.5" fontWeight="800">LEGION</text>
          </g>

          {/* D-Pad (Cross shaped) */}
          <g transform="translate(115, 260)">
            <path
              d="M -10 -32 L 10 -32 L 10 -10 L 32 -10 L 32 10 L 10 10 L 10 32 L -10 32 L -10 10 L -32 10 L -32 -10 L -10 -10 Z"
              fill="#1C1E26"
              stroke="#2E323E"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="5" fill="#121318" />
          </g>

          {/* View button */}
          <circle cx="165" cy="180" r="8" fill="#1C1E26" stroke="#333745" strokeWidth="1" />
        </g>

        {/* ================= RIGHT CONTROLLER (TrueStrike + FPS Mode) ================= */}
        <g id="right-controller" transform={detachedMode ? 'translate(40, 0)' : 'translate(0, 0)'}>
          {/* Main Right Controller Shell */}
          <path
            d="M 825 45 
               C 850 42, 910 45, 940 70 
               C 985 110, 1000 230, 995 350 
               C 992 410, 965 450, 925 458 
               C 885 464, 840 445, 825 435 Z"
            fill="url(#llg-controller-grad)"
            stroke="url(#llg-rim-light)"
            strokeWidth="2"
          />

          {/* Detachment Seam & Indicator */}
          <line x1="815" y1="50" x2="815" y2="430" stroke="#2B2F3D" strokeWidth="2.5" />
          <rect x="814" y="225" width="8" height="30" rx="2" fill="#3678FF" opacity="0.8" />

          {/* ABXY Action Buttons */}
          <g transform="translate(905, 140)">
            {/* Y Button */}
            <circle cx="0" cy="-24" r="10" fill="#1C1E26" stroke="#333745" strokeWidth="1" />
            <text x="0" y="-20" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">Y</text>

            {/* B Button */}
            <circle cx="24" cy="0" r="10" fill="#1C1E26" stroke="#333745" strokeWidth="1" />
            <text x="24" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">B</text>

            {/* A Button */}
            <circle cx="0" cy="24" r="10" fill="#1C1E26" stroke="#333745" strokeWidth="1" />
            <text x="0" y="27.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">A</text>

            {/* X Button */}
            <circle cx="-24" cy="0" r="10" fill="#1C1E26" stroke="#333745" strokeWidth="1" />
            <text x="-24" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">X</text>
          </g>

          {/* Right Analog Stick with RGB Ring */}
          <g transform="translate(905, 245)">
            <circle cx="0" cy="0" r="38" fill="url(#rgb-halo-right)" />
            <circle cx="0" cy="0" r="32" fill="#14151B" stroke="#2D303B" strokeWidth="2" />
            <circle cx="0" cy="0" r="24" fill="#1C1E26" />
            <circle cx="0" cy="0" r="16" fill="#111216" />
          </g>

          {/* Legion R Button */}
          <g transform="translate(850, 90)">
            <rect x="-14" y="-8" width="28" height="16" rx="3" fill="#181A22" stroke="#363A48" strokeWidth="1" />
            <text x="0" y="3.5" textAnchor="middle" fill="#3678FF" fontSize="7.5" fontWeight="800">MENU</text>
          </g>

          {/* Optical Trackpad & Mouse Sensor (Signature Legion Go feature!) */}
          <g transform="translate(905, 335)">
            <rect x="-24" y="-18" width="48" height="36" rx="5" fill="#111317" stroke="#2B2F3D" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2" fill="#3678FF" opacity="0.8" />
            <text x="0" y="27" textAnchor="middle" fill="#717688" fontSize="6.5" fontWeight="600" letterSpacing="0.5">TRACKPAD</text>
          </g>

          {/* FPS Mode Mouse Base Badge on bottom grip */}
          <g transform="translate(915, 415)">
            <rect x="-25" y="-7" width="50" height="14" rx="3" fill="#0C0D11" stroke="#242833" strokeWidth="1" />
            <text x="0" y="3" textAnchor="middle" fill="#C8CAD1" fontSize="7" fontWeight="700" letterSpacing="0.5">FPS SWITCH</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
