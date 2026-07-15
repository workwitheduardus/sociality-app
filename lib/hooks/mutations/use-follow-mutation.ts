"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followApi } from "@/lib/endpoints/follow";
import { User } from "@/app/types/api";

export function useFollowMutation(username: string) {
  const queryClient = useQueryClient();
  const queryKey = ["users", username, "profile"];

  return useMutation({
    mutationFn: (nextFollowing: boolean): Promise<{following: boolean}> =>
        nextFollowing ? followApi.follow(username) : followApi.unfollow(username),

    onMutate: async (nextFollowing: boolean) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<User>(queryKey);

      if (previous) {
        queryClient.setQueryData<User>(queryKey, {
          ...previous,
          isFollowedByMe: nextFollowing,
          followersCount: previous.followersCount + (nextFollowing ? 1 : -1),
        });
      }
      return { previous };
    },

    onError: (_err, _nextFollowing, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
