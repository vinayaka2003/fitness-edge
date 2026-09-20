import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilities & Equipment - Fitness Edge Prime',
  description: 'Explore our multi-floor strength center, CrossFit arena, and premium equipment.',
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
