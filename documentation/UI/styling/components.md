# UI Components

This document details the core UI components used in the SoloSphere platform, with particular focus on those used in the authentication interface.

## Form Components

### Text Input Fields

Text input fields are a fundamental component used extensively throughout the platform, including the critical authentication forms.

#### Visual Specifications

![Text Input Field](https://via.placeholder.com/400x120/ffffff/333333?text=Text+Input+Field)

**Default State**
- Height: 48px (desktop and tablet), 52px (mobile)
- Width: 100% of container
- Border: 1px solid Light Gray (#E0E0E0)
- Border radius: 8px
- Background: White (#FFFFFF)
- Text: Dark Gray (#616161)
- Padding: 16px horizontal, centered vertically
- Font: Inter Regular, 16px

**Focus State**
- Border: 2px solid Deep Indigo (#2A3562)
- Subtle glow: 0 0 0 4px rgba(42, 53, 98, 0.15)
- No change in dimensions (border inset to prevent layout shift)

**Error State**
- Border: 2px solid Alert Red (#E57373)
- Error message: Alert Red text below field, 14px with 8px top margin
- Error icon: Small alert icon at right side of field

**Success State**
- Border: 2px solid Success Green (#4CAF50)
- Optional checkmark icon at right side of field

**Disabled State**
- Background: Extra Light Gray (#F5F5F5)
- Border: 1px solid Light Gray (#E0E0E0)
- Text: Medium Gray (#9E9E9E)
- Cursor: not-allowed

#### Labels and Helper Text

- Labels positioned above input
- 14px Inter Medium (#616161)
- 8px spacing between label and input
- Optional helper text: 14px Inter Regular, Medium Gray (#9E9E9E), 8px top margin from input
- Error text replaces helper text when in error state

#### Special Input Types

##### Password Input
- Includes visibility toggle icon at right side
- Toggle changes field type between password and text
- Maintains all other standard input field styles

##### Email Input
- Email-specific validation
- Optional email format helper text

#### Implementation Notes

```jsx
// React component example
<div className="form-field">
  <label htmlFor="email" className="form-label">Email</label>
  <div className={`input-container ${hasError ? 'input-container--error' : ''}`}>
    <input 
      type="email" 
      id="email" 
      className="form-input"
      placeholder="Enter your email address"
      value={email}
      onChange={handleEmailChange}
    />
  </div>
  {hasError ? (
    <div className="form-error">Please enter a valid email address</div>
  ) : (
    <div className="form-helper">We'll never share your email</div>
  )}
</div>
```

### Buttons

Buttons are used for primary actions throughout the interface, with the login button being a critical component of the authentication experience.

#### Primary Button

![Primary Button](https://via.placeholder.com/400x60/2A3562/FFFFFF?text=Primary+Button)

**Default State**
- Height: 48px (desktop and tablet), 52px (mobile)
- Width: Varies by context (full width in authentication form)
- Background: Deep Indigo (#2A3562)
- Text: White (#FFFFFF), 16px Inter Semi-Bold
- Border radius: 8px
- Padding: 16px horizontal, centered vertically

**Hover State**
- Background: Darkened Deep Indigo (#232D52, 10% darker)
- Subtle scale transform: 102%
- Transition: 150ms ease-in-out for all properties

**Active/Pressed State**
- Background: Further darkened (#1B2341, 15% darker than base)
- Scale: 98%
- Transition: 100ms ease-in-out

**Loading State**
- Background: Deep Indigo (#2A3562)
- Text replaced with animated loading indicator (three dots)
- Disabled interaction

**Disabled State**
- Background: Light Gray (#E0E0E0)
- Text: Medium Gray (#9E9E9E)
- No hover effects
- Cursor: not-allowed

#### Secondary Button

![Secondary Button](https://via.placeholder.com/400x60/FFFFFF/2A3562?text=Secondary+Button)

**Default State**
- Same dimensions as primary button
- Background: White (#FFFFFF)
- Text: Deep Indigo (#2A3562), 16px Inter Semi-Bold
- Border: 1px solid Deep Indigo (#2A3562)
- Border radius: 8px

**Hover/Active States**
- Similar effects to primary button with appropriate color adjustments
- Hover adds light background tint (#F5F5F7, 3% Deep Indigo)

#### Text Button

![Text Button](https://via.placeholder.com/250x60/FFFFFF/2A3562?text=Text+Button)

**Default State**
- No background or border
- Text: Deep Indigo (#2A3562), 16px Inter Medium
- Padding: 8px
- Optional underline

**Hover State**
- Text decoration: underline
- No background change

**Usage in Authentication**
- "Forgot your password?" link
- "Create account" link

#### Social Authentication Buttons

![Social Button](https://via.placeholder.com/400x60/FFFFFF/333333?text=Sign+in+with+Provider)

**Default State**
- Height: 44px
- Width: 100% of container
- Background: White (#FFFFFF)
- Border: 1px solid Light Gray (#E0E0E0)
- Border radius: 8px
- Text: Dark Gray (#616161), 16px Inter Regular
- Icon: Left-aligned, 20px square, 12px right margin

**Hover State**
- Background: Extra Light Gray (#F5F5F5)
- Transition: 150ms ease-in-out

**Provider Variations**
- Google, Facebook with respective branded icons
- Consistent styling across providers

### Checkbox and Radio Buttons

While not prominently featured in the initial login screen, these components are used in the broader authentication flow.

#### Checkbox

![Checkbox](https://via.placeholder.com/200x60/FFFFFF/333333?text=Checkbox)

**Default State**
- Size: 20px × 20px
- Border: 1px solid Light Gray (#E0E0E0)
- Border radius: 4px
- Background: White (#FFFFFF)

**Checked State**
- Background: Deep Indigo (#2A3562)
- Border: 1px solid Deep Indigo (#2A3562)
- White checkmark icon

**Label**
- Position: Right of checkbox, centered vertically
- Text: 16px Inter Regular, Dark Gray (#616161)
- Spacing: 12px between checkbox and label

**Usage in Authentication**
- "Remember me" option
- Terms acceptance

## Layout Components

### Card Container

The authentication form is contained within a card-like container with specific styling.

![Card Container](https://via.placeholder.com/400x300/FFFFFF/333333?text=Card+Container)

**Specifications**
- Background: White (#FFFFFF)
- Border radius: 12px
- Shadow: 0 4px 20px rgba(0, 0, 0, 0.08)
- Padding: 32px (desktop), 24px (tablet and mobile)
- Max-width: Varies by context (380px in authentication)

**Usage Notes**
- Contains related content as a distinct visual group
- Provides slight elevation from background
- Can have optional header and footer sections

### Dividers

![Divider](https://via.placeholder.com/400x60/FFFFFF/333333?text=Divider)

**Specifications**
- Height: 1px
- Color: Light Gray (#E0E0E0)
- Margins: 24px vertical (customizable)
- Width: 100% of container

**Text Divider**
- Centered text with lines extending to sides
- Text: 14px Inter Regular, Medium Gray (#9E9E9E)
- Used for "or" separation in authentication options

```jsx
// Text divider example
<div className="text-divider">
  <span>or</span>
</div>
```

## Feedback Components

### Alerts and Notifications

Used to provide feedback on authentication attempts.

#### Error Alert

![Error Alert](https://via.placeholder.com/400x80/FFEBEE/E57373?text=Error+Alert)

**Specifications**
- Background: Light red (#FFEBEE)
- Border-left: 4px solid Alert Red (#E57373)
- Border radius: 4px
- Padding: 16px
- Icon: Error icon in Alert Red (#E57373)
- Text: Dark Gray (#616161), 14px Inter Regular
- Close button: Optional 'X' at right side

**Usage in Authentication**
- Invalid credentials message
- Account lockout notification

#### Success Alert

![Success Alert](https://via.placeholder.com/400x80/E8F5E9/4CAF50?text=Success+Alert)

**Specifications**
- Background: Light green (#E8F5E9)
- Border-left: 4px solid Success Green (#4CAF50)
- Other attributes mirror error alert with appropriate color changes

**Usage in Authentication**
- Password reset confirmation
- Email verification confirmation

### Loading States

#### Spinner

![Loading Spinner](https://via.placeholder.com/100x100/FFFFFF/2A3562?text=Spinner)

**Specifications**
- Size: 24px (small), 48px (medium), 64px (large)
- Color: Deep Indigo (#2A3562) or White (#FFFFFF) on dark backgrounds
- Animation: Continuous rotation (750ms per revolution)
- Optional translucent circular track

**Button Loading State**
- Three dots animation
- Centered within button
- Replaces button text

## Feature Panel Components

The right side of the authentication screen contains several specialized components.

### Value Proposition Display

![Value Prop](https://via.placeholder.com/400x200/2A3562/FFFFFF?text=Value+Proposition)

**Specifications**
- Background: Overlay gradient on image (Deep Indigo base, 80% opacity)
- Heading: 24px Inter Semi-Bold, White (#FFFFFF)
- Subheading: 16px Inter Light, White (#FFFFFF), 80% opacity
- Positioning: Centered or bottom-left with appropriate padding
- Transition: Fade transition between rotating content

### Background Image

**Specifications**
- High-quality professional imagery
- Filtered to complement color scheme
- Responsive sizing and cropping
- Preloaded for smooth display
- Subtle zoom animation on load

## Authentication-Specific Components

### Authentication Header

![Auth Header](https://via.placeholder.com/400x100/FFFFFF/333333?text=Authentication+Header)

**Specifications**
- Logo: 40px height (desktop), 36px (tablet), 32px (mobile)
- Heading: "Welcome back!" - 28px Inter Semi-Bold, Dark Gray (#616161)
- Subheading: Optional supporting text - 16px Inter Regular, Medium Gray (#9E9E9E)
- Spacing: 32px bottom margin, 24px between elements

### Authentication Footer

![Auth Footer](https://via.placeholder.com/400x60/FFFFFF/333333?text=Authentication+Footer)

**Specifications**
- Text: 14px Inter Regular, Medium Gray (#9E9E9E)
- Links: 14px Inter Medium, Deep Indigo (#2A3562)
- Spacing: 32px top margin from last form element
- Alignment: Center for main authentication footer

### Accessibility Considerations for Components

All components are designed with these accessibility features:

- **Color Contrast**: All text and interactive elements meet WCAG 2.1 AA standards (4.5:1 minimum contrast)
- **Keyboard Navigation**: All interactive elements are keyboard accessible with visible focus states
- **Screen Reader Support**: Appropriate ARIA labels and roles
- **Touch Targets**: Minimum 44×44px touch targets for all interactive elements
- **Error Identification**: Errors identified by both color and text/icon
- **Reduced Motion**: Animations can be disabled for users with vestibular disorders

## Component Composition in Authentication

The login interface combines these components in a specific arrangement:

1. **Authentication Card** contains:
   - Authentication Header
   - Email Input Field
   - Password Input Field (with visibility toggle)
   - "Forgot password" Text Button
   - Primary Button (Login)
   - Text Divider ("or")
   - Social Authentication Buttons
   - Authentication Footer with "Create account" link

2. **Feature Panel** contains:
   - Background Image
   - Value Proposition Display with rotating content

This composition creates a focused, intuitive authentication experience that guides users efficiently through the login process while communicating the platform's value proposition.