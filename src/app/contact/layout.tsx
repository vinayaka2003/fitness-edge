import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Location - Fitness Edge Prime',
  description: 'Find our gym in Yelahanka New Town, Bangalore, or reach out to our concierge.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
