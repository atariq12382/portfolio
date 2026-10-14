import { profile } from '@/data/portfolio'

export const siteMeta = {
  title: `${profile.name} | Software Engineer`,
  description: `${profile.title} — shipping full-stack products, LLM workflows, and reliable releases.`,
  author: profile.name,
  ogImagePath: '/og-image.svg',
} as const
