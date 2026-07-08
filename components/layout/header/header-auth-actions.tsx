import Link from "next/link";

export function HeaderAuthActions() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="flex h-11 items-center justify-center rounded-full border border-gray-900 px-6 text-md font-bold text-white"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="flex h-11 items-center justify-center rounded-full bg-brand-600 px-6 text-md font-bold text-white"
      >
        Register
      </Link>
    </div>
  );
}
