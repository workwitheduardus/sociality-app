"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function AddPostHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button onClick={() => router.back()} aria-label="Go back">
        <ArrowLeft className="h-6 w-6 text-white md:h-8 md:w-8" />
      </button>
      <h1 className="text-md font-bold text-white md:text-2xl">Add Post</h1>
    </div>
  );
}
