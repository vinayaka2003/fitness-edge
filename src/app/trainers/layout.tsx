import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Coaches - Fitness Edge Prime',
  description: 'Train with elite strength and conditioning coaches at Fitness Edge Prime.',
};

export default function TrainersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
