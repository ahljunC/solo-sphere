'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ErrorDisplay } from '@/components/ui/ErrorDisplay'
import { useForm } from '@/hooks/useForm'

export type AuthField = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}

type AuthFormProps = {
  fields: AuthField[];
  onSubmit: (values: Record<string, string>) => Promise<void>;
  submitButtonText: string;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function AuthForm({
  fields,
  onSubmit,
  submitButtonText,
  isLoading = false,
  error = null,
  className = '',
}: AuthFormProps) {
  // Create initial values object from fields
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);

  const { 
    values, 
    handleChange, 
    handleSubmit,
    formError 
  } = useForm(initialValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col space-y-4 ${className}`}>
      {fields.map((field) => {
        const { name, type, label, placeholder, autoComplete, required } = field;
        
        if (type === 'password' && name === 'password' && label) {
          return (
            <div key={name} className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                {name === 'password' && (
                  <div className="text-sm">
                    <a href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                )}
              </div>
              <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                required={required}
                autoComplete={autoComplete}
              />
            </div>
          );
        }
        
        return (
          <Input
            key={name}
            id={name}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            value={values[name]}
            onChange={handleChange}
            required={required}
            autoComplete={autoComplete}
          />
        );
      })}
      
      {(error || formError) && (
        <ErrorDisplay message={error || formError} />
      )}
      
      <Button
        type="submit"
        variant="primary"
        fullWidth={true}
        isLoading={isLoading}
      >
        {submitButtonText}
      </Button>
    </form>
  );
}