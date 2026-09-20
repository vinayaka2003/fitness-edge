"use client";

import dynamic from 'next/dynamic';

const MembershipView = dynamic(() => import('../../components/membership/MembershipView').then(mod => mod.MembershipView));

export default function MembershipPage() {
  const whatsappNumber = '918660036397';

  const handleOpenConsult = (type: string = 'membership-signup') => {
    let msg = 'Hi Fitness Edge Prime, I am interested in joining and would like to sign up for a membership.';
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleSelectPlan = (planId: string) => {
    const msg = `Hi Fitness Edge Prime, I am interested in the ${planId} membership plan.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <MembershipView 
      onSelectPlan={handleSelectPlan} 
      onOpenConsult={() => handleOpenConsult('membership-signup')} 
    />
  );
}
