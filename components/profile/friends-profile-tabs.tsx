"use client";

import { Grid3x3, Heart } from "lucide-react";

interface FriendProfileTabsProps {
  active: "gallery" | "liked";
  onChange: (tab: "gallery" | "liked") => void;
}

export function FriendProfileTabs({
  active,
  onChange,
}: FriendProfileTabsProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onChange("gallery")}
        className={`flex flex-1 items-center justify-center gap-2 border-b py-3 text-sm font-bold md:py-4 md:text-md ${
          active === "gallery"
            ? "border-white text-white"
            : "border-gray-900 font-medium text-gray-400"
        }`}
      >
        <Grid3x3 className="h-5 w-5" />
        Gallery
      </button>
      <button
        onClick={() => onChange("liked")}
        className={`flex flex-1 items-center justify-center gap-2 border-b py-3 text-sm font-bold md:py-4 md:text-md ${
          active === "liked"
            ? "border-white text-white"
            : "border-gray-900 font-medium text-gray-400"
        }`}
      >
        <Heart
          className={`h-5 w-5 ${active === "liked" ? "fill-white" : ""}`}
        />
        Liked
      </button>
    </div>
  );
}
