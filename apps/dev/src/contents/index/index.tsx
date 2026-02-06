import clsx from 'clsx';

import { CodeIcon, HeartIcon, SparklesIcon } from '@/components/Icons';

import PostPreview from '@/contents/blog/PostPreview';
import FeaturedCard from '@/contents/index/FeaturedCard';
import Header from '@/contents/index/Header';

// import Quote from "@/contents/index/Quote";
// Types
import type { TPostWithSlug } from '@/pages/index';

interface IndexContentsProps {
  allPosts: TPostWithSlug[];
}

type FeaturedItem = {
  title: string;
  desc: string;
  iconBg: string;
  iconBgDark: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const FEATURED: FeaturedItem[] = [
  {
    title: 'Clean & Intuitive',
    desc: 'Keep the UI clean with a modern touch without compromising UX.',
    iconBg: 'bg-amber-300',
    iconBgDark: 'dark:bg-amber-900',
    Icon: SparklesIcon,
  },
  {
    title: 'Detail Oriented',
    desc: 'Awareness to ease of access, UI consistency, and improved UX.',
    iconBg: 'bg-pink-300',
    iconBgDark: 'dark:bg-pink-900',
    Icon: HeartIcon,
  },
  {
    title: 'Pretty & Optimized',
    desc: 'Writing clean code is a top priority while keeping it as optimized as possible.',
    iconBg: 'bg-sky-300',
    iconBgDark: 'dark:bg-sky-900',
    Icon: CodeIcon,
  },
];

function FeaturedCardSection() {
  return (
    <div className="content-wrapper">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        {FEATURED.map(({ title, desc, iconBg, iconBgDark, Icon }) => (
          <FeaturedCard
            key={title}
            icon={
              <div className={clsx('rounded-full p-3.5', iconBg, iconBgDark)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            }
            title={title}
            desc={desc}
          />
        ))}
      </div>
    </div>
  );
}

// If you want to keep it disabled, return null.
// If you want it enabled, uncomment Quote import and JSX below.
function QuoteSection() {
  return null;

  /*
  return (
    <div className="content-wrapper">
      <div className="flex items-center justify-center py-8">
        <Quote />
      </div>
    </div>
  );
  */
}

export default function IndexContents({ allPosts = [] }: IndexContentsProps) {
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      <Header />

      <div className="hidden lg:-mt-16 lg:mb-24 lg:block">
        <FeaturedCardSection />
      </div>

      <section className="content-wrapper mb-12 lg:mb-24">
        <div className="mb-6 flex items-center justify-between px-4 sm:px-0">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Recent Posts
          </h2>

          <a
            href="/blog"
            aria-label="View blog archive"
            className="text-accent-600 group flex items-center gap-1 text-sm font-bold"
          >
            View Archive
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="flex flex-col">
          {latestPosts.map(({ slug, frontMatter }) => (
            <PostPreview
              key={slug}
              slug={slug}
              {...frontMatter}
              views={0}
              shares={0}
            />
          ))}
        </div>
      </section>

      {/* <QuoteSection /> */}
    </>
  );
}
