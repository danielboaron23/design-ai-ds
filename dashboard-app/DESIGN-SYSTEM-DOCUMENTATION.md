# 🎨 Design System Documentation

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Colors & Color System](#colors--color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Responsive Design](#responsive-design)
7. [Usage Guidelines](#usage-guidelines)

---

## Design Tokens

### CSS Custom Properties (Variables)
All design tokens are defined as CSS custom properties in `:root` for consistency and maintainability.

```css
:root {
  /* Spacing Tokens */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  --spacing-4xl: 40px;
  --spacing-5xl: 48px;
  --spacing-6xl: 64px;
  
  /* Color Tokens */
  --color-primary: #6941c6;
  --color-success: #17b26a;
  --color-text-primary: #181d27;
  --color-text-secondary: #414651;
  --color-text-tertiary: #535862;
  --color-text-quaternary: #717680;
  --color-border-primary: #d5d7da;
  --color-border-secondary: #e9eaeb;
  --color-background-primary: #ffffff;
  --color-background-secondary: #fafafa;
  --color-background-tertiary: #f9fafb;
  
  /* Typography Tokens */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* Shadows */
  --shadow-sm: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  --shadow-md: 0px 4px 8px 0px rgba(10, 13, 18, 0.1);
  --shadow-lg: 0px 8px 16px 0px rgba(10, 13, 18, 0.15);
}
```

---

## Colors & Color System

### Primary Colors
- **Primary**: `#6941c6` (Purple) - Main brand color for buttons, links, and accents
- **Success**: `#17b26a` (Green) - Success states, positive indicators

### Text Colors
- **Primary Text**: `#181d27` - Main content text, headings
- **Secondary Text**: `#414651` - Secondary content, labels
- **Tertiary Text**: `#535862` - Supporting text, descriptions
- **Quaternary Text**: `#717680` - Placeholder text, disabled states

### Background Colors
- **Primary Background**: `#ffffff` - Main background, cards, modals
- **Secondary Background**: `#fafafa` - Subtle backgrounds, hover states
- **Tertiary Background**: `#f9fafb` - Chart backgrounds, input backgrounds

### Border Colors
- **Primary Border**: `#d5d7da` - Main borders, input borders
- **Secondary Border**: `#e9eaeb` - Subtle borders, dividers

### Status Colors
- **Success**: `#17b26a` - Success messages, positive indicators
- **Error**: `#ef4444` - Error states, validation messages
- **Warning**: Not explicitly defined (can be added)
- **Info**: Not explicitly defined (can be added)

### Color Usage Guidelines
- Use primary color for interactive elements and brand accents
- Use text colors in hierarchy: primary → secondary → tertiary → quaternary
- Use background colors to create visual hierarchy and separation
- Use border colors consistently for form elements and content separation

---

## Typography

### Font Family
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`
- **Fallback**: System fonts for better performance and native feel

### Font Sizes
- **XS**: `12px` - Small labels, captions
- **SM**: `14px` - Body text, form labels
- **MD**: `16px` - Default body text, form inputs
- **LG**: `18px` - Section headings, important text
- **XL**: `20px` - Page titles, large headings
- **2XL**: `24px` - Main page headings
- **3XL**: `30px` - Large display text
- **4XL**: `36px` - Hero headings

### Font Weights
- **300**: Light (not used in current system)
- **400**: Regular - Body text
- **500**: Medium - Labels, secondary text
- **600**: Semibold - Headings, important text
- **700**: Bold - Strong emphasis
- **800**: Extra Bold (not used in current system)

### Line Heights
- **Tight**: `1.2` - Headings, compact text
- **Normal**: `1.4` - Body text, default
- **Relaxed**: `1.6` - Long-form content

### Typography Hierarchy
```css
/* Page Title */
.page-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
}

/* Section Title */
.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  line-height: 28px;
  color: var(--color-text-primary);
}

