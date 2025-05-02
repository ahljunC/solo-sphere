# Interactions

This document outlines the interaction patterns, animations, and transitions used throughout the SoloSphere platform, with particular focus on the authentication interface. Well-crafted interactions reinforce the brand, provide feedback, and guide users through their journey.

## Interaction Design Principles

SoloSphere's interactions follow these core principles:

### 1. Purpose Over Decoration

Every animation and transition serves a specific purpose:
- **Communicating status changes**
- **Providing feedback for user actions**
- **Guiding attention to important elements**
- **Creating a sense of direct manipulation**

Decorative animations are used sparingly and only when they don't interfere with functionality.

### 2. Subtle and Efficient

Interactions are subtle and efficient, avoiding excessive motion that could:
- **Slow down the user's workflow**
- **Create distraction from content**
- **Cause motion sickness or vestibular disorders**

### 3. Consistent Patterns

Interactions follow consistent patterns so users can build a mental model of how the interface behaves:
- **Similar elements animate in similar ways**
- **Standard timing and easing for recurring patterns**
- **Predictable behavior across the platform**

### 4. Progressive Disclosure

Animations help reveal information progressively:
- **Content appears in logical sequence**
- **Complex interfaces unfold gradually**
- **Related information enters and exits together**

## Timing and Easing Standards

Consistent timing and easing create a cohesive feel across all interactions.

### Duration Guidelines

| Interaction Type | Duration | Use Case |
|------------------|----------|----------|
| Extra Fast | 100ms | Micro-feedback, button presses |
| Fast | 150-200ms | Simple transitions, hover states |
| Standard | 250-300ms | Most UI transitions |
| Deliberate | 350-500ms | Important state changes, modal dialogs |

### Easing Functions

| Easing Type | Function | Use Case |
|-------------|----------|----------|
| Standard | ease-in-out | Most transitions |
| Entry | ease-out | Elements entering the viewport |
| Exit | ease-in | Elements leaving the viewport |
| Emphasis | cubic-bezier(0.2, 0, 0.13, 1.5) | Attention-grabbing animations |

### Implementation Example

```css
:root {
  /* Duration variables */
  --duration-extra-fast: 100ms;
  --duration-fast: 200ms;
  --duration-standard: 300ms;
  --duration-deliberate: 450ms;
  
  /* Easing variables */
  --ease-standard: ease-in-out;
  --ease-entry: ease-out;
  --ease-exit: ease-in;
  --ease-emphasis: cubic-bezier(0.2, 0, 0.13, 1.5);
}

.button {
  transition: transform var(--duration-fast) var(--ease-standard),
              background-color var(--duration-fast) var(--ease-standard);
}

.modal-enter {
  transition: opacity var(--duration-deliberate) var(--ease-entry),
              transform var(--duration-deliberate) var(--ease-entry);
}
```

## Form Interactions

The authentication interface relies heavily on form interactions to guide users through the login process.

### Input Field Interactions

#### Focus State Transition
- Border color transitions from Light Gray to Deep Indigo
- Duration: 200ms (Fast)
- Easing: ease-out (Entry)
- Subtle glow effect fades in simultaneously

#### Validation State Changes
- **Success State**: Smooth transition to green border with checkmark icon fading in
- **Error State**: Transition to red border with subtle horizontal shake animation
  - Shake amplitude: 3px
  - Shake duration: 400ms
  - Shake easing: ease-out
  - Shake pattern: right→left→right→center

#### Password Visibility Toggle
- Icon transitions between visible/hidden states
- Duration: 200ms (Fast)
- Easing: ease-in-out (Standard)
- Subtle rotation effect (15 degrees)

### Button Interactions

#### Hover State
- Background color darkens 10%
- Scale increases to 102%
- Duration: 150ms (Fast)
- Easing: ease-out (Entry)

#### Active/Pressed State
- Scale decreases to 98%
- Background darkens additional 5%
- Duration: 100ms (Extra Fast)
- Easing: ease-in-out (Standard)

#### Loading State
- Text fades out, loading animation fades in
- Duration: 200ms (Fast)
- Easing: ease-in-out (Standard)
- Loading indicator: Three dots with pulsing animation
  - Dot size: 4px diameter
  - Pulse timing: 600ms cycle (200ms per dot, staggered)

### Form Submission

#### Success Submission
- Button shows loading state
- Form fades out (300ms)
- Success feedback fades in
- Redirect after short delay

#### Error Submission
- Button returns to default state
- Form shakes horizontally (subtle)
- Error message fades in
- Focus returns to problematic field

## Page-Level Interactions

### Initial Page Load Sequence

The authentication page loads with a choreographed sequence:

1. **Structure First**: Layout elements fade in (100ms)
2. **Branding**: Logo appears with subtle fade-in (200ms)
3. **Content**: Form elements fade in sequentially (300ms)
4. **Background**: Feature panel image fades in with subtle scale (350ms)

