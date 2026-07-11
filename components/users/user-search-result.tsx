import Link from "next/link";
import Image from "next/image";
import { User } from "@/app/types/api";

export function UserSearchResult({ user }: { user: User }) {
  return (
    <Link
      href={`/profile/${user.username}`}
      className="flex items-center gap-2 px-4 py-3 md:gap-3"
    >
      <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-700 md:h-12 md:w-12">
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
        <p className="text-sm font-bold text-white md:text-md">{user.name}</p>
        <p className="text-sm text-gray-400">{user.username}</p>
      </div>
    </Link>
  );
}
