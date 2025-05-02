# Typography

The SoloSphere typography system is designed to balance professionalism with approachability, ensuring excellent readability across all devices while maintaining a distinct brand voice.

## Primary Typeface: Inter

[Inter](https://fonts.google.com/specimen/Inter) is our primary typeface for all interface elements. This modern sans-serif font offers exceptional readability at all sizes, works well across platforms, and provides a comprehensive set of weights for establishing clear visual hierarchy.

![Inter Font Sample](https://via.placeholder.com/800x200/ffffff/333333?text=Inter+Typography+Sample)

### Character & Qualities

- **Clean and neutral** without being sterile
- **High x-height** for superior readability at small sizes
- **Balanced character width** for efficient use of space
- **Optimized for screens** with careful attention to hinting and rendering
- **Comprehensive glyph set** supporting multiple languages and special characters

### Weights & Usage

The SoloSphere interface uses four strategic weights of Inter to establish hierarchy and visual rhythm:

#### Light (300)
![Inter Light](https://via.placeholder.com/400x60/ffffff/333333?text=Inter+Light+%28300%29)

**Usage:**
- Subtle elements
- Secondary or supporting text
- Large display text
- Decorative elements

#### Regular (400)
![Inter Regular](https://via.placeholder.com/400x60/ffffff/333333?text=Inter+Regular+%28400%29)

**Usage:**
- Body copy
- Form field inputs
- Most interface text
- Secondary buttons

#### Medium (500)
![Inter Medium](https://via.placeholder.com/400x60/ffffff/333333?text=Inter+Medium+%28500%29)

**Usage:**
- Section headings
- Field labels
- Navigation items
- Emphasis within body text

#### Semi-Bold (600)
![Inter Semi-Bold](https://via.placeholder.com/400x60/ffffff/333333?text=Inter+Semi-Bold+%28600%29)

**Usage:**
- Primary buttons
- Main headings
- Strong emphasis
- Key information that needs attention

## Type Scale

The SoloSphere typography system uses a consistent scale that maintains harmony and readability across different screen sizes. 

### Desktop Type Scale (1024px+)

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Heading 1 | 28px | Semi-Bold (600) | 1.2 (34px) | -0.2px |
| Heading 2 | 24px | Semi-Bold (600) | 1.2 (29px) | -0.1px |
| Heading 3 | 20px | Medium (500) | 1.3 (26px) | 0px |
| Subheading | 18px | Medium (500) | 1.4 (25px) | 0px |
| Body | 16px | Regular (400) | 1.5 (24px) | 0px |
| Small/Caption | 14px | Regular (400) | 1.4 (20px) | 0.1px |
| Extra Small | 12px | Medium (500) | 1.4 (17px) | 0.2px |

### Tablet Type Scale (768px - 1023px)

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Heading 1 | 24px | Semi-Bold (600) | 1.2 (29px) | -0.2px |
| Heading 2 | 20px | Semi-Bold (600) | 1.3 (26px) | -0.1px |
| Heading 3 | 18px | Medium (500) | 1.3 (23px) | 0px |
| Subheading | 16px | Medium (500) | 1.4 (22px) | 0px |
| Body | 16px | Regular (400) | 1.5 (24px) | 0px |
| Small/Caption | 13px | Regular (400) | 1.4 (18px) | 0.1px |
| Extra Small | 12px | Medium (500) | 1.4 (17px) | 0.2px |

### Mobile Type Scale (320px - 767px)

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Heading 1 | 20px | Semi-Bold (600) | 1.2 (24px) | -0.1px |
| Heading 2 | 18px | Semi-Bold (600) | 1.3 (23px) | -0.1px |
| Heading 3 | 16px | Medium (500) | 1.3 (21px) | 0px |
| Subheading | 15px | Medium (500) | 1.4 (21px) | 0px |
| Body | 14px | Regular (400) | 1.5 (21px) | 0px |
| Small/Caption | 12px | Regular (400) | 1.4 (17px) | 0.1px |
| Extra Small | 11px | Medium (500) | 1.4 (15px) | 0.2px |

## Typographic Guidelines

### Text Color & Contrast

- Primary text uses Dark Gray (#616161) on light backgrounds
- Secondary text uses Medium Gray (#9E9E9E)
- All text must maintain minimum 4.5:1 contrast ratio with its background (WCAG 2.1 AA)
- Interactive text elements use Deep Indigo (#2A3562)

### Alignment

- Left alignment is the default for all text elements (in LTR languages)
- Center alignment used sparingly for short headlines or isolated elements
- Avoid justified text as it creates uneven spacing and affects readability
- Maintain consistent alignment patterns within sections

### Line Length

- Optimal reading line length is 50-75 characters (approximately 600px max-width)
- Wider containers should use multi-column layouts rather than extending line length
- Form elements should maintain consistent width based on expected input length

### Hierarchy & Emphasis

Create clear hierarchical relationships through:

1. **Size contrast** - Distinct size differences between heading levels
2. **Weight contrast** - Strategic use of font weights to indicate importance
3. **Color contrast** - Primary vs. secondary text colors
4. **Spacing** - Appropriate white space around text elements
5. **Position** - Placement within the visual hierarchy of the page

### Special Text Elements

#### Links

- Links within body text use Deep Indigo (#2A3562)
- Links maintain underlines to ensure accessibility
- Hover state adds slight darkening of the text

#### Lists

- Bulleted lists use 8px indentation
- List items maintain 8px spacing between items
- Custom bullets use Sage Green (#7A9A8E) circles

#### Form Labels

- Position above input fields
- Medium (500) weight at 14px
- 8px spacing between label and input field

#### Buttons

- Text uses Semi-Bold (600) weight
- Primary buttons use white text on Deep Indigo (#2A3562)
- Secondary buttons use Deep Indigo (#2A3562) text on white
- Text buttons use Deep Indigo (#2A3562) without borders
- 16px base size with proportional padding

#### Placeholder Text

- Medium Gray (#9E9E9E) color
- Regular (400) weight
- Same size as input text (16px)

### Responsive Typography Considerations

- Font sizes scale down at established breakpoints
- Line height remains proportionally consistent
- Touch targets maintain minimum 44px × 44px size on mobile
- Critical text remains visible without zooming on mobile devices

## Typography Implementation

### Web Implementation

```css
:root {
  /* Font family */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  
  /* Font weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  
  /* Font sizes - Desktop */
  --font-size-heading-1: 1.75rem; /* 28px */
  --font-size-heading-2: 1.5rem;  /* 24px */
  --font-size-heading-3: 1.25rem; /* 20px */
  --font-size-subheading: 1.125rem; /* 18px */
  --font-size-body: 1rem;     /* 16px */
  --font-size-small: 0.875rem; /* 14px */
  --font-size-xs: 0.75rem;    /* 12px */
  
  /* Line heights */
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.5;
  
  /* Letter spacing */
  --letter-spacing-tight: -0.2px;
  --letter-spacing-normal: 0px;
  --letter-spacing-wide: 0.1px;
  --letter-spacing-wider: 0.2px;
}

/* Responsive typography adjustments */
@media (max-width: 1023px) {
  :root {
    --font-size-heading-1: 1.5rem;  /* 24px */
    --font-size-heading-2: 1.25rem; /* 20px */
    --font-size-heading-3: 1.125rem; /* 18px */
    --font-size-subheading: 1rem;    /* 16px */
  }
}

@media (max-width: 767px) {
  :root {
    --font-size-heading-1: 1.25rem; /* 20px */
    --font-size-heading-2: 1.125rem; /* 18px */
    --font-size-heading-3: 1rem;     /* 16px */
    --font-size-subheading: 0.9375rem; /* 15px */
    --font-size-body: 0.875rem; /* 14px */
    --font-size-small: 0.75rem; /* 12px */
    --font-size-xs: 0.6875rem;  /* 11px */
  }
}
```

### Typography in the Authentication Interface

The login interface applies this typography system in specific ways:

- "Welcome back!" heading uses Heading 1 style (28px/Semi-Bold)
- Form field labels use Medium (500) weight at Small (14px) size
- Input text uses Body style (16px/Regular)
- Login button uses Semi-Bold (600) at Body size (16px)
- "Forgot your password?" link uses Small size (14px) with Regular (400) weight
- Error messages use Small size (14px) with Regular (400) weight in Alert Red
- Feature panel headline uses Heading 2 (24px) with Semi-Bold (600) in white
- Feature panel supporting text uses Body (16px) with Light (300) weight in white