import Link from 'next/link';
import Image from 'next/image';

export function HeaderLogo() {
  return (
    <Link href="/feed" className="flex items-center gap-2.5">
      <Image src="/logo.svg" alt="Sociality" width={30} height={30} priority />
      <span className="text-display-xs font-bold text-white">Sociality</span>
    </Link>
  );
}