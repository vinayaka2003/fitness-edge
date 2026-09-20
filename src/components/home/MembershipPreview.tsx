import React, { useState } from 'react';
import { motion } from 'motion/react';
import { pricingPlans } from '../../data/pricing';
import { Button } from '../common/Button';
import { Card3D } from '../common/Card3D';
import { SectionHeader } from '../common/SectionHeader';
import { Check, ArrowRight } from 'lucide-react';

interface MembershipPreviewProps {
  onSelectPlan: (planId: string) => void;
  onViewAllPlans: () => void;
}

export const MembershipPreview: React.FC<MembershipPreviewProps> = ({
  onSelectPlan,
  onViewAllPlans,
}) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="relative bg-[#070709] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Sanctuary Admissions"
          title="Engineered Membership Tiers"
          subtitle="Simple, direct pricing in INR. No administrative initiation fees, no hidden maintenance charges, and no cancellation penalties."
        />

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-xs font-mono uppercase tracking-wider ${
              !isAnnual ? 'text-white font-semibold' : 'text-neutral-500'
            }`}
          >
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-13 h-7 rounded-full bg-[#16161c] border border-white/[0.12] p-1 flex items-center transition-colors cursor-pointer"
            aria-label="Toggle billing duration"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-mono uppercase tracking-wider ${
                isAnnual ? 'text-white font-semibold' : 'text-neutral-500'
              }`}
            >
              Annual Pass
            </span>
            <span className="text-[10px] font-mono uppercase bg-white text-black px-2 py-0.5 rounded font-bold">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.slice(1, 4).map((plan, idx) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
                className="h-full"
              >
                <Card3D
                  intensity={10}
                  scaleOnHover={1.02}
                  glow={true}
                  glowColor={plan.popular ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.08)'}
                  className="h-full"
                >
                  <div
                    className={`h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-[#121217] border-2 border-white/80 relative shadow-xl'
                        : 'bg-[#0e0e13] border border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow-sm z-20 whitespace-nowrap">
                        Most Selected Sanctuary
                      </div>
                    )}

                    <div>
                      <div className="mb-4">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1.5 leading-tight">
                          {plan.accessHours}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif uppercase tracking-tight text-white">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1 font-sans leading-relaxed min-h-[2.5rem]">{plan.tagline}</p>
                      </div>

                      <div className="flex items-baseline flex-wrap gap-1.5 my-5 sm:my-6 pt-3 border-t border-white/[0.08]">
                        <span className="text-3xl sm:text-4xl font-number font-bold text-white tracking-tight">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase leading-tight">
                          / mo {isAnnual ? '(billed annually)' : ''}
                        </span>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-white/[0.06] mb-6 sm:mb-8 font-sans">
                        {plan.features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                            <Check className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        size="md"
                        className="w-full justify-center min-h-[44px] text-xs font-mono uppercase tracking-wider px-3"
                        onClick={() => onSelectPlan(plan.id)}
                      >
                        <span className="truncate">{plan.cta}</span>
                      </Button>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        {/* View all options footer banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <button
            onClick={onViewAllPlans}
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white inline-flex items-center gap-2 cursor-pointer transition-colors p-2.5 min-h-[44px]"
          >
            <span>Compare full plan Matrix & 1-Day Passes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
