'use client';

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
  const [displayLimit, setDisplayLimit] = useState(initialCount);

  const visiblePosts = useMemo(
    () => posts.slice(0, displayLimit),
    [posts, displayLimit]
  );

  const hasMore = displayLimit < posts.length;

  const handleShowMore = () => {
    setDisplayLimit((prev) => Math.min(prev + step, posts.length));
  };

  return (
    <section className="content-wrapper space-y-12 py-12">
      {/* 1. Header Section - Clean Slate Colors */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl dark:text-slate-100">
            Latest Blog Posts
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Discover stories, tutorials, and tech insights.
          </p>
        </div>

        {/* FIX: Switched from text-blue to text-accent (Synced with ProjectCard) */}
        <Link
          href="/blog"
          className="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 text-sm font-bold transition-colors"
        >
          View all articles →
        </Link>
      </header>

      {/* 2. Grid Layout - Spacing synced with Project Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            frontMatter={post.frontMatter}
          />
        ))}
      </div>

      {/* 3. Pagination - Using your .button styles from globals.css */}
      {hasMore && (
        <footer className="flex justify-center pt-8">
          <button
            type="button"
            onClick={handleShowMore}
            className="button button--outline px-8"
          >
            Show more posts
          </button>
        </footer>
      )}
    </section>
  );
}
