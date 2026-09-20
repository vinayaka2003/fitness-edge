"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { SmoothScroller } from '../layout/SmoothScroller';
import { InstagramReminder } from '../common/InstagramReminder';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const whatsappNumber = '918660036397';

  const handleOpenConsult = (type: string = 'consult') => {
    let msg = 'Hi Fitness Edge Prime, I would like to inquire about membership and facility access.';
    if (type === 'facility-tour') msg = 'Hi Fitness Edge Prime, I would like to book a free session.';
    else if (type === 'membership-signup') msg = 'Hi Fitness Edge Prime, I am interested in joining and would like to sign up for a membership.';
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const pathname = usePathname();

  return (
    <>
      <SmoothScroller />
      <Navbar onOpenConsult={() => handleOpenConsult('consult')} />
      
      <AnimatePresence initial={false} mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-1 relative will-change-[opacity]"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer onOpenConsult={() => handleOpenConsult('consult')} />
      <WhatsAppButton />
      <InstagramReminder />
    </>
  );
}
