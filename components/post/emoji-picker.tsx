"use client";

const EMOJIS = [
  "😀",
  "😅",
  "🥰",
  "😇",
  "🙂",
  "😋",
  "🤪",
  "🤐",
  "😏",
  "🤗",
  "😪",
  "🙄",
  "🤫",
  "😴",
  "🥵",
  "😫",
  "😭",
  "😱",
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <div className="absolute bottom-full left-0 mb-2 flex w-[210px] flex-wrap gap-2 rounded-xl border border-gray-900 bg-gray-950 p-4">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="text-2xl leading-10 text-gray-500 hover:opacity-80"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
