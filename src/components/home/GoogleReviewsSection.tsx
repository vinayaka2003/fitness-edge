import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ExternalLink, MapPin, Copy, Check } from 'lucide-react';
import { GoogleReviewQrCard } from './GoogleReviewQrCard';
import { SvglGoogleG } from '../common/SvglIcons';
import { gymData } from '../../data/gym';

export const GoogleReviewsSection: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const reviewUrl = gymData.coordinates.mapsSearchUrl;

  const ratingBars = [
    { stars: 5, percentage: 98, label: '98%' },
    { stars: 4, percentage: 1.5, label: '1.5%' },
    { stars: 3, percentage: 0.5, label: '0.5%' },
    { stars: 2, percentage: 0, label: '0%' },
    { stars: 1, percentage: 0, label: '0%' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="bg-[#08080a] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto">
        {/* Minimalist Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C50212] font-semibold block">
            VERIFIED GOOGLE FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-tight">
            Rated 5.0 on Google
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light">
            Based on 280+ authentic member reviews in Yelahanka, Bengaluru.
          </p>
        </div>

        {/* Minimalist 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Google Rating Breakdown Widget (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Rating Breakdown Card (Matching Reference Design) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0e13] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                {/* Left Column: Big Score & Stars */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pr-8 sm:border-r border-white/10 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
                      5.0
                    </span>
                    <Star className="w-8 h-8 fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                  </div>

                  <div className="flex items-center gap-1.5 text-[#FFD700] my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase mt-1">
                    280+ REVIEWS ON GOOGLE
                  </span>
                </div>

                {/* Right Column: 5 to 1 Rating Progress Bars */}
                <div className="w-full space-y-2">
                  {ratingBars.map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-3 text-neutral-400 font-bold text-right">{bar.stars}</span>
                      <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/[0.06]">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFD700] to-[#E5A900] rounded-full transition-all duration-1000"
                          style={{ width: `${bar.percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-neutral-400 text-right font-medium">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Category Rating Pills */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-2.5">
                {[
                  { name: 'Cleanliness', score: '5.0 ★' },
                  { name: 'Coaching', score: '5.0 ★' },
                  { name: 'Equipment', score: '5.0 ★' },
                  { name: 'Atmosphere', score: '5.0 ★' },
                ].map((cat) => (
                  <span
                    key={cat.name}
                    className="px-3.5 py-1.5 rounded-full text-xs font-sans font-medium text-neutral-200 bg-white/[0.04] border border-white/10 flex items-center gap-2"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[#FFD700] font-bold text-[11px]">{cat.score}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Location Bar & Write Review CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2 text-xs font-sans text-neutral-400 bg-white/[0.02] border border-white/[0.06] px-4 py-3 rounded-xl flex-1">
                <MapPin className="w-4 h-4 text-[#C50212] shrink-0" />
                <span className="truncate">44, CNR Complex, Ananthapura Main Rd, Yelahanka</span>
              </div>

              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-sans font-bold tracking-wider uppercase transition-colors shadow-lg active:scale-95 shrink-0"
              >
                <SvglGoogleG size={18} />
                <span>Write a Review</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Google Review QR Stand (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <GoogleReviewQrCard />
          </div>
        </div>
      </div>
    </section>
  );
};
