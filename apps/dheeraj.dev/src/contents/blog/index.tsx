import clsx from 'clsx';
import { useMemo } from 'react';

import useContentMeta from '@/hooks/useContentMeta';

import PostPreview from '@/contents/blog/PostPreview';

import type { TPostFrontMatter } from '@/types';

const PINNED_POST = 'the-2023-retrospective';

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

  const { pinnedPost, postsPreview } = useMemo(() => {
    const regularPosts: TPostPreview[] = [];
    let pinned: TPostPreview | undefined;

    posts.forEach(({ slug, frontMatter }) => {
      const { shares = 0, views = 0 } = data?.[slug]?.meta ?? {};

      const preview: TPostPreview = {
        slug,
        views,
        shares,
        ...frontMatter,
      };

      if (slug === PINNED_POST) {
        pinned = preview;
      } else {
        regularPosts.push(preview);
      }
    });

    return { pinnedPost: pinned, postsPreview: regularPosts };
  }, [posts, data]);

  return (
    <div className="content-wrapper">
      <div className="flex flex-col gap-8 md:flex-row md:gap-8 lg:gap-24">
        <aside className="md:w-64">{/* Filter logic goes here */}</aside>

        <main className="flex-1">
          {/* Pinned Post */}
          {pinnedPost && (
            <div className="mb-8 flex items-start gap-4 md:mb-12 md:gap-6">
              <div className="flex-1">
                <PostPreview
                  pinned
                  slug={pinnedPost.slug}
                  category={pinnedPost.category}
                  title={pinnedPost.title}
                  description={pinnedPost.description}
                  date={pinnedPost.date}
                  lang={pinnedPost.lang}
                  tags={pinnedPost.tags}
                  views={pinnedPost.views}
                  shares={pinnedPost.shares}
                />
              </div>
            </div>
          )}

          {/* Posts List */}
          <section className="flex flex-col">
            {postsPreview.map((post) => (
              <div
                key={post.slug}
                className="mb-8 flex items-start gap-4 md:mb-4 md:gap-6"
              >
                <div
                  className={clsx(
                    'border-divider-light mt-14 hidden w-8 -translate-y-1 border-b md:mt-16 md:w-20 lg:block',
                    'dark:border-divider-dark'
                  )}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <PostPreview
                    slug={post.slug}
                    category={post.category}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    lang={post.lang}
                    tags={post.tags}
                    views={post.views}
                    shares={post.shares}
                  />
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default BlogContents;
