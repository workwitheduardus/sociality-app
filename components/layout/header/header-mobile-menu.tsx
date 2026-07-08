"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export function HeaderMobileMenuToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu className="h-6 w-6 text-white" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="flex items-center justify-between px-4 h-16">
            <span className="text-display-xs font-bold text-white">
              Sociality
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          {/* nav links go here */}
        </div>
      )}
    </>
  );
}
