import React from "react";
import type { Metadata } from "next";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Footer } from "@/components/footer/Footer";
import { getSiteHost, getPageSeo, buildMetadata, getSiteConfig } from "@/lib/get-site";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const host = await getSiteHost();
  const seo = await getPageSeo("faq", host);

  return buildMetadata(seo);
}

export default async function FAQPage() {
  const host = await getSiteHost();
  const config = await getSiteConfig(host);
  const faqs = config.site.faqs ?? [];

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col text-[var(--foreground)]">
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      ) : null}
      {/* Header Banner */}
      <div className="bg-stone-50 border-b hairline py-12 sm:py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center space-y-3">
          <span className="eyebrow justify-center">Help & Answers</span>
          <h1
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Faq.
          </h1>
          <p className="text-sm text-stone-500 max-w-lg mx-auto">
            Everything you need to know about our products, delivery timelines, and exchange policies.
          </p>
        </div>
      </div>

      {/* Accordion Questions */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 sm:py-16 flex-1 w-full space-y-10 text-left">
        {faqs.length === 0 ? (
          <p className="text-center text-sm text-stone-500">
            No frequently asked questions yet — check back soon.
          </p>
        ) : (
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.id} title={faq.question} defaultOpen={i === 0}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* Help Banner */}
        <div className="p-8 bg-stone-50 border hairline flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-stone-300 bg-stone-100 flex items-center justify-center text-[var(--foreground)] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                className="font-display text-lg text-[var(--foreground)]"
              >
                Still have questions?
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Reach out and our team will get back to you.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[var(--theme-btn-radius)] bg-[var(--brand)] text-[var(--background)] px-6 py-3 text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Contact Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
