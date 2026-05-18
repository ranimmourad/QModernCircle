import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#3E2723] text-cream/90 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="font-display text-4xl tracking-widest mb-6">
              Modern<span className="italic-accent text-terracotta mx-1"></span>Circle
            </h2>
            <p className="font-heading italic text-cream/70 text-lg max-w-md leading-relaxed">
              A quiet coffee sanctuary and concept store — where slow living,
              handmade craft, and good company meet.
            </p>
            <div className="flex gap-5 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-terracotta transition-colors"
              >
                <Instagram size={20} strokeWidth={1.25} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-terracotta transition-colors"
              >
                <Facebook size={20} strokeWidth={1.25} />
              </a>
              <a
                href="mailto:hello@moderncircle.tn"
                aria-label="Email"
                className="hover:text-terracotta transition-colors"
              >
                <Mail size={20} strokeWidth={1.25} />
              </a>
            </div>
          </div>

          {/* Visit */}
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-6 text-cream/60">
              Visit
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.25} className="mt-1 flex-shrink-0" />
                <span>
                  Av. Martyrs, Résidence Nermine
                  <br />
                  El Mourouj 6, Tunisia
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} strokeWidth={1.25} className="mt-1 flex-shrink-0" />
                <span>+216 29 379 400</span>
              </li>
            </ul>
            <div className="mt-6 text-xs font-light text-cream/60 leading-loose">
              Mon — Sun
              <br />
              08:00 — 23:00
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-6 text-cream/60">
              Explore
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/#about" className="hover:text-terracotta transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-terracotta transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-terracotta transition-colors">
                  Concept Store
                </Link>
              </li>
              <li>
                <Link href="/#reserve" className="hover:text-terracotta transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-terracotta transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-cream/50 tracking-wide">
            © {new Date().getFullYear()} Modern Circle · Handmade, heartmade.
          </p>
          <div className="flex items-center gap-6 text-xs font-light text-cream/50 tracking-widest uppercase">
            <Link
              href="/admin-login"
              className="hover:text-terracotta transition-colors"
            >
              Admin Login
            </Link>
            <span className="opacity-30">·</span>
            <Link
              href="/employee-login"
              className="hover:text-terracotta transition-colors"
            >
              Employee Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
