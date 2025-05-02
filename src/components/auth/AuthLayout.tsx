import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  /**
   * Title displayed at the top of the auth form
   */
  title: string;
  
  /**
   * Optional subtitle or description
   */
  subtitle?: string;
  
  /**
   * Main content (usually an auth form)
   */
  children: React.ReactNode;
  
  /**
   * Feature panel content (right side panel)
   */
  featureContent?: React.ReactNode;
  
  /**
   * URL for background image in feature panel
   */
  featureImage?: string;
  
  /**
   * Alternative background color when no image is provided
   */
  featureBackgroundColor?: string;
}

/**
 * AuthLayout component
 * 
 * Provides the standard two-column layout for authentication pages:
 * - Left column contains the form and branding
 * - Right column contains feature highlights and imagery
 * 
 * This component enforces consistent styling and structure across
 * all authentication-related pages (login, signup, password reset, etc.)
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  featureContent,
  featureImage = '/images/auth-feature-default.jpg',
  featureBackgroundColor = 'bg-primary-gradient'
}) => {
  return (
    <div className="flex min-h-screen">
      {/* Left column - Form area */}
      <div className="flex flex-col justify-center px-8 py-12 w-full max-w-md mx-auto lg:w-1/2 xl:max-w-lg">
        <div className="mb-6">
          {/* Logo */}
          <Link href="/" className="inline-block">
            <span className="sr-only">SoloSphere</span>
            <Image 
              src="/logo.svg" 
              alt="SoloSphere" 
              width={140} 
              height={40} 
              className="h-10 w-auto" 
            />
          </Link>
        </div>
        
        <div className="mb-8">
          {/* Title and subtitle */}
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        
        {/* Main content - usually a form */}
        <div className="mt-4">{children}</div>
      </div>
      
      {/* Right column - Feature panel */}
      <div className={`hidden lg:block lg:w-1/2 relative ${!featureImage ? featureBackgroundColor : ''}`}>
        {featureImage && (
          <div className="absolute inset-0">
            <Image
              src={featureImage}
              alt="Feature"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            {/* Overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-primary-900/30 mix-blend-multiply" />
          </div>
        )}
        
        {/* Feature content */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-white max-w-xl">
            {featureContent || (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Fresh flowers for any special occasion
                </h2>
                <p className="text-lg opacity-90">
                  Manage your freelance business with ease. Track time, invoice clients,
                  and focus on what you do best.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};