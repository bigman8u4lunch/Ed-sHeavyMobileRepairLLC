import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { business, services, repairs, testimonials } from "@/lib/site-data";

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#4285F4" }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      <Header activePath="/" />

      <section className="hero has-image">
        <div className="hero-bg-image">
          <Image
            src="/images/hero.jpg"
            alt={`${business.name} - Heavy Duty Repair`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1>
              Heavy Duty Truck &amp; Equipment Repair
              <br />
              <span>in Escondido</span>
            </h1>
            <p>
              Professional heavy duty repair services you can trust. Keeping your
              fleet on the road with expert maintenance and repairs.
            </p>
            <Link href="/contact" className="hero-cta">
              Schedule Service
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Your Trusted Partner for Heavy Duty Repair</h2>
              <p>
                Ed&apos;s Heavy Mobile Repair is Escondido, California &amp; the
                surrounding areas trusted choice for heavy-duty truck &amp; trailer
                repair shop. We decades of combined diesel mechanic experience, we
                offer a comprehensive range of heavy-duty truck, trailer, fleet,
                &amp; heavy equipment repair and maintenance services. In addition
                to our full-service truck repair shop, we provide mobile truck
                repair service throughout Escondido &amp; San Diego County. Contact
                our team today with any questions, to request a quote, &amp; to
                schedule service!
              </p>
              <p>
                From routine maintenance to complex engine rebuilds, we have the
                expertise and equipment to handle all your commercial vehicle
                repair needs.
              </p>
              <Link href="/about" className="about-link">
                Learn More About Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
            <div className="about-image">
              <Image
                src="/images/shop.jpg"
                alt={`${business.name} - Our Shop`}
                width={600}
                height={400}
                style={{ width: "100%", height: "auto", borderRadius: "0.75rem" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive service solutions to keep your fleet running at peak
              performance
            </p>
          </div>
          <div className="services-grid-compact">
            {services.map((service) => (
              <Link key={service.title} href="/services" className="service-card-compact">
                <span>{service.title}</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link href="/services" className="view-all-link">
              View All Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="repairs" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Repair Services</h2>
            <p className="section-subtitle">
              Expert repairs for all major truck systems and components
            </p>
          </div>
          <div className="services-grid-compact">
            {repairs.map((repair) => (
              <Link key={repair.title} href="/repairs" className="service-card-compact">
                <span>{repair.title}</span>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link href="/repairs" className="view-all-link">
              View All Repairs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Don&apos;t just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="testimonial-avatar"
                  />
                  <div>
                    <strong>{t.name}</strong>
                    <span className="testimonial-source">
                      <GoogleIcon />
                      {t.source} • {t.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="google-review-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Review Us On Google
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">
              Get in touch with our team for service inquiries and scheduling
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info-card">
              <h3>Get In Touch</h3>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4>Location</h4>
                  <p>
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state}{" "}
                    {business.address.zip}
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4>Phone</h4>
                  <a href={`tel:${business.phoneTel}`}>{business.phone}</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4>Email</h4>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="contact-item-content">
                  <h4>Hours</h4>
                  {business.hours.map((h) => (
                    <p key={h.day} style={{ marginBottom: "0.25rem" }}>
                      <strong>{h.day}:</strong> {h.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address.full)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map to Ed's Heavy Mobile Repair"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
