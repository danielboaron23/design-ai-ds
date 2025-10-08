# DESIGN AI DS - Semantic Tokens & Organization

## 🎯 Semantic Color Tokens

### Brand Colors
```css
--color-brand-primary: var(--color-primary-500);
--color-brand-primary-hover: var(--color-primary-600);
--color-brand-primary-active: var(--color-primary-700);
--color-brand-secondary: var(--color-secondary-500);
--color-brand-secondary-hover: var(--color-secondary-600);
```

### Surface Colors
```css
--color-surface-primary: var(--color-white);
--color-surface-secondary: var(--color-gray-50);
--color-surface-tertiary: var(--color-gray-100);
--color-surface-elevated: var(--color-white);
--color-surface-overlay: rgba(0, 0, 0, 0.5);
```

### Text Colors
```css
--color-text-primary: var(--color-gray-900);
--color-text-secondary: var(--color-gray-600);
--color-text-tertiary: var(--color-gray-500);
--color-text-disabled: var(--color-gray-400);
--color-text-inverse: var(--color-white);
--color-text-link: var(--color-primary-600);
--color-text-link-hover: var(--color-primary-700);
```

### Border Colors
```css
--color-border-primary: var(--color-gray-200);
--color-border-secondary: var(--color-gray-300);
--color-border-focus: var(--color-primary-500);
--color-border-error: var(--color-error);
--color-border-success: var(--color-success);
```

### Status Colors
```css
--color-status-success: var(--color-success);
--color-status-success-bg: #D1FAE5;
--color-status-warning: var(--color-warning);
--color-status-warning-bg: #FEF3C7;
--color-status-error: var(--color-error);
--color-status-error-bg: #FEE2E2;
--color-status-info: var(--color-info);
--color-status-info-bg: #DBEAFE;
```

## 📏 Spacing Tokens

### Component Spacing
```css
--spacing-component-xs: var(--spacing-1);    /* 4px */
--spacing-component-sm: var(--spacing-2);    /* 8px */
--spacing-component-md: var(--spacing-3);    /* 12px */
--spacing-component-lg: var(--spacing-4);    /* 16px */
--spacing-component-xl: var(--spacing-6);    /* 24px */
--spacing-component-2xl: var(--spacing-8);   /* 32px */
```

### Layout Spacing
```css
--spacing-layout-xs: var(--spacing-4);       /* 16px */
--spacing-layout-sm: var(--spacing-6);       /* 24px */
--spacing-layout-md: var(--spacing-8);       /* 32px */
--spacing-layout-lg: var(--spacing-12);      /* 48px */
--spacing-layout-xl: var(--spacing-16);      /* 64px */
--spacing-layout-2xl: var(--spacing-24);     /* 96px */
```

## 🎨 Elevation Tokens

### Shadow Levels
```css
--elevation-0: none;
--elevation-1: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
--elevation-2: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
--elevation-3: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
--elevation-4: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
--elevation-5: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### Z-Index Scale
```css
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
--z-index-toast: 1080;
```

## 📝 Typography Tokens

### Font Family Tokens
```css
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-secondary: 'JetBrains Mono', 'Fira Code', monospace;
--font-family-display: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Size Tokens
```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 28px;
--font-size-4xl: 32px;
--font-size-5xl: 40px;
--font-size-6xl: 48px;
--font-size-7xl: 60px;
--font-size-8xl: 72px;
```

### Line Height Tokens
```css
--line-height-tight: 1.25;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

## 🔲 Border Radius Tokens

```css
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-3xl: 32px;
--radius-full: 9999px;
```

## ⏱️ Animation Tokens

### Duration
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;
```

### Easing
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 📱 Breakpoint Tokens

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## 🏗️ Design System Organization

### Library Structure
```
DESIGN AI DS/
├── 🎨 Foundations/
│   ├── Colors/
│   │   ├── Primary Palette
│   │   ├── Secondary Palette
│   │   ├── Semantic Colors
│   │   └── Neutral Colors
│   ├── Typography/
│   │   ├── Font Families
│   │   ├── Font Sizes
│   │   ├── Font Weights
│   │   └── Line Heights
│   ├── Spacing/
│   │   ├── Base Spacing Scale
│   │   ├── Component Spacing
│   │   └── Layout Spacing
│   ├── Shadows/
│   │   ├── Elevation Levels
│   │   └── Z-Index Scale
│   └── Grid/
│       ├── Desktop Grid
│       ├── Tablet Grid
│       └── Mobile Grid
├── 🧩 Components/
│   ├── Atoms/
│   │   ├── Button
│   │   ├── Input
│   │   ├── Icon
│   │   ├── Chip
│   │   └── Toggle
│   ├── Molecules/
│   │   ├── Search Bar
│   │   ├── Form Field
│   │   ├── Card
│   │   └── Navigation Item
│   └── Organisms/
│       ├── Header
│       ├── Sidebar
│       ├── Table
│       └── Modal
└── 📄 Templates/
    ├── Landing Page
    ├── Dashboard
    ├── Mobile Screen
    └── Form Layout
```

### Naming Convention
```
[ProjectName]/[Category]/[Component]/[Variant]/[State]

Examples:
- DESIGN AI DS/Components/Button/Primary/Default
- DESIGN AI DS/Components/Button/Primary/Hover
- DESIGN AI DS/Components/Input/Text/Focus
- DESIGN AI DS/Foundations/Colors/Primary/500
```

### Component Documentation Structure
Each component should include:
1. **Description**: What the component is and when to use it
2. **Variants**: All available style variations
3. **States**: Interactive states (hover, focus, disabled, etc.)
4. **Accessibility**: WCAG compliance notes
5. **Usage Guidelines**: Do's and don'ts
6. **Code Examples**: Implementation snippets
7. **Design Specs**: Measurements, spacing, colors

### Version Control
- **Major Version**: Breaking changes to API or design
- **Minor Version**: New components or features
- **Patch Version**: Bug fixes and small improvements
- **Documentation**: Changelog for each version


