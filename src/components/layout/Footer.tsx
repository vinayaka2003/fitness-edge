import React from 'react';
import Link from 'next/link';
import {
  Dumbbell,
  User,
  Key,
  Car,
} from 'lucide-react';
import { gymData } from '../../data/gym';
import {
  SvglWhatsApp,
  SvglInstagram,
  SvglYouTube,
  SvglFacebook,
  SvglGmail,
  SvglPhone,
  SvglGoogleMaps,
} from '../common/SvglIcons';

interface FooterProps {
  onOpenConsult?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Membership', href: '/membership' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] text-neutral-300 font-sans pt-10 sm:pt-12 pb-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 2-col on mobile, 3-col on tablet (640px-1279px), 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          
          {/* COLUMN 1: BRAND INFO & SOCIALS (Full width on mobile/tablet top, 1-col on desktop) */}
          <div className="col-span-2 sm:col-span-3 xl:col-span-1 xl:pr-4 2xl:pr-6 xl:border-r border-white/10 pb-6 xl:pb-0 border-b xl:border-b-0 border-white/10">
            <div>
              {/* Logo Header matching Navbar */}
              <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer" aria-label="Fitness Edge Prime Home">
                <img
                  src="/logo.png"
                  alt="Fitness Edge Prime Logo"
                  className="w-10 h-10 sm:w-11 sm:h-11 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                />
                <span className="font-sans font-extrabold tracking-wider text-xl sm:text-2xl xl:text-lg 2xl:text-xl uppercase leading-none whitespace-nowrap">
                  <span className="text-[#C50212]">FITNESS</span> <span className="text-white">EDGE</span>
                </span>
              </Link>

              {/* Social Icons */}
              <div className="flex items-center flex-wrap xl:flex-nowrap gap-2 sm:gap-2.5 2xl:gap-3 mt-5 sm:mt-6">
                <a
                  href="https://www.instagram.com/fitnessedge.vpr/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  aria-label="Instagram"
                >
                  <SvglInstagram size={19} />
                </a>

                <a
                  href="https://youtube.com/@fitnesssecretswithsiddhu"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  aria-label="YouTube"
                >
                  <SvglYouTube size={19} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  aria-label="Facebook"
                >
                  <SvglFacebook size={19} />
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hi%20Fitness%20Edge!"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  aria-label="WhatsApp"
                >
                  <SvglWhatsApp size={19} />
                </a>

                <a
                  href="mailto:info@fitnessedge.in"
                  className="w-9 h-9 sm:w-10 sm:h-10 2xl:w-11 2xl:h-11 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center justify-center transition-transform hover:scale-105 shrink-0"
                  aria-label="Email"
                >
                  <SvglGmail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="col-span-1 sm:border-r border-white/10 sm:pr-4 lg:px-6">
            <h4 className="text-xs font-bold font-sans tracking-[0.2em] text-white uppercase">
              QUICK LINKS
            </h4>
            <div className="w-7 h-[2px] bg-[#E50914] mt-2 mb-4 sm:mb-6" />

            <ul className="space-y-2.5 sm:space-y-3.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm font-light inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: HOURS & ACCESS (Visible on tablet & desktop >= 640px) */}
          <div className="hidden sm:block col-span-1 sm:border-r border-white/10 sm:px-4 lg:px-6">
            <h4 className="text-xs font-bold font-sans tracking-[0.2em] text-white uppercase">
              HOURS & ACCESS
            </h4>
            <div className="w-7 h-[2px] bg-[#E50914] mt-2 mb-4 sm:mb-6" />

            <div className="space-y-4 sm:space-y-5">
              {/* Gym Access Hours */}
              <div className="flex items-start gap-3.5">
                <Dumbbell className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Monday – Saturday</h5>
                  <p className="text-neutral-400 text-xs mt-0.5">5:30 AM – 10:00 PM</p>
                </div>
              </div>

              {/* Sunday Hours */}
              <div className="flex items-start gap-3.5">
                <User className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Sunday Hours</h5>
                  <p className="text-neutral-400 text-xs mt-0.5">9:00 AM – 12:00 PM</p>
                </div>
              </div>

              {/* Member Access */}
              <div className="flex items-start gap-3.5">
                <Key className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Facility Access</h5>
                  <p className="text-neutral-400 text-xs mt-0.5">Full Cardio & Strength Equipment</p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start gap-3.5">
                <Car className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Parking</h5>
                  <p className="text-neutral-400 text-xs mt-0.5">Available on-site</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 4: GET IN TOUCH */}
          <div className="col-span-1 sm:pl-4 lg:pl-6">
            <h4 className="text-xs font-bold font-sans tracking-[0.2em] text-white uppercase">
              GET IN TOUCH
            </h4>
            <div className="w-7 h-[2px] bg-[#E50914] mt-2 mb-4 sm:mb-6" />

            <div className="space-y-4 sm:space-y-5">
              {/* Call Us */}
              <div className="flex items-start gap-3.5">
                <SvglPhone size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Call Us</h5>
                  <a
                    href="tel:+918660036397"
                    className="text-neutral-400 hover:text-white transition-colors text-xs mt-0.5 block"
                  >
                    +91 86600 36397
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <SvglWhatsApp size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">WhatsApp</h5>
                  <a
                    href="https://wa.me/918660036397"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors text-xs mt-0.5 block"
                  >
                    +91 86600 36397
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <SvglGmail size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Email</h5>
                  <a
                    href="mailto:info@fitnessedge.fit"
                    className="text-neutral-400 hover:text-white transition-colors text-xs mt-0.5 block"
                  >
                    info@fitnessedge.fit
                  </a>
                </div>
              </div>

              {/* Visit Us */}
              <div className="flex items-start gap-3.5">
                <SvglGoogleMaps size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-white text-sm font-medium">Visit Us</h5>
                  <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">
                    44, CNR Complex,<br />
                    Ananthapura Main Rd,<br />
                    Vinayaka Nagar, Yelahanka<br />
                    New Town, Bengaluru 560064
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 pb-2 text-center text-[11px] font-mono uppercase text-neutral-400">
          <p>© {new Date().getFullYear()} FITNESS EDGE PRIME. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
