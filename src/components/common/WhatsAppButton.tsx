import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SvglWhatsApp } from './SvglIcons';
import { ArrowUp } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const whatsappNumber = '918660036397';
  const defaultMessage = 'Hi Fitness Edge Prime, I would like to inquire about membership and facility access.';
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunch = () => {
    const encoded = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-center">
      
      {/* Back to Top Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={scrollToTop}
        className={`w-10 h-10 rounded-full bg-neutral-800 border border-neutral-600 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
        title="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>

      {/* Authentic WhatsApp Button with Expanding Hover */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleLaunch}
        className="h-14 rounded-full bg-[#25D366] hover:bg-[#22bf5b] text-white flex items-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer shadow-[0_8px_24px_rgba(37,211,102,0.4)] group relative overflow-hidden w-14 hover:w-40"
        aria-label="Contact via WhatsApp"
        title="Contact via WhatsApp"
      >
        <div className="absolute inset-0 rounded-full border border-white/40 scale-[1.15] opacity-0 group-hover:opacity-100 group-hover:scale-[1.3] transition-all duration-700 pointer-events-none" />
        
        <div className="flex items-center justify-start w-full pl-3.5 gap-3 whitespace-nowrap">
          <SvglWhatsApp size={28} color="white" className="shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow-md" />
          <span className="font-sans font-semibold text-sm opacity-0 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 tracking-wide">
            Chat with us
          </span>
        </div>
      </motion.button>

    </div>
  );
};
