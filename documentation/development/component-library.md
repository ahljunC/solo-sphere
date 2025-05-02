# UI Component Library

This document outlines our standard UI components, their usage patterns, and design specifications. Adhering to these guidelines ensures a consistent user experience across the application.

## Core Design Principles

- **Composability**: Components should be highly composable with clear APIs
- **Consistency**: Components should maintain consistent appearance and behavior
- **Accessibility**: All components must meet WCAG 2.1 AA standards
- **Responsiveness**: Components should adapt gracefully to different screen sizes

## Standard Sizing and Spacing

We use a consistent scale for spacing and sizing throughout the application:

```
// Space scale (multiples of 4px)
space-1: 4px
space-2: 8px
space-3: 12px
space-4: 16px
space-5: 20px
space-6: 24px
space-8: 32px
space-10: 40px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px
```

Apply these spacing values consistently for:
- Margins
- Padding
- Gap between elements
- Component sizes

### Component Spacing Guidelines

| Component Type | Internal Padding | External Margin | Gap/Spacing |
|----------------|------------------|-----------------|-------------|
| Cards          | space-6          | space-4         | space-4     |
| Forms          | space-4          | space-6         | space-4     |
| Buttons        | space-3/space-4  | space-2         | space-3     |
| Dialogs        | space-6          | space-4         | space-4     |
| Lists          | space-2          | space-4         | space-3     |

## Standard Components

### Layout Components

#### Container
Provides standard max-width constraints for content.

```tsx
<Container size="sm|md|lg|xl|full">
  {/* Content */}
</Container>
```

#### Stack
Vertical stack with consistent spacing.

```tsx
<Stack spacing="1|2|3|4|6|8">
  <Component1 />
  <Component2 />
</Stack>
```

#### Grid
Responsive grid layout.

```tsx
<Grid columns={{sm: 1, md: 2, lg: 3}} spacing="4">
  <GridItem />
  <GridItem />
</Grid>
```

### Input Components

See the [Form System Documentation](./form-system.md) for detailed information on form components.

### Feedback Components

#### Alert
For status messages and notifications.

```tsx
<Alert 
  variant="info|success|warning|error" 
  title="Optional title"
>
  Alert content goes here
</Alert>
```

#### Toast
For temporary notifications.

```tsx
showToast({
  title: "Success",
  description: "Your changes have been saved",
  variant: "success|info|warning|error",
  duration: 5000
})
```

### Navigation Components

#### Tabs
For switching between related content sections.

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Breadcrumbs
For indicating current location in hierarchical navigation.

```tsx
<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>Product Details</BreadcrumbItem>
</Breadcrumbs>
```

### Presentation Components

#### Card
Container for related content.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    {/* Card footer */}
  </CardFooter>
</Card>
```

#### Dialog
Modal dialog for focused interactions.

```tsx
<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Optional description</DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Common UI Patterns

### Data Tables

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Empty States

```tsx
<EmptyState
  icon={<Icon />}
  title="No items found"
  description="Try adjusting your search or filters"
  action={<Button>Add Item</Button>}
/>
```

### Loading States

```tsx
<LoadingState
  variant="spinner|skeleton|pulse"
/>

// Skeleton example
<SkeletonText lines={3} />
<SkeletonImage width={300} height={200} />
```

### Data Visualization

```tsx
<Metric
  label="Total Revenue"
  value="$12,345"
  change={+12.3}
  trend="up|down|neutral"
/>

<ProgressBar
  value={65}
  max={100}
  label="Progress"
/>
```

## Composition Patterns

### Feature Cards

```tsx
<FeatureCard
  icon={<Icon />}
  title="Feature Title"
  description="Feature description goes here"
  action={<Button>Action</Button>}
/>
```

### Profile Items

```tsx
<ProfileItem
  avatar="/path/to/avatar.jpg"
  name="John Doe"
  description="john@example.com"
  actions={[
    <Button>Edit</Button>,
    <Button>Delete</Button>
  ]}
/>
```

## Accessibility Considerations

- All interactive elements must be keyboard accessible
- Color should not be the only means of conveying information
- Proper ARIA attributes should be used when necessary
- Text should maintain a minimum contrast ratio of 4.5:1
- Focus states should be clearly visible

## Best Practices

1. **Composition Over Configuration**: Prefer composing smaller components rather than creating highly configurable components
2. **Controlled vs. Uncontrolled**: Support both patterns where appropriate
3. **Progressive Enhancement**: Design for basic functionality first, then enhance
4. **Responsive Design**: All components should work well on all screen sizes
5. **Performance**: Ensure components don't cause unnecessary re-renders
6. **Documentation**: All components should be well-documented with usage examples

## Example Implementation

For reference, see the following component implementations:

- Button: `src/components/ui/Button/Button.tsx`
- Form components: `src/components/ui/Form/*`
- Card: `src/components/ui/Card/Card.tsx`