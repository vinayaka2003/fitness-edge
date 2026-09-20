import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Fitness Edge Prime',
  description: 'View the facility. Modern equipment meets elite fitness coaching in Yelahanka.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
