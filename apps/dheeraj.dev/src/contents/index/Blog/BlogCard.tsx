import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import type { TPostFrontMatter } from '@/types';

interface PostCardProps {
  slug: string;
  frontMatter: TPostFrontMatter;
}

export function PostCard({ slug, frontMatter }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl',
        'border border-white/10 bg-[#141417]',
        'transition-colors duration-200 hover:border-white/20'
      )}
    >
      {/* Image */}
      {frontMatter.image ? (
        <div className="relative h-48 w-full overflow-hidden bg-white/[0.03]">
          <Image
            src={frontMatter.image}
            alt={frontMatter.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* subtle divider */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        </div>
      ) : (
        // optional placeholder keeps cards aligned if some posts have no image
        <div className="h-6" />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
          <span>{frontMatter.date}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span>Blog</span>
        </div>

        {/* Title */}
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold tracking-tight text-white md:text-xl">
          {frontMatter.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
          {frontMatter.description}
        </p>
      </div>
    </Link>
  );
}
