import { education } from '@/data/portfolio'

export const ABOUT_BIO =
  'Full-stack engineer who ships from schema to pixel—APIs, React dashboards, and production releases. I have driven ~40% performance wins and ~25% fewer prod bugs while leading features that landed weeks early. Lately I build LLM-powered workflows: RAG over app data, embeddings, and conversational UX with reliable context. I optimize for measurable impact, clean interfaces, and systems teams can extend.'

export type AboutStat = {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export const ABOUT_STATS: readonly AboutStat[] = [
  {
    id: 'performance',
    value: 40,
    suffix: '%',
    label: 'Performance boost',
  },
  {
    id: 'bugs',
    value: 25,
    suffix: '%',
    label: 'Fewer production bugs',
  },
  {
    id: 'schedule',
    value: 2,
    label: 'Weeks ahead of schedule',
  },
  {
    id: 'experience',
    value: 3,
    label: 'Years of experience',
  },
]

export const ABOUT_EDUCATION = education

export const AVATAR_PLACEHOLDER_PATH = '/avatar.svg'
