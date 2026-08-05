"use client";

import { useState, FormEvent } from "react";
import { business } from "@/lib/site-data";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  inquiry_type: string;
  message: string;
  website: string;
};

async function sendViaFormSubmit(payload: ContactPayload, toEmail: string) {
  const subject = `Service Inquiry: ${payload.inquiry_type} - ${payload.name}`;
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        inquiry_type: payload.inquiry_type,
        message: payload.message,
        _subject: subject,
        _replyto: payload.email,
        _template: "table",
      }),
    }
  );

  const result = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  const succeeded =
    response.ok &&
    (result?.success === true ||
      result?.success === "true" ||
      // First-time activation responses still indicate the request was accepted.
      (typeof result?.message === "string" &&
        /check your email|activate|confirm/i.test(result.message)));

  if (!succeeded) {
    throw new Error(result?.message || "FormSubmit delivery failed");
  }
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: ContactPayload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      inquiry_type: String(data.get("inquiry_type") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        code?: string;
        to?: string;
      } | null;

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        return;
      }

      // No Resend key — deliver from the browser to service@edsheavymobile.com.
      if (response.status === 503 && result?.code === "EMAIL_NOT_CONFIGURED") {
        await sendViaFormSubmit(payload, result.to || business.email);
        setSubmitted(true);
        form.reset();
        return;
      }

      setError(
        result?.error ??
          `Something went wrong. Please call us at ${business.phone}.`
      );
    } catch {
      setError(`Something went wrong. Please call us at ${business.phone}.`);
    } finally {
      setSending(false);
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
          Your message was sent to our service team. We&apos;ll get back to you
          as soon as possible. For urgent needs, call us at{" "}
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
              maxLength={200}
              disabled={sending}
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
              maxLength={50}
              disabled={sending}
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
            disabled={sending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inquiry_type">Inquiry Type</label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            required
            defaultValue=""
            disabled={sending}
          >
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
            maxLength={5000}
            disabled={sending}
          />
        </div>

        {/* Honeypot field — leave empty */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            overflow: "hidden",
          }}
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="form-submit" disabled={sending}>
          {sending ? "Sending..." : "Send Message"}
          {!sending && (
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
          )}
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
            {error}{" "}
            {!error.includes(business.phone) && (
              <>
                Or call{" "}
                <a href={`tel:${business.phoneTel}`}>{business.phone}</a>.
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
}
