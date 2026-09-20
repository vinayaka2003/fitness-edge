"use client";

import dynamic from 'next/dynamic';
import { Trainer } from '../../types';

const TrainersView = dynamic(() => import('../../components/trainers/TrainersView').then(mod => mod.TrainersView));

export default function TrainersPage() {
  const whatsappNumber = '918660036397';

  const handleBookTrainer = (trainer: Trainer) => {
    const msg = `Hi Fitness Edge Prime, I would like to book a coaching session with ${trainer.name}.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <TrainersView />
  );
}
