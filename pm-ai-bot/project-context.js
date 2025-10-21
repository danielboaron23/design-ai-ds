// 📁 Project Context for PM AI Bot
// This file contains all the project knowledge that PM AI uses

const PROJECT_CONTEXT = {
  project: {
    name: "Dashboard Application",
    type: "Social Media Management Dashboard",
    description: "A comprehensive dashboard for managing social media content, projects, and team collaboration",
    status: "Active Development"
  },
  
  technologies: {
    frontend: {
      framework: "React",
      language: "TypeScript",
      buildTool: "Vite",
      styling: "CSS Variables + Custom Design System"
    },
    backend: {
      status: "To be implemented",
      planned: "Node.js + Express"
    }
  },

  designSystem: {
    name: "Custom Design System",
    foundations: {
      colors: {
        primary: "#6366F1",
        secondary: "#8B5CF6",
        accent: "#EC4899",
        neutral: "#64748B",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444"
      },
      spacing: "8px base unit",
      typography: "Inter font family",
      borderRadius: "8px, 12px, 16px",
      shadows: "Multiple elevation levels"
    },
    components: [
      "Button",
      "Input",
      "Card",
      "Modal",
      "Navigation",
      "Table",
      "Form",
      "Badge",
      "Avatar",
      "Dropdown"
    ]
  },

  features: {
    current: [
      "Dashboard Overview",
      "Projects Management",
      "Settings Panel",
      "Post Creation Modal",
      "Navigation System"
    ],
    planned: [
      "Team Collaboration",
      "Analytics Dashboard",
      "Content Calendar",
      "AI Content Suggestions",
      "Multi-platform Publishing"
    ]
  },

  userRoles: [
    "Admin",
    "Content Creator",
    "Viewer"
  ]
};

const PM_AI_CAPABILITIES = `
You are an expert Product Manager AI with the following capabilities:

🎯 **Core Responsibilities:**
- Product strategy and roadmap planning
- Feature prioritization and scope definition
- User story creation and refinement
- Technical feasibility assessment
- Design system guidance
- Sprint planning assistance
- Stakeholder communication

📋 **What you can help with:**
1. **Feature Planning**: Break down features into user stories and tasks
2. **Technical Decisions**: Advise on architecture, tech stack, and implementation approach
3. **Design System**: Guide on component usage, styling, and consistency
4. **Project Management**: Help with sprint planning, priorities, and timelines
5. **Documentation**: Create PRDs, user stories, and technical specs
6. **Problem Solving**: Debug issues, suggest solutions, optimize workflows

💡 **Response Style:**
- Be clear and actionable
- Provide specific examples from the current project
- Consider both user needs and technical constraints
- Think strategically about long-term implications
- Communicate in Hebrew or English based on user preference
`;

const CURSOR_PROMPT_TEMPLATES = {
  component: `Create a new React component with TypeScript following our design system:
- Use CSS variables from our design system
- Follow our naming conventions
- Include proper TypeScript types
- Ensure responsive design
- Add proper accessibility features`,

  feature: `Implement this feature considering:
- Current project architecture
- Design system consistency
- User experience flow
- Performance implications
- Future scalability`,

  bugfix: `Debug and fix the issue:
- Identify root cause
- Provide minimal reproduction
- Suggest fix with explanation
- Consider edge cases
- Test thoroughly`,

  refactor: `Refactor the code to:
- Improve readability
- Enhance performance
- Follow best practices
- Maintain backward compatibility
- Add proper documentation`
};

module.exports = {
  PROJECT_CONTEXT,
  PM_AI_CAPABILITIES,
  CURSOR_PROMPT_TEMPLATES
};

