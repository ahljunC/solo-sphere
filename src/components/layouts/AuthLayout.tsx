'use client'

import React from 'react'
import { LoginBackground } from '@/components/auth/LoginBackground'

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackground?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBackground = true 
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Form content */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 md:w-1/2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
            
            {children}
          </div>
        </div>
      </div>
      
      {/* Right side - Background with overlay text */}
      {showBackground && (
        <div className="relative hidden md:block md:w-1/2">
          <LoginBackground />
          <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
            <h2 className="text-4xl font-bold">SoloSphere</h2>
            <p className="mt-2 text-xl">Your all-in-one freelance business management platform</p>
          </div>
        </div>
      )}
    </div>
  )
}