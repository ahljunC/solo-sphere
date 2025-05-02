# Loader Component Design Specification

## Overview

The Loader component is a critical UI element that provides visual feedback during asynchronous operations. It helps maintain user engagement by indicating that a process is underway, preventing confusion or frustration during wait times.

## Visual Design

The loader uses an animated SVG spinner with the following characteristics:

- **Animation**: Continuous clockwise rotation
- **Structure**: Two-part design with a track and progress indicator
- **Visual Weight**: Light enough not to dominate the UI, but visible enough to be noticed

## Component API

```typescript
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg';
export type LoaderColor = 'primary' | 'light' | 'dark' | 'gray';

export interface LoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
  className?: string;
  label?: string;
}
```

### Properties

| Property  | Type           | Default     | Description                                     |
|-----------|----------------|--------------|-------------------------------------------------|
| size      | LoaderSize     | 'md'         | Controls the diameter of the loader             |
| color     | LoaderColor    | 'primary'    | Sets the color scheme of the loader             |
| className | string         | ''           | Additional CSS classes for customization        |
| label     | string         | 'Loading'    | Accessible text for screen readers              |

### Size Variants

The loader comes in four standard sizes:

| Size | Diameter | Use Case                                      |
|------|----------|-----------------------------------------------|
| xs   | 16px     | Inline text, small buttons                    |
| sm   | 24px     | Small UI elements, compact spaces             |
| md   | 32px     | Default size, suitable for most contexts      |
| lg   | 48px     | Prominent loading states, page-level loading  |

### Color Variants

The loader supports these color variants:

| Variant  | Usage                                           |
|----------|--------------------------------------------------|
| primary  | Default brand color, used in most contexts       |
| light    | For use on dark backgrounds                      |
| dark     | For use on light backgrounds                     |
| gray     | Subdued loading state                            |

## Behavior

- The loader spin animation runs continuously until the loading state is complete
- The animation uses CSS rather than JavaScript for better performance
- The loader maintains its position and size during animation

## Accessibility

- Includes an ARIA role="status" to indicate its purpose to assistive technologies
- Provides an accessible label through aria-label
- Includes screen-reader-only text via sr-only class
- Animation respects user preferences for reduced motion (when implemented in CSS)

## Implementation Examples

### Basic Usage
```tsx
<Loader />
```

### With Custom Size and Color
```tsx
<Loader size="lg" color="light" />
```

### In a Button
```tsx
<Button isLoading>Submit</Button>
```

### With Custom Label
```tsx
<Loader label="Fetching data" />
```

## Integration Guidelines

### Placement

- **Centered**: For full-page or container loading states
- **Inline**: For replacing specific UI elements during loading
- **Button**: Within buttons that triggered an action

### Context

- Use different sizes based on the importance and context of the loading state
- Choose colors that maintain sufficient contrast with the background
- For button loading states, the loader color should match the button text color

## Design Decisions

1. **SVG Implementation**: Chosen for its scalability and animation smoothness
2. **Two-part Design**: The track and spinner design communicates motion clearly
3. **Simple Animation**: A straightforward rotation rather than complex animations for consistent interpretation
4. **Size Variability**: Four distinct sizes for appropriate visual hierarchy in different contexts

## Technical Implementation

The Loader component is implemented in React with TypeScript and uses:

- SVG for vector graphics that scale cleanly
- CSS animations for smooth rotation
- Tailwind CSS for utility classes
- ARIA attributes for accessibility

## Related Components

- **Button**: Uses the Loader in its loading state
- **FormControl**: May display the Loader during form submission
- **DataTable**: Uses the Loader during data fetching operations