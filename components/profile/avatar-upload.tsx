"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onChange: (file: File) => void;
}

export function AvatarUpload({
  currentAvatarUrl,
  onChange,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-700 md:h-[130px] md:w-[130px]">
        {(preview || currentAvatarUrl) && (
          <Image
            src={preview ?? currentAvatarUrl!}
            alt="Profile photo"
            width={130}
            height={130}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <button
        onClick={() => inputRef.current?.click()}
        className="rounded-full border border-gray-900 px-4 py-2 text-sm font-bold text-white md:px-4 md:py-3 md:text-md"
      >
        Change Photo
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  );
}
