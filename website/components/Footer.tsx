import Link from "next/link";
import Image from "next/image";
import { business, serviceNames, repairNames } from "@/lib/site-data";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <Image
                src="/images/logo.webp"
                alt={`${business.name} Logo`}
                width={613}
                height={195}
                style={{ height: 40, width: "auto" }}
              />
            </div>
            <p>Your trusted partner for heavy duty truck and diesel repair services.</p>
            <div className="footer-social">
              <a
                href={business.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Google Business"
              >
                <GoogleIcon />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul className="footer-links">
              {serviceNames.map((name) => (
                <li key={name}>
                  <Link href="/services">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Repairs</h4>
            <ul className="footer-links">
              {repairNames.map((name) => (
                <li key={name}>
                  <Link href="/repairs">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
