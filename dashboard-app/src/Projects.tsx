import { useState } from 'react'

interface ProjectsProps {
  onAction?: (message: string, type?: 'success' | 'error' | 'info') => void
}

interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  category: string
  progress: number
  tasksCompleted: number
  totalTasks: number
  dueDate: string
  teamMembers: Array<{
    id: number
    name: string
    avatar: string
  }>
  projectManager: string
  isOverdue: boolean
}

const Projects: React.FC<ProjectsProps> = ({ onAction }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'list' | 'timeline'>('cards')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Sample project data
  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: "E-commerce Mobile App Redesign",
      description: "Complete redesign of the mobile shopping experience with improved UX and modern design patterns.",
      status: 'active',
      priority: 'high',
      category: 'Mobile App',
      progress: 65,
      tasksCompleted: 13,
      totalTasks: 20,
      dueDate: '2024-02-15',
      teamMembers: [
        { id: 1, name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
        { id: 2, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
        { id: 3, name: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'Sarah Chen',
      isOverdue: false
    },
    {
      id: 2,
      name: "Brand Identity System",
      description: "Development of comprehensive brand guidelines including logo variations, color palette, and typography.",
      status: 'completed',
      priority: 'medium',
      category: 'Design',
      progress: 100,
      tasksCompleted: 8,
      totalTasks: 8,
      dueDate: '2024-01-20',
      teamMembers: [
        { id: 4, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
        { id: 5, name: 'Lisa Wang', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'Alex Rivera',
      isOverdue: false
    },
    {
      id: 3,
      name: "Customer Dashboard v2.0",
      description: "Next generation customer portal with advanced analytics and real-time data visualization.",
      status: 'active',
      priority: 'high',
      category: 'Web Development',
      progress: 30,
      tasksCompleted: 6,
      totalTasks: 20,
      dueDate: '2024-03-01',
      teamMembers: [
        { id: 6, name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
        { id: 7, name: 'Rachel Green', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=32&h=32&fit=crop&crop=face' },
        { id: 8, name: 'Tom Wilson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face' },
        { id: 9, name: 'Anna Lee', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'David Kim',
      isOverdue: false
    },
    {
      id: 4,
      name: "Marketing Campaign Landing Page",
      description: "High-converting landing page for Q1 product launch with A/B testing capabilities.",
      status: 'on-hold',
      priority: 'medium',
      category: 'Marketing',
      progress: 80,
      tasksCompleted: 16,
      totalTasks: 20,
      dueDate: '2024-01-30',
      teamMembers: [
        { id: 10, name: 'Chris Taylor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
        { id: 11, name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'Chris Taylor',
      isOverdue: true
    },
    {
      id: 5,
      name: "API Integration Platform",
      description: "Unified platform for managing third-party API integrations with monitoring and analytics.",
      status: 'active',
      priority: 'low',
      category: 'Web Development',
      progress: 45,
      tasksCompleted: 9,
      totalTasks: 20,
      dueDate: '2024-02-28',
      teamMembers: [
        { id: 12, name: 'James Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
        { id: 13, name: 'Sophie Miller', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'James Brown',
      isOverdue: false
    },
    {
      id: 6,
      name: "User Research Study",
      description: "Comprehensive user research to inform product roadmap decisions for next quarter.",
      status: 'completed',
      priority: 'medium',
      category: 'Research',
      progress: 100,
      tasksCompleted: 12,
      totalTasks: 12,
      dueDate: '2024-01-15',
      teamMembers: [
        { id: 14, name: 'Nina Patel', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
        { id: 15, name: 'Ryan O\'Connor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'Nina Patel',
      isOverdue: false
    },
    {
      id: 7,
      name: "Performance Optimization",
      description: "Site speed improvements and Core Web Vitals optimization across all platforms.",
      status: 'active',
      priority: 'high',
      category: 'Web Development',
      progress: 25,
      tasksCompleted: 5,
      totalTasks: 20,
      dueDate: '2024-02-10',
      teamMembers: [
        { id: 16, name: 'Kevin Zhang', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
        { id: 17, name: 'Amy Foster', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'Kevin Zhang',
      isOverdue: false
    },
    {
      id: 8,
      name: "Content Management System",
      description: "New CMS for marketing team with drag-and-drop page builder and content scheduling.",
      status: 'cancelled',
      priority: 'low',
      category: 'Web Development',
      progress: 15,
      tasksCompleted: 3,
      totalTasks: 20,
      dueDate: '2024-01-25',
      teamMembers: [
        { id: 18, name: 'Mark Thompson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
      ],
      projectManager: 'Mark Thompson',
      isOverdue: true
    }
  ])

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter
      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'due-date':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case 'progress':
          return b.progress - a.progress
        case 'recent':
        default:
          return b.id - a.id
      }
    })

  // Calculate stats
  const activeProjects = projects.filter(p => p.status === 'active').length
  const completedThisMonth = projects.filter(p => p.status === 'completed').length
  const teamUtilization = 78 // Mock data
  const avgCompletionTime = 12 // Mock data

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981'
      case 'completed': return '#3B82F6'
      case 'on-hold': return '#F59E0B'
      case 'cancelled': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    onAction?.(`Opening project: ${project.name}`, 'info')
  }

  const handleNewProject = () => {
    setShowNewProjectModal(true)
    onAction?.('Creating new project...', 'info')
  }

  const handleViewToggle = (view: 'cards' | 'list' | 'timeline') => {
    setViewMode(view)
    onAction?.(`Switched to ${view} view`, 'info')
  }

  return (
    <div className="projects-page">
      {/* Header Section */}
      <div className="projects-header">
        <div className="projects-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="page-title-section">
                <div className="page-title-with-icon">
                  <svg className="page-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <h1 className="page-title">Projects</h1>
                    <p className="page-subtitle">{projects.length} projects</p>
                  </div>
                </div>
                <button className="btn-primary" onClick={handleNewProject}>
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Project
                </button>
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
                      placeholder="Search projects..."
                      className="search-field"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => handleViewToggle('cards')}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewToggle('list')}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
              onClick={() => handleViewToggle('timeline')}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="projects-content">
        <div className="projects-container">
          {/* Quick Stats */}
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-label">Active Projects</h3>
                  <div className="stat-trend positive">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
                <div className="stat-value">{activeProjects}</div>
                <div className="stat-change">+2 from last month</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-label">Completed This Month</h3>
                  <div className="stat-trend positive">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
                <div className="stat-value">{completedThisMonth}</div>
                <div className="stat-change">+15% from last month</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-label">Team Utilization</h3>
                  <div className="stat-trend neutral">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </div>
                </div>
                <div className="stat-value">{teamUtilization}%</div>
                <div className="stat-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${teamUtilization}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">
                  <h3 className="stat-label">Avg. Completion Time</h3>
                  <div className="stat-trend negative">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                    </svg>
                  </div>
                </div>
                <div className="stat-value">{avgCompletionTime} days</div>
                <div className="stat-change">+3 days from last month</div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="filters-section">
            <div className="filters-row">
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select 
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select 
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Research">Research</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Sort by</label>
                <select 
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recent">Recent</option>
                  <option value="name">Name A-Z</option>
                  <option value="due-date">Due Date</option>
                  <option value="progress">Progress</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-section">
            {filteredProjects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="empty-title">No projects found</h3>
                <p className="empty-description">Try adjusting your filters or search terms</p>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('all')
                    setCategoryFilter('all')
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={`projects-grid ${viewMode}`}>
                {filteredProjects.map(project => (
                  <div 
                    key={project.id} 
                    className="project-card"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="project-header">
                      <div className="project-title-row">
                        <h3 className="project-title">{project.name}</h3>
                        <div className="project-badges">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(project.status) }}
                          >
                            {project.status.replace('-', ' ')}
                          </span>
                          <div 
                            className="priority-indicator"
                            style={{ backgroundColor: getPriorityColor(project.priority) }}
                          ></div>
                        </div>
                      </div>
                      <div className="project-meta">
                        <span className="category-tag">{project.category}</span>
                        <span className={`due-date ${project.isOverdue ? 'overdue' : ''}`}>
                          Due {formatDate(project.dueDate)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="project-body">
                      <p className="project-description">{project.description}</p>
                      
                      <div className="progress-section">
                        <div className="progress-header">
                          <span className="progress-label">Progress</span>
                          <span className="progress-percentage">{project.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="task-count">
                          {project.tasksCompleted}/{project.totalTasks} tasks completed
                        </div>
                      </div>
                    </div>
                    
                    <div className="project-footer">
                      <div className="team-section">
                        <div className="team-avatars">
                          {project.teamMembers.slice(0, 3).map(member => (
                            <img 
                              key={member.id}
                              src={member.avatar} 
                              alt={member.name}
                              className="team-avatar"
                            />
                          ))}
                          {project.teamMembers.length > 3 && (
                            <div className="team-avatar more">
                              +{project.teamMembers.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="project-manager">
                          <span className="manager-label">PM:</span>
                          <span className="manager-name">{project.projectManager}</span>
                        </div>
                      </div>
                      
                      <div className="project-actions">
                        <button 
                          className="action-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAction?.(`Viewing ${project.name}`, 'info')
                          }}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          className="action-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAction?.(`Editing ${project.name}`, 'info')
                          }}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          className="action-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            onAction?.(`Sharing ${project.name}`, 'info')
                          }}
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="modal-overlay" onClick={() => setShowNewProjectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Create New Project</h2>
              <button 
                className="modal-close"
                onClick={() => setShowNewProjectModal(false)}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-input" placeholder="Enter project name" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Describe the project" rows={3}></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select">
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Research</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-select">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input type="date" className="form-input" />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowNewProjectModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setShowNewProjectModal(false)
                  onAction?.('Project created successfully!', 'success')
                }}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects

