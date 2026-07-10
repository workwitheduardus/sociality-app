export function ErrorState({
  message = "Something went wrong",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <p className="text-md text-gray-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-gray-900 px-4 py-2 text-sm font-bold text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
