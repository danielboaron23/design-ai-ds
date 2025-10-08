# DESIGN AI DS - Component Specifications

## 🔘 Button Component

### Variants
- **Primary**: Solid background with primary color
- **Secondary**: Outline style with primary border
- **Tertiary**: Text-only button
- **Ghost**: Transparent background with hover state
- **Danger**: Error color variant for destructive actions

### Sizes
- **Small**: 32px height, 12px padding horizontal, 14px font
- **Medium**: 40px height, 16px padding horizontal, 14px font
- **Large**: 48px height, 20px padding horizontal, 16px font

### States
- **Default**: Normal appearance
- **Hover**: Slightly darker/lighter background
- **Active**: Pressed state
- **Disabled**: 50% opacity, no interaction
- **Loading**: Spinner icon, disabled interaction

### Auto-layout Properties
- **Direction**: Horizontal
- **Padding**: Based on size variant
- **Gap**: 8px between icon and text
- **Alignment**: Center

## 📝 Input Component

### Variants
- **Default**: Standard text input
- **Search**: With search icon
- **Password**: With show/hide toggle
- **Textarea**: Multi-line input
- **Select**: Dropdown selection

### Sizes
- **Small**: 32px height
- **Medium**: 40px height
- **Large**: 48px height

### States
- **Default**: Normal border
- **Focus**: Primary color border
- **Error**: Error color border with message
- **Success**: Success color border
- **Disabled**: Gray background, no interaction

### Auto-layout Properties
- **Direction**: Vertical
- **Padding**: 12px horizontal, 8px vertical
- **Gap**: 4px between label and input

## 🏷️ Chip Component

### Variants
- **Default**: Neutral background
- **Primary**: Primary color background
- **Success**: Success color background
- **Warning**: Warning color background
- **Error**: Error color background
- **Outline**: Border only

### Sizes
- **Small**: 24px height, 8px padding
- **Medium**: 32px height, 12px padding
- **Large**: 40px height, 16px padding

### States
- **Default**: Normal appearance
- **Hover**: Slightly darker background
- **Selected**: Primary color background
- **Disabled**: 50% opacity

### Auto-layout Properties
- **Direction**: Horizontal
- **Padding**: Based on size
- **Gap**: 4px between icon and text
- **Alignment**: Center

## 🔄 Toggle Component

### Variants
- **Switch**: Toggle switch
- **Checkbox**: Checkbox style
- **Radio**: Radio button style

### Sizes
- **Small**: 20px toggle, 16px checkbox
- **Medium**: 24px toggle, 20px checkbox
- **Large**: 32px toggle, 24px checkbox

### States
- **Unchecked**: Default state
- **Checked**: Active state
- **Indeterminate**: Partial state (checkbox only)
- **Disabled**: 50% opacity, no interaction

### Auto-layout Properties
- **Direction**: Horizontal
- **Gap**: 8px between toggle and label
- **Alignment**: Center

## 🎯 Icon Component

### Sizes
- **Small**: 16px
- **Medium**: 20px
- **Large**: 24px
- **XLarge**: 32px
- **2XLarge**: 48px

### Variants
- **Filled**: Solid icons
- **Outlined**: Line icons
- **Duotone**: Two-tone icons

### Colors
- **Inherit**: Takes parent color
- **Primary**: Primary color
- **Secondary**: Secondary color
- **Success**: Success color
- **Warning**: Warning color
- **Error**: Error color
- **Neutral**: Gray color

## 📊 Card Component

### Variants
- **Default**: Standard card with shadow
- **Elevated**: Higher shadow
- **Outlined**: Border only
- **Filled**: Background color

### Sizes
- **Small**: 200px min-width
- **Medium**: 300px min-width
- **Large**: 400px min-width
- **Full**: 100% width

### Auto-layout Properties
- **Direction**: Vertical
- **Padding**: 16px
- **Gap**: 12px between elements
- **Alignment**: Stretch

## 🧭 Navigation Component

### Variants
- **Top**: Horizontal top navigation
- **Side**: Vertical sidebar navigation
- **Breadcrumb**: Breadcrumb navigation
- **Tabs**: Tab navigation
- **Pagination**: Page navigation

### States
- **Default**: Normal appearance
- **Active**: Current page/section
- **Hover**: Hover state
- **Disabled**: Non-interactive

### Auto-layout Properties
- **Direction**: Based on variant
- **Padding**: 12px
- **Gap**: 8px between items
- **Alignment**: Center

## 📋 Table Component

### Variants
- **Default**: Standard table
- **Striped**: Alternating row colors
- **Bordered**: All borders visible
- **Hover**: Row hover effects

### Sizes
- **Small**: Compact spacing
- **Medium**: Standard spacing
- **Large**: Spacious spacing

### States
- **Default**: Normal appearance
- **Hover**: Row highlight
- **Selected**: Row selection
- **Sortable**: Column sorting indicators

### Auto-layout Properties
- **Direction**: Vertical
- **Padding**: 12px cell padding
- **Gap**: 1px between rows
- **Alignment**: Left (text), Center (numbers)

## 🎨 Modal Component

### Variants
- **Default**: Standard modal
- **Fullscreen**: Full screen overlay
- **Drawer**: Slide-in from side
- **Popover**: Small overlay

### Sizes
- **Small**: 400px width
- **Medium**: 600px width
- **Large**: 800px width
- **XLarge**: 1000px width

### States
- **Closed**: Hidden
- **Open**: Visible with backdrop
- **Loading**: Loading state

### Auto-layout Properties
- **Direction**: Vertical
- **Padding**: 24px
- **Gap**: 16px between elements
- **Alignment**: Center

## 📱 Responsive Behavior

### Mobile Adaptations
- **Buttons**: Full width on mobile
- **Inputs**: Larger touch targets
- **Cards**: Stack vertically
- **Navigation**: Collapsible menu
- **Tables**: Horizontal scroll or card layout

### Tablet Adaptations
- **Grid**: 8-column layout
- **Spacing**: Reduced margins
- **Typography**: Slightly smaller sizes

### Desktop Adaptations
- **Grid**: 12-column layout
- **Hover States**: All interactive elements
- **Spacing**: Full spacing system
- **Typography**: Full size range


