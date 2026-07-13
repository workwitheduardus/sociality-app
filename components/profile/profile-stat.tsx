interface ProfileStatProps {
  value: number;
  label: string;
  isLast?: boolean;
}

export function ProfileStat({ value, label, isLast }: ProfileStatProps) {
  return (
    <div className="flex flex-1 items-center gap-6">
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-lg font-bold tracking-[-0.03em] text-white md:text-xl">
          {value}
        </span>
        <span className="text-xs text-gray-400 md:text-md">{label}</span>
      </div>
      {!isLast && <div className="h-[50px] w-px bg-gray-900 md:h-[66px]" />}
    </div>
  );
}
