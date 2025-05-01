# SoloSphere Frontend Architecture

## Overview

This repository contains the frontend codebase for SoloSphere, a comprehensive business management platform for freelancers. The application is built with a modern React stack using Next.js, TypeScript, and Supabase.

## Architecture

The project follows a component-based architecture with clear separation of concerns and strong typing throughout. The application is organized around the following principles:

1. **Component-Based Structure**: UI elements are broken down into reusable, modular components
2. **Separation of Concerns**: Clear division between UI components, business logic, and data access
3. **Type Safety**: Comprehensive TypeScript typing for all components and functions
4. **Performance Optimization**: Memoization and optimized rendering where appropriate
5. **Accessibility**: WCAG compliance built into component design

## Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/               # Authentication routes
│   ├── (dashboard)/          # Protected dashboard routes
│   ├── api/                  # API routes
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # Shared React components
│   ├── auth/                 # Authentication-specific components
│   ├── common/               # Common components used across features
│   ├── ui/                   # Core UI components (presentational)
│   └── [feature]/            # Feature-specific components
├── lib/                      # Core libraries and utilities
│   ├── auth/                 # Authentication utilities
│   ├── utils/                # Utility functions
│   └── supabase/             # Supabase client and utilities
├── hooks/                    # Custom React hooks
├── context/                  # React Context providers
├── types/                    # TypeScript type definitions
└── styles/                   # Styling utilities and variables
```

## Key Components

### Authentication Components

The authentication system is built with security and user experience in mind:

- `AuthLayout.tsx`: Provides the two-column layout for authentication pages
- `LoginForm.tsx`: Handles user authentication with email/password and social providers
- `AuthContext.tsx`: Manages authentication state and provides auth methods

### UI Component Library

The UI components follow a design system pattern:

- **Button**: Customizable button component with variants, sizes, and states
- **FormElements**: Form controls including inputs, selects, checkboxes, etc.
- **Loader**: Loading indicator with customizable size and appearance
- **Additional UI components**: (to be added as needed)

## Component Design Philosophy

### Presentational Components

UI components are built with the following principles:

1. **Single Responsibility**: Each component has one clear purpose
2. **Prop-Based Configuration**: Components are configurable via well-typed props
3. **Self-Contained Styling**: Components include their own styling
4. **Accessibility Compliance**: ARIA attributes and keyboard navigation built-in
5. **Performance Optimization**: Memoization for expensive components

### Container Components

Container components focus on:

1. **Data Fetching**: Handling API calls and data management
2. **State Management**: Managing complex state and side effects
3. **Business Logic**: Implementing business rules and workflows
4. **Event Handling**: Processing user interactions

## State Management

The application uses a hybrid state management approach:

1. **Local Component State**: For UI-specific state
2. **React Context**: For shared state like authentication and theme
3. **Server State**: Managed with data fetching hooks for API data

## Styling Approach

The application uses Tailwind CSS for styling with:

1. **Utility-First Approach**: Composition of utility classes
2. **Custom Design Tokens**: Extended Tailwind configuration with project-specific tokens
3. **Component Variants**: Variant pattern for consistent component styling

## Authentication Implementation

Authentication is implemented using Supabase Auth:

1. **Auth Context**: Provides authentication state and methods
2. **Protected Routes**: Middleware for authentication checks
3. **Login/Register Forms**: User-friendly authentication interfaces

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/solo-sphere.git
   cd solo-sphere
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   ```
   cp .env.example .env.local
   ```
   Then update the `.env.local` file with your Supabase URL and anon key.

4. Start the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Guidelines

### Creating New Components

When creating a new component:

1. Create a directory for the component in the appropriate location
2. Create the main component file with TypeScript typing for props
3. Export the component from an index.ts file
4. Document the component with JSDoc comments

### Type Safety

Ensure all components and functions are properly typed:

1. Use TypeScript interfaces for props and state
2. Avoid using `any` type
3. Use proper return types for functions
4. Leverage TypeScript's utility types when appropriate

### Performance Considerations

Optimize component rendering:

1. Use `React.memo` for pure components that render often
2. Use `useCallback` for event handlers passed to child components
3. Use `useMemo` for expensive computations
4. Implement virtualization for long lists

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
