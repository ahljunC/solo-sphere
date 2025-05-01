# React Component Best Practices Guide

This guide outlines the architectural principles, coding standards, and best practices to follow when implementing the component improvements for our Next.js application with Supabase integration.

## Component Architecture Principles

### 1. Separation of Concerns

**Do:**
- Separate display logic from business logic
- Create pure presentation components that receive data via props
- Move complex state management to hooks or contexts

**Don't:**
- Mix data fetching with UI rendering in the same component
- Have components with multiple responsibilities

**Example:**
```tsx
// Good
function UserProfile({ user }) {
  return <div>{user.name}</div>;
}

// Instead of
function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  return <div>{user?.name}</div>;
}
```

### 2. Composition Over Inheritance

**Do:**
- Build components that can be composed together
- Use children props to create flexible layouts
- Create specialized components by composing base components

**Don't:**
- Use inheritance to create component variations
- Create monolithic components that try to handle all use cases

**Example:**
```tsx
// Good
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// Instead of
<Card title="Title" content="Content" footer="Footer" />
```

### 3. Props API Design

**Do:**
- Use consistent prop naming across components
- Provide sensible defaults for optional props
- Use descriptive prop names that indicate their purpose

**Don't:**
- Create props that serve multiple purposes
- Use generic prop names without context

**Example:**
```tsx
// Good
<Button variant="primary" isLoading={true} />

// Instead of
<Button type="1" loading="yes" />
```

## Supabase Integration Best Practices

### 1. Authentication

**Do:**
- Use the auth service abstraction layer
- Implement consistent error handling for auth operations
- Keep auth state in a dedicated context provider

**Don't:**
- Call Supabase auth methods directly from components
- Store authentication tokens in local state
- Duplicate authentication logic across components

### 2. Data Fetching

**Do:**
- Use repository pattern to abstract Supabase queries
- Handle loading and error states consistently
- Implement proper TypeScript interfaces for database entities

**Don't:**
- Construct complex queries in component files
- Mix different data fetching methods (SWR, React Query, direct calls)

### 3. Error Handling

**Do:**
- Create standardized error response formats
- Handle both application and Supabase errors consistently
- Show user-friendly error messages

**Don't:**
- Expose raw error messages from Supabase to users
- Silently fail without informing users
- Use different error handling approaches across components

## State Management Recommendations

### 1. Local Component State

**Do:**
- Use `useState` for simple component-level state
- Use `useReducer` for more complex state logic
- Keep related state together

**Don't:**
- Create too many individual state variables
- Lift state unnecessarily to parent components

### 2. Application State

**Do:**
- Use React Context for shared state (auth, theme, etc.)
- Split contexts by domain (auth context, UI context, etc.)
- Optimize context providers to prevent unnecessary re-renders

**Don't:**
- Create a single global context for all application state
- Pass state through many levels of props

### 3. Form State

**Do:**
- Use the `useForm` hook for form state management
- Validate form inputs as users type
- Provide clear feedback about validation errors

**Don't:**
- Manage each form field with individual state variables
- Perform validation only on submission

## TypeScript and Type Safety

### 1. Component Props

**Do:**
- Define explicit interfaces for all component props
- Use union types for variants and states
- Export prop types for reuse

**Example:**
```tsx
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### 2. Database Types

**Do:**
- Generate TypeScript types from Supabase schema
- Define relation types when joining tables
- Create helper types for common operations

**Example:**
```tsx
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileWithUser = Profile & { user: User };
```

### 3. API Responses

**Do:**
- Define consistent response types for all API calls
- Handle nullable and undefined values explicitly
- Create discriminated unions for success/error states

**Example:**
```tsx
type ApiResponse<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

## Performance Considerations

### 1. Component Rendering

**Do:**
- Memoize expensive components with `React.memo`
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to child components

**Don't:**
- Memoize everything without measuring performance impact
- Create new objects or functions in render functions

### 2. Data Loading

**Do:**
- Implement pagination for large data sets
- Use skeleton loaders for better UX during loading
- Cache repeated queries with SWR or React Query

**Don't:**
- Load all data at once for large collections
- Block rendering while waiting for data

### 3. Code Splitting

**Do:**
- Split large components using dynamic imports
- Lazy load routes and features not needed on initial load
- Pre-load components that will likely be needed soon

**Don't:**
- Create too many small chunks that increase HTTP requests
- Split every component without consideration for bundle size

## Accessibility Standards

### 1. Semantic HTML

**Do:**
- Use appropriate HTML elements (`button`, `a`, etc.)
- Implement proper heading hierarchy
- Use semantic elements like `article`, `section`, etc.

**Don't:**
- Use div for interactive elements
- Create custom controls without proper ARIA attributes

### 2. Keyboard Navigation

**Do:**
- Ensure all interactive elements are keyboard accessible
- Implement logical tab order
- Provide keyboard shortcuts for common actions

**Don't:**
- Trap keyboard focus
- Rely solely on mouse or touch interactions

### 3. ARIA Attributes

**Do:**
- Add appropriate ARIA labels to non-standard controls
- Use aria-live regions for dynamic content
- Test with screen readers

**Don't:**
- Add unnecessary ARIA attributes to standard HTML elements
- Use ARIA as a substitute for semantic HTML

## Component Folder Structure

```
src/
├── components/
│   ├── auth/              # Authentication-specific components
│   ├── dashboard/         # Dashboard-specific components
│   ├── form/              # Form-related components
│   ├── layout/            # Layout components
│   ├── navigation/        # Navigation components
│   └── ui/                # General UI components
├── hooks/                 # Custom React hooks
├── contexts/              # React contexts
├── services/              # Service layer (including Supabase)
├── types/                 # TypeScript types
└── utils/                 # Utility functions
```

## Component Documentation

### JSDoc Standards

**Do:**
- Document all component props
- Provide usage examples
- Explain component variants and states

**Example:**
```tsx
/**
 * Button component with multiple variants and states.
 *
 * @param {ButtonProps} props - The component props
 * @param {string} props.variant - The button style variant
 * @param {boolean} [props.isLoading=false] - Whether to show loading state
 *
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
```

## Testing Strategy

### 1. Component Testing

**Do:**
- Test components in isolation
- Test different prop combinations
- Test user interactions
- Test accessibility with jest-axe

**Example:**
```tsx
test('Button shows loading state', () => {
  render(<Button isLoading>Submit</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});
```

### 2. Integration Testing

**Do:**
- Test component compositions
- Test data flow between components
- Mock external dependencies

### 3. End-to-End Testing

**Do:**
- Test critical user flows (authentication, dashboard)
- Test across different viewports
- Test with real Supabase instance in test environment

## Conclusion

Following these best practices will ensure that our component improvements are maintainable, accessible, and performant while maintaining compatibility with our Supabase integration. These guidelines should be used in conjunction with the component specifications and migration plan documents.