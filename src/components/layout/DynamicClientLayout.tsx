"use client";
import type { ReactNode } from 'react';
import { ClientLayout } from './ClientLayout';

export function DynamicClientLayout({ children }: { children: ReactNode }) {
	return <ClientLayout>{children}</ClientLayout>;
}
