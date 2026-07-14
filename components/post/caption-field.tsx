interface CaptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CaptionField({ value, onChange, error }: CaptionFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm font-bold text-white">Caption</label>
      <div
        className={`rounded-xl border bg-gray-950 px-4 py-2 ${
          error ? "border-error-700" : "border-gray-900"
        }`}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Create your caption"
          rows={4}
          className="w-full resize-none bg-transparent text-md text-white placeholder:text-gray-600 outline-none md:min-h-[168px]"
        />
      </div>
      {error && (
        <p className="text-sm font-medium tracking-tight text-error-700">
          {error}
        </p>
      )}
    </div>
  );
}
