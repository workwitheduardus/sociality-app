"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useUserProfile } from "@/lib/hooks/queries/use-user-profile";
import { useUserPosts } from "@/lib/hooks/queries/use-user-posts";
import { useUserLikes } from "@/lib/hooks/queries/use-user-likes";
import { useFollowMutation } from "@/lib/hooks/mutations/use-follow-mutation";
import { FriendProfileHeader } from "@/components/profile/friend-profile-header";
import { FriendProfileTabs } from "@/components/profile/friends-profile-tabs";
import { ProfileGalleryGrid } from "@/components/profile/profile-gallery-grid";
import { ProfileEmptyState } from "@/components/profile/profile-empty-state";
import { LoadingState } from "@/components/state/loading-state";
import { ErrorState } from "@/components/state/error-state";

export default function FriendProfilePage() {
  const params = useParams<{ username: string }>();
  const router = useRouter();
  const [tab, setTab] = useState<"gallery" | "liked">("gallery");

  const {
    data: profile,
    isLoading: profileLoading,
    isError,
  } = useUserProfile(params.username);
  const { data: posts, isLoading: postsLoading } = useUserPosts(
    params.username,
  );
  const { data: likes, isLoading: likesLoading } = useUserLikes(
    params.username,
    tab === "liked",
  );
  const followMutation = useFollowMutation(params.username);

  if (profileLoading) return <LoadingState />;
  if (isError || !profile) return <ErrorState />;

  const galleryPosts = posts?.data ?? [];
  const likedPosts = likes?.data ?? [];

  return (
    <div className="mx-auto flex max-w-[812px] flex-col gap-4 px-4 pt-6 md:gap-4 md:px-0 md:pt-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 md:hidden"
        aria-label="Go back"
      >
        <ArrowLeft className="h-6 w-6 text-white" />
        <span className="text-md font-bold text-white">{profile.name}</span>
      </button>

      <FriendProfileHeader
        user={profile}
        isFollowing={profile.isFollowedByMe ?? false}
        onToggleFollow={() => followMutation.mutate(!profile.isFollowedByMe)}
        isPending={followMutation.isPending}
      />

      <div className="flex flex-col gap-6">
        <FriendProfileTabs active={tab} onChange={setTab} />

        {tab === "gallery" && (
          <>
            {postsLoading && <LoadingState />}
            {!postsLoading && galleryPosts.length === 0 && (
              <ProfileEmptyState variant="gallery" />
            )}
            {!postsLoading && galleryPosts.length > 0 && (
              <ProfileGalleryGrid posts={galleryPosts} />
            )}
          </>
        )}

        {tab === "liked" && (
          <>
            {likesLoading && <LoadingState />}
            {!likesLoading && likedPosts.length === 0 && (
              <div className="flex flex-col items-center gap-1 py-16 text-center">
                <p className="text-md font-bold text-white">
                  No liked posts yet
                </p>
                <p className="text-sm text-gray-400">
                  Posts this person likes will show up here
                </p>
              </div>
            )}
            {!likesLoading && likedPosts.length > 0 && (
              <ProfileGalleryGrid posts={likedPosts} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
