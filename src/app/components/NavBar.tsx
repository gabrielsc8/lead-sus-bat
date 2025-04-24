"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/admin/leads", label: "Dashboard" },
    { href: "/formulario", label: "Formulário" },
    { href: "/admin/add", label: "Adicionar Admin" },
  ];

  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold focus:outline-hidden focus:opacity-80" href="#" aria-label="Brand">
            <span className="inline-flex items-center gap-x-2 text-xl font-semibold">
              <Image className="w-26 mt-5 h-auto" src="/logo.png" width={26} height={11} alt="Logo" />
            </span>
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              {!open ? (
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              ) : (
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        <div
          className={`${open ? 'block' : 'hidden'} transition-all duration-300 basis-full grow sm:block`}
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium focus:outline-hidden ${
                  pathname === link.href
                    ? 'text-blue-500'
                    : 'text-gray-600 hover:text-gray-400 focus:text-gray-400'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
