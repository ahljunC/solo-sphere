# Layout & Grid System

The SoloSphere layout system provides a consistent structural framework that ensures proper spacing, alignment, and responsive behavior across the platform.

## Core Principles

The layout system is built on these foundational principles:

1. **Consistency** - Predictable spacing and structure creates visual harmony
2. **Flexibility** - Adapts gracefully across different viewport sizes
3. **Accessibility** - Ensures content remains legible and interactive elements properly sized
4. **Focus** - Directs attention to the most important content and actions
5. **Breathing Room** - Provides appropriate white space for comfortable reading and interaction

## Base Grid

SoloSphere uses an 8-point grid system as its foundation. This means all spacing values and most component sizes are divisible by 8, creating a consistent visual rhythm throughout the interface.

### Spacing Units

| Unit | Value | Purpose |
|------|-------|---------|
| xs | 8px | Smallest spacing between related elements |
| sm | 16px | Standard spacing between related elements |
| md | 24px | Spacing between distinct elements in the same section |
| lg | 32px | Section padding and major element separation |
| xl | 48px | Section margins and large component spacing |
| xxl | 64px | Page margins and major section separation |

### Implementation Example

```css
:root {
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  --space-xxl: 4rem;    /* 64px */
}
```

## Container System

SoloSphere uses a flexible container system that provides consistent margins and maximum widths across the application.

### Main Container

- Maximum width: 1440px
- Centered in viewport when screen exceeds max width
- Responsive padding:
  - Desktop: 32px (--space-lg)
  - Tablet: 24px (--space-md)
  - Mobile: 16px (--space-sm)

### Content Container

- Maximum width: 1200px
- Centered within main container
- Used for primary content areas to maintain optimal line length

### Narrow Container

- Maximum width: 800px
- Centered within main container
- Used for focused content like forms, single-column layouts, and modal dialogs

### Implementation Example

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
  max-width: 1440px;
}

.container--content {
  max-width: 1200px;
}

.container--narrow {
  max-width: 800px;
}

@media (max-width: 768px) {
  .container {
    padding-left: var(--space-md);
    padding-right: var(--space-md);
  }
}

@media (max-width: 480px) {
  .container {
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  }
}
```

## Column Grid System

For complex layouts, SoloSphere uses a 12-column grid system that provides flexibility in content organization while maintaining consistent proportions.

### Column Structure

- 12 columns provide maximum flexibility
- Gutters between columns: 24px (desktop), 16px (tablet), 16px (mobile)
- Columns automatically stack on smaller viewports

### Responsive Behavior

The column grid adapts to different viewport sizes:

**Desktop (1024px+)**
- Full 12-column layout
- Standard gutters: 24px

**Tablet (768px - 1023px)**
- Adapts to 8-column layout
- Reduced gutters: 16px
- Components span proportionally more columns

**Mobile (320px - 767px)**
- Converts to 4-column layout
- Minimal gutters: 16px
- Most components span full width (4 columns)

### Common Column Patterns

| Layout Type | Desktop | Tablet | Mobile |
|-------------|---------|--------|--------|
| 50/50 Split | 6/6 columns | 4/4 columns | 4/4 columns (stacked) |
| 30/70 Split | 4/8 columns | 3/5 columns | 4/4 columns (stacked) |
| 3-Column | 4/4/4 columns | 4/4/8 columns (wrapping) | 4/4/4 columns (stacked) |
| Sidebar | 3/9 columns | 8 column (stacked) | 4 column (stacked) |

## Login Interface Layout

The SoloSphere login interface uses a special layout that differs from the standard application structure:

### Split-Screen Layout

The authentication page uses a split-screen approach:

**Left Panel (Authentication)** - 40% of screen width (desktop)
- Fixed width with responsive adjustments for smaller screens
- Contains the authentication form and related elements
- Uses the narrow container (max-width: 380px) within this panel
- White background with subtle shadow to create depth

**Right Panel (Brand/Value Proposition)** - 60% of screen width (desktop)
- Visual showcase highlighting platform benefits
- Inspirational imagery with overlay messaging
- Brief, powerful value statements that change subtly on timed rotation

### Responsive Behavior

The split layout adapts across breakpoints:

**Desktop (1024px+)**
- 40/60 split between authentication and feature panels
- Authentication panel: 420px minimum width
- Form centered vertically and horizontally within authentication panel

**Tablet (768px - 1023px)**
- 50/50 split between authentication and feature panels
- Authentication panel: 384px minimum width
- Vertically centered form with adjusted margins

**Mobile (320px - 767px)**
- Stacked vertical layout
- Feature panel becomes banner (25% of viewport height)
- Authentication panel becomes scrollable container (75% of viewport)
- Form width: 100% of container with 24px side margins

## Form Layout Specifications

The authentication form employs specific spacing and layout rules:

**Form Container**
- Maximum width: 380px (desktop)
- Internal padding: 32px (--space-lg)
- Vertical spacing between major sections: 24px (--space-md)
- Vertical spacing between related elements: 16px (--space-sm)

**Input Fields**
- Height: 48px (multiples of 8px grid)
- Full width with 16px (--space-sm) internal padding
- 8px (--space-xs) spacing between label and field
- 8px (--space-xs) border radius

**Login Button**
- Height: 48px (matches input fields)
- Full width with 16px (--space-sm) internal padding
- 8px (--space-xs) border radius
- 24px (--space-md) top margin to separate from fields

**Social Login Options**
- Height: 44px
- 16px (--space-sm) spacing between options
- 32px (--space-lg) top margin from login button
- Equal width, full container width

## Component Spacing Guidelines

These spacing guidelines ensure consistent layout across all interface components:

### Text Elements

- Paragraph margins: 16px (--space-sm) bottom
- Heading margins: 16px (--space-sm) bottom, 32px (--space-lg) top
- List item spacing: 8px (--space-xs) between items
- Inline elements: 4px (--space-xs/2) between related inline elements

### Interactive Elements

- Button groups: 16px (--space-sm) between buttons
- Form field stacking: 24px (--space-md) between fields
- Related checkboxes/radio buttons: 8px (--space-xs) vertical spacing
- Icon + text: 8px (--space-xs) between icon and text

### Containers & Cards

- Card padding: 24px (--space-md)
- Card margins: 24px (--space-md) bottom
- Section spacing: 48px (--space-xl) between major sections
- Container padding: Follows responsive rules (32px/24px/16px)

## Vertical Rhythm

To maintain consistent vertical rhythm throughout the interface:

1. All typography follows the baseline grid (8px)
2. Line heights are set in multiples of 4px
3. Margins and padding use the spacing units defined above
4. Components align to the 8px grid where possible

## Implementation Notes

- Use CSS custom properties for spacing values to maintain consistency
- Implement the grid using either CSS Grid or flexbox
- Use responsive units (rem) for spacing to respect user font size preferences
- Maintain the 8px grid system throughout custom components
- Allow content to determine height while maintaining fixed horizontal structure

## Layout in the Authentication Interface

The authentication interface applies these layout principles in specific ways:

1. **Split-screen responsive layout** as described above
2. **Centered authentication form** with maximum width: 380px
3. **Consistent vertical spacing** between form elements (16px/24px)
4. **Touch-friendly input sizes** (48px height minimum)
5. **Clear visual hierarchy** created through spacing and sizing
6. **Proper breathing room** around all form elements
7. **Maintained 8px grid alignment** throughout all elements