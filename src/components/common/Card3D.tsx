import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
  glowColor?: string;
  scaleOnHover?: number;
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 10,
  glow = true,
  glowColor = 'rgba(255, 255, 255, 0.08)',
  scaleOnHover = 1.02,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Organic spring physics for ultra-smooth tilting & return
  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };

  // Convert cursor position to subtle 3D rotational degrees
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]),
    springConfig
  );

  // Glare position percentage for dynamic metallic sheen
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['10%', '90%']);

  // Spring for smooth glare fade in/out
  const glareOpacityRaw = useMotionValue(0);
  const glareOpacity = useSpring(glareOpacityRaw, { damping: 20, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    glareOpacityRaw.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacityRaw.set(0);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      onTouchCancel={handleMouseLeave}
      style={{ perspective: 1200, touchAction: 'pan-y' }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as any }}
        className="relative w-full h-full will-change-transform flex flex-col"
      >
        {/* Dynamic metallic sheen reflection */}
        {glow && (
          <motion.div
            style={{
              opacity: glareOpacity,
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(550px circle at ${x} ${y}, ${glowColor}, transparent 65%)`
              ),
            }}
            className="pointer-events-none absolute inset-0 z-30 rounded-2xl mix-blend-overlay will-change-[opacity,background]"
          />
        )}

        {children}
      </motion.div>
    </div>
  );
};
