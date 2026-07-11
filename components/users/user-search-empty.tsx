export function UserSearchEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-24 text-center">
      <p className="text-md font-bold tracking-[-0.02em] text-white">
        No results found
      </p>
      <p className="text-sm tracking-[-0.02em] text-gray-400">
        Change your keyword
      </p>
    </div>
  );
}
