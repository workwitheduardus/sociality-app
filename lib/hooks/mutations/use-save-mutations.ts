// lib/hooks/mutations/use-save-mutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savesApi } from "@/lib/endpoints/saves";
import { queryKeys } from "@/lib/query-key";
import { Post, PaginatedResponse } from "@/app/types/api";

interface InfinitePages {
  pages: PaginatedResponse<Post>[];
  pageParams: unknown[];
}

function toggleSaveInPages(
  pages: InfinitePages,
  postId: number,
  saved: boolean,
): InfinitePages {
  return {
    ...pages,
    pages: pages.pages.map((page) => ({
      ...page,
      data: page.data.map((post) =>
        post.id === postId ? { ...post, isSavedByMe: saved } : post,
      ),
    })),
  };
}

export function useSaveMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (saved: boolean) =>
      saved ? savesApi.save(postId) : savesApi.unsave(postId),

    onMutate: async (saved: boolean) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.feed });

      const previousFeed = queryClient.getQueryData<InfinitePages>(
        queryKeys.feed,
      );
      if (previousFeed) {
        queryClient.setQueryData(
          queryKeys.feed,
          toggleSaveInPages(previousFeed, postId, saved),
        );
      }

      return { previousFeed };
    },

    onError: (_err, _saved, context) => {
      if (context?.previousFeed)
        queryClient.setQueryData(queryKeys.feed, context.previousFeed);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
    },
  });
}
