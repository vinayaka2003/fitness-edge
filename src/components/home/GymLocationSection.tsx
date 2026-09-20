import React from 'react';
import { motion } from 'motion/react';
import { gymData } from '../../data/gym';
import { GymLocationMap } from '../common/GymLocationMap';
import { Navigation, ExternalLink } from 'lucide-react';

export const GymLocationSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[#181820]">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
            Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-tight">
            Find Us
          </h2>
          <p className="text-sm text-neutral-400 font-sans mt-1">
            44, CNR Complex, Ananthapura Main Rd, Vinayaka Nagar, Yelahanka New Town, Bengaluru 560064
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <a
            href={gymData.coordinates.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 fill-current" />
            <span>Directions</span>
          </a>
          <a
            href={gymData.coordinates.mapsSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16161e] hover:bg-[#20202a] border border-[#262632] text-xs font-mono text-[#a0a0b0] hover:text-white transition-colors"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>

      {/* Pure, Minimalist Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GymLocationMap height="h-[380px] sm:h-[440px]" />
      </motion.div>
    </section>
  );
};
