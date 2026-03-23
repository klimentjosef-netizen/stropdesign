"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useDict, useLocalePath } from "@/i18n/LocaleContext";

export default function Footer() {
  const d = useDict();

  const navLinks = [
    { label: d.nav.about, href: useLocalePath("/o-nas") },
    { label: d.nav.services, href: useLocalePath("/sluzby") },
    { label: d.nav.process, href: useLocalePath("/postup") },
    { label: d.nav.references, href: useLocalePath("/reference") },
    { label: d.nav.blog, href: useLocalePath("/blog") },
  ];

  const contactHref = useLocalePath("/kontakt");

  return (
    <>
      {/* Accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <footer className="bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div>
              <Link href={useLocalePath("/")}>
                <Logo variant="light" size={50} />
              </Link>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                {d.footer.description}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/30 mb-4">
                {d.footer.navigation}
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/30 mb-4">
                {d.footer.contact}
              </h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li>
                  <a href="tel:+420739457794" className="hover:text-white transition-colors">
                    +420 739 457 794
                  </a>
                </li>
                <li>
                  <a href="mailto:info@stropdesign.cz" className="hover:text-white transition-colors">
                    info@stropdesign.cz
                  </a>
                </li>
                <li>{d.contact.area}</li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/30 mb-4">
                {d.footer.startToday}
              </h4>
              <p className="text-sm text-white/50 mb-4">
                {d.footer.startTodaySub}
              </p>
              <Link
                href={contactHref}
                className="inline-block bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-6 py-3 hover:bg-accent-hover transition-colors duration-200 rounded-full"
              >
                {d.footer.ctaButton}
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} {d.footer.copyright}
            </p>
            <p className="text-xs text-white/30">
              {d.footer.madeBy}{" "}
              <a
                href="https://webbykliment.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                WebByKliment
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
