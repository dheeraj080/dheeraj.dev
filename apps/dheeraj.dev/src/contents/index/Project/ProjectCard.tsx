import { type ClassValue, clsx } from 'clsx';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

import { GitHubIcon } from '@/components/Icons';

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

/** --- HELPERS --- */
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

/** --- COMPONENT --- */
const ProjectCard = memo(({ project }: { project: Project }) => {
  const { classes: sizeClasses, isSmall } = useMemo(
    () => getCardStyles(project.size),
    [project.size]
  );

  const primaryCta = useMemo(() => {
    if (!project.url) return null;
    return { label: 'Live', href: project.url };
  }, [project.url]);

  const readMoreCta = useMemo(() => {
    if (!project.readMore) return null;
    return { label: 'Read more', href: project.readMore };
  }, [project.readMore]);

  const firstLetter = project.title?.trim()?.charAt(0).toUpperCase() || '•';

  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[28px]',
        'bg-gradient-to-b from-white/10 via-white/5 to-white/0 p-[1px]',
        'transition-transform duration-500 hover:-translate-y-0.5',
        sizeClasses
      )}
    >
      {/* Inner surface */}
      <div
        className={cn(
          'relative flex h-full flex-col rounded-[27px]',
          'border border-white/10 bg-[#0b0b0f]/90 backdrop-blur-xl',
          'px-7 py-7 md:px-8 md:py-8',
          'transition-colors duration-500 group-hover:border-white/20'
        )}
      >
        {/* Background image */}
        {project.thumbnail && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <Image
              src={project.thumbnail}
              alt=""
              fill
              priority={false}
              className="h-full w-full object-cover opacity-[0.18] grayscale transition-all duration-700 group-hover:scale-[1.06] group-hover:opacity-[0.10] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/85 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </div>
        )}

        {/* Header */}
        <div className="relative z-10">
          <header className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {project.year}
            </span>
            <span className="h-px w-8 bg-zinc-800/80" aria-hidden="true" />
            <span className="text-zinc-400">{project.role}</span>
          </header>

          <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-white transition-colors duration-500 group-hover:text-blue-300 md:text-2xl">
            {project.title}
          </h3>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-4 flex flex-col gap-3">
          <p
            className={cn(
              'leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-zinc-200',
              isSmall ? 'line-clamp-2 text-sm' : 'text-[15px]'
            )}
          >
            {project.description}
          </p>

          {project.moreDescription && (
            <p className="hidden max-h-0 translate-y-2 text-sm leading-relaxed text-zinc-500 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:translate-y-0 group-hover:opacity-100 md:block">
              {project.moreDescription}
            </p>
          )}
        </div>

        {/* Tags */}
        {!isSmall && project.tags && project.tags.length > 0 && (
          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-zinc-400 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer / CTA */}
        <footer className="relative z-10 mt-auto flex items-center gap-3 pt-7">
          {primaryCta && (
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-full',
                'bg-white px-5 py-2.5 text-xs font-semibold text-black',
                'transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98]',
                'focus:outline-none focus:ring-2 focus:ring-white/30'
              )}
            >
              {primaryCta.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {readMoreCta &&
            (isExternal(readMoreCta.href) ? (
              <a
                href={readMoreCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 rounded-full',
                  'border-white/12 border bg-white/5 px-5 py-2.5',
                  'text-xs font-semibold text-white',
                  'transition-all duration-200 hover:bg-white/10 active:scale-[0.98]',
                  'focus:outline-none focus:ring-2 focus:ring-white/20'
                )}
              >
                {readMoreCta.label}{' '}
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
                {readMoreCta.label}{' '}
                <ArrowUpRight className="h-4 w-4 text-white/80" />
              </Link>
            ))}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub Repository: ${project.title}`}
              className={cn(
                'ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full',
                'border border-white/10 bg-white/5',
                'transition-all duration-200 hover:bg-white/10 active:scale-[0.98]'
              )}
            >
              <GitHubIcon className="h-5 w-5 text-white transition-transform duration-200 group-hover:scale-110" />
            </a>
          )}
        </footer>

        {/* Watermark */}
        <div
          className="pointer-events-none absolute -bottom-7 -right-5 z-0 select-none opacity-[0.035] transition-opacity duration-700 group-hover:opacity-[0.02]"
          aria-hidden="true"
        >
          <span className="text-[12rem] font-black leading-none text-white">
            {firstLetter}
          </span>
        </div>

        {/* Bottom edge highlight */}
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
