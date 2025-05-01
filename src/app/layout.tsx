import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import './globals.css';

// Load the Inter font with specific subsets
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

/**
 * Metadata for the application (SEO and document head)
 */
export const metadata: Metadata = {
  title: {
    template: '%s | SoloSphere',
    default: 'SoloSphere - Freelancer Business Management Platform'
  },
  description: 'SoloSphere helps freelancers manage projects, track time, invoice clients, and grow their business with ease.',
  keywords: ['freelance', 'business management', 'invoicing', 'time tracking', 'project management'],
  authors: [{ name: 'SoloSphere Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

/**
 * Root Layout Component
 * 
 * This is the top-level layout that wraps all pages in the application.
 * It provides:
 * - Global styles
 * - Font configuration
 * - Authentication context
 * - Any other app-wide providers
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
