import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none touch-manipulation';

  const variantStyles = {
    // Matches the solid crisp off-white button from the reference design
    primary:
      'bg-[#e2e2e0] text-[#0d0d0f] hover:bg-white active:bg-[#c9c9c7] shadow-sm font-semibold',
    secondary:
      'bg-[#1a1a1c] text-[#ededef] hover:bg-[#262629] border border-[#2e2e33] active:bg-[#151517]',
    outline:
      'border border-[#505058] text-[#e0e0e3] hover:border-white hover:text-white bg-transparent active:bg-white/5',
    ghost:
      'text-[#b0b0b6] hover:text-white hover:bg-white/5 active:bg-white/10',
  };

  const sizeStyles = {
    sm: 'text-xs min-h-[44px] sm:min-h-[38px] px-4 py-2.5 sm:py-2 gap-1.5 rounded-lg',
    md: 'text-xs sm:text-sm min-h-[44px] px-5 sm:px-6 py-3 gap-2 rounded-lg',
    lg: 'text-xs sm:text-sm md:text-base min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 gap-2.5 rounded-lg',
  };

  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props as any}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </motion.button>
  );
};
