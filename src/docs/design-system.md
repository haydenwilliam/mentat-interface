# Mentat UI Design System

This document outlines the standardized design system for the Mentat interface. All UI components should follow these guidelines to ensure a consistent look and feel across the application.

## Core Design Principles

- **Consistent Border Width**: All rounded border components use 2px border width
- **Consistent Spacing**: Standard padding and spacing from edges for all containers
- **Thematic Consistency**: All components follow the active color theme
- **Responsive Design**: Components adapt to different screen sizes
- **Accessibility**: High contrast and readability are prioritized

## Utility Classes

The design system provides several utility classes that should be used across the application:

### Container Components

- **`mentat-container`**: Base container styling with rounded corners, 2px border, and background
- **`mentat-card`**: Card styling for content containers
- **`mentat-panel`**: Panel styling for more prominent containers
- **`mentat-header`**: Header bar styling with borders and consistent spacing
- **`mentat-footer`**: Footer bar styling with borders and consistent spacing
- **`mentat-form-element`**: Styling for form inputs and controls
- **`mentat-content-padding`**: Standard content padding
- **`mentat-icon-container`**: Styling for icon containers
- **`mentat-hover-effect`**: Standard hover transitions

## Usage Examples

```tsx
// Example of a card component
<div className="mentat-card mentat-content-padding">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>

// Example of a form input
<form className="mentat-form-element">
  <input type="text" />
</form>

// Example of a container with header
<div className="mentat-container">
  <div className="mentat-header">
    <h3>Header Title</h3>
    <button>Action</button>
  </div>
  <div className="mentat-content-padding">
    Content goes here
  </div>
</div>
```

## Theme Variables

The design system uses the following CSS variables for theming:

- `--mentat-background`: Main background color
- `--mentat-secondary`: Secondary background color
- `--mentat-mid-tone`: Mid-tone accent color
- `--mentat-border`: Border color
- `--mentat-primary`: Primary text/UI color
- `--mentat-highlight`: Highlight/accent color

## Best Practices

1. Always use the utility classes instead of custom CSS when possible
2. Maintain 2px border width consistently across components
3. Use consistent spacing (mentat-content-padding) for content areas
4. For opacity, use the Tailwind `opacity-X` and `bg-opacity-X` classes (not the `/X` shorthand, which requires special configuration)
5. When creating new components, follow the existing patterns
6. Use the provided hover effects for interactive elements

## Opacity Handling

In Tailwind CSS, when working with custom theme colors, use separate opacity classes:

```tsx
// CORRECT - Use these separate classes
<div className="text-mentat-primary opacity-70">Text with opacity</div>
<div className="bg-mentat-secondary bg-opacity-30">Background with opacity</div>
<div className="border-mentat-border border-opacity-50">Border with opacity</div>

// INCORRECT - Don't use shorthand with custom colors
<div className="text-mentat-primary/70">Don't use this</div>
<div className="bg-mentat-secondary/30">Don't use this</div>
<div className="border-mentat-border/50">Don't use this</div>
```

## Extending the Design System

When new UI patterns emerge, extend the design system by:

1. Identifying the common pattern
2. Creating a new utility class in `design-system.css`
3. Documenting the new class in this guide
4. Updating existing components to use the new class 