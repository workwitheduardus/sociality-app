import Image from "next/image";

interface HeaderUserMenuProps {
  name: string;
  avatarUrl: string | null;
}

export function HeaderUserMenu({ name, avatarUrl }: HeaderUserMenuProps) {
  return (
    <button className="flex items-center gap-3">
      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-700">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <span className="text-md font-bold text-white">{name}</span>
    </button>
  );
}
