import { ContentType, ReactionType, ShareType } from '@prisma/client';
import { useCallback, useEffect, useRef } from 'react';
import useSWR from 'swr';

import fetcher from '@/utils/fetcher';
import { postReaction, postShare, postView } from '@/helpers/api';

import type { TContentMetaDetail } from '@/types';

const INITIAL_VALUE: TContentMetaDetail = {
  meta: {
    views: 0,
    shares: 0,
    reactions: 0,
    reactionsDetail: { CLAPPING: 0, THINKING: 0, AMAZED: 0 },
  },
  metaUser: {
    reactionsDetail: { CLAPPING: 0, THINKING: 0, AMAZED: 0 },
  },
  metaSection: {},
};

export default function useInsight({
  slug,
  contentType,
  contentTitle,
  countView = true,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  countView?: boolean;
}) {
  const timer = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const count = useRef<Record<string, number>>({
    CLAPPING: 0,
    THINKING: 0,
    AMAZED: 0,
  });

  const {
    isLoading,
    data = INITIAL_VALUE,
    mutate,
  } = useSWR<TContentMetaDetail>(
    slug ? `/api/content/${slug}` : null,
    fetcher,
    { fallbackData: INITIAL_VALUE }
  );

  // Clean up timers on unmount to prevent memory leaks
  useEffect(() => {
    const currentTimers = timer.current;
    return () => {
      Object.values(currentTimers).forEach(clearTimeout);
    };
  }, []);

  // Track views
  useEffect(() => {
    if (countView && slug) {
      postView({ slug, contentType, contentTitle });
    }
  }, [slug, contentType, contentTitle, countView]);

  const addShare = useCallback(
    ({ type }: { type: ShareType }) => {
      mutate(
        {
          ...data,
          meta: { ...data.meta, shares: data.meta.shares + 1 },
        },
        false
      );

      postShare({ slug, contentType, contentTitle, type });
    },
    [data, mutate, slug, contentType, contentTitle]
  );

  const addReaction = useCallback(
    ({ type, section }: { type: ReactionType; section?: string }) => {
      // 1. Optimistic Update using a functional state update
      mutate((currentData) => {
        // Fallback to initial if currentData is undefined
        const prev = currentData ?? INITIAL_VALUE;

        return {
          ...prev,
          meta: {
            ...prev.meta,
            reactions: prev.meta.reactions + 1,
            reactionsDetail: {
              ...prev.meta.reactionsDetail,
              [type]: (prev.meta.reactionsDetail[type] || 0) + 1,
            },
          },
          metaUser: {
            ...prev.metaUser,
            reactionsDetail: {
              ...prev.metaUser.reactionsDetail,
              [type]: (prev.metaUser.reactionsDetail[type] || 0) + 1,
            },
          },
        };
      }, false);

      // 2. Batching Logic (Same as before)
      count.current[type] += 1;

      clearTimeout(timer.current[type]);
      timer.current[type] = setTimeout(() => {
        const batchCount = count.current[type];

        postReaction({
          slug,
          contentType,
          contentTitle,
          type,
          count: batchCount,
          ...(section ? { section } : {}), // Clean way to conditionally add 'section'
        }).finally(() => {
          count.current[type] = 0;
        });
      }, 500);
    },
    [mutate, slug, contentType, contentTitle] // 'data' is no longer a dependency!
  );

  return {
    isLoading,
    data,
    addShare,
    addReaction,
  };
}
