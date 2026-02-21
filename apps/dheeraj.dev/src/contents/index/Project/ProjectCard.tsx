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
};
const ROW_MAP = { 1: 'md:row-span-1', 2: 'md:row-span-2' };

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

/** --- COMPONENT --- */
const ProjectCard = memo(({ project }: { project: Project }) => {
  const { classes: sizeClasses, isSmall } = useMemo(
    () => getCardStyles(project.size),
    [project.size]
  );

  const primaryCta = useMemo(() => {
    if (project.url) return { label: 'Live Project', href: project.url };
    if (project.readMore) return { label: 'Read more', href: project.readMore };
    return null;
  }, [project.url, project.readMore]);

  const firstLetter = project.title?.trim()?.charAt(0).toUpperCase() || '•';

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[32px]',
        'border border-white/10 bg-[#0f0f0f] p-8',
        'transition-colors duration-500 hover:border-white/20',
        sizeClasses
      )}
    >
      {/* Background Image with optimized overlay */}
      {project.thumbnail && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            className="h-full w-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-10 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
        </div>
      )}

      {/* Header Info */}
      <div className="relative z-10">
        <header className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span>{project.year}</span>
          <span className="h-px w-8 bg-zinc-800" aria-hidden="true" />
          <span>{project.role}</span>
        </header>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
          {project.title}
        </h3>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-4 flex flex-col gap-3">
        <p
          className={cn(
            'leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300',
            isSmall ? 'line-clamp-2 text-sm' : 'text-base'
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

      {/* Footer / CTA Area */}
      <footer className="relative z-10 mt-auto flex flex-col gap-6 pt-6">
        {!isSmall && project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] text-zinc-500 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {primaryCta && (
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200 focus:ring-2 focus:ring-white/30 active:scale-95"
            >
              {primaryCta.label}
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub Repository: ${project.title}`}
              className="group/icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10"
            >
              <GitHubIcon className="h-5 w-5 text-white transition-transform group-hover/icon:scale-110" />
            </a>
          )}

          {project.readMore && (
            <Link
              href={project.readMore}
              className="group/link flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
            >
              <span>Read More</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </footer>

      {/* Watermark Decoration */}
      <div
        className="pointer-events-none absolute -bottom-6 -right-4 select-none opacity-[0.02] transition-opacity group-hover:opacity-[0.01]"
        aria-hidden="true"
      >
        <span className="text-[12rem] font-black leading-none text-white">
          {firstLetter}
        </span>
      </div>
    </m.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
