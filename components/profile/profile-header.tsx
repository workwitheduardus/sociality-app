"use client";

import Image from "next/image";
import { Send } from "lucide-react";
import { ProfileStat } from "./profile-stat";
import { User } from "@/app/types/api";

interface ProfileHeaderProps {
  user: User;
  onEditProfile: () => void;
}

export function ProfileHeader({ user, onEditProfile }: ProfileHeaderProps) {
  const stats = [
    { value: user.postsCount, label: "Post" },
    { value: user.followersCount, label: "Followers" },
    { value: user.followingCount, label: "Following" },
    { value: (user as User & {likesCount?: number}).likesCount ?? 0, label: "Likes" },
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
            onClick={onEditProfile}
            className="flex-1 rounded-full border border-gray-900 px-4 py-2 text-sm font-bold text-white md:px-4 md:py-3 md:text-md"
          >
            Edit Profile
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
