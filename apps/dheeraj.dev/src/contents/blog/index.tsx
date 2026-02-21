import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import useContentMeta from '@/hooks/useContentMeta';

import PostPreview from '@/contents/blog/PostPreview';

import type { TPostFrontMatter } from '@/types';

const PINNED_POST = 'the-2023-retrospective';
const ALL = 'All';

export type BlogContentsProps = {
  posts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
};

type TPostPreview = TPostFrontMatter & {
  slug: string;
  shares: number;
  views: number;
};

function BlogContents({ posts }: BlogContentsProps) {
  const { data } = useContentMeta();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const { pinnedPost, regularPosts, categories } = useMemo(() => {
    let pinned: TPostPreview | undefined;
    const categorySet = new Set<string>();

    const regular: TPostPreview[] = posts.reduce<TPostPreview[]>(
      (acc, { slug, frontMatter }) => {
        const { shares = 0, views = 0 } = data?.[slug]?.meta ?? {};

        const preview: TPostPreview = {
          slug,
          views,
          shares,
          ...frontMatter,
        };

        categorySet.add(frontMatter.category);

        if (slug === PINNED_POST) pinned = preview;
        else acc.push(preview);

        return acc;
      },
      []
    );

    const cats = [
      ALL,
      ...Array.from(categorySet).sort((a, b) => a.localeCompare(b)),
    ];

    return { pinnedPost: pinned, regularPosts: regular, categories: cats };
  }, [posts, data]);

  // If posts/categories change and the selected category no longer exists, fall back to ALL
  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(ALL);
    }
  }, [categories, activeCategory]);

  const filteredPinned =
    pinnedPost &&
    (activeCategory === ALL || pinnedPost.category === activeCategory)
      ? pinnedPost
      : undefined;

  const filteredPosts = useMemo(() => {
    const base =
      activeCategory === ALL
        ? regularPosts
        : regularPosts.filter((p) => p.category === activeCategory);

    // Defensive: ensure pinned slug is not duplicated in the list in any weird data scenario
    return base.filter((p) => p.slug !== PINNED_POST);
  }, [activeCategory, regularPosts]);

  return (
    <div className="content-wrapper">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[220px_1fr]">
        {/* ================= LEFT FILTER ================= */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-100">
            Categories
          </div>

          <div
            className={clsx(
              'flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden',
              'lg:max-h-[70vh]',
              '[-ms-overflow-style:none] [scrollbar-width:none]',
              '[&::-webkit-scrollbar]:hidden'
            )}
          >
            {categories.map((cat) => {
              const isActive = cat === activeCategory;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    'shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition',
                    'text-left',
                    isActive
                      ? [
                          'bg-slate-900 text-white',
                          'dark:bg-white dark:text-slate-900',
                        ]
                      : [
                          'text-slate-700 hover:bg-slate-100',
                          'dark:text-slate-300 dark:hover:bg-white/10',
                        ]
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ================= POSTS ================= */}
        <main className="flex flex-col">
          {filteredPinned && (
            <section className="mb-10">
              <PostPreview
                featured
                pinned
                slug={filteredPinned.slug}
                category={filteredPinned.category}
                title={filteredPinned.title}
                description={filteredPinned.description}
                date={filteredPinned.date}
                lang={filteredPinned.lang}
                tags={filteredPinned.tags}
                image={filteredPinned.image}
                views={filteredPinned.views}
                shares={filteredPinned.shares}
              />
            </section>
          )}

          <section className="flex flex-col">
            {filteredPosts.map((post) => (
              <PostPreview
                key={post.slug}
                slug={post.slug}
                category={post.category}
                title={post.title}
                description={post.description}
                date={post.date}
                lang={post.lang}
                tags={post.tags}
                image={post.image}
                views={post.views}
                shares={post.shares}
              />
            ))}

            {!filteredPinned && filteredPosts.length === 0 && (
              <div className="border-divider-light dark:border-divider-dark rounded-xl border p-6 text-slate-600 dark:text-slate-400">
                No posts in{' '}
                <span className="font-semibold">{activeCategory}</span>.
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default BlogContents;
