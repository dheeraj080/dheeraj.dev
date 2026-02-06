import clsx from 'clsx';
import { m } from 'framer-motion';
import Link from 'next/link';

import CountUp from '@/components/CountUp';
import { ChevronRightIcon, InsightIcon, PinIcon } from '@/components/Icons';

import { formatDateRelative, formatLang } from '@/helpers/post';

import type { TPostFrontMatter } from '@/types';

type PostPreviewProps = TPostFrontMatter & {
  slug: string;
  views: number;
  shares: number;
  pinned?: boolean;
};

function PostPreview({
  title,
  description,
  date,
  slug,
  lang,
  views,
  shares,
  pinned = false,
}: PostPreviewProps) {
  return (
    <article lang={lang}>
      <Link
        href={`blog/${slug}`}
        className={clsx(
          'group relative mb-6 block overflow-hidden transition-all',
          'hover:bg-slate-50 sm:mb-0 sm:rounded-2xl dark:hover:bg-slate-800/50',
          pinned
            ? 'border-divider-light dark:border-divider-dark border sm:p-4 md:mt-6 md:p-6'
            : 'sm:p-4 md:p-6'
        )}
      >
        {/* shine effect for Pinned/Featured posts */}
        {pinned && (
          <m.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 1, 0] }}
            transition={{ delay: 1.4, duration: 2, ease: [0.85, 0, 0.15, 1] }}
            className="pointer-events-none absolute inset-0 z-[-1]"
          >
            <div className="bg-accent-500 h-full w-20 -rotate-45 scale-[5] opacity-[0.05] dark:opacity-[0.1]" />
          </m.div>
        )}

        <header className="mb-3">
          <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-wider text-slate-500 dark:text-slate-400">
            {pinned && (
              <span className="text-accent-600 dark:text-accent-400 flex items-center gap-1 font-bold uppercase">
                <PinIcon className="h-3 w-3" /> Featured
              </span>
            )}
            <time dateTime={date}>{formatDateRelative(date)}</time>
            <span>&middot;</span>
            <span>{formatLang(lang)}</span>
          </div>

          <h2 className="group-hover:text-accent-600 text-xl font-bold tracking-tight text-slate-700 transition-colors md:text-2xl dark:text-slate-200">
            {title}
          </h2>
        </header>

        <p className="mb-4 line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>

        <footer className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-500">
            <div className="flex items-center gap-1.5" title="System Traffic">
              <InsightIcon className="h-3.5 w-3.5" />
              <CountUp from={0} to={views} />{' '}
              <span className="uppercase">Views</span>
            </div>
            <div className="flex items-center gap-1.5" title="Network Shares">
              <CountUp from={0} to={shares} />{' '}
              <span className="uppercase">Shares</span>
            </div>
          </div>

          <div className="text-accent-600 dark:text-accent-400 flex items-center gap-1 text-xs font-bold uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
            view report
            <ChevronRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </footer>
      </Link>
    </article>
  );
}

export default PostPreview;
