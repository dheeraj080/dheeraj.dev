import { type ClassValue, clsx } from 'clsx';
import { m, useReducedMotion } from 'framer-motion';
// Image was removed as it was defined but never used
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { GitHubIcon } from '@/components/Icons';

import type { ReactNode } from 'react';

/** --- UTILS --- */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isExternal = (href: string) =>
  /^https?:\/\//i.test(href) || href.startsWith('mailto:');

/** --- TYPES --- */
export type CardSizePreset =
  | 'xs'
  | 'small'
  | 'medium'
  | 'wide'
  | 'short'
  | 'large'
  | 'tall'
  | 'xl'
  | 'hero';

export interface CardSizeCustom {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  height?: string;
}

export type CardSize = CardSizePreset | CardSizeCustom;

export interface Project {
  id: string | number;
  title: string;
  description: string;
  moreDescription?: string;
  tags?: string[];
  role: string;
  year: string;
  thumbnail?: string;
  url?: string;
  github?: string;
  readMore?: string;
  size?: CardSize;
}

/** --- CONSTANTS --- */
const COL_MAP = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
} as const;

const ROW_MAP = { 1: 'md:row-span-1', 2: 'md:row-span-2' } as const;

const SIZE_PRESETS: Record<CardSizePreset, string> = {
  xs: 'md:col-span-1 md:row-span-1 h-[260px]',
  small: 'md:col-span-1 md:row-span-1 h-[320px]',
  medium: 'md:col-span-2 md:row-span-1 h-[320px]',
  wide: 'md:col-span-3 md:row-span-1 h-[320px]',
  short: 'md:col-span-2 md:row-span-1 h-[260px]',
  large: 'md:col-span-2 md:row-span-2 h-[660px]',
  tall: 'md:col-span-1 md:row-span-2 h-[660px]',
  xl: 'md:col-span-3 md:row-span-2 h-[660px]',
  hero: 'md:col-span-4 md:row-span-2 h-[720px]',
};

const isCustomSize = (size: CardSize): size is CardSizeCustom =>
  typeof size !== 'string';

const getCardStyles = (size?: CardSize) => {
  if (!size) return { classes: SIZE_PRESETS.small, isSmall: true };

  if (!isCustomSize(size)) {
    const isSmall = size === 'xs' || size === 'small';
    return { classes: SIZE_PRESETS[size] ?? SIZE_PRESETS.small, isSmall };
  }

  const { colSpan = 1, rowSpan = 1, height = 'h-[320px]' } = size;
  return {
    classes: cn(
      COL_MAP[colSpan as keyof typeof COL_MAP],
      ROW_MAP[rowSpan as keyof typeof ROW_MAP],
      height
    ),
    isSmall: colSpan === 1 && rowSpan === 1,
  };
};

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 7h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// FIXED: Provided default value for 'external' to satisfy react/require-default-props
function CtaLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className: string;
  external?: boolean;
}) {
  if (external || isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={false} className={className}>
      {children}
    </Link>
  );
}

/** --- COMPONENT --- */
const ProjectCard = memo(({ project }: { project: Project }) => {
  const reduceMotion = useReducedMotion();

  const { classes: sizeClasses, isSmall } = useMemo(
    () => getCardStyles(project.size),
    [project.size]
  );

  const primaryCta = project.url ? { label: 'Live', href: project.url } : null;
  const readMoreCta = project.readMore
    ? { label: 'Read more', href: project.readMore }
    : null;

  const firstLetter = project.title?.trim()?.charAt(0).toUpperCase() || '•';

  const ctaBase =
    'group/btn inline-flex items-center gap-2 rounded-full text-xs font-semibold ' +
    'transition-all duration-200 active:scale-[0.98] ' +
    'focus-visible:outline-none focus-visible:ring-2';

  return (
    <m.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[28px]',
        'bg-[#0b0b0f]/92 border border-white/10 ring-1 ring-white/[0.06]',
        'shadow-[0_12px_40px_rgba(0,0,0,0.35)]',
        'transition-transform duration-300 hover:-translate-y-1',
        sizeClasses
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col px-7 py-7 md:px-8 md:py-8">
        <header className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {project.year}
          </span>
          <span className="h-px w-8 bg-zinc-800/80" aria-hidden="true" />
          <span className="text-zinc-400">{project.role}</span>
        </header>

        <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-300 md:text-2xl">
          {project.title}
        </h3>

        <div className="mt-4 flex flex-col gap-3">
          <p
            className={cn(
              'leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200',
              isSmall ? 'line-clamp-2 text-sm' : 'text-[15px]'
            )}
          >
            {project.description}
          </p>
        </div>

        {!isSmall && project.tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'rounded-full border border-white/10 bg-white/5 px-3 py-1',
                  'text-[10px] text-zinc-400 backdrop-blur-md',
                  'transition-colors duration-200 hover:border-white/20 hover:text-white'
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {project.moreDescription && !isSmall && (
          <p
            className={cn(
              'mt-4 hidden text-sm leading-relaxed text-zinc-500 md:block',
              'translate-y-1 opacity-0 transition-all duration-300',
              'group-hover:translate-y-0 group-hover:opacity-100'
            )}
          >
            {project.moreDescription}
          </p>
        )}

        <footer className="mt-auto flex items-center gap-3 pt-7">
          {primaryCta && (
            <CtaLink
              href={primaryCta.href}
              className={cn(
                ctaBase,
                'bg-white px-5 py-2.5 text-black',
                'hover:bg-zinc-100',
                'focus-visible:ring-white/30'
              )}
              external
            >
              {primaryCta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </CtaLink>
          )}

          {readMoreCta && (
            <CtaLink
              href={readMoreCta.href}
              className={cn(
                ctaBase,
                'border border-white/10 bg-white/5 px-5 py-2.5 text-white',
                'hover:bg-white/10',
                'focus-visible:ring-white/20'
              )}
            >
              {readMoreCta.label}
              <ArrowUpRight className="h-4 w-4 text-white/80 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </CtaLink>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub Repository: ${project.title}`}
              className={cn(
                'ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full',
                'border border-white/10 bg-white/5',
                'transition-colors duration-200 hover:bg-white/10 active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20'
              )}
            >
              <GitHubIcon className="h-5 w-5 text-zinc-400 transition-colors duration-200 group-hover:text-white" />
            </a>
          )}
        </footer>

        <div
          className="pointer-events-none absolute -bottom-7 -right-5 z-0 select-none opacity-[0.035] transition-opacity duration-700 group-hover:opacity-[0.02]"
          aria-hidden="true"
        >
          <span className="text-[12rem] font-black leading-none text-white">
            {firstLetter}
          </span>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent opacity-70"
          aria-hidden="true"
        />
      </div>
    </m.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;
