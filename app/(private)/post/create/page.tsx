"use client";

import { useState } from "react";
import { AddPostHeader } from "@/components/post/add-post-header";
import { ImageUploadField } from "@/components/post/image-upload-field";
import { CaptionField } from "@/components/post/caption-field";
import { useCreatePost } from "@/lib/hooks/mutations/use -create-post";

export default function CreatePostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState<{ image?: string; caption?: string }>(
    {},
  );

  const createPost = useCreatePost();

  const handleSubmit = () => {
    const nextErrors: typeof errors = {};
    if (!image) nextErrors.image = "Please upload a photo";
    if (!caption.trim()) nextErrors.caption = "Please write a caption";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    createPost.mutate({ image: image!, caption });
  };

  return (
    <div className="mx-auto flex max-w-[452px] flex-col gap-6 px-4 pt-6 md:px-0 md:pt-10">
      <AddPostHeader />

      <div className="flex flex-col gap-4">
        <ImageUploadField onChange={setImage} error={errors.image} />
        <CaptionField
          value={caption}
          onChange={setCaption}
          error={errors.caption}
        />

        <button
          onClick={handleSubmit}
          disabled={createPost.isPending}
          className="w-full rounded-full bg-brand-600 py-2 text-sm font-bold text-white disabled:opacity-60 md:py-3 md:text-md"
        >
          {createPost.isPending ? "Sharing..." : "Share"}
        </button>
      </div>
    </div>
  );
}
