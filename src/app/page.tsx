"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from '../components/common/Button';

const Hero = dynamic(() => import('../components/home/Hero').then(mod => mod.Hero));
const ArchitectSplit = dynamic(() => import('../components/home/ArchitectSplit').then(mod => mod.ArchitectSplit));
const EquipmentStrip = dynamic(() => import('../components/home/EquipmentStrip').then(mod => mod.EquipmentStrip));
const MembershipPreview = dynamic(() => import('../components/home/MembershipPreview').then(mod => mod.MembershipPreview));
const ReviewsSection = dynamic(() => import('../components/home/ReviewsSection').then(mod => mod.ReviewsSection));
const GoogleReviewsSection = dynamic(() => import('../components/home/GoogleReviewsSection').then(mod => mod.GoogleReviewsSection));
const GymLocationSection = dynamic(() => import('../components/home/GymLocationSection').then(mod => mod.GymLocationSection));

export default function HomeView() {
  const router = useRouter();
  const whatsappNumber = '918660036397';

  const handleOpenConsult = (type: string = 'consult') => {
    let msg = 'Hi Fitness Edge Prime, I would like to inquire about membership and facility access.';
    if (type === 'facility-tour') msg = 'Hi Fitness Edge Prime, I would like to book a free session.';
    else if (type === 'membership-signup') msg = 'Hi Fitness Edge Prime, I am interested in joining and would like to sign up for a membership.';
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Hero
        onStartBuild={() => handleOpenConsult('Start Your Build')}
        onExploreFacilities={() => router.push('/facilities')}
      />
      <ArchitectSplit onSeeBlueprint={() => router.push('/about')} />
      <EquipmentStrip onViewAllEquipment={() => router.push('/facilities')} />
      <MembershipPreview
        onSelectPlan={(planId) => handleOpenConsult(`Plan: ${planId}`)}
        onViewAllPlans={() => router.push('/membership')}
      />
      <ReviewsSection />
      <GoogleReviewsSection />
      <GymLocationSection />
      <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-[#070709] border-t border-[#1b1b22] text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#787884] block">
            Train With Purpose
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white uppercase tracking-wide">
            Your Sanctuary Is Open
          </h2>
          <p className="text-sm sm:text-base text-[#8c8c98] max-w-xl mx-auto leading-relaxed">
            Open daily. No ego lifting, no interruptions.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleOpenConsult('Claim 1-Day Trial')}
                className="px-8 py-3.5 text-xs tracking-[0.18em] uppercase"
              >
                Book A Free Session
              </Button>
            </div>
            <div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/contact')}
                className="px-8 py-3.5 text-xs tracking-[0.18em] uppercase"
              >
                Contact & Location
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
