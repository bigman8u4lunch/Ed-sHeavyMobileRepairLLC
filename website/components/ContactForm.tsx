"use client";

import { useState, FormEvent } from "react";
import { business } from "@/lib/site-data";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const email = data.get("email");
    const inquiryType = data.get("inquiry_type");
    const message = data.get("message");

    const subject = encodeURIComponent(
      `Service Inquiry: ${inquiryType} - ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message}`
    );

    try {
      window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch {
      setError(true);
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          style={{ margin: "0 auto 1rem" }}
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 style={{ marginBottom: "0.5rem" }}>Thank You!</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          Your email client should open with your message. If it doesn&apos;t, please
          call us at{" "}
          <a href={`tel:${business.phoneTel}`} style={{ color: "var(--primary)" }}>
            {business.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inquiry_type">Inquiry Type</label>
          <select id="inquiry_type" name="inquiry_type" required defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option value="Schedule Service">Schedule Service</option>
            <option value="Request a Quote">Request a Quote</option>
            <option value="General Question">General Question</option>
            <option value="Emergency Repair">Emergency Repair</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us about your service or repair needs..."
            required
          />
        </div>

        <button type="submit" className="form-submit">
          Send Message
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>

      {error && (
        <div
          style={{
            textAlign: "center",
            padding: "1.5rem",
            marginTop: "1rem",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "0.5rem",
          }}
        >
          <p style={{ color: "#dc2626" }}>
            Something went wrong. Please call us at{" "}
            <a href={`tel:${business.phoneTel}`}>{business.phone}</a>.
          </p>
        </div>
      )}
    </>
  );
}
