import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { business, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive heavy duty truck and diesel service solutions in Escondido, CA — DOT/CVIP inspections, mobile repair, fleet services, and more.",
};

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      <SiteHeader activePath="/services" />

      <PageHeader
        title="Our Services"
        subtitle="Comprehensive heavy duty truck and diesel service solutions to keep your fleet running at peak performance"
        image="/images/services-header.jpg"
        imageAlt="Our Services"
      />

      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>
            Contact us today to schedule your service appointment or get a quote for
            your fleet.
          </p>
          <a href={business.requestServiceUrl} className="cta-button">
            Request Service
            <ArrowIcon />
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
