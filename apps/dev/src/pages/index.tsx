import Head from '@/components/meta/Head';

import { getBaseUrl } from '@/helpers/url';
import { getSortedPosts } from '@/lib/posts';

import IndexContents from '@/contents/index';

// Define the type for the props we are passing
interface IndexProps {
  allPosts: Array<{
    slug: string;
    frontMatter: any;
  }>;
}

function Index({ allPosts }: IndexProps) {
  return (
    <>
      <Head
        title="Dheeraj K · Software Engineer"
        description="An online portfolio featuring a showcase of my projects and some thoughts."
        ogImage={`${getBaseUrl()}/assets/images/og-image.png`}
        overrideTitle
      />
      {/* Pass the posts fetched from the server into your UI component */}
      <IndexContents allPosts={allPosts} />
    </>
  );
}

/**
 * This function runs ONLY on the server during build time.
 * It prevents the 'fs' module not found error in the browser.
 */
export async function getStaticProps() {
  const allPosts = getSortedPosts();

  return {
    props: {
      allPosts,
    },
  };
}

export default Index;
