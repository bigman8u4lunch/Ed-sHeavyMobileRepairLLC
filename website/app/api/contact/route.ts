import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/lib/site-data";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? business.email;
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ??
  `${business.name} <onboarding@resend.dev>`;

const INQUIRY_TYPES = new Set([
  "Schedule Service",
  "Request a Quote",
  "General Question",
  "Emergency Repair",
]);

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  inquiry_type?: string;
  message?: string;
  website?: string; // honeypot
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; treat as success without sending.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const inquiryType = body.inquiry_type?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !phone || !email || !inquiryType || !message) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!INQUIRY_TYPES.has(inquiryType)) {
    return NextResponse.json(
      { error: "Please select a valid inquiry type." },
      { status: 400 }
    );
  }

  if (name.length > 200 || phone.length > 50 || message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const subject = `Service Inquiry: ${inquiryType} - ${name}`;
  const text = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Inquiry Type: ${inquiryType}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <h2>New service inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          error:
            "Unable to send your message right now. Please try again or call us.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // Zero-config fallback when Resend is not provisioned yet.
  // First delivery requires confirming the activation email sent to TO_EMAIL.
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          inquiry_type: inquiryType,
          message,
          _subject: subject,
          _replyto: email,
          _template: "table",
        }),
      }
    );

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      console.error("FormSubmit error:", response.status, details);
      return NextResponse.json(
        {
          error:
            "Unable to send your message right now. Please try again or call us.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact delivery error:", err);
    return NextResponse.json(
      {
        error:
          "Unable to send your message right now. Please try again or call us.",
      },
      { status: 502 }
    );
  }
}
