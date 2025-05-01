# Form System Design Pattern

This document outlines the standardized form system used throughout the application. Following these patterns ensures consistency, accessibility, and maintainability across all forms.

## Core Architecture

Our form system follows a hierarchical component architecture:

```
Form (Context Provider)
├── FormField components (TextField, PasswordField, CheckboxField, etc.)
│   ├── Label
│   ├── Input/Control Element
│   └── Error/Helper Text
└── FormError (Form-level errors)
```

## Key Components

### `Form`

The root component that provides form state management through React Context.

```tsx
<Form
  initialValues={initialValues}
  onSubmit={handleSubmit}
  validate={validateForm}
>
  {/* Form fields */}
</Form>
```

### Field Components

Specialized components for different input types that connect to the Form context:

- `TextField`: For text, email, number inputs
- `PasswordField`: Password input with visibility toggle
- `CheckboxField`: For boolean inputs
- `SelectField`: For dropdown selections
- `RadioGroupField`: For radio button groups
- `TextareaField`: For multi-line text

### Error Components

- `FormError`: Displays form-level errors
- Field-level errors are handled within each field component

## Usage Patterns

### Basic Form Pattern

```tsx
import { Form, TextField, PasswordField, FormError } from '@/components/ui/Form';

function MyForm() {
  const initialValues = {
    username: '',
    password: ''
  };
  
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.username) {
      errors.username = 'Username is required';
    }
    
    if (!values.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };
  
  const handleSubmit = async (values) => {
    // Form submission logic
  };
  
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateForm}
    >
      <TextField
        name="username"
        label="Username"
        required
      />
      
      <PasswordField
        name="password"
        label="Password"
        required
      />
      
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Specialized Form Pattern

For domain-specific forms, create a wrapper component that encapsulates the form structure and validation:

```tsx
// UserProfileForm.tsx
export function UserProfileForm({ 
  initialValues, 
  onSubmit, 
  submitError 
}) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateUserProfile}
    >
      {submitError && <FormError error={submitError} />}
      
      <TextField name="name" label="Full Name" required />
      <TextField name="email" label="Email" type="email" required />
      <TextField name="phone" label="Phone Number" />
      
      <Button type="submit">Save Profile</Button>
    </Form>
  );
}
```

## Validation

Use the utilities in `utils/validation.ts` to create composable, reusable validators:

```tsx
import { composeValidators, validators } from '@/utils/validation';

const validateEmail = composeValidators(
  validators.required,
  validators.email
);

const validatePassword = composeValidators(
  validators.required,
  validators.minLength(8),
  validators.password
);
```

## Form State Management

Forms internally use React Context to manage:

- Field values
- Validation errors
- Touched state (which fields have been interacted with)
- Submission state

Access this context when needed with the `useForm` hook:

```tsx
import { useForm } from '@/components/ui/Form';

function MyCustomField() {
  const { values, errors, handleChange } = useForm();
  // ...
}
```

## Controlled vs. Uncontrolled Usage

All field components support both controlled and uncontrolled usage:

```tsx
// Uncontrolled (using Form context)
<TextField name="username" label="Username" />

// Controlled (managing state yourself)
<TextField 
  name="username" 
  label="Username" 
  value={username} 
  onChange={setUsername} 
/>
```

## Accessibility Features

All form components implement these accessibility features:

- Proper label associations
- Error message association with aria-describedby
- Form validation errors announced to screen readers
- Focus management
- Keyboard navigation support
- Appropriate ARIA attributes for input states

## Error Handling

Forms support two levels of error handling:

1. **Field-level errors**: Displayed beneath individual fields
2. **Form-level errors**: Displayed at the form level (e.g., API errors)

## Best Practices

1. Create specialized form components for domain-specific forms
2. Extract validation logic into reusable validators
3. Use consistent layout patterns for form fields
4. Always include proper error handling at both field and form levels
5. Provide clear success feedback after form submission
6. Use appropriate input types (email, tel, number, etc.)
7. Include autocomplete attributes when appropriate
8. Group related fields with appropriate fieldset and legend elements

## Example Implementation

See these example implementations:

- Login form: `src/components/auth/LoginForm.tsx`
- User profile form: `src/components/user/ProfileForm.tsx`
- Settings form: `src/components/settings/PreferencesForm.tsx`