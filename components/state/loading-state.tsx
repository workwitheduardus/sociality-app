export function LoadingState() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 w-full animate-pulse rounded-lg bg-gray-900"
        />
      ))}
    </div>
  );
}
