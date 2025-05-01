# SoloSphere Authentication Interface Wireframes

## Login Page Wireframe

```
┌──────────────────────────────┬──────────────────────────────┐
│                              │                              │
│  ┌────────┐                  │                              │
│  │  LOGO  │                  │                              │
│  └────────┘                  │                              │
│                              │                              │
│  Welcome back!               │                              │
│                              │                              │
│  ┌─────────────────────────┐ │       Fresh flowers         │
│  │ Email                   │ │                              │
│  └─────────────────────────┘ │       for any special       │
│                              │                              │
│  ┌─────────────────────────┐ │       occasion              │
│  │ Password                │ │                              │
│  └─────────────────────────┘ │                              │
│                              │                              │
│  [ ] Remember me             │                              │
│                              │    [DECORATIVE IMAGE OR      │
│  ┌─────────────────────────┐ │     GRADIENT BACKGROUND]     │
│  │          Log in         │ │                              │
│  └─────────────────────────┘ │                              │
│                              │                              │
│  ─────── or continue with ───│                              │
│                              │                              │
│  ┌─────────┐    ┌─────────┐  │                              │
│  │ Google  │    │Facebook │  │                              │
│  └─────────┘    └─────────┘  │                              │
│                              │                              │
│  Don't have an account?      │                              │
│  Create account              │                              │
│                              │                              │
└──────────────────────────────┴──────────────────────────────┘
```

## Desktop Layout (1200px+)

The login page uses a two-column layout with equal widths:
- Left column: Contains the form elements, logo, and auxiliary actions
- Right column: Features a background image or gradient with value proposition text

**Key Dimensions:**
- Form inputs: 100% width of container, 48px height
- Buttons: 100% width of container, 48px height
- Logo: 140px × 40px
- Container padding: 32px

## Tablet Layout (768px-1199px)

The two-column layout is maintained but with adjusted spacing:
- Reduced padding (24px)
- Smaller form elements (44px height)
- Value proposition text may be shortened

## Mobile Layout (320px-767px)

The layout switches to a single column:
```
┌──────────────────────────────┐
│                              │
│  ┌────────┐                  │
│  │  LOGO  │                  │
│  └────────┘                  │
│                              │
│  Welcome back!               │
│                              │
│  ┌─────────────────────────┐ │
│  │ Email                   │ │
│  └─────────────────────────┘ │
│                              │
│  ┌─────────────────────────┐ │
│  │ Password                │ │
│  └─────────────────────────┘ │
│                              │
│  [ ] Remember me             │
│                              │
│  ┌─────────────────────────┐ │
│  │          Log in         │ │
│  └─────────────────────────┘ │
│                              │
│  ─────── or continue with ───│
│                              │
│  ┌─────────┐    ┌─────────┐  │
│  │ Google  │    │Facebook │  │
│  └─────────┘    └─────────┘  │
│                              │
│  Don't have an account?      │
│  Create account              │
│                              │
└──────────────────────────────┘
```

- Feature panel is hidden
- Form takes full width
- Increased touch targets (min 44px height)

## Component Specifications

### Form Fields

```
┌─────────────────────────┐
│ Label                   │
├─────────────────────────┤
│ Input text              │
└─────────────────────────┘
```

**States:**
- Default: Light border
- Focus: Primary color border with faint glow
- Error: Red border with error message below
- Disabled: Gray background, reduced opacity

### Button

```
┌─────────────────────────┐
│         Label           │
└─────────────────────────┘
```

**States:**
- Default: Primary blue (#3B82F6)
- Hover: Darker blue (#2563EB)
- Active: Even darker blue
- Loading: Shows spinner, text replaced with "Logging in..."
- Disabled: Reduced opacity

### Social Login Buttons

```
┌─────────────────────────┐
│ [Icon] Provider Name    │
└─────────────────────────┘
```

**Styling:**
- White background
- Light border
- Provider icon on left
- Gray text
- Hover: Light gray background

## Interaction Flow

1. User sees login form
2. User enters credentials
3. On submit button click:
   - Button shows loading state
   - Form is disabled
   - Authentication is processed
4. On success: Redirect to dashboard
5. On error: Form re-enables, error message appears

## Accessibility Features

- Proper focus management with visible focus indicators
- Error messages linked to form fields via aria-describedby
- Proper heading hierarchy
- Sufficient color contrast
- Keyboard navigation support
- Screen reader announcements for state changes