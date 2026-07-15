"use client";

import Image from "next/image";
import { Send, Check } from "lucide-react";
import { ProfileStat } from "./profile-stat";
import { User } from "@/app/types/api";

interface FriendProfileHeaderProps {
  user: User;
  isFollowing: boolean;
  onToggleFollow: () => void;
  isPending: boolean;
}

export function FriendProfileHeader({
  user,
  isFollowing,
  onToggleFollow,
  isPending,
}: FriendProfileHeaderProps) {
  const stats = [
    { value: user.postsCount, label: "Post" },
    { value: user.followersCount, label: "Followers" },
    { value: user.followingCount, label: "Following" },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-700">
            {user.avatarUrl && (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white md:text-md">
              {user.name}
            </span>
            <span className="text-sm text-white md:text-md">
              {user.username}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleFollow}
            disabled={isPending}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold disabled:opacity-60 md:px-6 md:py-3 md:text-md ${
              isFollowing
                ? "border border-gray-900 text-white"
                : "bg-brand-600 text-white"
            }`}
          >
            {isFollowing && <Check className="h-4 w-4 md:h-5 md:w-5" />}
            {isFollowing ? "Following" : "Follow"}
          </button>
          <button
            aria-label="Share profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-900 md:h-12 md:w-12"
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {user.bio && <p className="text-sm text-white md:text-md">{user.bio}</p>}

      <div className="flex items-center gap-6">
        {stats.map((stat, i) => (
          <ProfileStat
            key={stat.label}
            {...stat}
            isLast={i === stats.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
