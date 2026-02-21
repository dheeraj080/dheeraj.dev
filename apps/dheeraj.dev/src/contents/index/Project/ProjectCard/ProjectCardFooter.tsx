import Link from 'next/link';
import { useMemo } from 'react';

import { GitHubIcon } from '@/components/Icons';

import ArrowUpRight from './ArrowUpRight';
import { Project } from './types';
import { cn, isExternal } from './utils';

export default function ProjectCardFooter({ project }: { project: Project }) {
  const primaryCta = useMemo(() => {
    if (!project.url) return null;
    return { label: 'Live', href: project.url };
  }, [project.url]);

  const readMoreCta = useMemo(() => {
    if (!project.readMore) return null;
    return { label: 'Read more', href: project.readMore };
  }, [project.readMore]);

  return (
    <footer className="relative z-10 mt-auto flex items-center gap-3 pt-7">
      {/* Live CTA */}
      {primaryCta && (
        <a
          href={primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center gap-2 rounded-md',
            'bg-white px-4 py-2 text-xs font-medium text-black',
            'transition-colors duration-200 hover:bg-zinc-200'
          )}
        >
          {primaryCta.label}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}

      {/* Read More CTA */}
      {readMoreCta &&
        (isExternal(readMoreCta.href) ? (
          <a
            href={readMoreCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 rounded-md',
              'border border-white/10 bg-white/[0.03] px-4 py-2',
              'text-xs font-medium text-white',
              'transition-colors duration-200 hover:bg-white/[0.06]'
            )}
          >
            {readMoreCta.label}
            <ArrowUpRight className="h-4 w-4 text-white/80" />
          </a>
        ) : (
          <Link
            href={readMoreCta.href}
            className={cn(
              'inline-flex items-center gap-2 rounded-full',
              'border-white/12 border bg-white/5 px-5 py-2.5',
              'text-xs font-semibold text-white',
              'transition-all duration-200 hover:bg-white/10 active:scale-[0.98]',
              'focus:outline-none focus:ring-2 focus:ring-white/20'
            )}
          >
            {readMoreCta.label}
            <ArrowUpRight className="h-4 w-4 text-white/80" />
          </Link>
        ))}

      {/* GitHub */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub Repository: ${project.title}`}
          className={cn(
            'ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full',
            'border border-white/10 bg-white/[0.06]',
            'transition-all duration-200 hover:bg-white/[0.10] active:scale-[0.98]'
          )}
        >
          <GitHubIcon className="h-5 w-5 text-white transition-transform duration-200 group-hover:scale-110" />
        </a>
      )}
    </footer>
  );
}
