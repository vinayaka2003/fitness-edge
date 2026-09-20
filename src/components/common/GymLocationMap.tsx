import React from 'react';
import { gymData } from '../../data/gym';
import { Navigation } from 'lucide-react';

interface GymLocationMapProps {
  className?: string;
  height?: string;
}

export const GymLocationMap: React.FC<GymLocationMapProps> = ({
  className = '',
  height = 'h-[360px] sm:h-[440px]',
}) => {
  const { lat, lng, directionsUrl } = gymData.coordinates;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&ie=UTF8&output=embed`;

  return (
    <div
      className={`relative w-full overflow-hidden border border-white/[0.06] bg-[#050507] ${className}`}
    >
      {/* Map Embed Stage with Ultra-Aesthetic Dark Mode Filter */}
      <div className={`relative w-full ${height} bg-[#050507] group`}>
        <iframe
          title="Fitness Edge Prime Location"
          src={embedUrl}
          className="w-full h-full border-0 filter grayscale-[80%] contrast-[1.05] opacity-70 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
          loading="lazy"
          allowFullScreen
        />
        
        {/* Subtle Vignette Overlay to blend map edges into the background */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(5,5,7,1)] pointer-events-none" />
      </div>

      {/* Stark Editorial Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
        <div className="bg-[#050507]/90 backdrop-blur-md border border-white/[0.06] p-4 sm:p-5 pointer-events-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
            Coordinates
          </span>
          <span className="text-xs sm:text-sm font-medium text-white block uppercase tracking-wider mb-1">
            CNR Complex, Ananthapura Main Rd
          </span>
          <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-widest">
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
          </span>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-white text-black px-6 py-3 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors flex items-center gap-2 pointer-events-auto shadow-2xl"
          title="Get Directions"
        >
          <Navigation className="w-3.5 h-3.5 fill-current" />
          <span>Intercept</span>
        </a>
      </div>
    </div>
  );
};
