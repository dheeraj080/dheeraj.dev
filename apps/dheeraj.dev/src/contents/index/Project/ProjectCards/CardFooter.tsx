import Link from 'next/link';

import { GitHubIcon } from '@/components/Icons';

import { isExternal } from './utils';

export default function CardFooter({
  url,
  readMore,
  github,
  title,
}: {
  url?: string;
  readMore?: string;
  github?: string;
  title: string;
}) {
  return (
    <footer className="relative z-10 mt-auto flex items-center gap-3 pt-7">
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black"
        >
          Live
        </a>
      )}

      {readMore &&
        (isExternal(readMore) ? (
          <a
            href={readMore}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white"
          >
            Read More
          </a>
        ) : (
          <Link
            href={readMore}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white"
          >
            Read More
          </Link>
        ))}

      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub Repository: ${title}`}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
        >
          <GitHubIcon className="h-5 w-5 text-white" />
        </a>
      )}
    </footer>
  );
}