/* Body Text */
body {
  font-size: var(--font-size-md);
  font-weight: 400;
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

/* Small Text */
.small-text {
  font-size: var(--font-size-sm);
  font-weight: 400;
  line-height: var(--line-height-normal);
  color: var(--color-text-tertiary);
}
```

---

## Spacing & Layout

### Spacing Scale
The spacing system uses a consistent scale based on 4px increments:

- **XS**: `4px` - Minimal spacing, tight layouts
- **SM**: `8px` - Small spacing, compact elements
- **MD**: `12px` - Medium spacing, standard gaps
- **LG**: `16px` - Large spacing, comfortable gaps
- **XL**: `20px` - Extra large spacing, section gaps
- **2XL**: `24px` - Double large spacing, major sections
- **3XL**: `32px` - Triple large spacing, page sections
- **4XL**: `40px` - Quadruple large spacing, major layouts
- **5XL**: `48px` - Five times large spacing, hero sections
- **6XL**: `64px` - Six times large spacing, page margins

### Layout Containers
- **Dashboard Container**: Full viewport with sidebar
- **Settings Container**: `1144px` max-width with `32px` padding
- **Content Sections**: Flexible with consistent spacing

### Grid System
- **Sidebar**: `296px` fixed width (desktop)
- **Main Content**: Flexible, fills remaining space
- **Responsive**: Stacks vertically on mobile

### Border Radius
- **SM**: `6px` - Small elements, tags
- **MD**: `8px` - Buttons, inputs, cards
- **LG**: `12px` - Large cards, modals
- **XL**: `16px` - Hero sections, major containers

### Shadows
- **SM**: `0px 1px 2px 0px rgba(10, 13, 18, 0.05)` - Subtle elevation
- **MD**: `0px 4px 8px 0px rgba(10, 13, 18, 0.1)` - Medium elevation
- **LG**: `0px 8px 16px 0px rgba(10, 13, 18, 0.15)` - High elevation

---

## Components

### 1. Buttons

#### Primary Button
```css
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: 10px 14px;
  background: #7f56d9;
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-family-primary);
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
```

**States:**
- **Default**: Purple background with white text
- **Hover**: Darker purple with slight elevation
- **Active**: Pressed state with inner shadows
- **Disabled**: Grayed out with reduced opacity

#### Secondary Button
```css
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #d5d7da;
  border-radius: var(--radius-md);
  font-family: var(--font-family-primary);
  font-size: 14px;
  font-weight: 600;
  color: #414651;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
