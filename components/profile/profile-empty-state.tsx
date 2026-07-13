"use client";

import { useRouter } from "next/navigation";

interface ProfileEmptyStateProps {
  variant: "gallery" | "saved";
}

export function ProfileEmptyState({ variant }: ProfileEmptyStateProps) {
  const router = useRouter();

  if (variant === "saved") {
    return (
      <div className="flex flex-col items-center gap-1 py-16 text-center">
        <p className="text-md font-bold text-white">No saved posts yet</p>
        <p className="text-sm text-gray-400">
          Posts you save will show up here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center md:gap-6">
      <div className="flex flex-col items-center gap-1 md:gap-1">
        <p className="text-md font-bold text-white md:text-lg">
          Your story starts here
        </p>
        <p className="max-w-[453px] text-sm text-gray-400 md:text-md">
          Share your first post and let the world see your moments, passions,
          and memories. Make this space truly yours.
        </p>
      </div>
      <button
        onClick={() => router.push("/posts/create")}
        className="rounded-full bg-brand-600 px-8 py-2.5 text-sm font-bold text-white md:px-8 md:py-3 md:text-md"
      >
        Upload My First Post
      </button>
    </div>
  );
}
