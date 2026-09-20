import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { facilitiesData } from '../../data/facilities';
import { LazyBlurImage } from '../common/LazyBlurImage';
import { Button } from '../common/Button';

interface FacilitiesViewProps {
  onOpenConsult: () => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ onOpenConsult }) => {
  const partners = [
    'Eleiko',
    'Rogue',
    'Texas Power Bars',
    'Woodway',
    'Concept2',
  ];

  const timelineRef = useRef<HTMLDivElement>(null);

  // Ultra-fluid scroll-linked progress for vertical timeline thread
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 25%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 22,
    restDelta: 0.0001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 bg-[#050507] min-h-screen text-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Typographic Hero */}
        <motion.div 
          className="mb-24 md:mb-36 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-6">
            THE TRAINING FLOOR
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] uppercase text-white"
          >
            WHAT WE OFFER <span style={{ color: '#C50212' }}>.</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed tracking-wide"
          >
            Calibrated tolerance, competition platforms, and active contrast recovery designed for high-performance strength execution. No gimmicks, just pure iron architecture.
          </motion.p>
        </motion.div>

        {/* Scroll-Driven Vertical Timeline Section */}
        <div ref={timelineRef} className="relative mb-32 md:mb-48">
          {/* Continuous Thread Line - Desktop (Centered) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-12 w-[2px] bg-white/[0.08] pointer-events-none">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#C50212] via-[#E6192B] to-[#C50212] shadow-[0_0_12px_rgba(197,2,18,0.9)] origin-top"
            />
          </div>

          {/* Continuous Thread Line - Mobile (Left-aligned) */}
          <div className="lg:hidden absolute left-4 sm:left-6 top-4 bottom-12 w-[2px] bg-white/[0.08] pointer-events-none">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#C50212] shadow-[0_0_10px_rgba(197,2,18,0.8)] origin-top"
            />
          </div>

          {/* Facilities Timeline Nodes */}
          <div className="space-y-24 md:space-y-40">
            {facilitiesData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                >
                  {/* Milestone Dot - Desktop Centered */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-10 z-30 items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.4 }}
                      whileInView={{ scale: 1.2, opacity: 1 }}
                      viewport={{ amount: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="w-7 h-7 rounded-full bg-[#09090d] border-2 border-[#C50212] flex items-center justify-center shadow-[0_0_15px_rgba(197,2,18,0.6)]"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C50212]" />
                    </motion.div>
                  </div>

                  {/* Milestone Dot - Mobile Left */}
                  <div className="lg:hidden absolute left-4 sm:left-6 -translate-x-1/2 top-2 z-30 flex items-center justify-center pointer-events-none">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.4 }}
                      whileInView={{ scale: 1.1, opacity: 1 }}
                      viewport={{ amount: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="w-6 h-6 rounded-full bg-[#09090d] border-2 border-[#C50212] flex items-center justify-center shadow-[0_0_12px_rgba(197,2,18,0.6)]"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#C50212]" />
                    </motion.div>
                  </div>

                  {/* DESKTOP ALTERNATING LAYOUT / MOBILE SINGLE COLUMN */}
                  {/* Left Column (Image on Even, Details on Odd) */}
                  <div className={`w-full lg:w-1/2 pl-10 sm:pl-14 lg:pl-0 ${isEven ? 'lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
                    {/* Image Container with Scroll-Reveal & Hover Zoom */}
                    <motion.div
                      initial={{ opacity: 0, y: 35, scale: 0.98 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                      className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0e] shadow-2xl"
                    >
                      <LazyBlurImage
                        src={item.image}
                        alt={item.name}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Zone Number Badge */}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C50212] font-semibold">
                        ZONE 0{idx + 1}
                      </div>

                      {/* Highlight Tag */}
                      <div className="absolute bottom-4 left-4 right-4 z-20 text-xs font-serif italic text-neutral-300 drop-shadow-md">
                        "{item.highlight}"
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column (Details on Even, Image on Odd) */}
                  <div className={`w-full lg:w-1/2 pl-10 sm:pl-14 lg:pl-0 ${isEven ? 'lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as any }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#C50212]" />
                        <span className="text-[11px] font-mono text-[#C50212] uppercase tracking-[0.25em] font-bold">
                          MILESTONE 0{idx + 1}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold tracking-tight uppercase text-white leading-tight">
                        {item.name}
                      </h2>

                      <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                        {item.description}
                      </p>

                      {/* Specs List */}
                      <div className="pt-2 border-t border-white/[0.08] space-y-3">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                          Hardware Specifications
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {item.specs.map((spec, sIdx) => (
                            <div
                              key={sIdx}
                              className="text-xs font-mono text-neutral-300 flex items-center gap-2 tracking-wide"
                            >
                              <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                              <span className="truncate">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



        {/* Stark CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
          className="flex flex-col items-center text-center pb-12"
        >
          <h3 className="text-2xl sm:text-4xl font-medium tracking-tight mb-8 uppercase">
            INSPECT THE FACILITY IN PERSON
          </h3>
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenConsult}
            className="w-full sm:w-auto text-xs font-mono uppercase tracking-widest bg-white text-black hover:bg-neutral-200"
          >
            Book A Free Session
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
