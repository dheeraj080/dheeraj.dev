import clsx from 'clsx';

import BlogSection from '@/contents/index/Blog/BlogSection';
import CleanIntuitive from '@/contents/index/CleanIntuitive';
import DetailOriented from '@/contents/index/DetailOriented';
import Header from '@/contents/index/Header';
import PrettyOptimized from '@/contents/index/PrettyOptimized';
import ProjectSection from '@/contents/index/Project/ProjectSection';

import type { TPostFrontMatter } from '@/types';

interface IndexContentsProps {
  posts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
}

function IndexContents({ posts }: IndexContentsProps) {
  return (
    <>
      <Header />

      <section className={clsx('mb-12', 'lg:mb-24')}>
        <ProjectSection />
      </section>

      {/* The Blog Section */}
      <section className={clsx('mb-12', 'lg:mb-24')}>
        <BlogSection posts={posts} />
      </section>

      <section className={clsx('mb-12', 'lg:mb-24')}>
        <CleanIntuitive />
      </section>

      <section className={clsx('mb-12', 'lg:mb-24')}>
        <DetailOriented />
      </section>

      <section className={clsx('mb-12', 'lg:mb-24')}>
        <PrettyOptimized />
      </section>
    </>
  );
}

export default IndexContents;
