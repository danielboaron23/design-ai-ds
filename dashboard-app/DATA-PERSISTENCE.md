# Data Persistence Documentation

## Overview
The Dashboard Application uses **localStorage** to persist all user data locally in the browser. This means your data is saved automatically and will remain even after refreshing the page or closing the browser.

## What Gets Saved

### 1. **Projects** 
- Storage Key: `dashboard_projects`
- Includes:
  - Project name, description, category
  - Status (active, completed, on-hold, cancelled)
  - Priority (high, medium, low)
  - Progress percentage
  - Tasks completed/total
  - Due dates
  - Team members
  - Project manager info

### 2. **Posts**
- Storage Key: `dashboard_posts`
- Includes:
  - Post title and content
  - Category and tags
  - Cover image (base64 encoded)
  - Publication status (published, scheduled, draft)
  - Visibility settings
  - SEO metadata
  - Creation and publication dates
  - Author information
  - View and like counts

### 3. **Draft Posts**
- Storage Key: `draft_post`
- Temporarily stores unsaved post data
- Auto-saves every 30 seconds
- Offers recovery on next session

## How It Works

### useLocalStorage Hook
We've created a custom React hook that automatically syncs state with localStorage:

```typescript
const [data, setData] = useLocalStorage('key', initialValue)
```

**Features:**
- Automatic saving on every state change
- Automatic loading on component mount
- Type-safe with TypeScript
- Error handling for storage quota issues

### Auto-Save for Posts
- Posts are auto-saved every 30 seconds while editing
- Draft recovery prompt on next visit
- Manual save options available

## Storage Limits

### Browser localStorage Limits
- Most browsers: **5-10 MB** per domain
- Affects:
  - Number of projects you can create
  - Number of posts you can save
  - Size of images you can upload (recommended < 5MB per image)

### What Happens When Storage is Full?
- You'll receive an error notification
- Consider deleting old posts or projects
- Export important data before clearing

## Data Management

### Viewing Your Data
Open browser DevTools (F12) → Application/Storage → Local Storage → localhost

### Clearing Data
```javascript
// Clear all projects
localStorage.removeItem('dashboard_projects')

// Clear all posts
localStorage.removeItem('dashboard_posts')

// Clear everything
localStorage.clear()
```

### Exporting Data (Future Feature)
We plan to add:
- JSON export functionality
- Backup/restore features
- Sync to cloud storage

## Privacy & Security

### ✅ Advantages
- Data stays on your device
- No server required
- Instant access
- No internet needed after initial load

### ⚠️ Considerations
- Data is **not encrypted** in localStorage
- Anyone with access to your browser can see it
- Clearing browser data will delete everything
- Not synced across devices
- Not backed up automatically

## Best Practices

1. **Regular Backups**: Manually copy important data periodically
2. **Image Optimization**: Compress images before upload to save space
3. **Clean Up**: Delete old/unused projects and posts
4. **Browser Cache**: Don't clear site data if you want to keep your content

## Future Enhancements

### Planned Features
- [ ] Cloud synchronization
- [ ] Data export/import (JSON/CSV)
- [ ] Automatic backups
- [ ] Cross-device sync
- [ ] Collaborative features with real database
- [ ] Offline-first with service workers
- [ ] Data encryption for sensitive information

## Troubleshooting

### Data Not Saving?
1. Check browser storage quota
2. Try in incognito mode (some browsers restrict localStorage)
3. Ensure JavaScript is enabled
4. Check browser console for errors

### Data Lost After Update?
- Browser updates shouldn't affect localStorage
- Check if you accidentally cleared browser data
- Look for backup in browser's "Restore" options

### Want to Start Fresh?
Open Console (F12) and run:
```javascript
localStorage.clear()
location.reload()
```

## Technical Implementation

### File Structure
```
src/
├── hooks/
│   └── useLocalStorage.ts     # Custom hook for localStorage
├── types/
│   └── Post.ts                # TypeScript types for Post
├── Projects.tsx               # Uses localStorage for projects
├── Posts.tsx                  # Displays saved posts
└── PostCreationModal.tsx      # Saves posts to localStorage
```

### Code Example
```typescript
import useLocalStorage from './hooks/useLocalStorage'

function MyComponent() {
  const [data, setData] = useLocalStorage('my_key', [])
  
  const addItem = (newItem) => {
    setData([...data, newItem])  // Automatically saved!
  }
  
  return <div>...</div>
}
```

---

**Note**: This is a client-side storage solution suitable for personal use and prototyping. For production applications with multiple users, consider implementing a proper backend with database storage.

