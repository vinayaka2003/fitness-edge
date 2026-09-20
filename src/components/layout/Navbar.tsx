"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onOpenConsult: (type?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsult,
}) => {
  const pathname = usePathname();
  
  // Safely parse active page segment regardless of trailing slashes or subpaths
  const activePage = React.useMemo(() => {
    if (!pathname || pathname === '/') return 'home';
    const cleanPath = pathname.split('?')[0].split('#')[0];
    const segment = cleanPath.split('/')[1];
    return segment || 'home';
  }, [pathname]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 15);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'membership', label: 'Membership' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        layoutRoot
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-[#08080a] border-b border-white/[0.08]'
            : isScrolled
            ? 'bg-[#08080a]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-md shadow-black/50'
            : 'bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/30 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[90rem] mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* 1. Left: Pure Clean Brand Logo */}
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none select-none shrink-0"
            aria-label="Fitness Edge Prime Home"
          >
            <img
              src="/logo.png"
              alt="Fitness Edge Prime Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-sans font-extrabold tracking-wider text-lg sm:text-xl uppercase leading-none whitespace-nowrap">
              <span className="text-[#C50212]">FITNESS</span> <span className="text-white">EDGE</span>
            </span>
          </Link>

          {/* 2. Center: Ultra-Clean Spaced Text Links */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.id === 'home' ? '/' : `/${link.id}`}
                  onClick={handleNavClick}
                  data-active={isActive}
                  className={`relative py-1.5 text-[13px] xl:text-sm font-sans font-medium tracking-wide transition-colors duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-line"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C50212] rounded-full shadow-[0_0_10px_rgba(197,2,18,0.9)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Sleek Solid Red CTA Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={() => onOpenConsult('membership-signup')}
              className="px-5 py-2.5 text-xs font-sans font-bold uppercase tracking-wider bg-[#C50212] hover:bg-[#A3000F] text-white rounded-lg transition-colors duration-200 shadow-md cursor-pointer active:scale-95"
            >
              Join Now
            </button>
          </div>

          {/* Animated Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <motion.line 
                x1="4" y1="6" x2="20" y2="6" 
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} 
                transition={{ duration: 0.25 }} 
                style={{ originX: "50%", originY: "50%" }}
              />
              <motion.line 
                x1="4" y1="12" x2="20" y2="12" 
                initial={false}
                animate={mobileMenuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} 
                transition={{ duration: 0.25 }} 
              />
              <motion.line 
                x1="4" y1="18" x2="20" y2="18" 
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} 
                transition={{ duration: 0.25 }} 
                style={{ originX: "50%", originY: "50%" }}
              />
            </svg>
          </button>
        </div>

        {/* Sleek Scroll Progress Bar Underline */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent overflow-hidden pointer-events-none">
            <motion.div
              className="h-full w-full bg-[#C50212]"
              style={{ scaleX, transformOrigin: "0% 50%" }}
            />
          </div>
        )}
      </motion.header>

      {/* Premium Minimalist Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[#08080a]/98 backdrop-blur-2xl z-40 px-6 flex flex-col overflow-y-auto lg:hidden border-t border-white/[0.08]"
          >
            <div className="space-y-1 mt-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 px-3 block mb-4">
                Menu
              </span>
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.id === 'home' ? '/' : `/${link.id}`}
                    onClick={handleNavClick}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-base font-sans font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-white bg-white/[0.06]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-[#C50212] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-8 pb-10 space-y-4 shrink-0">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsult('membership-signup');
                }}
                className="w-full py-3.5 rounded-lg bg-[#C50212] hover:bg-[#A3000F] text-white font-sans text-sm uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                Join Now
              </button>

              <p className="text-center text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                Fitness Edge Prime • Yelahanka
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