Total sequence completes within 500ms to avoid feeling sluggish.

### Between Authentication States

Transitions between login, registration, and password reset states:

- Current form fades out while sliding up slightly (-20px)
- New form fades in while sliding down slightly (+20px)
- Duration: 300ms (Standard)
- Easing: ease-in-out (Standard)

## Microinteractions

Small, subtle interactions that enhance the experience:

### Field Clearing

- Clear button (X) appears with fade-in when field contains text
- Clicking clear button triggers a quick "wipe" animation
- Duration: 150ms (Fast)

### Error Message Appearance

- Error text slides down while fading in
- Duration: 200ms (Fast)
- Easing: ease-out (Entry)

### Social Login Button Hover

- Slight background color change
- Icon scaling (105%)
- Duration: 150ms (Fast)

### Success Checkmark Animation

- Checkmark draws itself with SVG path animation
- Duration: 400ms (Deliberate)
- Easing: ease-out (Entry)

## Loading States

### Global Loading Indicators

#### Spinner Component
- SVG-based circular spinner
- Continuous rotation animation
- 750ms per full rotation
- Easing: linear

#### Progress Bar (for longer operations)
- Linear progress indicator
- Moves smoothly across the top of the interface
- Either determined (based on actual progress) or indeterminate (animated flow)

### Inline Loading States

#### Button Loading
- Three dots animation as described in Button Interactions
- Button remains in place to avoid layout shifts

#### Field Validation Loading
- Small spinner appears at right side of input during async validation
- Replaces any success/error icons during checking

## Animation Guidelines

### Performance Considerations

- Animate only transform and opacity properties when possible
- Limit the number of simultaneous animations
- Use hardware acceleration for complex animations
- Test animations on low-end devices

### Accessibility Requirements

- Honor user preferences for reduced motion
- No animations that flash or pulse rapidly (photosensitivity)
- All animated states must have non-animated alternatives
- Animations should not prevent access to content

```css
/* Example of respecting reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
  
  /* Alternative indicators for states that relied on animation */
  .validation-shake {
    border-width: 2px !important;
  }
}
```

### Animation in Feature Panel

The right-side feature panel includes more expressive animations:

#### Content Rotation
- Value propositions rotate every 6 seconds
- Fade transition between statements (400ms)
- Slight scale change (98% to 100%)

#### Subtle Background Movement
- Very slow ken-burns effect on background image
- Scale from 100% to 105% over 30 seconds
- Creates subtle liveliness without distraction

## Authentication Flow Interactions

The complete login interaction flow combines these elements:

1. **Page Load**: Sequential fade-in of elements
2. **Form Interaction**: Field focus, input, and validation states
3. **Submission**: Button state changes and loading indicators
4. **Response**: Success transition or error feedback
5. **State Changes**: Smooth transitions between authentication modes

## Implementation Guidance

### React Implementation

```jsx
// Example React component with animations
import { motion } from 'framer-motion';

const LoginForm = () => {
  return (
    <motion.div 
      className="auth-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Form contents */}
    </motion.div>
  );
};
```

### CSS Implementation

```css
/* CSS animation examples */
.auth-form {
  animation: formEntry var(--duration-standard) var(--ease-entry);
}

@keyframes formEntry {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(42, 53, 98, 0.15);
  transition: border-color var(--duration-fast) var(--ease-entry),
              box-shadow var(--duration-fast) var(--ease-entry);
}
```

### Testing Interactions

All interactions should be tested for:

- **Performance**: Smooth on target devices
- **Accessibility**: Works with assistive technology
- **Fallbacks**: Graceful degradation when animations fail
- **Cross-browser compatibility**: Consistent behavior across browsers
- **Reduced motion compatibility**: Respects user preferences

## Authentication Interaction Specifications

Specific interaction specifications for the authentication interface:

1. **Page Load Timing**: 
   - Structure: 0-100ms
   - Logo and header: 100-300ms
   - Form elements: 200-500ms
   - Feature panel: 250-600ms

2. **Input Field Focus**:
   - Border transition: 200ms
   - Glow effect: 200ms
   - Label adjustment (if applicable): 200ms

3. **Button States**:
   - Hover transition: 150ms
   - Active state: 100ms
   - Loading state: 200ms

4. **Form Submission**:
   - Button loading: Immediate
   - Success transition: 300ms
   - Error feedback: 200ms

5. **Error Shake Animation**:
   - Duration: 400ms
   - Pattern: 3px right, 6px left, 6px right, 3px left, center
   - Timing function: ease-out

These specifications ensure a consistent, responsive, and intuitive interaction experience that reinforces the SoloSphere brand while guiding users efficiently through the authentication process.