"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { usePostLikers } from "@/lib/hooks/queries/use-post-likers";
import { EmptyState } from "../state/empty-state";
import { LoadingState } from "../state/loading-state";

interface LikesModalProps {
  postId: number;
  open: boolean;
  onClose: () => void;
}

export function LikesModal({ postId, open, onClose }: LikesModalProps) {
  const { data, isLoading } = usePostLikers(postId, open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/80 md:items-center">
      <div className="w-full max-w-[548px] rounded-t-2xl bg-gray-950 p-4 md:rounded-2xl md:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Likes</h2>
          <button onClick={onClose} aria-label="Close">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {isLoading && <LoadingState />}
        {!isLoading && data?.data.length === 0 && (
          <EmptyState message="No likes yet" />
        )}

        <div className="flex max-h-[400px] flex-col gap-5 overflow-y-auto">
          {data?.data.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-13"
            >
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-700">
                  {user.avatarUrl && (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </div>
              {user.isFollowedByMe ? (
                <button className="rounded-full border border-gray-900 px-4 py-2 text-sm font-bold text-white">
                  Following
                </button>
              ) : (
                <button className="rounded-full bg-brand-600 px-6 py-2 text-sm font-bold text-white">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
