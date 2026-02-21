import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import CountUp from '@/components/CountUp';
import { InsightIcon, PinIcon } from '@/components/Icons';

import { formatDateRelative, formatLang } from '@/helpers/post';

import type { TPostFrontMatter } from '@/types';

type PostPreviewProps = TPostFrontMatter & {
  slug: string;
  views: number;
  shares: number;
  pinned?: boolean;
  featured?: boolean;
};

function PostPreview({
  title,
  description,
  date,
  slug,
  lang,
  views,
  shares,
  category,
  image,
  pinned = false,
  featured = false,
}: PostPreviewProps) {
  return (
    <article lang={lang}>
      <Link
        href={`blog/${slug}`}
        className={clsx(
          'group block',
          'rounded-2xl transition',
          'hover:bg-slate-900/[0.03] dark:hover:bg-white/[0.04]',
          featured
            ? 'border-divider-light dark:border-divider-dark border p-5 md:p-6'
            : 'p-3 sm:p-4'
        )}
      >
        <div className="flex gap-5">
          {/* LEFT: content */}
          <div className="min-w-0 flex-1">
            {/* meta row */}
            <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              {pinned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 font-semibold text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300">
                  <PinIcon className="h-3 w-3" />
                  Pinned
                </span>
              )}

              <span className="rounded-full bg-slate-900/5 px-2 py-0.5 font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200">
                {category}
              </span>

              <span aria-hidden="true">&middot;</span>

              <time dateTime={date} className="first-letter:uppercase">
                {formatDateRelative(date)}
              </time>

              <span aria-hidden="true">&middot;</span>
              <span>{formatLang(lang)}</span>
            </div>

            {/* title */}
            <h2
              className={clsx(
                'line-clamp-2 font-extrabold text-slate-900 dark:text-slate-100',
                featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
              )}
            >
              {title}
            </h2>

            {/* description */}
            <p
              className={clsx(
                'mt-2 line-clamp-2 leading-relaxed text-slate-600 dark:text-slate-400',
                featured ? 'text-base' : 'text-sm'
              )}
            >
              {description}
            </p>

            {/* footer */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <InsightIcon className="-mt-0.5 h-4 w-4" />
                <span className="flex gap-1.5">
                  <span
                    className="flex items-center gap-1.5"
                    title="Number of view(s)"
                  >
                    <CountUp from={0} to={views} /> Views
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span
                    className="flex items-center gap-1.5"
                    title="Number of share(s)"
                  >
                    <CountUp from={0} to={shares} /> Shares
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: image */}
          {image && (
            <div
              className={clsx(
                'relative shrink-0 overflow-hidden rounded-xl',
                featured
                  ? 'h-28 w-40 sm:h-32 sm:w-48'
                  : 'h-24 w-32 sm:h-28 sm:w-40'
              )}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 140px, 192px"
              />
            </div>
          )}
        </div>
      </Link>

      {/* subtle divider like Medium */}
      {!featured && (
        <div className="border-divider-light dark:border-divider-dark mt-3 border-b" />
      )}
    </article>
  );
}

export default PostPreview;
