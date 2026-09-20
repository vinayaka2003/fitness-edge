import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LazyBlurImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  rootMargin?: string;
  threshold?: number;
  lowResSrc?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const LazyBlurImage: React.FC<LazyBlurImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  rootMargin = '200px',
  threshold = 0.01,
  lowResSrc,
  referrerPolicy = 'no-referrer',
  onClick,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate an ultra-fast low-res blurred thumbnail for Unsplash URLs if not provided
  const placeholderSrc =
    lowResSrc ||
    (src?.includes('images.unsplash.com')
      ? `${src.split('?')[0]}?auto=format&fit=crop&w=40&q=30&blur=30`
      : null);

  // IntersectionObserver to trigger loading when nearing the viewport
  useEffect(() => {
    if (!containerRef.current) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden bg-[#0e0e12] ${containerClassName}`}
    >
      {/* 1. Low-Res Blurred Placeholder & Shimmer Skeleton */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          >
            {placeholderSrc && (
              <img
                src={placeholderSrc}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover filter blur-xl scale-110 opacity-70 transform-gpu"
                referrerPolicy={referrerPolicy}
              />
            )}
            {/* Shimmer pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-[#0d0d10]/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. High-Res Progressive Image with Blur-Up Reveal */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          referrerPolicy={referrerPolicy}
          initial={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? 'blur(0px)' : 'blur(16px)',
            scale: isLoaded ? 1 : 1.04,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as any,
          }}
          className={`w-full h-full transform-gpu ${className}`}
        />
      )}

      {/* 3. Fallback state in case of network failure */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#131317] text-neutral-500 text-xs font-mono">
          [ Asset Unreachable ]
        </div>
      )}

      {/* Overlays, badges, or child elements */}
      {children}
    </div>
  );
};
