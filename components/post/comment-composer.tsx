"use client";

import { useState } from "react";
import { Smile } from "lucide-react";
import { EmojiPicker } from "./emoji-picker";

interface CommentComposerProps {
  onSubmit: (text: string) => void;
  isSubmitting: boolean;
}

export function CommentComposer({
  onSubmit,
  isSubmitting,
}: CommentComposerProps) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = () => {
    if (!text.trim() || isSubmitting) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div className="relative flex items-start gap-2">
      <button
        onClick={() => setShowEmoji((v) => !v)}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-900"
        aria-label="Choose emoji"
      >
        <Smile className="h-6 w-6 text-white" />
      </button>

      {showEmoji && (
        <EmojiPicker
          onSelect={(emoji) => {
            setText((t) => t + emoji);
            setShowEmoji(false);
          }}
        />
      )}

      <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-900 bg-gray-950 px-4 py-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Add Comment"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isSubmitting}
          className="text-sm font-bold text-brand-500 disabled:text-gray-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}
