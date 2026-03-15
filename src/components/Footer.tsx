import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <footer className="bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <span className="font-display text-[18px] font-bold text-dark leading-none">N</span>
                </div>
                <span className="text-accent text-[11px] font-semibold tracking-[0.18em] uppercase">
                  Strop Design
                </span>
              </Link>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                Designové stropní podhledy formou napínaných stropů v Ostravě a okolí.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/30 mb-4">
                Navigace
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "O nás", href: "/o-nas" },
                  { label: "Co nabízíme", href: "/sluzby" },
                  { label: "Jak to funguje", href: "/postup" },
                  { label: "Reference", href: "/reference" },
                ].map((link) => (
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
                Kontakt
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
                <li>Ostrava a okolí</li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/30 mb-4">
                Začněte ještě dnes
              </h4>
              <p className="text-sm text-white/50 mb-4">
                Nezávazná poptávka zdarma. Odpovídáme do 24 hodin.
              </p>
              <Link
                href="/kontakt"
                className="inline-block bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase px-6 py-3 hover:bg-accent-hover transition-colors duration-200"
              >
                Nezávazná poptávka
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} StropDesign / Derbau s.r.o. Ostrava
            </p>
            <p className="text-xs text-white/30">
              Web vytvořil{" "}
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
