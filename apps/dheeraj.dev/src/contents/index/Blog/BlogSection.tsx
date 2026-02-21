import clsx from 'clsx';
import Link from 'next/link';

import type { TPostFrontMatter } from '@/types';

interface BlogSectionProps {
  posts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className={clsx('content-wrapper')}>
      <div
        className={clsx(
          'mb-8 flex flex-col gap-2',
          'md:flex-row md:items-end md:justify-between'
        )}
      >
        <div className={clsx('flex flex-col gap-1')}>
          <h2
            className={clsx(
              'text-2xl font-black text-slate-900',
              'dark:text-slate-200',
              'md:text-3xl'
            )}
          >
            Latest Blog Posts
          </h2>
          <p className={clsx('text-slate-600', 'dark:text-slate-400')}>
            Discover stories, tutorials, and tech insights.
          </p>
        </div>
        <Link
          href="/blog"
          className={clsx(
            'text-sm font-bold text-blue-600 hover:underline',
            'dark:text-blue-400'
          )}
        >
          View all articles &rarr;
        </Link>
      </div>

      <div className={clsx('grid gap-6', 'sm:grid-cols-2', 'lg:grid-cols-3')}>
        {posts.map(({ slug, frontMatter }) => (
          <Link
            key={slug}
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
        ))}
      </div>
    </div>
  );
}
