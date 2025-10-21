import React, { useState, useEffect, useRef } from 'react'
import './PostCreationModal.css'
import type { Post } from './types/Post'

interface PostCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (message: string, type: 'success' | 'error' | 'info') => void
}

interface PostData {
  title: string
  content: string
  category: string
  tags: string[]
  coverImage: string | null
  publishTiming: 'now' | 'schedule' | 'draft'
  scheduledDate: string
  visibility: 'all' | 'paid'
  seoTitle: string
  seoDescription: string
}

const PostCreationModal: React.FC<PostCreationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1)
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    category: '',
    tags: [],
    coverImage: null,
    publishTiming: 'draft',
    scheduledDate: '',
    visibility: 'all',
    seoTitle: '',
    seoDescription: ''
  })
  
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const autoSaveTimerRef = useRef<number | undefined>(undefined)
  const modalRef = useRef<HTMLDivElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus title input when modal opens
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => titleInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges) return

    autoSaveTimerRef.current = setTimeout(() => {
      autoSave()
    }, 30000) // 30 seconds

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current as unknown as number)
      }
    }
  }, [postData, hasUnsavedChanges])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('draft_post')
    if (saved && isOpen) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.title || parsed.content) {
          // Ask user if they want to restore
          const restore = window.confirm('You have an unsaved draft. Would you like to restore it?')
          if (restore) {
            setPostData(parsed)
            setHasUnsavedChanges(true)
          } else {
            localStorage.removeItem('draft_post')
          }
        }
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseAttempt()
      }
    }
    
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, hasUnsavedChanges])

  // Handle CMD/CTRL + Enter to publish
  useEffect(() => {
    const handleQuickPublish = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && isOpen) {
        e.preventDefault()
        handlePublish()
      }
    }
    
    window.addEventListener('keydown', handleQuickPublish)
    return () => window.removeEventListener('keydown', handleQuickPublish)
  }, [isOpen, postData])

  const autoSave = () => {
    setIsAutoSaving(true)
    localStorage.setItem('draft_post', JSON.stringify(postData))
    setTimeout(() => {
      setIsAutoSaving(false)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
    }, 500)
  }

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to close?')
      if (!confirm) return
    }
    handleClose()
  }

  const handleClose = () => {
    setStep(1)
    setPostData({
      title: '',
      content: '',
      category: '',
      tags: [],
      coverImage: null,
      publishTiming: 'draft',
      scheduledDate: '',
      visibility: 'all',
      seoTitle: '',
      seoDescription: ''
    })
    setHasUnsavedChanges(false)
    setShowAdvanced(false)
    setErrors({})
    setImagePreview(null)
    onClose()
  }

  const handleInputChange = (field: keyof PostData, value: any) => {
    setPostData(prev => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !postData.tags.includes(tagInput.trim())) {
      handleInputChange('tags', [...postData.tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    handleInputChange('tags', postData.tags.filter(t => t !== tag))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, coverImage: 'Image must be less than 5MB' }))
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        handleInputChange('coverImage', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!postData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (postData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    } else if (postData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }
    
    if (!postData.content.trim()) {
      newErrors.content = 'Content is required'
    } else if (postData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateStep1()) {
      autoSave()
      setStep(2)
    }
  }

  const handleSaveDraft = async () => {
    if (!validateStep1()) return
    
    setIsPublishing(true)
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('draft_post', JSON.stringify({ ...postData, publishTiming: 'draft' }))
      setIsPublishing(false)
      onSuccess('Draft saved successfully! ✓', 'success')
      handleClose()
    }, 1000)
  }

  const handlePublish = async () => {
    if (!validateStep1()) return
    
    setIsPublishing(true)
    
    // Simulate API call
    setTimeout(() => {
      // Create the published post
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: postData.title,
        content: postData.content,
        category: postData.category,
        tags: postData.tags,
        coverImage: postData.coverImage,
        publishTiming: postData.publishTiming,
        scheduledDate: postData.scheduledDate,
        visibility: postData.visibility,
        seoTitle: postData.seoTitle || postData.title,
        seoDescription: postData.seoDescription,
        status: postData.publishTiming === 'now' ? 'published' : postData.publishTiming === 'schedule' ? 'scheduled' : 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: postData.publishTiming === 'now' ? new Date().toISOString() : undefined,
        author: 'You',
        views: 0,
        likes: 0
      }
      
      // Get existing posts from localStorage
      const existingPosts = localStorage.getItem('dashboard_posts')
      const posts: Post[] = existingPosts ? JSON.parse(existingPosts) : []
      
      // Add new post
      posts.unshift(newPost)
      
      // Save back to localStorage
      localStorage.setItem('dashboard_posts', JSON.stringify(posts))
      
      // Remove draft
      localStorage.removeItem('draft_post')
      
      setIsPublishing(false)
      onSuccess('Post published successfully! 🎉', 'success')
      handleClose()
    }, 1500)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      handleCloseAttempt()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="modal-overlay" 
      ref={modalRef}
      onClick={handleBackdropClick}
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>{step === 1 ? 'Create a new post' : 'Publishing options'}</h2>
            <div className="save-indicator">
              {isAutoSaving && <span className="saving">Saving...</span>}
              {!isAutoSaving && lastSaved && (
                <span className="saved">
                  Saved ✓ {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>
          <button className="close-btn" onClick={handleCloseAttempt}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Content</span>
          </div>
          <div className="progress-line" />
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Publish</span>
          </div>
        </div>

        <div className="modal-content">
          {step === 1 ? (
            <div className="step-content step-1">
              {/* Title Input */}
              <div className="form-group">
                <label htmlFor="post-title">Post Title *</label>
                <input
                  ref={titleInputRef}
                  id="post-title"
                  type="text"
                  className={`title-input ${errors.title ? 'error' : ''}`}
                  placeholder="Enter an engaging title for your post..."
                  value={postData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  maxLength={100}
                />
                <div className="input-footer">
                  {errors.title ? (
                    <span className="error-message">{errors.title}</span>
                  ) : (
                    <span className="hint">A clear, descriptive title helps readers find your content</span>
                  )}
                  <span className={`char-count ${postData.title.length > 90 ? 'warning' : ''}`}>
                    {postData.title.length}/100
                  </span>
                </div>
              </div>

              {/* Category Selector */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  className="category-select"
                  value={postData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="">Select a category...</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="news">News & Updates</option>
                  <option value="tutorials">Tutorials</option>
                </select>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <div className="tags-input-container">
                  <div className="tags-list">
                    {postData.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
                      </span>
                    ))}
                    <input
                      id="tags"
                      type="text"
                      className="tag-input"
                      placeholder="Add a tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                  </div>
                </div>
                <span className="hint">Press Enter to add tags</span>
              </div>

              {/* Rich Text Editor */}
              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  className={`content-editor ${errors.content ? 'error' : ''}`}
                  placeholder="Start writing your post... You can use Markdown formatting:

**Bold text**
*Italic text*
[Link text](url)
- List item

Share your thoughts, ideas, and insights with your audience..."
                  value={postData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                />
                {errors.content && (
                  <span className="error-message">{errors.content}</span>
                )}
                <div className="editor-toolbar">
                  <button type="button" title="Bold (Ctrl+B)">
                    <strong>B</strong>
                  </button>
                  <button type="button" title="Italic (Ctrl+I)">
                    <em>I</em>
                  </button>
                  <button type="button" title="Link">🔗</button>
                  <button type="button" title="List">≡</button>
                  <span className="word-count">{postData.content.split(/\s+/).filter(Boolean).length} words</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="step-content step-2">
              {/* Cover Image */}
              <div className="form-group">
                <label>Cover Image</label>
                <div className="image-upload-section">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Cover preview" />
                      <button 
                        type="button" 
                        className="remove-image-btn"
                        onClick={() => {
                          setImagePreview(null)
                          handleInputChange('coverImage', null)
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="image-upload-area">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        <p>Click to upload or drag and drop</p>
                        <span>PNG, JPG up to 5MB</span>
                      </div>
                    </label>
                  )}
                </div>
                {errors.coverImage && <span className="error-message">{errors.coverImage}</span>}
              </div>

              {/* Publication Timing */}
              <div className="form-group">
                <label>When to publish?</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="timing"
                      value="now"
                      checked={postData.publishTiming === 'now'}
                      onChange={(e) => handleInputChange('publishTiming', e.target.value)}
                    />
                    <div className="radio-content">
                      <strong>Publish now</strong>
                      <span>Make it live immediately</span>
                    </div>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="timing"
                      value="schedule"
                      checked={postData.publishTiming === 'schedule'}
                      onChange={(e) => handleInputChange('publishTiming', e.target.value)}
                    />
                    <div className="radio-content">
                      <strong>Schedule for later</strong>
                      <span>Choose a specific date and time</span>
                    </div>
                  </label>
                  {postData.publishTiming === 'schedule' && (
                    <input
                      type="datetime-local"
                      className="schedule-input"
                      value={postData.scheduledDate}
                      onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                    />
                  )}
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="timing"
                      value="draft"
                      checked={postData.publishTiming === 'draft'}
                      onChange={(e) => handleInputChange('publishTiming', e.target.value)}
                    />
                    <div className="radio-content">
                      <strong>Save as draft</strong>
                      <span>Continue editing later</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Visibility */}
              <div className="form-group">
                <label>Who can see this post?</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="visibility"
                      value="all"
                      checked={postData.visibility === 'all'}
                      onChange={(e) => handleInputChange('visibility', e.target.value as any)}
                    />
                    <div className="radio-content">
                      <strong>All members</strong>
                      <span>Everyone can read this post</span>
                    </div>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="visibility"
                      value="paid"
                      checked={postData.visibility === 'paid'}
                      onChange={(e) => handleInputChange('visibility', e.target.value as any)}
                    />
                    <div className="radio-content">
                      <strong>Paid members only</strong>
                      <span>Exclusive content for subscribers</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Advanced SEO Options */}
              <div className="advanced-section">
                <button
                  type="button"
                  className="advanced-toggle"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                    style={{ transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                  Advanced SEO options
                </button>
                
                {showAdvanced && (
                  <div className="advanced-content">
                    <div className="form-group">
                      <label htmlFor="seo-title">SEO Title</label>
                      <input
                        id="seo-title"
                        type="text"
                        placeholder={postData.title || 'Custom title for search engines'}
                        value={postData.seoTitle}
                        onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                        maxLength={60}
                      />
                      <span className="hint">{postData.seoTitle.length}/60 characters</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="seo-description">SEO Description</label>
                      <textarea
                        id="seo-description"
                        placeholder="A brief description for search engines (recommended 120-160 characters)"
                        value={postData.seoDescription}
                        onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                        rows={3}
                        maxLength={160}
                      />
                      <span className="hint">{postData.seoDescription.length}/160 characters</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {step === 1 ? (
            <>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleSaveDraft}
                disabled={isPublishing}
              >
                {isPublishing ? 'Saving...' : 'Save Draft'}
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleContinue}
                disabled={isPublishing}
              >
                Continue to Publish →
              </button>
            </>
          ) : (
            <>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setStep(1)}
                disabled={isPublishing}
              >
                ← Back
              </button>
              <div className="footer-actions">
                <button 
                  type="button" 
                  className="btn btn-ghost" 
                  onClick={handleSaveDraft}
                  disabled={isPublishing}
                >
                  Save as Draft
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handlePublish}
                  disabled={isPublishing || (postData.publishTiming === 'schedule' && !postData.scheduledDate)}
                >
                  {isPublishing ? (
                    <>
                      <span className="spinner"></span>
                      Publishing...
                    </>
                  ) : postData.publishTiming === 'now' ? (
                    'Publish Now'
                  ) : postData.publishTiming === 'schedule' ? (
                    'Schedule Post'
                  ) : (
                    'Save Draft'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
        
        <div className="keyboard-hint">
          💡 Tip: Press <kbd>Cmd</kbd> + <kbd>Enter</kbd> to quick publish
        </div>
      </div>
    </div>
  )
}

export default PostCreationModal


