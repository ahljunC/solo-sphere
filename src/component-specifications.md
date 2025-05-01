# Component Specifications

This document provides detailed specifications for implementing new components to improve our React application with Supabase integration.

## Form Components

### `FormField` Component

```typescript
// src/components/form/FormField.tsx
'use client'

import React from 'react'

interface FormFieldProps {
  // The name attribute for the input element
  name: string;
  // The label text displayed above the input
  label?: string;
  // Error message to display below the input
  error?: string;
  // Helper text to provide context to the user
  helperText?: string;
  // Whether the field is required
  required?: boolean;
  // Additional CSS classes
  className?: string;
  // React children (typically an input element)
  children: React.ReactNode;
}

export function FormField({
  name,
  label,
  error,
  helperText,
  required = false,
  className = '',
  children
}: FormFieldProps) {
  // Render a field container with label, input element, error, and helper text
  // Apply proper accessibility attributes
  // Return JSX structure
}
```

### `FormPasswordField` Component

```typescript
// src/components/form/FormPasswordField.tsx
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { FormField } from './FormField'
import Link from 'next/link'

interface FormPasswordFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showForgotPassword?: boolean;
  forgotPasswordUrl?: string;
  className?: string;
  autoComplete?: string;
}

export function FormPasswordField({
  name,
  label = 'Password',
  placeholder = 'Enter your password',
  error,
  value,
  onChange,
  required = false,
  showForgotPassword = false,
  forgotPasswordUrl = '/auth/forgot-password',
  className = '',
  autoComplete = 'current-password'
}: FormPasswordFieldProps) {
  // Implement password field with show/hide password toggle
  // Return properly structured JSX
}
```

### `FormCheckbox` Component

```typescript
// src/components/form/FormCheckbox.tsx
'use client'

import React from 'react'

interface FormCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

export function FormCheckbox({
  name,
  label,
  checked,
  onChange,
  error,
  className = ''
}: FormCheckboxProps) {
  // Implement styled checkbox with label
  // Return JSX
}
```

### `FormError` Component

```typescript
// src/components/form/FormError.tsx
'use client'

import React from 'react'

interface FormErrorProps {
  error?: string | null;
  className?: string;
}

export function FormError({ 
  error, 
  className = '' 
}: FormErrorProps) {
  // Only render if error exists
  // Return error with appropriate styling
}
```

## Layout Components

### `Container` Component

```typescript
// src/components/layout/Container.tsx
'use client'

import React from 'react'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

export function Container({
  children,
  size = 'lg',
  className = ''
}: ContainerProps) {
  // Implement container with appropriate max-width based on size
  // Return JSX
}
```

### `PageHeader` Component

```typescript
// src/components/layout/PageHeader.tsx
'use client'

import React from 'react'

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className = ''
}: PageHeaderProps) {
  // Implement page header with title, optional description, and action buttons
  // Return JSX
}
```

## Dashboard Components

### `DashboardCard` Component

```typescript
// src/components/dashboard/DashboardCard.tsx
'use client'

import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function DashboardCard({
  title,
  subtitle,
  icon,
  className = '',
  children
}: DashboardCardProps) {
  // Implement dashboard card with title, optional subtitle and icon
  // Return JSX using Card components
}
```

### `DashboardMetric` Component

```typescript
// src/components/dashboard/DashboardMetric.tsx
'use client'

import React from 'react'

type MetricTrend = 'up' | 'down' | 'neutral';

interface DashboardMetricProps {
  label: string;
  value: string | number;
  previousValue?: string | number;
  trend?: MetricTrend;
  icon?: React.ReactNode;
  className?: string;
}

export function DashboardMetric({
  label,
  value,
  previousValue,
  trend,
  icon,
  className = ''
}: DashboardMetricProps) {
  // Implement metric display with value, trend indicator, and icon
  // Return JSX
}
```

## Navigation Components

### `Navbar` Component

```typescript
// src/components/navigation/Navbar.tsx
'use client'

import React from 'react'
import Link from 'next/link'

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  items: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function Navbar({
  logo,
  items,
  actions,
  className = ''
}: NavbarProps) {
  // Implement responsive navigation bar
  // Include mobile menu toggle for small screens
  // Return JSX
}
```

### `Breadcrumbs` Component

```typescript
// src/components/navigation/Breadcrumbs.tsx
'use client'

import React from 'react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumbs({
  items,
  separator = '/',
  className = ''
}: BreadcrumbsProps) {
  // Implement breadcrumb navigation
  // Return JSX
}
```

## Utility Components

### `Toast` Component

```typescript
// src/components/ui/Toast.tsx
'use client'

import React, { useState, useEffect } from 'react'

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export function Toast({
  type,
  message,
  duration = 5000,
  onClose,
  className = ''
}: ToastProps) {
  // Implement toast notification
  // Auto-dismiss after duration
  // Return JSX
}
```

### `LoadingSpinner` Component

```typescript
// src/components/ui/LoadingSpinner.tsx
'use client'

import React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

export function LoadingSpinner({
  size = 'md',
  color = 'currentColor',
  className = ''
}: LoadingSpinnerProps) {
  // Implement loading spinner with appropriate size
  // Return JSX
}
```

## Authentication Improvements

### Enhanced `AuthForm` Component

The existing `AuthForm` component should be refactored to use our new form components:

```typescript
// src/components/auth/AuthForm.tsx
'use client'

import React from 'react'
import { FormField } from '@/components/form/FormField'
import { FormPasswordField } from '@/components/form/FormPasswordField'
import { FormError } from '@/components/form/FormError'
import { Button } from '@/components/ui/Button'
import { useForm } from '@/hooks/useForm'

// Maintain the existing API but implement using new components
export function AuthForm({
  fields,
  onSubmit,
  submitButtonText,
  isLoading = false,
  error = null,
  className = '',
}: AuthFormProps) {
  // Implementation using new form components
}
```

## Dashboard Improvements

### Enhanced Dashboard Page

The dashboard page should be refactored to use our new dashboard components:

```typescript
// src/app/dashboard/page.tsx
'use client'

import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { Container } from '@/components/layout/Container'
import { PageHeader } from '@/components/layout/PageHeader'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { DashboardMetric } from '@/components/dashboard/DashboardMetric'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  // Use Container, PageHeader, DashboardCard, and DashboardMetric components
  // for a more structured and consistent layout
}
```

## Integration with Supabase

All components should work seamlessly with our existing Supabase integration:

1. Form components should support our authentication flows
2. Dashboard components should display data retrieved from Supabase
3. Protected routes should use Supabase session management
4. Error handling should be consistent across components

## Implementation Priority

1. Form components - highest priority as they impact authentication
2. Layout components - next priority for consistent page structure
3. Dashboard components - to enhance the user experience post-login
4. Navigation components - for better site navigation
5. Utility components - to support the other components

This specification provides a comprehensive guide for implementing component improvements while maintaining compatibility with our existing Supabase integration.