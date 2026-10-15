export type SocialLinkId = 'linkedin' | 'website' | 'github'

export type SocialLink = {
  id: SocialLinkId
  label: string
  href: string
}

export type Profile = {
  name: string
  title: string
  location: string
  email: string
  links: readonly SocialLink[]
}

export type Education = {
  institution: string
  degree: string
  cgpa: string
  location?: string
}

export type Experience = {
  company: string
  location: string
  role: string
  period: string
  highlights: readonly string[]
}

export type SkillGroupId =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases-cloud'
  | 'ai-llm'
  | 'tools'

export type SkillGroup = {
  id: SkillGroupId
  label: string
  skills: readonly string[]
}

export type ProjectCaseStudy = {
  problem: string
  approach: string
  architecture: string
  outcome: string
}

export type Project = {
  id: string
  title: string
  pitch: string
  tech: readonly string[]
  repoUrl?: string
  demoUrl?: string
  caseStudy: ProjectCaseStudy
}

export type Portfolio = {
  profile: Profile
  education: Education
  experience: readonly Experience[]
  skills: readonly SkillGroup[]
  projects: readonly Project[]
}

export const portfolio = {
  profile: {
    name: 'Abdullah Tariq',
    title: 'Software Engineer (Full-stack + AI/LLM)',
    location: 'Pakistan',
    email: 'mat57557@gmail.com',
    links: [
      {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/abdullah-tariq-00790221a',
      },
      {
        id: 'website',
        label: 'Website',
        href: 'https://your-website.example',
      },
      {
        id: 'github',
        label: 'Github',
        href: 'https://github.com/atariq12382',
      },
    ],
  },
  education: {
    institution: 'FAST NUCES Faisalabad',
    degree: 'BS Computer Science',
    cgpa: '3.53/4',
    location: 'Faisalabad',
  },
  experience: [
    {
      company: 'QBatch',
      location: 'Faisalabad',
      role: 'Software Engineer',
      period: 'Jan 2026 - Present',
      highlights: [
        'Owned end-to-end feature delivery across backend, frontend and mobile',
        'Architected a pluggable payment system with an interchangeable provider interface (switch gateways with minimal code changes, zero downtime)',
        'Integrated AI tooling into engineering workflows to speed up team delivery',
        'Collaborated with product stakeholders to turn business requirements into technical specs',
        'Built AI-powered workflows with LLM APIs, RAG-based retrieval over app data, and conversational AI (context handling, prompt design, reliable responses)',
      ],
    },
    {
      company: 'Dubizzle Labs',
      location: 'Lahore',
      role: 'Software Engineer',
      period: 'Oct 2024 - Dec 2025',
      highlights: [
        'Boosted app performance 40% by restructuring legacy React components and optimizing WebSocket reconnection (30% fewer API calls, 25% lower real-time latency)',
        'Built multiple dashboards with interactive charts and hierarchical tables (+15% user engagement)',
        'Built reusable generic components (Drag-and-Drop, React Hook Form, Redux) for the CRM platform',
        'Led a 3-member cross-functional team, shipping a mission-critical feature 2 weeks early',
        'Reduced production bugs 25% through testing frameworks and 20+ code reviews',
      ],
    },
    {
      company: 'QBatch',
      location: 'Faisalabad',
      role: 'Associate Software Engineer',
      period: 'Jul 2023 - Oct 2024',
      highlights: [
        'Built and deployed scalable MERN apps, improving page load times',
        'Built a standardized Node.js/Express backend boilerplate used internally',
        'Architected a high-privacy Proxy Browser with custom extensions that masks identifying signals',
      ],
    },
  ],
  skills: [
    {
      id: 'languages',
      label: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'SQL', 'Python', 'C/C++', 'Java'],
    },
    {
      id: 'frontend',
      label: 'Frontend',
      skills: ['React', 'Next.js', 'Redux', 'Tailwind-style CSS'],
    },
    {
      id: 'backend',
      label: 'Backend',
      skills: ['Node.js', 'Express', 'REST', 'Microservices'],
    },
    {
      id: 'databases-cloud',
      label: 'Databases & Cloud',
      skills: [
        'MongoDB',
        'PostgreSQL',
        'MySQL',
        'AWS EC2',
        'AWS S3',
        'Nginx',
      ],
    },
    {
      id: 'ai-llm',
      label: 'AI & LLM',
      skills: [
        'LLM APIs',
        'RAG',
        'Conversational AI',
        'AI Agents',
        'Prompt Engineering',
        'Embeddings',
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      skills: ['Git', 'GitHub', 'WebSocket', 'Agile', 'Jira'],
    },
  ],
  projects: [
    {
      id: 'pluggable-payment-system',
      title: 'Pluggable Payment System',
      pitch:
        'Interchangeable payment providers with minimal code churn and zero-downtime gateway swaps',
      tech: ['RYFT', 'Stripe', 'Django', 'REST'],
      repoUrl: '',
      demoUrl: '',
      caseStudy: {
        problem:
          'Payment gateway changes can require updates across multiple parts of an application, increasing code duplication, regression risk, and the possibility of payment disruptions.',
        approach:
          'Introduced a common provider interface to standardize payment operations. Isolated gateway-specific logic behind interchangeable implementations, minimizing changes to existing business logic and enabling controlled migrations.',
        architecture:
          'Separated payment business logic from provider integrations using a shared interface, provider-specific adapters, and configuration-driven selection. New providers can be added by implementing the interface and validating their behavior through integration tests.',
        outcome:
          'Improved maintainability and flexibility, reduced the impact of gateway changes on existing code, and enabled provider swaps with minimal disruption. The implementation was designed to support zero-downtime transitions.',
      },
    },
    {
      id: 'ai-rag-conversational-workflows',
      title: 'AI/RAG Conversational Workflows',
      pitch:
        'LLM-powered flows with RAG over app data and reliable conversational context',
      tech: ['LLM APIs', 'RAG', 'Embeddings', 'Prompt Engineering'],
      repoUrl: '',
      demoUrl: '',
      caseStudy: {
        problem:
          'LLM responses can lack application-specific context, produce inaccurate answers, or lose relevant information during multi-turn conversations.',
        approach:
          'Integrated LLM APIs with retrieval-augmented generation (RAG) to provide relevant application data as context. Used structured prompts and conversation context to improve response relevance and consistency.',
        architecture:
          'Application data is retrieved and supplied to an orchestration layer, which manages context and prompts before invoking the LLM. The generated responses are returned through application backend services.',
        outcome:
          'Enabled context-aware conversational experiences grounded in application data, improving response relevance and supporting more useful AI-powered workflows.',
      },
    },
    {
      id: 'privacy-proxy-browser',
      title: 'Privacy Proxy Browser',
      pitch:
        'High-privacy browsing with extensions that mask identifying signals',
      tech: ['Node.js', 'Browser Extensions', 'Proxy', 'Electron.js'],
      repoUrl: '',
      demoUrl: '',
      caseStudy: {
        problem:
          'Standard browsing can expose identifying information through network traffic and browser characteristics, creating privacy risks for users.',
        approach:
          'Developed an Electron-based browser with proxy integration and privacy-focused extensions to route traffic through proxies and reduce exposure of identifying browser signals.',
        architecture:
          'Built on Electron, combining the browser interface, proxy-routing layer, and extension-based privacy controls to manage browsing behavior and reduce identifying information exposure.',
        outcome:
          'Delivered a privacy-focused browsing experience with configurable proxy routing and reduced exposure of identifying signals, while accounting for compatibility and performance trade-offs.',
      },
    },
    {
      id: 'analytics-dashboards-suite',
      title: 'Analytics Dashboards Suite',
      pitch:
        'Interactive charts and hierarchical tables that lifted engagement',
      tech: ['React', 'Redux', 'WebSocket', 'Data Viz'],
      repoUrl: '',
      demoUrl: '',
      caseStudy: {
        problem:
          'Limited analytics visibility and complex hierarchical data made it difficult for users to track performance and explore detailed records efficiently.',
        approach:
          'Built interactive charts and hierarchical tables with filtering, sorting, drill-downs, and reusable state management for seamless data exploration.',
        architecture:
          'Developed modular React components integrated with REST APIs, centralized state management, and optimized data fetching for responsive dashboards.',
        outcome:
          'Improved user engagement by 15%, enhanced data accessibility, and increased dashboard maintainability through reusable components.',
      },
    },
  ],
} satisfies Portfolio

export const { profile, education, experience, skills, projects } = portfolio
