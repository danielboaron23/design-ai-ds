# Dashboard Application 🚀

A modern, feature-rich dashboard application built with React, TypeScript, and Vite. Manage your projects, create posts, and track your progress - all with automatic data persistence using browser localStorage.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)

## ✨ Features

### 📊 Dashboard
- Real-time statistics of active projects and posts
- Visual analytics display
- Quick access to key metrics
- Responsive design

### 📁 Projects Management
- Create, view, and manage projects
- Track project progress with visual indicators
- Organize by status, category, and priority
- Filter and search functionality
- Team member assignment
- Due date tracking
- **Persistent storage** - Projects saved automatically

### 📝 Posts & Content Creation
- Rich post creation modal with 2-step workflow
- Auto-save functionality (every 30 seconds)
- Draft recovery system
- Cover image upload
- Tags and categories
- SEO optimization fields
- Schedule posts for later
- Visibility controls (public/paid members)
- Markdown support
- **Persistent storage** - Posts saved automatically

### 💾 Data Persistence
- **Automatic saving** - All data persists in localStorage
- **No server required** - Works completely offline
- **Draft recovery** - Never lose your work
- **Cross-session persistence** - Data survives page refreshes

### 🎨 Design System
- Custom CSS Variables
- Consistent spacing and typography
- Professional color palette
- Smooth animations and transitions
- Fully responsive layout

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to the dashboard app
cd dashboard-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 📂 Project Structure

```
dashboard-app/
├── src/
│   ├── hooks/
│   │   └── useLocalStorage.ts      # Custom hook for localStorage
│   ├── types/
│   │   └── Post.ts                 # TypeScript interfaces
│   ├── App.tsx                     # Main app component
│   ├── Dashboard.tsx               # Dashboard page
│   ├── Projects.tsx                # Projects management
│   ├── Posts.tsx                   # Posts list view
│   ├── PostCreationModal.tsx       # Post creation UI
│   ├── Settings.tsx                # Settings page
│   ├── *.css                       # Component styles
│   └── main.tsx                    # App entry point
├── public/
├── DESIGN-SYSTEM-DOCUMENTATION.md  # Design system guide
├── DATA-PERSISTENCE.md             # Data storage documentation
└── package.json
```

## 🎯 Usage

### Creating a Project
1. Navigate to **Projects** page
2. Click **New Project** button
3. Fill in project details (name, description, category, priority, due date)
4. Click **Create Project**
5. ✅ Automatically saved to localStorage!

### Creating a Post
1. From **Dashboard**, click **Create New Post**
2. **Step 1**: Enter title, content, category, and tags
3. **Step 2**: Add cover image, set publish timing, configure SEO
4. Choose to publish now, schedule, or save as draft
5. ✅ Automatically saved!

### Viewing Your Content
- **Projects**: Navigate to Projects page to see all projects
- **Posts**: Navigate to Posts page to see published, scheduled, and draft posts
- **Dashboard**: See overview statistics

### Data Management
All your data is stored in browser localStorage:
- `dashboard_projects` - All your projects
- `dashboard_posts` - All your posts
- `draft_post` - Current draft being edited

See [DATA-PERSISTENCE.md](./DATA-PERSISTENCE.md) for detailed information.

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Tech Stack
- **React 18.3** - UI library
- **TypeScript 5.5** - Type safety
- **Vite 7.1** - Build tool & dev server
- **CSS Variables** - Custom design system
- **localStorage API** - Data persistence

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 🖥️ Desktop (1920px and above)
- 💻 Laptop (1024px - 1919px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (320px - 767px)

## 🎨 Design System

We use a comprehensive design system with:
- **Color Palette**: Primary, Secondary, Accent, Neutral, Status colors
- **Typography**: Inter font family with defined scales
- **Spacing**: 8px base unit system
- **Components**: Buttons, Inputs, Cards, Modals, Navigation, etc.

See [DESIGN-SYSTEM-DOCUMENTATION.md](./DESIGN-SYSTEM-DOCUMENTATION.md) for details.

## ⚡ Performance

- Lightning-fast development with Vite HMR
- Optimized production builds
- Code splitting
- Lazy loading
- Minimal bundle size

## 🔒 Privacy & Security

- All data stored **locally** in your browser
- No external servers or APIs
- No tracking or analytics
- Your data never leaves your device

⚠️ **Note**: Clear browser data will delete all your content. Consider regular backups for important data.

## 🚧 Future Enhancements

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Real-time collaboration
- [ ] Data export/import (JSON/CSV)
- [ ] Analytics dashboard
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Drag & drop interface
- [ ] File attachments
- [ ] Comments and notes
- [ ] Advanced search and filters

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- Design inspiration from modern dashboard interfaces

---

**Built with ❤️ using React + TypeScript + Vite**
