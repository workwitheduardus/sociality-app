"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likesApi } from "@/lib/endpoints/likes";
import { queryKeys } from "@/lib/query-key";
import { Post, PaginatedResponse } from "@/app/types/api";

interface InfinitePages {
  pages: PaginatedResponse<Post>[];
  pageParams: unknown[];
}

function togglePostInPages(
  pages: InfinitePages,
  postId: number,
  liked: boolean,
): InfinitePages {
  return {
    ...pages,
    pages: pages.pages.map((page) => ({
      ...page,
      data: page.data.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLikedByMe: liked,
              likesCount: post.likesCount + (liked ? 1 : -1),
            }
          : post,
      ),
    })),
  };
}

export function useLikeMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (liked: boolean) =>
      liked ? likesApi.like(postId) : likesApi.unlike(postId),

    onMutate: async (liked: boolean) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.feed });

      const previousFeed = queryClient.getQueryData<InfinitePages>(
        queryKeys.feed,
      );
      if (previousFeed) {
        queryClient.setQueryData(
          queryKeys.feed,
          togglePostInPages(previousFeed, postId, liked),
        );
      }

      const previousPost = queryClient.getQueryData<Post>(
        queryKeys.post(postId),
      );
      if (previousPost) {
        queryClient.setQueryData(queryKeys.post(postId), {
          ...previousPost,
          isLikedByMe: liked,
          likesCount: previousPost.likesCount + (liked ? 1 : -1),
        });
      }

      return { previousFeed, previousPost };
    },

    onError: (_err, _liked, context) => {
      if (context?.previousFeed)
        queryClient.setQueryData(queryKeys.feed, context.previousFeed);
      if (context?.previousPost)
        queryClient.setQueryData(queryKeys.post(postId), context.previousPost);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
    },
  });
}
