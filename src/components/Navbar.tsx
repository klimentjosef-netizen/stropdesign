"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { label: "O nás", href: "/o-nas" },
  { label: "Co nabízíme", href: "/sluzby" },
  { label: "Jak to funguje", href: "/postup" },
  { label: "Reference", href: "/reference" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/">
          <Logo variant="dark" size={34} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[12px] font-normal tracking-[0.06em] uppercase text-muted hover:text-heading transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Language */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/kontakt"
            className="bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-6 py-2.5 hover:bg-accent-hover transition-all duration-200"
          >
            Poptávka zdarma
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-[2px] bg-heading transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-heading transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-heading transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[400px] border-t border-border" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-body hover:text-heading transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setIsOpen(false)}
            className="mt-2 text-center bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-6 py-3 hover:bg-accent-hover transition-all duration-200"
          >
            Poptávka zdarma
          </Link>
        </div>
      </div>
    </nav>
  );
}
