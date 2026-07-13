"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/lib/endpoints/comments";
import { Comment, PaginatedResponse } from "@/app/types/api";
import { queryKeys } from "@/lib/query-key";

interface InfiniteComments {
  pages: PaginatedResponse<Comment>[];
  pageParams: unknown[];
}

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => commentsApi.create(postId, text),

    onSuccess: (newComment) => {
      queryClient.setQueryData<InfiniteComments>(
        ["comments", postId],
        (old) => {
          if (!old) return old;
          const pages = [...old.pages];
          pages[0] = { ...pages[0], data: [newComment, ...pages[0].data] };
          return { ...old, pages };
        },
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
    },
  });
}
