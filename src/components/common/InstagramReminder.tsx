import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { SvglInstagramSolid } from './SvglIcons';

export const InstagramReminder: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the popup has already been shown in this tab session
    const hasSeenPopup = sessionStorage.getItem('instagramReminderShown');
    
    if (!hasSeenPopup) {
      // PRODUCTION MODE: Show popup after 12 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Mark as seen for this session so it won't show on refresh
        sessionStorage.setItem('instagramReminderShown', 'true');
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleFollow = () => {
    setIsVisible(false);
    window.open('https://www.instagram.com/fitnessedge.vpr/', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#050507]/80 backdrop-blur-xl"
            onClick={handleDismiss}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-[360px] overflow-hidden rounded-3xl bg-[#0a0a0c]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center text-center p-8"
          >
            {/* Background Atmosphere */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[#E6192B] to-[#A3000F] rounded-full blur-[80px] opacity-[0.15] pointer-events-none" />

            {/* Aesthetic Frosted Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/5 text-white/60 hover:text-white rounded-full transition-all duration-300 focus:outline-none shadow-sm z-10"
              aria-label="Close"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
            
            {/* iOS-Style Notification Avatar */}
            <div className="relative mb-6 mt-4 z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E6192B] to-[#A3000F] blur-[25px] opacity-30 rounded-full" />
              
              {/* Gym Logo */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img src="/logo.png" alt="Fitness Edge Prime" className="w-full h-full object-cover" />
              </div>
              
              {/* Instagram Badge */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#E6192B] to-[#A3000F] rounded-full border-[3px] border-[#0a0a0c] shadow-lg">
                <SvglInstagramSolid size={14} color="white" />
              </div>
            </div>
            
            {/* Typography */}
            <h3 className="text-xl font-bold text-white tracking-tight mb-2 z-10 relative">
              Welcome
            </h3>
            
            <p className="text-sm text-neutral-400 leading-relaxed mb-8 z-10 relative">
              Follow us on Instagram to get updates.
            </p>
            
            {/* Pure Clean Button (No Arrow) */}
            <button
              onClick={handleFollow}
              className="w-full rounded-2xl bg-gradient-to-r from-[#E6192B] via-[#C50212] to-[#A3000F] text-white px-6 py-4 transition-all duration-300 font-bold text-[15px] tracking-wide shadow-[0_8px_24px_rgba(197, 2, 18,0.25)] hover:shadow-[0_8px_32px_rgba(197, 2, 18,0.4)] focus:outline-none hover:scale-[1.02] active:scale-[0.98] z-10 relative"
            >
              Follow
            </button>
            
            {/* Subtle Dismiss Text */}
            <button
              onClick={handleDismiss}
              className="mt-6 text-xs text-neutral-500 hover:text-white transition-colors font-medium tracking-wide focus:outline-none z-10 relative"
            >
              Maybe later
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
