'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { PostCard } from './BlogCard';

import type { TPostFrontMatter } from '@/types';

interface BlogSectionProps {
  posts: Array<{ slug: string; frontMatter: TPostFrontMatter }>;
  initialCount?: number;
  step?: number;
}

export default function BlogSection({
  posts,
  initialCount = 6,
  step = 6,
}: BlogSectionProps) {
  const [count, setCount] = useState(initialCount);

  const visiblePosts = useMemo(() => posts.slice(0, count), [posts, count]);
  const hasMore = count < posts.length;

  return (
    <div className="content-wrapper">
      <div
        className={clsx(
          'mb-8 flex flex-col gap-2',
          'md:flex-row md:items-end md:justify-between'
        )}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl dark:text-slate-200">
            Latest Blog Posts
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Discover stories, tutorials, and tech insights.
          </p>
        </div>

        <Link
          href="/blog"
          className="text-sm font-bold text-blue-600 hover:underline dark:text-blue-400"
        >
          View all articles →
        </Link>
      </div>
      <div className="mb-4 text-xs text-zinc-500">
        posts.length: {posts.length} | showing: {visiblePosts.length}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            frontMatter={post.frontMatter}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setCount((c) => Math.min(c + step, posts.length))}
            className={clsx(
              'rounded-md px-4 py-2 text-sm font-medium',
              'border border-white/10 bg-white/[0.04] text-white',
              'transition-colors hover:bg-white/[0.06]'
            )}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
