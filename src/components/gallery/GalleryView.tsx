import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { galleryData } from '../../data/gallery';
import { LazyBlurImage } from '../common/LazyBlurImage';

export const GalleryView: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchDistanceRef = useRef<number | null>(null);

  const activeItem = selectedIndex !== null ? galleryData[selectedIndex] : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryData.length : 0));
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryData.length) % galleryData.length : 0));
      setZoomScale(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [selectedIndex]);

  const updateZoom = useCallback((newScale: number) => {
    const clamped = Math.min(Math.max(newScale, 1), 4);
    setZoomScale(clamped);
    if (clamped === 1) {
      setPanPosition({ x: 0, y: 0 });
    }
  }, []);

  const handleZoomIn = () => updateZoom(zoomScale + 0.5);
  const handleZoomOut = () => updateZoom(zoomScale - 0.5);
  const handleResetZoom = () => updateZoom(1);

  const toggleDoubleTapZoom = () => {
    if (zoomScale > 1) {
      updateZoom(1);
    } else {
      updateZoom(2.5);
    }
  };

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === '+' || e.key === '=') updateZoom(zoomScale + 0.5);
      if (e.key === '-' || e.key === '_') updateZoom(zoomScale - 0.5);
      if (e.key === '0') updateZoom(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, zoomScale, handleClose, handleNext, handlePrev, updateZoom]);

  // Lock body scroll when modal active
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  // Non-passive wheel zoom listener
  useEffect(() => {
    const el = containerRef.current;
    if (!el || selectedIndex === null) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoomScale((prev) => {
        const next = Math.min(Math.max(prev + delta, 1), 4);
        if (next === 1) setPanPosition({ x: 0, y: 0 });
        return next;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [selectedIndex]);

  // Mouse / Pointer drag handlers for panning
  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...panPosition };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    // Dynamic max pan bounds proportional to zoom scale
    const maxPanX = (zoomScale - 1) * 350;
    const maxPanY = (zoomScale - 1) * 250;

    const newX = Math.min(Math.max(panStartRef.current.x + dx, -maxPanX), maxPanX);
    const newY = Math.min(Math.max(panStartRef.current.y + dy, -maxPanY), maxPanY);

    setPanPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore capture release errors
      }
    }
  };

  // Touch Pinch Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = currentDist / touchDistanceRef.current;
      setZoomScale((prev) => {
        const next = Math.min(Math.max(prev * factor, 1), 4);
        if (next === 1) setPanPosition({ x: 0, y: 0 });
        return next;
      });
      touchDistanceRef.current = currentDist;
    }
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 bg-[#050507] min-h-screen text-white font-sans overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Massive Typographic Hero */}
        <motion.div 
          className="mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-8">
            INSIDE FITNESS EDGE PRIME
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] uppercase text-white"
          >
            SEE THE SPACE <span style={{ color: '#C50212' }}>.</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-12 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed tracking-wide"
          >
            A high-contrast visual archive of calibrated steel, chalk dust, and raw physical exertion captured across training cycles. Click any photo to inspect details in full-screen zoom mode.
          </motion.p>
        </motion.div>

        {/* Ultra-Minimalist Architectural Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {galleryData.map((item, idx) => (
            <motion.div
              key={item.id}
              onClick={() => {
                setSelectedIndex(idx);
                setZoomScale(1);
                setPanPosition({ x: 0, y: 0 });
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
              className="group rounded-2xl border border-white/10 bg-[#09090b] overflow-hidden relative aspect-[4/3] shadow-2xl hover:border-white/25 transition-all duration-700 cursor-pointer"
            >
              {/* Full Bleed Image with Smooth Grayscale to Color Reveal */}
              <LazyBlurImage
                src={item.imageUrl}
                alt={item.title}
                containerClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover"
              />

              {/* Multi-stage Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none" />

              {/* Card Top & Bottom Overlay Elements */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none z-10">
                {/* Top Corner Badge & Subtle Arrow Icon */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/80 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-medium shadow-sm">
                    0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Bottom Content Container */}
                <div className="space-y-1.5 transition-all duration-500 ease-out">
                  <h3 className="text-lg sm:text-xl font-serif text-white uppercase tracking-tight leading-snug drop-shadow-md group-hover:text-neutral-100 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <div className="lg:opacity-0 lg:max-h-0 opacity-100 max-h-32 group-hover:opacity-100 group-hover:max-h-32 transition-all duration-500 ease-out overflow-hidden">
                    <p className="text-xs text-neutral-300 font-sans font-light leading-relaxed pt-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 pt-12 border-t border-white/[0.06] text-center"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            End of Archive
          </span>
        </motion.div>
      </div>

      {/* FULL SCREEN LIGHTBOX MODAL WITH SIMPLE & CLEAN ZOOM */}
      <AnimatePresence>
        {activeItem !== null && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none"
            onClick={handleClose}
          >
            {/* Top Bar: Counter, Title, Zoom Controls & Prominent Into Mark (X) Close Button */}
            <div 
              className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-md z-40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Image Counter & Title */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-300 tracking-widest uppercase bg-white/10 border border-white/15 px-3 py-1 rounded-full font-semibold">
                  0{selectedIndex + 1} / 0{galleryData.length}
                </span>
                <span className="hidden sm:inline-block text-neutral-600">•</span>
                <span className="hidden sm:inline-block text-sm sm:text-base font-sans font-medium text-white truncate max-w-xs sm:max-w-md">
                  {activeItem.title}
                </span>
              </div>

              {/* Right: Zoom Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center bg-white/10 border border-white/15 rounded-xl p-1 gap-1">
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomScale >= 4}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/20 text-white disabled:opacity-30 transition-all cursor-pointer active:scale-95"
                    title="Zoom In (+)"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={handleZoomOut}
                    disabled={zoomScale <= 1}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/20 text-white disabled:opacity-30 transition-all cursor-pointer active:scale-95"
                    title="Zoom Out (-)"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    onClick={handleResetZoom}
                    disabled={zoomScale === 1 && panPosition.x === 0 && panPosition.y === 0}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/20 text-white disabled:opacity-30 transition-all cursor-pointer active:scale-95"
                    title="Reset Zoom (0)"
                    aria-label="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <span className="text-xs font-mono px-2 text-neutral-300 min-w-[44px] text-center font-medium">
                    {Math.round(zoomScale * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Canvas Area: Pure Interactive Image Display */}
            <div 
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden touch-none ${
                zoomScale > 1
                  ? isDragging
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
            >
              {/* Prev Navigation Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 border border-white/25 hover:border-white text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-90"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </button>

              {/* Next Navigation Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/70 border border-white/25 hover:border-white text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-90"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </button>

              {/* Photo Display with Red Into Mark (X) directly ON the Photo */}
              <motion.div
                key={activeItem.id}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={toggleDoubleTapZoom}
                animate={{
                  scale: zoomScale,
                  x: panPosition.x,
                  y: panPosition.y,
                }}
                transition={
                  isDragging
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 300, damping: 28 }
                }
                className="max-w-full max-h-[88vh] sm:max-h-[92vh] flex items-center justify-center relative select-none will-change-transform"
              >
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  draggable={false}
                  className="max-w-full max-h-[88vh] sm:max-h-[92vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10 pointer-events-none select-none"
                />

                {/* RED INTO MARK (X) BUTTON ON TOP RIGHT OF THE PHOTO */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C50212] hover:bg-[#E50914] text-white flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-2xl shadow-black/90 border-2 border-white z-40 hover:scale-110"
                  title="Close Photo (Esc)"
                  aria-label="Close Photo"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
