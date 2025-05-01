import React from 'react'

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function Card({ children, className = '', title, description }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ 
  children, 
  title, 
  description, 
  action,
  className = ''
}: CardHeaderProps) {
  return (
    <div className={`flex justify-between items-start mb-4 ${className}`}>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        {children}
      </div>
      {action && (
        <div className="ml-4">{action}</div>
      )}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  )
}