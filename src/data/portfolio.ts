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
        href: 'https://linkedin.com/in/your-handle',
      },
      {
        id: 'website',
        label: 'Website',
        href: 'https://your-website.example',
      },
      {
        id: 'github',
        label: 'Github',
        href: 'https://github.com/your-handle',
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
      tech: ['TypeScript', 'Node.js', 'Express', 'REST'],
      repoUrl: '',
      demoUrl: '',
      caseStudy: {
        problem:
          'TODO: Describe the business and technical problem that required swappable payment gateways without downtime.',
        approach:
          'TODO: Explain the provider interface, migration strategy, and how you minimized code churn across call sites.',
        architecture:
          'TODO: Document modules, interfaces, configuration, and how new providers are registered and tested.',
        outcome:
          'TODO: Summarize reliability, swap time, and measurable impact (incidents avoided, dev velocity, etc.).',
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
          'TODO: Describe user needs, data sources, and failure modes (hallucinations, stale context, latency).',
        approach:
          'TODO: Explain retrieval design, prompt structure, context windows, and guardrails for reliable responses.',
        architecture:
          'TODO: Map ingestion, embedding store, orchestration, LLM calls, and observability.',
        outcome:
          'TODO: Capture accuracy, response quality, cost/latency tradeoffs, and adoption metrics.',
      },
    },
    {
      id: 'privacy-proxy-browser',
      title: 'Privacy Proxy Browser',
      pitch:
        'High-privacy browsing with extensions that mask identifying signals',
      tech: ['Node.js', 'Browser Extensions', 'Proxy'],
      repoUrl: '',
      demoUrl: '',
      caseStudy: {
        problem:
          'TODO: Define the privacy threat model and which identifying signals needed masking.',
        approach:
          'TODO: Explain proxy routing, extension hooks, and how fingerprinting vectors were reduced.',
        architecture:
          'TODO: Diagram browser, extension, proxy layer, and any backend coordination.',
        outcome:
          'TODO: Note privacy wins, performance impact, and operational constraints.',
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
          'TODO: Describe analytics gaps, user workflows, and data complexity (hierarchies, real-time needs).',
        approach:
          'TODO: Explain chart/table patterns, state management, and WebSocket refresh strategy.',
        architecture:
          'TODO: Outline frontend modules, API contracts, caching, and dashboard composition.',
        outcome:
          'TODO: Include engagement lift (+15% or updated figure), performance, and maintainability wins.',
      },
    },
  ],
} satisfies Portfolio

export const { profile, education, experience, skills, projects } = portfolio
