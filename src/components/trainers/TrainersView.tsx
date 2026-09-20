import React, { useState } from 'react';
import { motion } from 'motion/react';
import { trainersData } from '../../data/trainers';
import { Instagram, Phone, ChevronDown } from 'lucide-react';
import { SvglWhatsApp } from '../common/SvglIcons';

export const TrainersView: React.FC = () => {
  // State to track which trainer card is expanded on mobile
  const [expandedTrainer, setExpandedTrainer] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTrainer(expandedTrainer === id ? null : id);
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
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 bg-[#050507] min-h-screen text-white relative font-sans overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Massive Editorial Hero */}
        <motion.div 
          className="mb-20 md:mb-32 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-8 pl-1">
            THE COACHING TEAM
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] uppercase text-white"
          >
            MEET THE TEAM <span style={{ color: '#C50212' }}>.</span>
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {trainersData.map((trainer) => {
            const isExpanded = expandedTrainer === trainer.id;
            
            return (
              <div
                key={trainer.id}
                className="bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group shadow-lg"
              >
                {/* Image Header */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                      {trainer.name}
                    </h3>
                    <p className="text-sm font-medium text-neutral-400 mt-1">
                      {trainer.role}
                    </p>
                  </div>
                </div>

                {/* Collapsible Content Area */}
                <div className={`p-6 sm:p-8 flex-1 flex flex-col ${!isExpanded ? 'hidden sm:flex' : 'flex'}`}>
                  
                  {/* Clean Minimal Bio */}
                  <p className="text-sm text-neutral-300 font-sans leading-relaxed mb-6">
                    {trainer.bio}
                  </p>

                  {/* Specialties - Clean Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {trainer.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium tracking-wide bg-white/[0.05] text-neutral-400 px-3 py-1.5 rounded-full border border-white/[0.05]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    {/* Socials & Contact */}
                    <div className="flex items-center gap-6 mb-6">
                      {trainer.instagram && (
                        <a href={`https://instagram.com/${trainer.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                          <Instagram size={18} />
                        </a>
                      )}
                      {trainer.whatsapp && (
                        <a href={`tel:+${trainer.whatsapp}`} className="text-neutral-400 hover:text-white transition-colors">
                          <Phone size={18} />
                        </a>
                      )}
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                      href={`https://wa.me/${trainer.whatsapp}?text=Hi%20Fitness%20Edge!%20I%20would%20like%20to%20book%20a%20personal%20training%20session%20with%20${encodeURIComponent(trainer.name)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-neutral-200 rounded-xl px-4 py-3.5 text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95"
                    >
                      <SvglWhatsApp size={16} />
                      Book via WhatsApp
                    </a>
                  </div>
                </div>

                {/* Mobile Expand Toggle */}
                <div 
                  className="sm:hidden p-4 border-t border-white/[0.05] flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 cursor-pointer hover:bg-white/[0.02]"
                  onClick={() => toggleExpand(trainer.id)}
                >
                  {isExpanded ? 'Show Less' : 'View Profile'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
