"use client";

import { X } from "lucide-react";
import { useComments } from "@/lib/hooks/queries/use-comments";
import { useCreateComment } from "@/lib/hooks/mutations/use-create-comment";
import { useDeleteComment } from "@/lib/hooks/mutations/use-delete-comment";
import { CommentItem } from "./comment-item";
import { CommentComposer } from "./comment-composer";
import { LoadingState } from "../state/loading-state";

interface CommentsModalProps {
  postId: number;
  open: boolean;
  onClose: () => void;
}

export function CommentsModal({ postId, open, onClose }: CommentsModalProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useComments(
    postId,
    open,
  );
  const createComment = useCreateComment(postId);
  const deleteComment = useDeleteComment(postId);

  if (!open) return null;

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/80 md:items-center">
      <div className="flex w-full max-w-[393px] flex-col gap-2 md:hidden">
        <button onClick={onClose} className="self-end px-4" aria-label="Close">
          <X className="h-6 w-6 text-white" />
        </button>
        <div className="flex max-h-[70vh] flex-col gap-3 rounded-t-2xl bg-gray-950 p-4 pb-8">
          <h2 className="text-md font-bold text-white">Comments</h2>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {isLoading && <LoadingState />}
            {!isLoading && comments.length === 0 && (
              <div className="flex flex-col items-center gap-1 py-10 text-center">
                <p className="text-md font-bold text-white">No Comments yet</p>
                <p className="text-sm text-gray-400">Start the conversation</p>
              </div>
            )}
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={() => deleteComment.mutate(comment.id)}
              />
            ))}
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                className="self-center text-sm font-semibold text-brand-500"
              >
                Load more
              </button>
            )}
          </div>
          <CommentComposer
            onSubmit={(text) => createComment.mutate(text)}
            isSubmitting={createComment.isPending}
          />
        </div>
      </div>

      <div className="hidden max-h-[80vh] w-[548px] flex-col gap-5 rounded-2xl border border-gray-900 bg-gray-950 p-5 md:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Comments</h2>
          <button onClick={onClose} aria-label="Close">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto">
          {isLoading && <LoadingState />}
          {!isLoading && comments.length === 0 && (
            <div className="flex flex-col items-center gap-1 py-16 text-center">
              <p className="text-md font-bold text-white">No Comments yet</p>
              <p className="text-sm text-gray-400">Start the conversation</p>
            </div>
          )}
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={() => deleteComment.mutate(comment.id)}
            />
          ))}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="self-center text-sm font-semibold text-brand-500"
            >
              Load more
            </button>
          )}
        </div>
        <CommentComposer
          onSubmit={(text) => createComment.mutate(text)}
          isSubmitting={createComment.isPending}
        />
      </div>
    </div>
  );
}
