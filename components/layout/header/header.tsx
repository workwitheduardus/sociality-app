"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { HeaderLogo } from "./header-logo";
import { HeaderSearch } from "./header-search";
import { HeaderAuthActions } from "./header-auth-actions";
import { HeaderUserMenu } from "./header-user-menu";
import { HeaderMobileMenuToggle } from "./header-mobile-menu";

interface HeaderProps {
  user?: { name: string; avatarUrl: string | null } | null;
}

export function Header({ user }: HeaderProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  if (mobileSearchOpen) {
    return (
      <HeaderSearch
        variant="mobile"
        onClose={() => setMobileSearchOpen(false)}
      />
    );
  }

  return (
    <header className="w-full bg-black border-b border-gray-900">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between gap-8 px-[120px] h-20">
        <HeaderLogo />
        <HeaderSearch variant="desktop" />
        {user ? (
          <HeaderUserMenu name={user.name} avatarUrl={user.avatarUrl} />
        ) : (
          <HeaderAuthActions />
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-16">
        <HeaderLogo />
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileSearchOpen(true)} aria-label="Search">
            <Search className="h-5 w-5 text-white" />
          </button>
          {user ? (
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-700" />
          ) : (
            <HeaderMobileMenuToggle />
          )}
        </div>
      </div>
    </header>
  );
}
