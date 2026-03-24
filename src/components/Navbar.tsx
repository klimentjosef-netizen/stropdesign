"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useDict, useLocalePath } from "@/i18n/LocaleContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const d = useDict();

  const navLinks = [
    { label: d.nav.about, href: useLocalePath("/o-nas") },
    { label: d.nav.services, href: useLocalePath("/sluzby") },
    { label: d.nav.process, href: useLocalePath("/postup") },
    { label: d.nav.references, href: useLocalePath("/reference") },
    { label: d.nav.blog, href: useLocalePath("/blog") },
    { label: d.nav.contact, href: useLocalePath("/kontakt") },
  ];

  const contactHref = useLocalePath("/kontakt") + "#kontakt-formular";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href={useLocalePath("/")}>
          <Logo variant="dark" size={90} />
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

        {/* Social + CTA + Language */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=61582534764580"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors duration-200"
            aria-label="Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/strop_design/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href={contactHref}
            className="bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-6 py-2.5 hover:bg-accent-hover transition-all duration-200 rounded-full"
          >
            {d.nav.cta}
          </a>
          <LanguageSwitcher />
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
          <div className="mt-2 flex items-center gap-3">
            <LanguageSwitcher />
          </div>
          <a
            href={contactHref}
            onClick={() => setIsOpen(false)}
            className="text-center bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-6 py-3 hover:bg-accent-hover transition-all duration-200 rounded-full"
          >
            {d.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
