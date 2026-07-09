import Link from "next/link";
import Image from "next/image";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="relative z-10 mx-auto flex w-[345px] flex-col items-center gap-4 rounded-2xl border border-gray-900 bg-black/20 p-4 py-8 backdrop-blur-xl md:w-[446px] md:gap-6 md:p-6 md:py-10">
      <Link href="/" className="flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Sociality" width={30} height={30} />
        <span className="text-display-xs font-bold text-white">Sociality</span>
      </Link>
      <h1 className="text-center text-xl font-bold text-white md:text-display-xs">
        {title}
      </h1>
      {children}
    </div>
  );
}
