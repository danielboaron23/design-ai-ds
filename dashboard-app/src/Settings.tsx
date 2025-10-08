import { useState } from 'react'
import './App.css'

interface SettingsProps {
  onSave?: (message: string, type?: 'success' | 'error' | 'info') => void
  onError?: (message: string, type?: 'success' | 'error' | 'info') => void
}

function Settings({ onSave, onError }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('My details')
  const [formData, setFormData] = useState({
    firstName: 'Olivia',
    lastName: 'Rhye',
    email: 'olivia@untitledui.com',
    phone: '+1 (555) 0123',
    country: 'United States',
    timezone: 'GMT-8:00 Pacific Time (US & Canada)',
    bio: 'I\'m a product designer and I love creating beautiful, functional designs that solve real problems. I\'m passionate about user experience and always looking for ways to improve the products I work on.',
    website: 'https://untitledui.com'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchQuery, setSearchQuery] = useState('')

  // Simulate form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSave = () => {
    if (!validateForm()) {
      onError?.('Please fix the errors before saving', 'error')
      return
    }

    onSave?.('Settings saved successfully!', 'success')
  }


  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    onSave?.(`Switched to ${tab} settings`, 'info')
  }
  return (
    <div className="settings-page">
      {/* Header Section */}
      <div className="settings-header">
        <div className="settings-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="page-title-section">
                <h1 className="page-title">Settings</h1>
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
                      placeholder="Search" 
                      className="search-field" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="search-shortcut">
                      <span>⌘K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="settings-tabs">
            <div 
              className={`tab ${activeTab === 'My details' ? 'active' : ''}`}
              onClick={() => handleTabChange('My details')}
            >
              <span>My details</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('Profile')}
            >
              <span>Profile</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Password' ? 'active' : ''}`}
              onClick={() => handleTabChange('Password')}
            >
              <span>Password</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Team' ? 'active' : ''}`}
              onClick={() => handleTabChange('Team')}
            >
              <span>Team</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Plan' ? 'active' : ''}`}
              onClick={() => handleTabChange('Plan')}
            >
              <span>Plan</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Billing' ? 'active' : ''}`}
              onClick={() => handleTabChange('Billing')}
            >
              <span>Billing</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Email' ? 'active' : ''}`}
              onClick={() => handleTabChange('Email')}
            >
              <span>Email</span>
            </div>
            <div 
              className={`tab ${activeTab === 'Notifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('Notifications')}
            >
              <span>Notifications</span>
              <div className="tab-badge">2</div>
            </div>
            <div 
              className={`tab ${activeTab === 'Integrations' ? 'active' : ''}`}
              onClick={() => handleTabChange('Integrations')}
            >
              <span>Integrations</span>
            </div>
            <div 
              className={`tab ${activeTab === 'API' ? 'active' : ''}`}
              onClick={() => handleTabChange('API')}
            >
              <span>API</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="settings-content">
        <div className="settings-container">
          {/* Section Header */}
          <div className="section-header">
            <div className="section-header-content">
              <div className="section-title-section">
                <h2 className="section-title">Personal info</h2>
                <p className="section-description">Update your photo and personal details here.</p>
              </div>
              <div className="section-actions">
                <button className="btn-secondary">Cancel</button>
                <button 
                  className="btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="section-divider"></div>
          </div>

          {/* Form */}
          <div className="settings-form">
            {/* Name Fields */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Name</span>
                <span className="required">*</span>
              </div>
              <div className="form-inputs">
                <div className="input-field">
                  <input 
                    type="text" 
                    value={formData.firstName} 
                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="input-field">
                  <input 
                    type="text" 
                    value={formData.lastName} 
                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Email Field */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Email address</span>
                <span className="required">*</span>
              </div>
              <div className="form-inputs">
                <div className="input-field">
                  <div className="input-with-icon">
                    <div className="input-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input 
                      type="email" 
                      value={formData.email} 
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Photo Upload */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Your photo</span>
                <span className="required">*</span>
                <div className="help-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="label-description">This will be displayed on your profile.</p>
              </div>
              <div className="form-inputs">
                <div className="photo-upload-section">
                  <div className="user-avatar">
                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face" alt="User" />
                  </div>
                  <div className="file-upload">
                    <div className="upload-area">
                      <div className="upload-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div className="upload-text">
                        <span className="upload-action">Click to upload</span>
                        <span className="upload-or">or drag and drop</span>
                      </div>
                      <p className="upload-hint">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Role Field */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Role</span>
              </div>
              <div className="form-inputs">
                <div className="input-field">
                  <input type="text" value="Product Designer" className="form-input" />
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Country Field */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Country</span>
              </div>
              <div className="form-inputs">
                <div className="input-field">
                  <div className="select-field">
                    <div className="country-flag">🇦🇺</div>
                    <span className="select-value">Australia</span>
                    <div className="select-arrow">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Timezone Field */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Timezone</span>
                <div className="help-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="form-inputs">
                <div className="input-field">
                  <div className="select-field">
                    <div className="timezone-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="select-value">Pacific Standard Time (PST)</span>
                    <span className="select-timezone">UTC−08:00</span>
                    <div className="select-arrow">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Bio Field */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Bio</span>
                <span className="required">*</span>
                <p className="label-description">Write a short introduction.</p>
              </div>
              <div className="form-inputs">
                <div className="text-editor">
                  <div className="editor-toolbar">
                    <button className="toolbar-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/>
                      </svg>
                    </button>
                    <button className="toolbar-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </button>
                    <button className="toolbar-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h7"/>
                      </svg>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button className="toolbar-btn color-picker">
                      <div className="color-dot"></div>
                    </button>
                    <div className="toolbar-divider"></div>
                    <button className="toolbar-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h7"/>
                      </svg>
                    </button>
                    <button className="toolbar-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h7"/>
                      </svg>
                    </button>
                    <button className="toolbar-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h7"/>
                      </svg>
                    </button>
                  </div>
                  <div className="editor-content">
                    <textarea 
                      className="bio-textarea"
                      placeholder="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                      defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
                    />
                    <div className="resize-handle"></div>
                  </div>
                  <p className="character-count">964 characters left</p>
                </div>
              </div>
            </div>
            <div className="form-divider"></div>

            {/* Portfolio Projects */}
            <div className="form-row">
              <div className="form-label">
                <span className="label-text">Portfolio projects</span>
                <p className="label-description">Share a few snippets of your work.</p>
              </div>
              <div className="form-inputs">
                <div className="portfolio-upload">
                  <div className="upload-area">
                    <div className="upload-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="upload-text">
                      <span className="upload-action">Click to upload</span>
                      <span className="upload-or">or drag and drop</span>
                    </div>
                    <p className="upload-hint">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                  
                  {/* File Queue */}
                  <div className="file-queue">
                    <div className="file-item">
                      <div className="file-icon">
                        <div className="file-type">PDF</div>
                      </div>
                      <div className="file-info">
                        <div className="file-name">Tech design requirements.pdf</div>
                        <div className="file-meta">
                          <span className="file-size">200 KB of 200 KB</span>
                          <div className="file-status">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Complete</span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      <button className="file-delete">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="file-item">
                      <div className="file-icon">
                        <div className="file-type">MP4</div>
                      </div>
                      <div className="file-info">
                        <div className="file-name">Dashboard recording.mp4</div>
                        <div className="file-meta">
                          <span className="file-size">6.4 MB of 16 MB</span>
                          <div className="file-status">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Uploading...</span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <button className="file-delete">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="file-item">
                      <div className="file-icon">
                        <div className="file-type">FIG</div>
                      </div>
                      <div className="file-info">
                        <div className="file-name">Dashboard prototype FINAL.fig</div>
                        <div className="file-meta">
                          <span className="file-size">3.4 MB of 4.2 MB</span>
                          <div className="file-status">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Uploading...</span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <button className="file-delete">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Footer */}
          <div className="section-footer">
            <div className="section-footer-divider"></div>
            <div className="section-footer-actions">
              <button className="btn-secondary">Cancel</button>
              <button className="btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
