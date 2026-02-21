import Head from '@/components/meta/Head';

import { getBaseUrl } from '@/helpers/url';
import { getSortedPosts } from '@/lib/posts'; // Your MDX utility

import IndexContents from '@/contents/index';

import type { TPostFrontMatter } from '@/types';

interface IndexProps {
  allPosts: Array<{
    slug: string;
    frontMatter: TPostFrontMatter;
  }>;
}

function Index({ allPosts }: IndexProps) {
  return (
    <>
      <Head
        title="Dheeraj · Software Engineer"
        description="An online portfolio featuring a showcase of my projects and blogs."
        ogImage={`${getBaseUrl()}/assets/images/og-image.png`}
        overrideTitle
      />
      {/* Pass the posts down to the content wrapper */}
      <IndexContents posts={allPosts} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch latest 3 posts at build time
  const allPosts = getSortedPosts().slice(0, 6);

  return {
    props: {
      allPosts,
    },
  };
}

export default Index;
