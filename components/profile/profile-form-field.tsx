interface ProfileFormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  multiline?: boolean;
  type?: string;
}

export function ProfileFormField({
  label,
  value,
  onChange,
  error,
  multiline,
  type = "text",
}: ProfileFormFieldProps) {
  const borderClass = error ? "border-error-700" : "border-gray-900";

  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm font-bold text-white">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={`rounded-xl border bg-gray-950 px-4 py-2 text-md text-white outline-none ${borderClass}`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`rounded-xl border bg-gray-950 px-4 py-2 text-md font-semibold text-white outline-none ${borderClass}`}
        />
      )}
      {error && (
        <p className="text-sm font-medium tracking-tight text-error-700">
          {error}
        </p>
      )}
    </div>
  );
}
