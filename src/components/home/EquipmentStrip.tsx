import React from 'react';
import { featuredStripImages } from '../../data/gallery';
import { ArrowUpRight } from 'lucide-react';
import { GalleryItem } from '../../types';
import { LazyBlurImage } from '../common/LazyBlurImage';
import { Card3D } from '../common/Card3D';

interface EquipmentStripProps {
  onViewAllEquipment: () => void;
}

interface StripItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  alt: string;
}

const EquipmentStripCard: React.FC<{
  item: StripItem;
  idx: number;
  onClick: () => void;
}> = ({ item, idx, onClick }) => {
  return (
    <Card3D
      onClick={onClick}
      intensity={8}
      scaleOnHover={1.015}
      glow={true}
      glowColor="rgba(255, 255, 255, 0.12)"
      className="h-[300px] sm:h-[380px] lg:h-[440px] border-b sm:border-b-0 sm:border-r border-white/[0.06] last:border-b-0 sm:last:border-r-0"
    >
      <div className="relative w-full h-full overflow-hidden bg-[#0c0c0f] select-none group">
        {/* Background Equipment Photo */}
        <LazyBlurImage
          src={item.imageUrl}
          alt={item.alt}
          containerClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover object-center filter grayscale-[20%] contrast-[110%] brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700 ease-out"
        />

        {/* Subtle Atmospheric Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent group-hover:via-[#08080a]/20 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 flex flex-col justify-end z-20">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-1.5 block">
            Zone 0{idx + 1}
          </span>
          <h3 className="text-lg sm:text-xl font-serif text-white uppercase tracking-wide group-hover:text-neutral-200 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 font-sans line-clamp-2 leading-relaxed">
            {item.subtitle}
          </p>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/[0.08] text-neutral-400 group-hover:text-white transition-colors">
            <span className="text-[11px] font-mono uppercase tracking-wider">
              Explore Zone
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Card3D>
  );
};

export const EquipmentStrip: React.FC<EquipmentStripProps> = ({ onViewAllEquipment }) => {
  return (
    <section className="relative bg-[#09090c] border-b border-white/[0.06] overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-white/[0.06]">
        {featuredStripImages.map((item, idx) => (
          <EquipmentStripCard
            key={item.id}
            item={item}
            idx={idx}
            onClick={onViewAllEquipment}
          />
        ))}
      </div>
    </section>
  );
};
