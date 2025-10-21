import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import type { Post } from './types/Post'
import './Posts.css'

interface PostsProps {
  onAction?: (message: string, type?: 'success' | 'error' | 'info') => void
}

const Posts: React.FC<PostsProps> = ({ onAction }) => {
  const [posts, setPosts] = useLocalStorage<Post[]>('dashboard_posts', [])
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== postId))
      onAction?.('Post deleted successfully', 'success')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#10B981'
      case 'scheduled': return '#F59E0B'
      case 'draft': return '#6B7280'
      default: return '#6B7280'
    }
  }

  return (
    <div className="posts-page">
      <div className="posts-header">
        <div className="posts-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="page-title-section">
                <div className="page-title-with-icon">
                  <svg className="page-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <div>
                    <h1 className="page-title">Posts</h1>
                    <p className="page-subtitle">{posts.length} total posts</p>
                  </div>
                </div>
              </div>
              
              <div className="search-section">
                <div className="search-input-container">
                  <div className="search-input">
                    <div className="search-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search posts..."
                      className="search-field"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button 
              className={`tab ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({posts.length})
            </button>
            <button 
              className={`tab ${filterStatus === 'published' ? 'active' : ''}`}
              onClick={() => setFilterStatus('published')}
            >
              Published ({posts.filter(p => p.status === 'published').length})
            </button>
            <button 
              className={`tab ${filterStatus === 'scheduled' ? 'active' : ''}`}
              onClick={() => setFilterStatus('scheduled')}
            >
              Scheduled ({posts.filter(p => p.status === 'scheduled').length})
            </button>
            <button 
              className={`tab ${filterStatus === 'draft' ? 'active' : ''}`}
              onClick={() => setFilterStatus('draft')}
            >
              Drafts ({posts.filter(p => p.status === 'draft').length})
            </button>
          </div>
        </div>
      </div>

      <div className="posts-content">
        <div className="posts-container">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="empty-title">No posts yet</h3>
              <p className="empty-description">
                {searchQuery 
                  ? 'No posts match your search. Try different keywords.'
                  : 'Start creating content by clicking the "New Post" button in the Dashboard.'
                }
              </p>
            </div>
          ) : (
            <div className="posts-list">
              {filteredPosts.map(post => (
                <div key={post.id} className="post-card">
                  {post.coverImage && (
                    <div className="post-cover">
                      <img src={post.coverImage} alt={post.title} />
                    </div>
                  )}
                  <div className="post-content">
                    <div className="post-header">
                      <div className="post-meta">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(post.status) }}
                        >
                          {post.status}
                        </span>
                        {post.category && (
                          <span className="category-tag">{post.category}</span>
                        )}
                      </div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-excerpt">
                        {post.content.substring(0, 150)}
                        {post.content.length > 150 ? '...' : ''}
                      </p>
                    </div>
                    
                    <div className="post-tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                    
                    <div className="post-footer">
                      <div className="post-info">
                        <span className="author">By {post.author}</span>
                        <span className="date">
                          {post.status === 'published' && post.publishedAt
                            ? `Published ${formatDate(post.publishedAt)}`
                            : post.status === 'scheduled'
                            ? `Scheduled for ${formatDate(post.scheduledDate)}`
                            : `Created ${formatDate(post.createdAt)}`
                          }
                        </span>
                      </div>
                      
                      {post.status === 'published' && (
                        <div className="post-stats">
                          <span className="stat">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {post.views || 0}
                          </span>
                          <span className="stat">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {post.likes || 0}
                          </span>
                        </div>
                      )}
                      
                      <div className="post-actions">
                        <button 
                          className="action-btn"
                          onClick={() => onAction?.('View feature coming soon!', 'info')}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => onAction?.('Edit feature coming soon!', 'info')}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDelete(post.id)}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Posts

