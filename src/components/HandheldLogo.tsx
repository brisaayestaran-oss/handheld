import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  withGlow?: boolean;
}

export const HandheldLogo: React.FC<Props> = ({
  className = '',
  size = 'md',
  withGlow = true
}) => {
  // Authentic height scale matching the real HANDHELD logo
  const heightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12 md:h-14',
    lg: 'h-16 sm:h-18 md:h-20',
    xl: 'h-24 sm:h-28 md:h-32'
  };

  const currentHeight = heightMap[size] || heightMap.md;

  return (
    <div className={`inline-flex items-center select-none relative group ${className}`}>
      {withGlow && (
        <div
          className="absolute inset-0 bg-[#3678FF]/20 rounded-full blur-xl -z-10 transform scale-125 pointer-events-none group-hover:bg-[#3678FF]/40 transition-colors"
        />
      )}
      <img
        src="/handheld.png"
        alt="HANDHELD"
        className={`${currentHeight} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] filter drop-shadow-[0_4px_16px_rgba(54,120,255,0.3)] brightness-105`}
        loading="eager"
      />
    </div>
  );
};
