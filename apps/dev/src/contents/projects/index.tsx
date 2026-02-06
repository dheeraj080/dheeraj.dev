import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

import * as Icons from '@/components/Icons';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';

interface Repo {
  title: string;
  desc: string;
  stars: number;
  language: string;
  href: string;
  homepage: string;
  pushedAt: string;
}

type FetchState =
  | { status: 'idle' | 'loading'; error: null }
  | { status: 'error'; error: string }
  | { status: 'success'; error: null };

const USERNAME = 'dheeraj080';
const PER_PAGE = 50;
const SHOW_COUNT = 9;

const CACHE_KEY = `gh_repos_${USERNAME}_v2`;
const CACHE_TTL_MS = 10 * 60 * 1000;

function canUseBrowserStorage() {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}

function readCache(): Repo[] | null {
  if (!canUseBrowserStorage()) return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: Repo[] };
    if (!parsed?.ts || !Array.isArray(parsed.data)) return null;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: Repo[]) {
  if (!canUseBrowserStorage()) return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // ignore
  }
}

function sanitizeHomepage(homepage: any, repoHtmlUrl: string): string {
  if (typeof homepage !== 'string') return '';
  const raw = homepage.trim();
  if (
    !raw ||
    raw === '#' ||
    raw === 'null' ||
    raw === 'undefined' ||
    raw === repoHtmlUrl
  )
    return '';

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withProtocol);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}

function normalizeRepos(data: any[]): Repo[] {
  return data
    .filter((r) => r && !r.fork && !r.archived)
    .map((r) => {
      const href = r.html_url ?? '#';
      return {
        title: r.name ?? 'Untitled',
        desc: r.description ?? '',
        stars: Number(r.stargazers_count ?? 0),
        language: r.language ?? 'Unknown',
        href,
        homepage: sanitizeHomepage(r.homepage, href),
        pushedAt: r.pushed_at ?? r.updated_at ?? '',
      };
    })
    .sort((a, b) => (b.pushedAt || '').localeCompare(a.pushedAt || ''))
    .slice(0, SHOW_COUNT);
}

async function fetchRepos(signal?: AbortSignal): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=${PER_PAGE}`,
    { signal }
  );

  if (res.status === 403) throw new Error('GitHub API rate limit reached.');
  if (!res.ok)
    throw new Error(`Failed to fetch repositories (HTTP ${res.status}).`);

  const json = await res.json();
  if (!Array.isArray(json)) throw new Error('Unexpected GitHub response.');
  return normalizeRepos(json);
}

export default function ProjectsContents() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<FetchState>({
    status: 'loading',
    error: null,
  });
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState<string>('All');

  const abortRef = useRef<AbortController | null>(null);

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => set.add(r.language || 'Unknown'));
    return ['All', ...Array.from(set).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos.filter((r) => {
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q);
      const matchLang = lang === 'All' || r.language === lang;
      return matchQ && matchLang;
    });
  }, [repos, query, lang]);

  const load = async (bypassCache = false) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setState({ status: 'loading', error: null });

    try {
      if (!bypassCache) {
        const cached = readCache();
        if (cached?.length) {
          setRepos(cached);
          setState({ status: 'success', error: null });
          return;
        }
      }
      const data = await fetchRepos(abortRef.current.signal);
      setRepos(data);
      writeCache(data);
      setState({ status: 'success', error: null });
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      setState({
        status: 'error',
        error: e?.message ?? 'Something went wrong.',
      });
    }
  };

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, []);

  const isLoading = state.status === 'loading';

  return (
    <>
      <SectionTitle
        title="Open Source Projects"
        caption="My Work"
        description="A live feed of my latest repositories and contributions on GitHub."
      />

      <SectionContent>
        {state.status === 'error' && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
            <p>{state.error}</p>
            <button onClick={() => load(true)} className="font-bold underline">
              Retry
            </button>
          </div>
        )}

        {/* --- PROJECT GRID --- */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)
            : filtered.map((repo) => <ProjectCard key={repo.href} {...repo} />)}
        </div>
      </SectionContent>
    </>
  );
}

function ProjectCard({
  title,
  desc,
  stars,
  language,
  href,
  homepage,
  pushedAt,
}: Repo) {
  const { GitHubIcon, StarIcon } = Icons as any;
  const dateLabel = useMemo(() => {
    const d = new Date(pushedAt);
    return isNaN(d.getTime())
      ? ''
      : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
  }, [pushedAt]);

  return (
    <div className="hover:border-accent-500 group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
          {GitHubIcon ? (
            <GitHubIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          ) : (
            '📁'
          )}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 dark:bg-amber-900/20">
          {StarIcon ? <StarIcon className="h-3 w-3" /> : '⭐'} {stars}
        </div>
      </div>

      <h4 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
        {title}
      </h4>

      {/* Full Description */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {desc || 'No description provided.'}
      </p>

      <div className="mt-auto">
        <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="bg-accent-500 h-2 w-2 rounded-full" />
            {language}
          </span>
          {dateLabel && <span>• Updated {dateLabel}</span>}
        </div>

        <div className="flex gap-2">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl bg-slate-100 py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Source
          </a>
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noreferrer"
              className="bg-accent-500 hover:bg-accent-600 shadow-accent-500/25 flex-1 rounded-xl py-2.5 text-center text-xs font-bold text-white shadow-lg"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="h-80 animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex justify-between">
        <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-12 rounded-full bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="mb-4 h-6 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-20 w-full rounded bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
