"use client";

import dynamic from 'next/dynamic';

const FacilitiesView = dynamic(() => import('../../components/facilities/FacilitiesView').then(mod => mod.FacilitiesView));

export default function FacilitiesPage() {
  const whatsappNumber = '918660036397';

  const handleOpenConsult = (type: string = 'facility-tour') => {
    let msg = 'Hi Fitness Edge Prime, I would like to book a free session.';
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <FacilitiesView onOpenConsult={() => handleOpenConsult('facility-tour')} />
  );
}
