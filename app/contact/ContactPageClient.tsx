"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { Footer } from "@/components/footer/Footer";
import { SocialLinks } from "@/components/social-links/SocialLinks";
import type { Business } from "@/lib/business-context";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:8000";

export function ContactPageClient({
  business,
  host,
}: {
  business: Business;
  host: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Order Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/public/site/${host}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { name, phone, subject, message } }),
      });
      if (!res.ok) throw new Error("Couldn't send your message. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const address = business.address;
  const addressLine = [address?.street, address?.city, address?.region, address?.country]
    .filter(Boolean)
    .join(", ");
  const hours = business.opening_hours ?? [];
  const hasSocials =
    business.socials &&
    !Array.isArray(business.socials) &&
    Object.values(business.socials).some(Boolean);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col text-[var(--foreground)]">
      {/* Header Banner */}
      <div className="bg-stone-50 border-b hairline py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center space-y-3">
          <span className="eyebrow justify-center">Get in Touch</span>
          <h1
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Contact & Customer Care
          </h1>
          {business.support_note ? (
            <p className="text-sm text-stone-500 max-w-lg mx-auto">{business.support_note}</p>
          ) : null}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 sm:py-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-8">
              <h2
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                className="font-display text-2xl text-[var(--foreground)] border-b hairline pb-3"
              >
                Channels.
              </h2>

              <div className="space-y-8 text-sm text-stone-500 leading-relaxed">
                {addressLine ? (
                  <div className="space-y-2.5">
                    <MapPin strokeWidth={1.25} className="w-6 h-6 text-[var(--foreground)]" />
                    <h3 className="font-semibold text-xs uppercase tracking-widest text-[var(--foreground)]">
                      Studio Office
                    </h3>
                    <p>{addressLine}</p>
                  </div>
                ) : null}

                {business.phone ? (
                  <div className="space-y-2.5">
                    <Phone strokeWidth={1.25} className="w-6 h-6 text-[var(--foreground)]" />
                    <h3 className="font-semibold text-xs uppercase tracking-widest text-[var(--foreground)]">
                      Hotline
                    </h3>
                    <p className="font-semibold text-[var(--foreground)]">{business.phone}</p>
                  </div>
                ) : null}

                {business.whatsapp ? (
                  <div className="space-y-2.5">
                    <MessageCircle strokeWidth={1.25} className="w-6 h-6 text-[var(--foreground)]" />
                    <h3 className="font-semibold text-xs uppercase tracking-widest text-[var(--foreground)]">
                      WhatsApp concierge
                    </h3>
                    <a
                      href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--foreground)] font-semibold hover:opacity-85 link-underline inline-block"
                    >
                      Chat on WhatsApp directly →
                    </a>
                  </div>
                ) : null}

                {hours.length > 0 ? (
                  <div className="space-y-2.5">
                    <Clock strokeWidth={1.25} className="w-6 h-6 text-[var(--foreground)]" />
                    <h3 className="font-semibold text-xs uppercase tracking-widest text-[var(--foreground)]">
                      Operating Hours
                    </h3>
                    {hours.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}

                {!addressLine && !business.phone && !business.whatsapp && hours.length === 0 ? (
                  <p className="text-stone-400">Contact details coming soon.</p>
                ) : null}
              </div>

              {/* Connect Section */}
              {hasSocials ? (
                <div className="space-y-4 pt-6 border-t border-stone-200">
                  <h3 className="font-semibold text-[10px] uppercase tracking-[0.2em] text-stone-400">
                    Connect With Us
                  </h3>
                  <SocialLinks
                    socials={business.socials}
                    className="flex items-center gap-6"
                    iconClassName="w-5 h-5"
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 p-8 sm:p-12 border hairline">
              <h2
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                className="font-display text-2xl text-[var(--foreground)] mb-2"
              >
                Send Us a Message
              </h2>
              <p className="text-xs text-stone-500 mb-8">
                Fill in the details below and we'll get back to you.
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-50/50 border border-emerald-200 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h3 className="text-lg font-semibold text-emerald-950">
                    Thank you! Your message has been received.
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Our team will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="mt-2 text-xs uppercase tracking-wider font-semibold underline text-[var(--foreground)]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-transparent border-b border-stone-300 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)] transition-colors placeholder:text-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-transparent border-b border-stone-300 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)] transition-colors placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-transparent border-b border-stone-300 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)] transition-colors"
                    >
                      <option value="Order Inquiry">Order Inquiry & Tracking</option>
                      <option value="Product & Sizing">Product & Sizing Details</option>
                      <option value="Exchange & Returns">Exchange or Return Assistance</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please detail your inquiry..."
                      className="w-full bg-transparent border-b border-stone-300 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--brand)] transition-colors placeholder:text-stone-400"
                    />
                  </div>

                  {error ? <p className="text-xs text-red-600">{error}</p> : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-[var(--theme-btn-radius)] bg-[var(--brand)] text-[var(--background)] py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <span>{submitting ? "Sending…" : "Send Message"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
