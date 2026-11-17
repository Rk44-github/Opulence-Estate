export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-neutral-200 bg-[#F4F4F5] py-14 sm:py-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200">
          <div className="md:col-span-5">
            <a
              href="#hero"
              className="font-display text-base font-bold tracking-tight text-[#111111]"
            >
              HORIZON ESTATE
            </a>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-sm">
              Private architectural brokerage representing modern villas,
              penthouses, and coastal estates across North America and Europe.
            </p>
            <p className="mt-4 text-xs text-neutral-500 tabular-nums">
              concierge@horizonestate.com · +1 (917) 555-0194
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8"
          >
            <div>
              <h3 className="font-display text-xs font-semibold text-[#111111] mb-3">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600">
                <li>
                  <a
                    href="#hero"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#properties"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Residences
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#111111] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Private Inquiry
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold text-[#111111] mb-3">
                Destinations
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600">
                <li>
                  <a
                    href="#properties"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Los Angeles &amp; Aspen
                  </a>
                </li>
                <li>
                  <a
                    href="#properties"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Manhattan Penthouses
                  </a>
                </li>
                <li>
                  <a
                    href="#properties"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Exuma &amp; Tulum
                  </a>
                </li>
                <li>
                  <a
                    href="#properties"
                    className="hover:text-[#111111] transition-colors"
                  >
                    Comporta Coast
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold text-[#111111] mb-3">
                Private Offices
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600">
                <li>450 Mercer St, New York</li>
                <li>8920 Sunset Blvd, Los Angeles</li>
                <li>Av. da Liberdade 180, Lisbon</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Horizon Estate Advisory LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-[#111111] transition-colors">
              Client Confidentiality
            </a>
            <a href="#about" className="hover:text-[#111111] transition-colors">
              Advisory Standards
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
