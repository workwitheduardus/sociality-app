import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Comment } from "@/app/types/api";

dayjs.extend(relativeTime);

interface CommentItemProps {
  comment: Comment;
  onDelete?: () => void;
}

export function CommentItem({ comment, onDelete }: CommentItemProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-900 pb-3 last:border-b-0">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-700">
          {comment.author.avatarUrl && (
            <Image
              src={comment.author.avatarUrl}
              alt={comment.author.name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">
            {comment.author.username}
          </span>
          <span className="text-xs text-gray-400">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p className="text-xs text-white">{comment.text}</p>
      {comment.isOwner && onDelete && (
        <button
          onClick={onDelete}
          className="self-start text-xs font-semibold text-error-700"
        >
          Delete
        </button>
      )}
    </div>
  );
}
