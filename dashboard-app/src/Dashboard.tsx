import React, { useState } from 'react'

interface DashboardProps {
  onAction?: (message: string, type?: 'success' | 'error' | 'info') => void
}

const Dashboard: React.FC<DashboardProps> = ({ onAction }) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('12 months')
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)


  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric)
    onAction?.(`Viewing details for ${metric}`, 'info')
  }

  const handleTimeFilterClick = (filter: string) => {
    setSelectedTimeFilter(filter)
    onAction?.(`Filtered data for ${filter}`, 'info')
  }

  const handlePostClick = (postId: number) => {
    setSelectedPost(postId)
    onAction?.(`Opening post ${postId}`, 'info')
  }

  const handleMemberClick = (memberId: number) => {
    setSelectedMember(memberId)
    onAction?.(`Viewing member profile ${memberId}`, 'info')
  }

  const handleCreateContent = () => {
    onAction?.('Content creation started!', 'success')
  }

  const handleFiltersClick = () => {
    onAction?.('Filters applied', 'info')
  }
  return (
    <div className="main-content">
      <div className="header">
        <h1>Dashboard</h1>
        <div className="header-controls">
          <div className="time-filters">
            <button 
              className={`filter-btn ${selectedTimeFilter === '12 months' ? 'active' : ''}`}
              onClick={() => handleTimeFilterClick('12 months')}
            >
              12 months
            </button>
            <button 
              className={`filter-btn ${selectedTimeFilter === '30 days' ? 'active' : ''}`}
              onClick={() => handleTimeFilterClick('30 days')}
            >
              30 days
            </button>
            <button 
              className={`filter-btn ${selectedTimeFilter === '7 days' ? 'active' : ''}`}
              onClick={() => handleTimeFilterClick('7 days')}
            >
              7 days
            </button>
            <button 
              className={`filter-btn ${selectedTimeFilter === '24 hours' ? 'active' : ''}`}
              onClick={() => handleTimeFilterClick('24 hours')}
            >
              24 hours
            </button>
          </div>
          <div className="header-actions">
            <button className="date-picker">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Select dates
            </button>
            <button className="filters-btn" onClick={handleFiltersClick}>
              <div className="filters-icon">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </div>
              <span className="filters-text">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="metrics-section">
        <div className="metrics-container">
          <div className="mrr-card">
            <div className="mrr-header">
              <h3 className="mrr-label">MRR</h3>
              <div className="mrr-value-container">
                <span className="mrr-currency">$</span>
                <span className="mrr-amount">18,880</span>
                <div className="mrr-growth-badge">
                  <span className="growth-arrow">↗</span>
                  <span className="growth-percentage">7.4%</span>
                </div>
              </div>
            </div>
            
            <div className="mrr-chart-container">
              <div className="chart-wrapper">
                {/* Y-axis labels */}
                <div className="y-axis-labels">
                  <span className="y-label">$20k</span>
                  <span className="y-label">$15k</span>
                  <span className="y-label">$10k</span>
                  <span className="y-label">$5k</span>
                  <span className="y-label">$0</span>
                </div>
                
                {/* Chart area */}
                <div className="chart-area">
                  {/* Grid lines */}
                  <div className="grid-lines">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>
                  
                  {/* Bar chart */}
                  <div className="bars-container">
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar" style={{ height: '90%' }}></div>
                    <div className="bar" style={{ height: '30%' }}></div>
                    <div className="bar" style={{ height: '70%' }}></div>
                    <div className="bar" style={{ height: '30%' }}></div>
                    <div className="bar" style={{ height: '80%' }}></div>
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar" style={{ height: '70%' }}></div>
                    <div className="bar" style={{ height: '60%' }}></div>
                    <div className="bar" style={{ height: '75%' }}></div>
                    <div className="bar" style={{ height: '90%' }}></div>
                    <div className="bar" style={{ height: '45%' }}></div>
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="x-axis-labels">
                  <span className="x-label">Jan</span>
                  <span className="x-label">Feb</span>
                  <span className="x-label">Mar</span>
                  <span className="x-label">Apr</span>
                  <span className="x-label">May</span>
                  <span className="x-label">Jun</span>
                  <span className="x-label">Jul</span>
                  <span className="x-label">Aug</span>
                  <span className="x-label">Sep</span>
                  <span className="x-label">Oct</span>
                  <span className="x-label">Nov</span>
                  <span className="x-label">Dec</span>
                </div>
              </div>
            </div>
          </div>

          <div className="metrics-sidebar">
            <div 
              className={`metric-item ${selectedMetric === 'Total members' ? 'selected' : ''}`}
              onClick={() => handleMetricClick('Total members')}
            >
              <h4 className="metric-label">Total members</h4>
              <div className="metric-value-container">
                <span className="metric-value">4,862</span>
                <div className="metric-growth-badge">
                  <span className="growth-arrow">↗</span>
                  <span className="growth-percentage">9.2%</span>
                </div>
              </div>
            </div>

            <div 
              className={`metric-item ${selectedMetric === 'Paid members' ? 'selected' : ''}`}
              onClick={() => handleMetricClick('Paid members')}
            >
              <h4 className="metric-label">Paid members</h4>
              <div className="metric-value-container">
                <span className="metric-value">2,671</span>
                <div className="metric-growth-badge">
                  <span className="growth-arrow">↗</span>
                  <span className="growth-percentage">6.6%</span>
                </div>
              </div>
            </div>

            <div 
              className={`metric-item ${selectedMetric === 'Email open rate' ? 'selected' : ''}`}
              onClick={() => handleMetricClick('Email open rate')}
            >
              <h4 className="metric-label">Email open rate</h4>
              <div className="metric-value-container">
                <span className="metric-value">82%</span>
                <div className="metric-growth-badge">
                  <span className="growth-arrow">↗</span>
                  <span className="growth-percentage">8.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="main-content-area">
          <div className="section-header">
            <div className="section-header-content">
              <div className="section-title-section">
                <h2 className="section-title">Start creating content</h2>
              </div>
              <button className="dropdown-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>
            <div className="section-divider"></div>
          </div>

          <div className="cta-cards">
            <div className="cta-card" onClick={handleCreateContent}>
              <div className="cta-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="cta-content">
                <h3>Create your first member</h3>
                <p>Add yourself or import from CSV</p>
              </div>
            </div>
            <div className="cta-card" onClick={handleCreateContent}>
              <div className="cta-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="cta-content">
                <h3>Create a new post</h3>
                <p>Dive into the editor and start creating</p>
              </div>
            </div>
          </div>

          <div className="posts-section">
            <div className="section-header">
              <div className="section-header-content">
                <div className="section-title-section">
                  <h2 className="section-title">Recent posts</h2>
                </div>
                <button className="dropdown-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </div>
              <div className="section-divider"></div>
            </div>

            <div className="posts-grid">
              <div 
                className={`blog-post-card ${selectedPost === 1 ? 'selected' : ''}`}
                onClick={() => handlePostClick(1)}
              >
                <div className="blog-post-image">
                  <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop" alt="UX review presentations" />
                </div>
                <div className="blog-post-content">
                  <div className="blog-post-badge-group">
                    <div className="blog-post-badge">
                      <span>Design</span>
                    </div>
                    <span className="blog-post-read-time">8 min read</span>
                  </div>
                  <div className="blog-post-heading">
                    <h3>UX review presentations</h3>
                    <p>How do you create compelling presentations that wow your colleagues and impress your managers?</p>
                  </div>
                  <div className="blog-post-author">
                    <div className="blog-post-avatar">
                      <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" alt="Olivia Rhye" />
                    </div>
                    <div className="blog-post-author-info">
                      <span className="author-name">Olivia Rhye</span>
                      <span className="author-date">20 Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              <div 
                className={`blog-post-card ${selectedPost === 2 ? 'selected' : ''}`}
                onClick={() => handlePostClick(2)}
              >
                <div className="blog-post-image">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop" alt="Migrating to Linear 101" />
                </div>
                <div className="blog-post-content">
                  <div className="blog-post-badge-group">
                    <div className="blog-post-badge">
                      <span>Product</span>
                    </div>
                    <span className="blog-post-read-time">6 min read</span>
                  </div>
                  <div className="blog-post-heading">
                    <h3>Migrating to Linear 101</h3>
                    <p>Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.</p>
                  </div>
                  <div className="blog-post-author">
                    <div className="blog-post-avatar">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" alt="Phoenix Baker" />
                    </div>
                    <div className="blog-post-author-info">
                      <span className="author-name">Phoenix Baker</span>
                      <span className="author-date">19 Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="members-sidebar">
          <h3>Top members</h3>
          <div className="members-list">
            <div 
              className={`member-item ${selectedMember === 1 ? 'selected' : ''}`}
              onClick={() => handleMemberClick(1)}
            >
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Phoenix Baker</div>
                <div className="member-since">Member since Feb 2025</div>
              </div>
            </div>
            <div 
              className={`member-item ${selectedMember === 2 ? 'selected' : ''}`}
              onClick={() => handleMemberClick(2)}
            >
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Lana Steiner</div>
                <div className="member-since">Member since Jan 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Demi Wilkinson</div>
                <div className="member-since">Member since Mar 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Candice Wu</div>
                <div className="member-since">Member since Feb 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Natali Craig</div>
                <div className="member-since">Member since Mar 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Orlando Diggs</div>
                <div className="member-since">Member since Apr 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Drew Cano</div>
                <div className="member-since">Member since Apr 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Kate Morrison</div>
                <div className="member-since">Member since Jan 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Koray Okumus</div>
                <div className="member-since">Member since Feb 2025</div>
              </div>
            </div>
            <div className="member-item">
              <div className="member-avatar">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Member" />
              </div>
              <div className="member-info">
                <div className="member-name">Ava Wright</div>
                <div className="member-since">Member since Mar 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard