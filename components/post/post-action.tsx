"use client";

import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useLikeMutation } from "@/lib/hooks/mutations/use-like-mutation";
import { useSaveMutation } from "@/lib/hooks/mutations/use-save-mutations";
import { CommentsModal } from "./comments-modal";
import { useState } from "react";


interface PostActionsProps {
  postId: number;
  isLikedByMe: boolean;
  isSavedByMe: boolean;
  likesCount: number;
  commentsCount: number;
  onLikesClick: () => void;
}

export function PostActions({
  postId,
  isLikedByMe,
  isSavedByMe,
  likesCount,
  commentsCount,
  onLikesClick,
}: PostActionsProps) {
  const like = useLikeMutation(postId);
  const save = useSaveMutation(postId);
  const [commentsOpen, setCommentsOpen] = useState(false);


  return (
    <>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => like.mutate(!isLikedByMe)}
          disabled={like.isPending}
          className="flex items-center gap-1.5"
        >
          <Heart
            className={`h-6 w-6 ${isLikedByMe ? "fill-error-700 text-error-700" : "text-white"}`}
          />
          <button
            onClick={onLikesClick}
            className="text-sm font-semibold text-white"
          >
            {likesCount}
          </button>
        </button>
        <div className="flex items-center gap-1.5">
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="text-sm font-semibold text-white">
            {commentsCount}
          </span>
        </div>
        <button className="flex items-center gap-1.5">
          <Send className="h-6 w-6 text-white" />
        </button>
      </div>
      <button
        onClick={() => save.mutate(!isSavedByMe)}
        disabled={save.isPending}
      >
        <Bookmark
          className={`h-6 w-6 ${isSavedByMe ? "fill-white text-white" : "text-white"}`}
        />
      </button>
    </div>

    <CommentsModal
        postId={postId}
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
      />
    </>
  );
}
