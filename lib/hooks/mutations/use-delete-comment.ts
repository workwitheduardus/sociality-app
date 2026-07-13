"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/lib/endpoints/comments";
import { Comment, PaginatedResponse } from "@/app/types/api";

interface InfiniteComments {
  pages: PaginatedResponse<Comment>[];
  pageParams: unknown[];
}

export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentsApi.delete(commentId),

    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] });
      const previous = queryClient.getQueryData<InfiniteComments>([
        "comments",
        postId,
      ]);

      if (previous) {
        queryClient.setQueryData<InfiniteComments>(["comments", postId], {
          ...previous,
          pages: previous.pages.map((page) => ({
            ...page,
            data: page.data.filter((c) => c.id !== commentId),
          })),
        });
      }
      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous)
        queryClient.setQueryData(["comments", postId], context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
