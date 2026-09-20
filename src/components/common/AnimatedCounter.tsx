import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'motion/react';

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatCommas?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  formatCommas = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<string>(
    prefix + (formatCommas ? from.toLocaleString() : from.toFixed(decimals)) + suffix
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo curve for realistic fast acceleration and smooth deceleration
      onUpdate: (latest) => {
        let formatted = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
        if (formatCommas) {
          const parts = formatted.split('.');
          parts[0] = parseInt(parts[0], 10).toLocaleString('en-US');
          formatted = parts.join('.');
        }
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration, decimals, prefix, suffix, formatCommas]);

  return (
    <span ref={ref} className={`font-number tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
};
