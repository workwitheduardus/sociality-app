"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "@/app/types/api";
import { PostActions } from "./post-action";
import { LikesModal } from "./likes-modal";

dayjs.extend(relativeTime);

export function PostCard({ post }: { post: Post }) {
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isLongCaption = post.caption.length > 100;
  const displayCaption =
    isLongCaption && !expanded
      ? post.caption.slice(0, 100) + "..."
      : post.caption;

  return (
    <article className="flex w-full flex-col gap-3 md:gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.author.username}`}>
            <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-700 md:h-16 md:w-16">
              {post.author.avatarUrl && (
                <Image
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </Link>
          <div>
            <Link
              href={`/profile/${post.author.username}`}
              className="text-sm font-bold text-white md:text-md"
            >
              {post.author.username}
            </Link>
            <p className="text-xs text-gray-400 md:text-sm">
              {dayjs(post.createdAt).fromNow()}
            </p>
          </div>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
          <Image
            src={post.imageUrl}
            alt={post.caption || "Post image"}
            fill
            className="object-cover"
          />
        </div>

        <PostActions
          postId={post.id}
          isLikedByMe={!!post.isLikedByMe}
          isSavedByMe={!!post.isSavedByMe}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          onLikesClick={() => setLikesModalOpen(true)}
        />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-bold text-white md:text-md">
          {post.author.username}
        </p>
        <p className="text-sm text-white md:text-md">{displayCaption}</p>
        {isLongCaption && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="self-start text-sm font-bold text-brand-500 md:text-md"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <LikesModal
        postId={post.id}
        open={likesModalOpen}
        onClose={() => setLikesModalOpen(false)}
      />
    </article>
  );
}
