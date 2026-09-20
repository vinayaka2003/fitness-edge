import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  id,
}) => {
  const alignment =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div
      id={id}
      className={`flex flex-col ${alignment} max-w-3xl mx-auto mb-12 sm:mb-16 ${className}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
          className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3 inline-block"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] as any }}
        className="text-2xl sm:text-3xl md:text-5xl font-serif text-white uppercase tracking-tight leading-[1.12]"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as any }}
          className="mt-4 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
