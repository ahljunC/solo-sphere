import React from 'react'

interface ErrorDisplayProps {
  message: string | null;
  className?: string;
}

export function ErrorDisplay({ message, className = '' }: ErrorDisplayProps) {
  if (!message) return null;
  
  return (
    <div className={`rounded-md bg-red-50 p-3 ${className}`}>
      <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}