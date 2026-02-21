// components/BlogSection.tsx
import clsx from 'clsx';
import Link from 'next/link';

import { PostCard } from './BlogCard';

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
      {/* Header Section */}
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

      {/* Grid Layout */}
      <div className={clsx('grid gap-6', 'sm:grid-cols-2', 'lg:grid-cols-3')}>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
