"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, User } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();
  const isFeed = pathname === "/feed";

  return (
    <nav className="fixed bottom-8 left-1/2 z-40 flex w-[345px] -translate-x-1/2 items-center justify-center gap-11 rounded-full border border-gray-900 bg-gray-950/80 py-2 backdrop-blur-2xl md:hidden">
      <Link href="/feed" className="flex flex-col items-center gap-0.5">
        <Home
          className={`h-5 w-5 ${isFeed ? "fill-brand-500 text-brand-500" : "text-white"}`}
        />
        <span
          className={`text-xs font-bold ${isFeed ? "text-brand-500" : "text-white"}`}
        >
          Home
        </span>
      </Link>
      <Link
        href="/posts/create"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600"
      >
        <Plus className="h-5.5 w-5.5 text-white" />
      </Link>
      <Link href="/me" className="flex flex-col items-center gap-0.5">
        <User className="h-5 w-5 text-white" />
        <span className="text-xs text-white">Profile</span>
      </Link>
    </nav>
  );
}
