"use client";

import { Grid3x3, Bookmark } from "lucide-react";

interface ProfileTabsProps {
  active: "gallery" | "saved";
  onChange: (tab: "gallery" | "saved") => void;
}

export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onChange("gallery")}
        className={`flex flex-1 items-center justify-center gap-2 border-b py-3 text-sm font-bold md:py-4 md:text-md ${
          active === "gallery"
            ? "border-white text-white"
            : "border-gray-900 text-gray-400 font-medium"
        }`}
      >
        <Grid3x3 className="h-5 w-5" />
        Gallery
      </button>
      <button
        onClick={() => onChange("saved")}
        className={`flex flex-1 items-center justify-center gap-2 border-b py-3 text-sm font-bold md:py-4 md:text-md ${
          active === "saved"
            ? "border-white text-white"
            : "border-gray-900 text-gray-400 font-medium"
        }`}
      >
        <Bookmark className="h-5 w-5" />
        Saved
      </button>
    </div>
  );
}
