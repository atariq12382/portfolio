import type { ReactNode } from 'react'
import {
  GithubIcon,
  Linkedin01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Mail } from 'lucide-react'
import Magnet from '@/components/Magnet'
import { profile } from '@/data/portfolio'

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <Magnet padding={48} magnetStrength={2} maxOffset={10}>
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        aria-label={label}
        data-cursor-label={label}
        className="cursor-target flex size-11 items-center justify-center rounded-lg border border-cyan/30 bg-surface/80 text-text transition-colors hover:border-acid/50 hover:text-acid"
      >
        {children}
      </a>
    </Magnet>
  )
}

export function ContactSocialLinks() {
  const linkedin = profile.links.find((l) => l.id === 'linkedin')
  const github = profile.links.find((l) => l.id === 'github')

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SocialIconLink href={`mailto:${profile.email}`} label="Email">
        <Mail className="size-5" aria-hidden />
      </SocialIconLink>
      {linkedin && (
        <SocialIconLink href={linkedin.href} label={linkedin.label}>
          <HugeiconsIcon icon={Linkedin01Icon} size={20} strokeWidth={1.8} />
        </SocialIconLink>
      )}
      {github && (
        <SocialIconLink href={github.href} label={github.label}>
          <HugeiconsIcon icon={GithubIcon} size={20} strokeWidth={1.8} />
        </SocialIconLink>
      )}
    </div>
  )
}
