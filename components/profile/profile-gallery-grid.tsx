import Image from "next/image";
import { Post } from "@/app/types/api";

interface ProfileGalleryGridProps {
  posts: Post[];
}

export function ProfileGalleryGrid({ posts }: ProfileGalleryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-0.5 md:gap-1">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square overflow-hidden rounded-sm md:rounded-md"
        >
          <Image
            src={post.imageUrl}
            alt=""
            width={268}
            height={268}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