```

**States:**
- **Default**: White background with gray border
- **Hover**: Light gray background with elevation
- **Active**: Pressed state with inner shadows

#### Filter Buttons
```css
.filter-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  background: var(--color-background-primary);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  border-right: 1px solid var(--color-border-primary);
  transition: all 0.2s ease;
  white-space: nowrap;
}
```

**States:**
- **Default**: White background with gray text
- **Active**: Light gray background with primary text
- **Hover**: Light gray background

### 2. Form Elements

#### Text Input
```css
.form-input {
  width: 100%;
  padding: 10px 14px;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease;
  font-family: var(--font-family-primary);
}
```

**States:**
- **Default**: White background with gray border
- **Focus**: Primary color border
- **Error**: Red border (can be added)
- **Disabled**: Grayed out background

#### Input with Icon
```css
.input-with-icon {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 10px 14px;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

#### Select Field
```css
.select-field {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: 10px 14px;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: border-color 0.2s ease;
}
```

#### Text Editor
```css
.text-editor {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  height: 296px;
  width: 100%;
  position: relative;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
  padding: var(--spacing-xs);
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-md);
  box-shadow: 0px 12px 16px -4px rgba(10, 13, 18, 0.08), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 2px 2px -1px rgba(10, 13, 18, 0.04);
  position: relative;
  z-index: 2;
}

.bio-textarea {
  width: 100%;
  height: 100%;
  padding: var(--spacing-xl);
  background: #ffffff;
  border: 1px solid #d5d7da;
  border-radius: var(--radius-md);
  font-family: var(--font-family-body);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #181d27;
  resize: none;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
}
```

### 3. Navigation

#### Sidebar Navigation
```css
.sidebar {
  width: 296px;
  min-width: 296px;
  background: var(--color-background-primary);
  border-right: 1px solid var(--color-border-secondary);
  display: flex;
  flex-direction: column;
  padding: var(--spacing-3xl) var(--spacing-xl);
  position: relative;
  z-index: 10;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: var(--font-size-md);
  position: relative;
  line-height: var(--line-height-normal);
}
```

**States:**
- **Default**: Gray text with transparent background
- **Hover**: Light gray background with primary text
- **Active**: Light gray background with primary text

#### Tab Navigation
```css
.tab {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
}
```

**States:**
- **Default**: Gray text with transparent background
- **Active**: Light gray background with primary text and shadow
- **Hover**: Light gray background

### 4. Cards & Containers

#### Basic Card
```css
.cta-card {
  flex: 1;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  cursor: pointer;
}
```

**States:**
- **Default**: White background with subtle border and shadow
- **Hover**: Increased shadow with slight elevation

#### Post Card
```css
.post-card {
  flex: 1;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  cursor: pointer;
}
```

**States:**
- **Default**: White background with rounded corners
- **Hover**: Increased shadow with upward movement

#### Metric Card
```css
.mrr-card {
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-sm);
  flex: 1;
  min-width: 0;
}
```

### 5. Data Display

#### Charts
```css
.mrr-chart-container {
  height: 240px;
  background: var(--color-background-tertiary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-2xl) var(--spacing-lg);
  overflow: visible;
  position: relative;
}

.bar {
  flex: 1;
  background: linear-gradient(180deg, var(--color-primary) 0%, rgba(105, 65, 198, 0.8) 100%);
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
  min-height: 4px;
  transition: all 0.3s ease;
  animation: growBar 0.8s ease-out forwards;
  transform-origin: bottom;
  transform: scaleY(0);
}
```

#### Badges
```css
.badge {
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-left: auto;
  min-width: 20px;
  text-align: center;
}

.mrr-growth-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(23, 178, 106, 0.1);
  color: #17b26a;
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  line-height: 18px;
}
```

#### Tags
```css
.tag {
  background: white;
  border: 1px solid #d5d7da;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #414651;
  box-shadow: 0px 1px 2px 0px rgba(10, 13, 18, 0.05);
}
```

### 6. File Upload

#### Upload Area
```css
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-2xl) var(--spacing-3xl);
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-xl);
  text-align: center;
}

.upload-icon {
  width: 40px;
  height: 40px;
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-sm);
}
```

#### File Item
```css
.file-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background: var(--color-background-primary);
  border: 1px solid var(--color-border-secondary);
  border-radius: var(--radius-xl);
  position: relative;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-border-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  transition: width 0.3s ease;
}
```

### 7. Icons & Imagery

#### Icon System
- **Size**: `20px` × `20px` (standard), `16px` × `16px` (small), `24px` × `24px` (large)
- **Color**: Inherits from parent text color
- **Stroke Width**: `2px` for most icons
- **Library**: Heroicons (SVG format)

#### Avatar System
```css
.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.user-avatar::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #17b26a;
  border: 1.5px solid white;
  border-radius: 50%;
}
```

### 8. Feedback & States

#### Loading States
- **Progress Bars**: Animated width transitions
- **File Upload**: Progress indicators with percentage
- **Chart Animations**: Staggered bar growth animations

#### Empty States
- **Upload Areas**: Drag and drop zones with clear instructions
- **Empty Lists**: Placeholder content with call-to-action

#### Success States
- **File Upload**: Green checkmark icons
- **Form Submission**: Success messages (can be added)
- **Growth Indicators**: Green badges with upward arrows

---

## Responsive Design

### Breakpoints
- **Desktop**: `1400px+` - Full layout with sidebar
- **Large Desktop**: `1200px-1399px` - Adjusted spacing
- **Tablet**: `768px-1199px` - Stacked layout, adjusted spacing
- **Mobile**: `480px-767px` - Single column, compact spacing
- **Small Mobile**: `<480px` - Minimal spacing, sticky elements

### Responsive Patterns

#### Sidebar Navigation
```css
@media (max-width: 1024px) {
  .dashboard {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    min-width: auto;
    height: auto;
    padding: var(--spacing-lg);
    border-right: none;
    border-bottom: 1px solid var(--color-border-secondary);
  }
}
```

#### Form Layout
```css
@media (min-width: 1024px) {
  .form-inputs {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-lg);
  }
  
  .input-field {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .form-inputs {
    flex-direction: column;
  }
  
  .input-field {
    width: 100%;
  }
}
```

#### Chart Responsiveness
```css
/* Tablet: Show every 2nd month */
@media (max-width: 1023px) and (min-width: 768px) {
  .x-label:nth-child(2n) {
    display: none;
  }
}

/* Mobile: Show every 3rd month */
@media (max-width: 480px) {
  .x-label:not(:nth-child(3n)) {
    display: none;
  }
}
```

---

## Usage Guidelines

### Design Principles
1. **Consistency**: Use design tokens for all spacing, colors, and typography
2. **Accessibility**: Maintain proper contrast ratios and touch targets
3. **Responsiveness**: Design mobile-first with progressive enhancement
4. **Performance**: Use CSS custom properties for efficient theming

### Component Usage
1. **Buttons**: Use primary for main actions, secondary for supporting actions
2. **Forms**: Always include proper labels and validation states
3. **Navigation**: Maintain consistent active states and hover effects
4. **Cards**: Use appropriate elevation and spacing for content hierarchy

### Color Usage
1. **Primary**: Use sparingly for brand elements and primary actions
2. **Text Hierarchy**: Follow the four-level text color system
3. **Backgrounds**: Use subtle variations to create visual separation
4. **Status Colors**: Use consistently for feedback and state indication

### Spacing Guidelines
1. **Consistency**: Always use design tokens for spacing
2. **Rhythm**: Maintain consistent vertical rhythm between elements
3. **Grouping**: Use larger spacing to separate content sections
4. **Density**: Adjust spacing based on content density and importance

### Typography Guidelines
1. **Hierarchy**: Use font sizes to create clear content hierarchy
2. **Readability**: Maintain appropriate line heights for content type
3. **Consistency**: Use consistent font weights across similar elements
4. **Accessibility**: Ensure sufficient contrast and readable font sizes

---

## Implementation Notes

### CSS Architecture
- **CSS Custom Properties**: All design tokens are defined as CSS variables
- **Component-Based**: Each component has its own CSS class with clear naming
- **Responsive**: Mobile-first approach with progressive enhancement
- **Maintainable**: Clear separation of concerns and consistent naming

### Naming Conventions
- **BEM-like**: Component-based naming with clear hierarchy
- **Semantic**: Class names describe purpose, not appearance
- **Consistent**: Follow established patterns throughout the system

### Browser Support
- **Modern Browsers**: CSS Grid, Flexbox, CSS Custom Properties
- **Fallbacks**: Graceful degradation for older browsers
- **Performance**: Optimized for fast loading and smooth interactions

---

*This design system documentation is based on the analysis of the current application codebase and provides a comprehensive guide for maintaining consistency and scalability across the project.*

