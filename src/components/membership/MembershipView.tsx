import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { pricingPlans } from '../../data/pricing';
import { faqData } from '../../data/faq';
import { Card3D } from '../common/Card3D';
import { Check, X as XIcon, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

interface MembershipViewProps {
  onSelectPlan: (planId: string) => void;
  onOpenConsult: () => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onSelectPlan, onOpenConsult }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const comparisonRows = [
    { feature: 'Facility Access', day: 'Single Session', foundation: 'Operating Hours', vip: 'Priority Access', coaching: 'Priority Access' },
    { feature: 'All Free Weights & Racks', day: true, foundation: true, vip: true, coaching: true },
    { feature: 'Guest Passes', day: false, foundation: '1 / mo', vip: '4 / mo', coaching: 'Unlimited' },
    { feature: 'Contrast Recovery Lounge', day: false, foundation: false, vip: true, coaching: true },
    { feature: 'Dedicated Reserved Locker', day: false, foundation: false, vip: true, coaching: true },
    { feature: 'Priority Rack Booking', day: false, foundation: false, vip: true, coaching: true },
    { feature: '1-on-1 Coaching', day: false, foundation: false, vip: false, coaching: '4x / mo' },
    { feature: 'Apparel Discount', day: false, foundation: false, vip: '15% Off', coaching: '25% Off' },
  ];

  return (
    <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28 bg-[#050507] min-h-screen text-white font-sans overflow-hidden selection:bg-white selection:text-black">
      
      {/* Background Typography */}
      <div className="fixed top-[20%] left-0 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.02] z-0">
        <h1 className="text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap">
          PROTOCOL
        </h1>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Massive Editorial Hero */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-24 md:mb-32"
        >
          <div>
            <motion.div variants={itemVariants} className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-8 pl-1">
              YOUR MEMBERSHIP
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] uppercase text-white"
            >
              FIND YOUR FIT <span style={{ color: '#C50212' }}>.</span>
            </motion.h1>
          </div>

          {/* Premium Animated Toggle */}
          <motion.div variants={itemVariants} className="relative flex items-center bg-[#0a0a0c] border border-white/10 rounded-full p-1.5 shadow-2xl self-start xl:self-auto xl:mb-4">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`relative z-10 px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${billingCycle === 'monthly' ? 'text-black' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`relative z-10 px-8 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-colors duration-500 flex items-center gap-2 ${billingCycle === 'annual' ? 'text-black' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Annual <span className={`px-1.5 py-0.5 rounded text-[10px] ${billingCycle === 'annual' ? 'bg-black text-white' : 'bg-white/10 text-white'}`}>-20%</span>
            </button>
            
            {/* Animated Highlight */}
            <motion.div 
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white z-0"
              initial={false}
              animate={{
                left: billingCycle === 'monthly' ? '6px' : '50%',
                width: billingCycle === 'monthly' ? 'calc(50% - 6px)' : 'calc(50% - 6px)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </motion.div>
        </motion.div>

        {/* Floating Pricing Cards: 1-col on mobile, 2-col on tablet, 4-col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-32">
          {pricingPlans.map((plan, idx) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const isHovered = hoveredPlan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="relative group h-full flex flex-col"
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm ${plan.popular ? 'opacity-100 from-white/30' : ''}`} />
                
                <Card3D className="flex-grow h-full drop-shadow-2xl" intensity={15} scaleOnHover={1.03}>
                  <div className={`relative flex-grow flex flex-col h-full rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-xl ${plan.popular ? 'border-white/30 bg-[#1a1a24] shadow-[0_0_40px_rgba(255,255,255,0.05)]' : 'border-white/10 bg-[#121218] hover:border-white/30 hover:bg-[#1a1a24]'} p-6 sm:p-8`}>
                    
                    {plan.popular && (
                      <div className="absolute top-0 right-6 sm:right-8 bg-white text-black text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-b-md shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Preferred Standard
                      </div>
                    )}

                    <div className="mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2 leading-tight">
                        {plan.accessHours}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed min-h-[3rem]">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="flex items-baseline flex-wrap gap-1.5 mb-6 pb-6 border-b border-white/10 relative">
                      <AnimatePresence mode="popLayout">
                        <motion.span 
                          key={price}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
                        >
                          ₹{price.toLocaleString('en-IN')}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                        {plan.id === 'day-pass' ? '/ 24 hrs' : '/ mo'}
                      </span>
                    </div>

                    <div className="space-y-3.5 mb-8 flex-grow">
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 group/feat">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-neutral-600'}`} />
                          <span className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${isHovered ? 'text-neutral-200' : 'text-neutral-400'}`}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      className={`w-full py-3.5 px-4 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-between group/btn ${
                        plan.popular 
                          ? 'bg-white text-black hover:bg-neutral-200' 
                          : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'
                      }`}
                    >
                      <span className="truncate">{plan.cta}</span>
                      <ArrowRight className={`w-4 h-4 shrink-0 transform group-hover/btn:translate-x-1 transition-transform ${plan.popular ? 'text-black' : 'text-white group-hover/btn:text-black'}`} />
                    </button>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Comparison Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
          className="hidden md:block mb-32 overflow-hidden rounded-3xl border border-white/20 bg-[#121218] drop-shadow-2xl"
        >
          <div className="p-8 sm:p-12 border-b border-white/20">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Feature Matrix</h2>
            <p className="text-sm text-neutral-400 font-light">Comprehensive side-by-side analysis of all access tiers.</p>
          </div>

          <div className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left text-sm font-light min-w-[800px]">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="py-6 px-8 font-mono text-[10px] uppercase tracking-widest text-neutral-500 w-1/3">Specification</th>
                  <th className="py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">Day Pass</th>
                  <th className="py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">Foundation</th>
                  <th className="py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-white relative">
                    Iron Architect
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  </th>
                  <th className="py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-neutral-500">Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.04] transition-colors group">
                    <td className="py-5 px-8 text-neutral-400 group-hover:text-white transition-colors">{row.feature}</td>
                    <td className="py-5 px-4">
                      {typeof row.day === 'boolean' ? (row.day ? <Check className="w-4 h-4 text-white" /> : <XIcon className="w-4 h-4 text-neutral-700" />) : <span className="text-xs text-neutral-500 group-hover:text-neutral-300">{row.day}</span>}
                    </td>
                    <td className="py-5 px-4">
                      {typeof row.foundation === 'boolean' ? (row.foundation ? <Check className="w-4 h-4 text-white" /> : <XIcon className="w-4 h-4 text-neutral-700" />) : <span className="text-xs text-neutral-500 group-hover:text-neutral-300">{row.foundation}</span>}
                    </td>
                    <td className="py-5 px-4 relative bg-white/[0.01] group-hover:bg-transparent">
                      {typeof row.vip === 'boolean' ? (row.vip ? <Check className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" /> : <XIcon className="w-4 h-4 text-neutral-700" />) : <span className="text-xs text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{row.vip}</span>}
                    </td>
                    <td className="py-5 px-4">
                      {typeof row.coaching === 'boolean' ? (row.coaching ? <Check className="w-4 h-4 text-white" /> : <XIcon className="w-4 h-4 text-neutral-700" />) : <span className="text-xs text-neutral-500 group-hover:text-neutral-300">{row.coaching}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Dynamic FAQ */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
          className="max-w-4xl mx-auto mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase mb-6">Intelligence</h2>
            <p className="text-neutral-400 font-light max-w-xl mx-auto">Critical information regarding facility protocol, access standards, and membership parameters.</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all duration-500 ${isOpen ? 'bg-[#1a1a24] border-white/30 drop-shadow-xl' : 'bg-[#121218] border-white/10 hover:border-white/30 hover:bg-[#1a1a24] drop-shadow-md'}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-6 cursor-pointer"
                  >
                    <span className={`text-base sm:text-lg tracking-wide transition-colors duration-300 ${isOpen ? 'text-white font-medium' : 'text-neutral-300 font-light'}`}>
                      {faq.question}
                    </span>
                    <motion.div 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
                      className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-300 shrink-0 ${isOpen ? 'border-white text-white' : 'border-white/10 text-neutral-500'}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <motion.div 
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-sm text-neutral-400 leading-relaxed font-light border-t border-white/5 pt-6 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Final CTA Strip */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative rounded-3xl overflow-hidden bg-white text-black p-12 sm:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none" />
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase mb-6">Ready to Execute?</h2>
          <p className="text-neutral-700 font-light max-w-xl mx-auto mb-10 text-sm sm:text-base">
            Secure your spot in Yelahanka's most elite strength facility. 
          </p>
          <button
            onClick={onOpenConsult}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest hover:scale-105 transition-transform duration-300"
          >
            Book A Free Session <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};
