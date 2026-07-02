import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { repairs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Repair Services",
  description:
    "Expert heavy duty truck and diesel repairs in Escondido, CA — engine rebuilds, brakes, transmission, suspension, and more.",
};

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function RepairsPage() {
  return (
    <>
      <Header activePath="/repairs" />

      <PageHeader
        title="Repair Services"
        subtitle="Expert heavy duty truck and diesel repairs to get you back on the road quickly and safely"
        image="/images/repairs-header.jpg"
        imageAlt="Repair Services"
      />

      <section className="repairs-section">
        <div className="container">
          <div className="repairs-grid">
            {repairs.map((repair) => (
              <div key={repair.title} className="repair-card">
                <h3>{repair.title}</h3>
                <p>{repair.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Need Emergency Repairs?</h2>
          <p>Our team is ready to help. Contact us now to get your truck back on the road.</p>
          <Link href="/contact" className="cta-button">
            Schedule Service
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
