"use client";

import dynamic from 'next/dynamic';

const ContactView = dynamic(() => import('../../components/contact/ContactView').then(mod => mod.ContactView));

export default function ContactPage() {
  return <ContactView />;
}
