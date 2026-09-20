import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../common/Button';
import { ChevronDown, ChevronLeft, ChevronRight, Dumbbell, ShieldCheck, Users, Activity, Trophy, Award, Mic } from 'lucide-react';
import { gymData } from '../../data/gym';

interface AboutViewProps {
  onOpenConsult: () => void;
  onNavigate: (page: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenConsult, onNavigate }) => {
  const [activePillar, setActivePillar] = useState<number | null>(0);

  const pillars = [
    {
      num: '01',
      title: 'MODERN ARSENAL',
      desc: 'Spread across two massive floors, our facility is equipped with a vast range of brand-new, top-tier machinery—from VYSATI functional trainers to dedicated CrossFit zones and custom Captain America free weights.',
    },
    {
      num: '02',
      title: 'IMMACULATE HYGIENE',
      desc: 'We believe a great workout requires a fresh environment. Every corner of our gym, including the washrooms, is maintained to the highest standards of cleanliness, ensuring a comfortable, sweat-smell-free experience.',
    },
    {
      num: '03',
      title: 'EXPERT GUIDANCE',
      desc: 'Our trainers aren\'t just staff; they are mentors and National Champions. We prioritize proper technique, injury prevention, and providing a highly motivating, ego-free atmosphere for beginners and pros alike.',
    },
    {
      num: '04',
      title: 'HOLISTIC WELLNESS',
      desc: 'Fitness goes beyond the weights. We offer diverse programs including Zumba and Yoga, and a dedicated steam room for post-workout recovery.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 bg-[#050507] min-h-screen text-white font-sans overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive Typographic Hero */}
        <motion.div 
          className="mb-16 md:mb-[90px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 mb-6">
            FITNESS EDGE PRIME STORY
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.9] uppercase text-white"
          >
            WHO WE ARE <span className="text-[#C50212]">.</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed tracking-wide"
          >
            Built as Yelahanka’s premier fitness destination, combining world-class infrastructure with an ego-free community where every athlete thrives.
          </motion.p>
        </motion.div>

        {/* Story & Image Split - Minimalist Aesthetic Philosophy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as any }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-[100px] relative"
        >
          {/* Left: Image Card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img
              src="/about/about.webp"
              alt="Gym Interior"
              className="w-full h-auto block rounded-2xl"
            />
          </div>

          {/* Right: Content & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug text-white">
              An Elite Training Environment.
            </h2>

            <p className="text-neutral-400 font-light leading-relaxed text-sm sm:text-base">
              Fitness Edge Prime was forged to be more than just a place to sweat. Spread across two massive, impeccably maintained floors, we believe in providing the absolute best—from pristine hygiene and top-notch equipment to guidance from National Champion trainers.
            </p>

            {/* 4 Feature Icons Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 pt-6 border-t border-white/[0.08]">
              <div className="sm:border-r sm:border-white/[0.08] sm:pr-4 flex flex-col items-center sm:items-start text-center sm:text-left group">
                <Dumbbell className="w-5 h-5 text-[#C50212] mb-2.5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                <div className="text-[10px] font-mono tracking-wider text-neutral-400 font-medium uppercase leading-tight">
                  PREMIUM<br />EQUIPMENT
                </div>
              </div>

              <div className="sm:border-r sm:border-white/[0.08] sm:px-4 flex flex-col items-center sm:items-start text-center sm:text-left group">
                <ShieldCheck className="w-5 h-5 text-[#C50212] mb-2.5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                <div className="text-[10px] font-mono tracking-wider text-neutral-400 font-medium uppercase leading-tight">
                  PRISTINE<br />HYGIENE
                </div>
              </div>

              <div className="sm:border-r sm:border-white/[0.08] sm:px-4 flex flex-col items-center sm:items-start text-center sm:text-left group">
                <Users className="w-5 h-5 text-[#C50212] mb-2.5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                <div className="text-[10px] font-mono tracking-wider text-neutral-400 font-medium uppercase leading-tight">
                  EXPERT<br />TRAINERS
                </div>
              </div>

              <div className="sm:pl-4 flex flex-col items-center sm:items-start text-center sm:text-left group">
                <Activity className="w-5 h-5 text-[#C50212] mb-2.5 group-hover:scale-110 transition-transform" strokeWidth={1.75} />
                <div className="text-[10px] font-mono tracking-wider text-neutral-400 font-medium uppercase leading-tight">
                  REAL<br />RESULTS
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pillars / Principles */}
        <motion.div 
          className="mb-16 md:mb-[100px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
        >
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            CORE PRINCIPLES
          </div>
          
          <div className="border-t border-white/[0.08]">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="border-b border-white/[0.08]">
                <button
                  onClick={() => setActivePillar(activePillar === idx ? null : idx)}
                  className="w-full py-7 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span className="text-xs sm:text-sm font-mono text-neutral-500 w-6 font-semibold">
                      {pillar.num}
                    </span>
                    <span className="text-lg sm:text-2xl font-medium tracking-wide group-hover:text-[#C50212] transition-colors">
                      {pillar.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-neutral-500 transition-transform duration-300 ${
                      activePillar === idx ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {activePillar === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-14 sm:pl-24 text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
                        {pillar.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Founder Spotlight Banner - Identical to Reference Image 1 */}
        {gymData.founder && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-[100px] rounded-2xl md:rounded-3xl bg-[#0b0b0c] border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              
              {/* Left Column: Image Banner & Signature */}
              <div className="relative w-full lg:w-[35%] min-h-[360px] lg:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 overflow-hidden shrink-0 bg-neutral-950">
                {/* Background Image */}
                <img
                  src="/about/siddhu_yadav.webp"
                  alt="Siddhu Yadav"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/40 lg:to-black/80" />

                {/* Bottom Left Signature & Founder Title */}
                <div className="relative z-10 pt-10">
                  <div className="text-2xl sm:text-3xl font-serif italic text-[#D4AF37] tracking-wider font-normal drop-shadow-lg">
                    Siddhu Yadav
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase mt-0.5 font-semibold">
                    FOUNDER
                  </div>
                </div>
              </div>

              {/* Right Column: Main Info & Achievement Cards */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden bg-black/40">
                <div className="relative z-10 space-y-5">
                  {/* Top section with Header */}
                  <div className="space-y-3 max-w-2xl">
                    {/* Red dot indicator + Tagline */}
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#C50212] animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C50212] font-bold">
                        LEADERSHIP & FOUNDER
                      </span>
                    </div>

                    {/* Main Name with Gold Highlight */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase font-sans">
                      SIDDHU <span className="text-[#D4AF37]">YADAV</span>
                    </h3>

                    {/* Role & Handle Subtitle */}
                    <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest leading-relaxed">
                      PROPRIETOR @FITNESSEDGE.VPR & PRESIDENT @SKBFA_OFFICIAL
                    </p>

                    {/* Bio Paragraph */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light pt-1">
                      Information Science Engineer turned Fitness Entrepreneur and President of SKBFA (Karnataka Bodybuilding Federation). Certified Personal Trainer and Prep Coach passionate about myth-busting, functional fitness, and organizing state & national bodybuilding expos.
                    </p>
                  </div>

                  {/* Bottom Achievement Cards Grid */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] shrink-0 mt-0.5">
                        <Trophy className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">STATE LEADERSHIP</span>
                        <span className="text-xs font-semibold text-white leading-snug block">President, SKBFA (Karnataka Bodybuilding)</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] shrink-0 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">MAJOR EVENT HOST</span>
                        <span className="text-xs font-semibold text-white leading-snug block">Extreme Pro (₹1 Cr) & Recharge Classic</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 transition-all flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] shrink-0 mt-0.5">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">PODCAST HOST</span>
                        <span className="text-xs font-semibold text-[#D4AF37] leading-snug block">Fitness Secrets With Siddhu</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Multi-Branch Network Grid - Identical to Reference Image 2 */}
        {gymData.branches && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-[100px] space-y-8"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 block mb-2 font-medium">
                  NORTH BENGALURU NETWORK
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight font-sans">
                  OUR 4 <span className="text-[#D4AF37]">LOCATIONS</span>
                </h3>
              </div>

              <div className="flex items-center gap-6 self-start md:self-auto">
                <span className="font-serif italic text-neutral-400 text-base sm:text-lg lg:text-xl font-light">
                  Same Standards, Close To You.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const container = document.getElementById('locations-carousel');
                      if (container) container.scrollBy({ left: -320, behavior: 'smooth' });
                    }}
                    className="w-9 h-9 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#D4AF37]/60 transition-all cursor-pointer"
                    aria-label="Previous Location"
                  >
                    <ChevronLeft className="w-4 h-4 text-neutral-300" />
                  </button>
                  <button
                    onClick={() => {
                      const container = document.getElementById('locations-carousel');
                      if (container) container.scrollBy({ left: 320, behavior: 'smooth' });
                    }}
                    className="w-9 h-9 rounded-full border border-white/20 bg-black/40 text-white flex items-center justify-center hover:bg-white/10 hover:border-[#D4AF37]/60 transition-all cursor-pointer"
                    aria-label="Next Location"
                  >
                    <ChevronRight className="w-4 h-4 text-neutral-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Cards Grid / Carousel */}
            <div 
              id="locations-carousel"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
            >
              {gymData.branches.map((b, idx) => (
                <div 
                  key={idx} 
                  onClick={onOpenConsult}
                  className="rounded-2xl bg-[#09090b] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group cursor-pointer"
                >
                  {/* Branch Image Preview */}
                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={b.image || `/facilities/${(idx % 4) + 1}.webp`}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/20" />

                    {/* Gold Branch Badge Overlay */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded bg-[#09090b]/85 border border-[#D4AF37]/40 backdrop-blur-md text-[9px] font-mono tracking-widest text-[#D4AF37] font-semibold uppercase shadow-md">
                        BRANCH 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                        {b.name}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {b.address}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-start gap-1.5 text-[11px] font-mono text-[#D4AF37] font-medium leading-snug">
                      <span className="text-[#D4AF37] mt-0.5 shrink-0 text-xs">★</span>
                      <span>{b.highlight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stark CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
          className="flex flex-col items-center text-center py-[50px] border-t border-white/[0.08]"
        >
          <h3 className="text-2xl sm:text-4xl font-medium tracking-tight mb-8 uppercase font-sans">
            EXPERIENCE THE STANDARD
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenConsult}
              className="w-full sm:w-auto text-xs font-mono uppercase tracking-widest bg-white text-black hover:bg-neutral-200"
            >
              Book A Free Session
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('facilities')}
              className="w-full sm:w-auto text-xs font-mono uppercase tracking-widest"
            >
              Explore Facilities
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
