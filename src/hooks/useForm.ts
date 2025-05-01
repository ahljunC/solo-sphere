import { useState, ChangeEvent, FormEvent } from 'react'

type FormErrors<T> = Partial<Record<keyof T, string>>

type UseFormReturn<T> = {
  values: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (name: keyof T, value: any) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: FormEvent) => void;
  setError: (error: string | null) => void;
  setFieldError: (field: keyof T, message: string) => void;
  resetForm: () => void;
  formError: string | null;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => FormErrors<T> | null
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear field-specific error when field changes
    if (errors[name as keyof T]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof T]
        return newErrors
      })
    }
    
    // Clear form error when any field changes
    if (formError) setFormError(null)
  }

  const setFieldValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const setFieldError = (field: keyof T, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setFormError(null)
  }

  const handleSubmit = (onSubmit: (values: T) => Promise<void> | void) => async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    
    // Validate form if validator provided
    if (validate) {
      const validationErrors = validate(values)
      if (validationErrors && Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }
    
    setIsSubmitting(true)
    
    try {
      await onSubmit(values)
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message)
      } else {
        setFormError('An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleSubmit,
    setError: setFormError,
    setFieldError,
    resetForm,
    formError
  }
}