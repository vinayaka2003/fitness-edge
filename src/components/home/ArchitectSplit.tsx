import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../common/Button';

interface ArchitectSplitProps {
  onSeeBlueprint: () => void;
}

export const ArchitectSplit: React.FC<ArchitectSplitProps> = ({ onSeeBlueprint }) => {
  return (
    <section className="relative bg-[#09090b] py-14 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#1b1b22] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Clean Architectural Photo with motion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
            className="lg:col-span-6 relative"
          >
            <div className="overflow-hidden rounded-xl border border-[#22222a] aspect-[4/3] sm:aspect-[4/5] lg:aspect-[4/5] max-h-[460px] sm:max-h-[500px] lg:max-h-[540px] shadow-2xl relative w-full">
              <img
                src="/home/home.webp"
                alt="Fitness Edge Prime Training Environment"
                className="w-full h-full object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as any }}
            className="lg:col-span-6 flex flex-col items-start justify-center pl-0 lg:pl-10"
          >
              <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#E6192B] via-[#C50212] to-[#A3000F] uppercase mb-4 block drop-shadow-[0_0_12px_rgba(197, 2, 18,0.4)]">
                Your Goals • Our Mission
              </span>
  
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans text-white uppercase mb-8 sm:mb-10 tracking-wide leading-[1.2] sm:whitespace-nowrap">
                <span className="font-light">DON'T</span> <span className="font-bold">WISH</span> <span className="font-light">FOR IT</span><br />
                <span className="font-bold">WORK</span> <span className="font-light">FOR IT</span>
              </h2>
  
              {/* Premium Minimalist Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 w-full mb-10">
                {[
                  "Personal Training & Nutrition",
                  "Free General Training",
                  "CrossFit & Yoga",
                  "Zumba & Mat Pilates",
                  "Free Generalised Diet",
                  "Body Transformation",
                  "Functional & Sports Fitness",
                  "Group Classes",
                  "90 Days Transformation",
                  "Injury Recovery Program",
                  "Membership Freezing & Transfer"
                ].map((item, i) => (
                  <div
                    key={i} 
                    className="flex items-center gap-3 text-xs sm:text-sm font-sans font-medium tracking-wide text-neutral-200 cursor-default border-b border-white/[0.08] pb-3"
                  >
                    <span className="w-1.5 h-1.5 bg-[#C50212] rounded-sm opacity-80" />
                    {item}
                  </div>
                ))}
              </div>
  
              <div className="w-full sm:w-auto">
                <Button
                  id="architect-split-btn"
                  variant="outline"
                  size="lg"
                  onClick={onSeeBlueprint}
                  className="w-full sm:w-auto px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase border-white/20 text-white hover:bg-white/5 rounded-none"
                >
                  Know About Us
                </Button>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};
