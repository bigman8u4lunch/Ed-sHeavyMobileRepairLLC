import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ed's Heavy Mobile Repair — Escondido's trusted heavy-duty truck and trailer repair shop with mobile service throughout San Diego County.",
};

export default function AboutPage() {
  return (
    <>
      <Header activePath="/about" />

      <PageHeader
        title={`About ${business.name}`}
        subtitle="Trusted heavy duty repair services in Escondido"
        image="/images/about-header.jpg"
        imageAlt={`About ${business.name}`}
      />

      <section className="content">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <h2>Our Story</h2>
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
                We specialize in comprehensive repair and maintenance services for
                semi-trucks, commercial vehicles, and diesel equipment. From routine
                maintenance to complex engine rebuilds, we have the expertise and
                state-of-the-art equipment to handle all your heavy duty repair
                needs.
              </p>
              <p>
                Our commitment to quality workmanship and customer satisfaction has
                made us a trusted partner for fleet managers and owner-operators
                throughout the region.
              </p>
            </div>

            <div className="content-sidebar">
              <div className="sidebar-card">
                <h3>Contact Information</h3>
                <a href={`tel:${business.phoneTel}`}>📞 {business.phone}</a>
                <a href={`mailto:${business.email}`}>✉️ {business.email}</a>
                <p>📍 {business.address.full}</p>
              </div>

              <div className="sidebar-card">
                <h3>Business Hours</h3>
                {business.hours.map((h) => (
                  <p key={h.day}>
                    <strong>{h.day}:</strong> {h.hours}
                  </p>
                ))}
              </div>

              <div className="sidebar-card cta-card">
                <h3>Need Service?</h3>
                <p>
                  Contact us today to schedule your repair or maintenance service.
                </p>
                <Link href="/contact" className="cta-btn">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
