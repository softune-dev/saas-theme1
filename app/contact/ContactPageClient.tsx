"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { Footer } from "@/components/footer/Footer";
import type { PublicSiteConfig } from "@/lib/theme-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:8000";

type Business = NonNullable<PublicSiteConfig["site"]["business"]>;

const SOCIAL_ICON_PATHS: Record<string, string> = {
  facebook:
    "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  tiktok:
    "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z",
};

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
  const socials = business.socials
    ? Array.isArray(business.socials)
      ? []
      : Object.entries(business.socials).filter(([, url]) => url)
    : [];
  const hours = business.opening_hours ?? [];

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
              {socials.length > 0 ? (
                <div className="space-y-4 pt-6 border-t border-stone-200">
                  <h3 className="font-semibold text-[10px] uppercase tracking-[0.2em] text-stone-400">
                    Connect With Us
                  </h3>
                  <div className="flex items-center gap-6">
                    {socials.map(([platform, url]) => {
                      const path = SOCIAL_ICON_PATHS[platform];
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-[var(--foreground)] transition-colors"
                          aria-label={platform}
                        >
                          {path ? (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d={path} />
                            </svg>
                          ) : (
                            <span className="text-xs font-medium capitalize">{platform}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
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
