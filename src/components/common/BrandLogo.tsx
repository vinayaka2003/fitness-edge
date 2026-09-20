import React from 'react';

export const BrandLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    viewBox="0 0 950 300" 
    fill="none" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#ffffff">
      {/* ABSTRACT POWERLIFTER FIGURE (Geometric, Sharp) */}
      <g transform="translate(30, 10)">
        {/* The Barbell (Aggressive Diagonal) */}
        <polygon points="60,240 280,40 320,80 100,280" />
        
        {/* Left Side Plates (Hex/Angular) */}
        <polygon points="20,210 70,250 40,280 -10,240" />
        <polygon points="-15,230 35,270 5,300 -45,260" />
        
        {/* Abstract Squatting Torso/Arm */}
        <polygon points="260,90 350,170 300,190 210,110" />
        
        {/* Abstract Legs */}
        <polygon points="280,180 340,170 300,280 220,280" />
        
        {/* Abstract Head */}
        <polygon points="290,0 370,0 340,70 260,70" />
      </g>
      
      {/* AGGRESSIVE TYPOGRAPHY */}
      {/* Skewed heavily to match the forward-leaning, aggressive stencil style of the sign */}
      <g transform="translate(420, 0) skewX(-14)">
        <text 
          x="5" 
          y="100" 
          fontFamily="Montserrat, sans-serif" 
          fontWeight="900" 
          fontSize="95" 
          letterSpacing="-3"
        >
          THE
        </text>
        <text 
          x="0" 
          y="275" 
          fontFamily="Montserrat, sans-serif" 
          fontWeight="900" 
          fontSize="230" 
          letterSpacing="-12"
        >
          FITNESS EDGE
        </text>
      </g>
    </g>
  </svg>
);
