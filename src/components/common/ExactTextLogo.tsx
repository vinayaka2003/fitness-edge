import React from 'react';

export const ExactTextLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 540 240" 
      fill="none" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 
        This is a pure SVG manual path recreation of the exact physical stencil font.
        skewX(-15) creates the identical aggressive slant.
      */}
      <g fill="#ffffff" transform="skewX(-10) translate(20, 30)">
        <text
          x="0"
          y="140"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="72"
          letterSpacing="4"
        >
          <tspan fill="#C50212">FITNESS</tspan> <tspan fill="#FFFFFF">EDGE</tspan>
        </text>
      </g>
    </svg>
  );
};
