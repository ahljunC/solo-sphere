import React from 'react';
import type { Metadata } from 'next';
import { AuthLayout, LoginForm } from '@/components/auth';

/**
 * Metadata for the login page (SEO and document head)
 */
export const metadata: Metadata = {
  title: 'Login | SoloSphere',
  description: 'Log in to your SoloSphere account to manage your freelance business',
};

/**
 * Login Page
 * 
 * Server component that renders the authentication layout with the login form.
 * This page handles user authentication flow and redirects to the dashboard on success.
 * 
 * Route: /auth/login
 */
export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Log in to your account to continue"
      featureImage="/images/auth-feature.jpg"
      featureContent={
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Fresh flowers for any special occasion
          </h2>
          <p className="text-lg opacity-90">
            Manage your freelance business with ease. Track time, invoice clients,
            and focus on what you do best.
          </p>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}