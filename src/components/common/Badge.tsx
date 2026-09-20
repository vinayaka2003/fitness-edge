import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'steel' | 'white' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'steel',
  className = '',
}) => {
  const variants = {
    steel: 'bg-[#1e1e24] text-[#d0d0d8] border border-[#33333d]',
    white: 'bg-white text-black font-semibold',
    dark: 'bg-[#121214] text-[#90909a] border border-[#222228]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] uppercase tracking-widest font-mono rounded ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
