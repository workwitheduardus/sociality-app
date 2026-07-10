export function EmptyState({
  message = "Nothing here yet",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-md text-gray-400">{message}</p>
    </div>
  );
}
