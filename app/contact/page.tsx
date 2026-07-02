import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${business.name} in Escondido, CA for heavy duty truck & diesel repair. Call ${business.phone} or visit ${business.address.full}.`,
};

export default function ContactPage() {
  return (
    <>
      <Header activePath="/contact" />

      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for service inquiries and scheduling"
        image="/images/contact-header.jpg"
        imageAlt="Contact Us"
      />

      <section className="contact-section">
        <div className="container">
          <div className="contact-page-grid">
            <div className="contact-info-side">
              <h2>Get In Touch</h2>
              <p>
                Have questions about our services or need to schedule a repair?
                We&apos;re here to help. Reach out to us using any of the methods
                below or fill out the contact form.
              </p>

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

            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="map-container" style={{ height: 400, borderRadius: "0.75rem", overflow: "hidden" }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(business.address.full)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map to Ed's Heavy Mobile Repair"
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
