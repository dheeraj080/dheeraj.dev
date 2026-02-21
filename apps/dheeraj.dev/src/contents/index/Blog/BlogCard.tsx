// components/PostCard.tsx
import clsx from 'clsx';
import Link from 'next/link';

import type { TPostFrontMatter } from '@/types';

interface PostCardProps {
  slug: string;
  frontMatter: TPostFrontMatter;
}

export function PostCard({ slug, frontMatter }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={clsx(
        'group relative flex flex-col gap-3 rounded-3xl border border-slate-200 p-6 transition-all',
        'hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10',
        'dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-500'
      )}
    >
      <div
        className={clsx(
          'text-xs font-bold uppercase tracking-wider text-slate-400'
        )}
      >
        {frontMatter.date}
      </div>
      <h3
        className={clsx(
          'text-xl font-bold text-slate-800',
          'dark:text-slate-100',
          'group-hover:text-blue-600'
        )}
      >
        {frontMatter.title}
      </h3>
      <p
        className={clsx(
          'line-clamp-2 text-sm leading-relaxed text-slate-600',
          'dark:text-slate-400'
        )}
      >
        {frontMatter.description}
      </p>
      <div
        className={clsx(
          'mt-2 text-sm font-bold text-blue-600',
          'dark:text-blue-400',
          'opacity-0 transition-opacity group-hover:opacity-100'
        )}
      >
        Read more &rarr;
      </div>
    </Link>
  );
}
