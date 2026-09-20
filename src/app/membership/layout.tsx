import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership Plans - Fitness Edge Prime',
  description: 'Select your membership tier and gain access to Fitness Edge Prime.',
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
