import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Fitness Edge Prime',
  description: 'Learn about the philosophy, founder Siddhu Yadav, and master coaches behind Fitness Edge Prime.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
