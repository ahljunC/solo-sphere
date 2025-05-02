# Contexts

This directory contains React context providers organized by feature area. Each context is responsible for managing a specific aspect of application state.

## Organization

Contexts are organized by feature domain:

- `auth/` - Authentication contexts and hooks
- *(future contexts will be added in their own directories)*

## Usage Guidelines

1. **Directory Structure**: Each context should have its own directory named after its domain.
2. **File Organization**: 
   - `ContextName.tsx` - The main context implementation
   - `index.ts` - Exports from the context directory
   - Additional helper files as needed

3. **Best Practices**:
   - Keep contexts focused on a specific domain
   - Provide clear documentation for each context
   - Export useful hooks for consuming the context
   - Handle loading and error states consistently

## Example

```tsx
// Using auth context
import { useAuth } from '@/lib/contexts/auth';

function MyComponent() {
  const { user, signIn } = useAuth();
  
  // Component logic...
}