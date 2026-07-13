"use client";

import { useState } from "react";
import { useMyProfile } from "@/lib/hooks/queries/use-my-profile";
import { useMyPosts } from "@/lib/hooks/queries/use-my-posts";
import { useMySaved } from "@/lib/hooks/queries/use-my-saved";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { ProfileGalleryGrid } from "@/components/profile/profile-gallery-grid";
import { ProfileEmptyState } from "@/components/profile/profile-empty-state";
import { LoadingState } from "@/components/state/loading-state";
import { ErrorState } from "@/components/state/error-state";

export default function MyProfilePage() {
  const [tab, setTab] = useState<"gallery" | "saved">("gallery");

  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
  } = useMyProfile();
  const { data: posts, isLoading: postsLoading } = useMyPosts();
  const { data: saved, isLoading: savedLoading } = useMySaved(tab === "saved");

  if (profileLoading) return <LoadingState />;
  if (profileError || !profile) return <ErrorState />;

  const galleryPosts = posts?.data ?? [];
  const savedPosts = saved?.data ?? [];

  return (
    <div className="mx-auto flex max-w-[812px] flex-col gap-4 px-4 pt-6 pb-24 md:gap-4 md:px-0 md:pt-10">
      <ProfileHeader user={profile} onEditProfile={() => {}} />

      <div className="flex flex-col gap-6">
        <ProfileTabs active={tab} onChange={setTab} />

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

        {tab === "saved" && (
          <>
            {savedLoading && <LoadingState />}
            {!savedLoading && savedPosts.length === 0 && (
              <ProfileEmptyState variant="saved" />
            )}
            {!savedLoading && savedPosts.length > 0 && (
              <ProfileGalleryGrid posts={savedPosts} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
