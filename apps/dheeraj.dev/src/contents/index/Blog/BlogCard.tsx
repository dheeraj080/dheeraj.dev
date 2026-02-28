import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { TPostFrontMatter } from '@/types';

interface PostCardProps {
  slug: string;
  frontMatter: TPostFrontMatter;
}

export function PostCard({ slug, frontMatter }: PostCardProps) {
  const firstLetter = frontMatter.title?.trim()?.charAt(0).toUpperCase() || '•';

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-300',

        'border-divider-light shadow-sm hover:shadow-md',
        'dark:border-divider-dark dark:shadow-none',

        'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0',
        'text-inherit visited:text-inherit active:text-inherit'
      )}
    >
      {/* Image */}
      {frontMatter.image ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={frontMatter.image}
            alt={frontMatter.title}
            fill
            className="object-cover opacity-[0.2] contrast-[1.05] dark:opacity-[0.25]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Divider */}
          <div className="bg-divider-light dark:bg-divider-dark absolute inset-x-0 bottom-0 h-px" />
        </div>
      ) : (
        <div className="h-6" />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          <span>{frontMatter.date}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span>Blog</span>
        </div>

        {/* Title */}
        <h3 className="mt-4 line-clamp-2 text-lg font-bold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-slate-900 md:text-xl dark:text-slate-100 dark:group-hover:text-white">
          {frontMatter.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {frontMatter.description}
        </p>

        {/* Watermark */}
        <div
          className="pointer-events-none absolute -bottom-7 -right-5 z-[-1] select-none opacity-[0.06] transition-opacity duration-700 group-hover:opacity-[0.03]"
          aria-hidden="true"
        >
          <span className="text-[10rem] font-black leading-none text-slate-200 dark:text-slate-800">
            {firstLetter}
          </span>
        </div>
      </div>
    </Link>
  );
}
