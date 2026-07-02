"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { business, serviceNames, repairNames } from "@/lib/site-data";

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function getTodayHours() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[new Date().getDay()];
  const entry = business.hours.find((h) => h.day === today);
  return entry ? `Open Today: ${entry.hours}` : "";
}

export default function Header({ activePath = "/" }: { activePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen((o) => !o);
  const toggleDropdown = (name: string) =>
    setOpenDropdown((current) => (current === name ? null : name));

  const isActive = (path: string) =>
    activePath === path || (path !== "/" && activePath.startsWith(path));

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <a href={`tel:${business.phoneTel}`}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {business.phone}
              </a>
              <a href={`mailto:${business.email}`}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {business.email}
              </a>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {getTodayHours()}
              </span>
              <span className="top-bar-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Escondido, CA
              </span>
            </div>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              <Image
                src="/images/logo.webp"
                alt={`${business.name} Logo`}
                width={1080}
                height={1080}
                priority
              />
            </Link>

            <nav className="nav">
              <Link
                href="/"
                className={`nav-link${isActive("/") && activePath === "/" ? " active" : ""}`}
              >
                Home
              </Link>

              <div className="nav-item">
                <Link
                  href="/services"
                  className={`nav-link${isActive("/services") ? " active" : ""}`}
                >
                  Services
                  <ChevronDown />
                </Link>
                <div className="dropdown">
                  {serviceNames.map((name) => (
                    <Link key={name} href="/services" className="dropdown-item">
                      {name}
                    </Link>
                  ))}
                  <Link href="/services" className="dropdown-item dropdown-view-all">
                    View All Services →
                  </Link>
                </div>
              </div>

              <div className="nav-item">
                <Link
                  href="/repairs"
                  className={`nav-link${isActive("/repairs") ? " active" : ""}`}
                >
                  Repairs
                  <ChevronDown />
                </Link>
                <div className="dropdown">
                  {repairNames.map((name) => (
                    <Link key={name} href="/repairs" className="dropdown-item">
                      {name}
                    </Link>
                  ))}
                  <Link href="/repairs" className="dropdown-item dropdown-view-all">
                    View All Repairs →
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className={`nav-link${isActive("/about") ? " active" : ""}`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`nav-link${isActive("/contact") ? " active" : ""}`}
              >
                Contact
              </Link>
              <Link href="/contact" className="nav-cta">
                Schedule Service
              </Link>
            </nav>

            <button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="icon-menu"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className="mobile-nav-backdrop"
        onClick={toggleMenu}
        style={
          menuOpen
            ? { display: "block", opacity: 1, pointerEvents: "auto" }
            : undefined
        }
      />

      <nav
        className="mobile-nav"
        style={menuOpen ? { transform: "translateX(0)" } : undefined}
      >
        <div className="mobile-nav-header">
          <Link href="/" className="logo" onClick={toggleMenu}>
            <Image
              src="/images/logo.webp"
              alt={`${business.name} Logo`}
              width={1080}
              height={1080}
            />
          </Link>
          <button
            className="mobile-nav-close"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link" onClick={toggleMenu}>
            Home
          </Link>

          <div className={`mobile-dropdown${openDropdown === "services" ? " open" : ""}`}>
            <button
              className="mobile-dropdown-toggle"
              onClick={() => toggleDropdown("services")}
            >
              Services
              <ChevronDown />
            </button>
            <div className="mobile-dropdown-content">
              {serviceNames.map((name) => (
                <Link
                  key={name}
                  href="/services"
                  className="mobile-dropdown-item"
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              ))}
              <Link
                href="/services"
                className="mobile-dropdown-item"
                style={{ color: "var(--primary)", fontWeight: 600 }}
                onClick={toggleMenu}
              >
                View All Services →
              </Link>
            </div>
          </div>

          <div className={`mobile-dropdown${openDropdown === "repairs" ? " open" : ""}`}>
            <button
              className="mobile-dropdown-toggle"
              onClick={() => toggleDropdown("repairs")}
            >
              Repairs
              <ChevronDown />
            </button>
            <div className="mobile-dropdown-content">
              {repairNames.map((name) => (
                <Link
                  key={name}
                  href="/repairs"
                  className="mobile-dropdown-item"
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              ))}
              <Link
                href="/repairs"
                className="mobile-dropdown-item"
                style={{ color: "var(--primary)", fontWeight: 600 }}
                onClick={toggleMenu}
              >
                View All Repairs →
              </Link>
            </div>
          </div>

          <Link href="/about" className="mobile-nav-link" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/contact" className="mobile-nav-link" onClick={toggleMenu}>
            Contact
          </Link>
        </div>

        <Link href="/contact" className="mobile-nav-cta" onClick={toggleMenu}>
          Schedule Service
        </Link>
      </nav>
    </>
  );
}
