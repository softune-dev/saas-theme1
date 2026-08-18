"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer/Footer";

export default function AboutPage() {
  const pillars = [
    {
      icon: Award,
      title: "Genuine Heritage",
      body: "We partner directly with family-run master artisan weaving clusters across Rupganj, Jessore, and Dhamrai.",
    },
    {
      icon: Heart,
      title: "Fair Compensation",
      body: "Artisans receive dignified pay and support directly, helping preserve their heritage craft.",
    },
    {
      icon: ShieldCheck,
      title: "Traceable Origins",
      body: "Every single fiber is ethically sourced. We design slow garments made to last generations.",
    },
    {
      icon: Sparkles,
      title: "Modern Cuts",
      body: "Blending timeless handloom craftsmanship with contemporary, understated silhouettes.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col">

      {/* Editorial Header */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-16 md:pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <span className="eyebrow justify-center">Our Story</span>
          <h1
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-[var(--foreground)]"
          >
            Slower pace.
            <br />
            <span className="italic font-light">Heirloom craft.</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
            Quiet, considered garments and lifestyle goods. Directly bridging traditional master craft clusters with modern, minimal living.
          </p>
        </motion.div>
      </section>

      {/* Story Stage */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] md:aspect-[4/5] bg-stone-200 overflow-hidden"
        >
          <Image
            src="/assets/hero-4.jpg"
            alt="Artisan loom weaving"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 text-left max-w-md"
        >
          <span className="eyebrow">The Origin</span>
          <h2
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-3xl md:text-4xl leading-[1.1] text-[var(--foreground)]"
          >
            Where heritage meets contemporary form
          </h2>
          <p className="text-sm md:text-base text-stone-500 leading-relaxed">
            Founded with the belief that design should honor the hands that create it. Every piece in our collection is produced slowly, allowing weavers in Bengal’s historic craft hubs the time required to hand-finish each garment properly.
          </p>
          <p className="text-sm md:text-base text-stone-500 leading-relaxed">
            We operate on a fair-trade basis, eliminating middle layers. This enables weaving families to earn fair compensation directly, while we provide our clients with authentic, quiet statements.
          </p>
        </motion.div>
      </section>

      {/* Pillars Section */}
      <section className="border-t hairline bg-stone-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="text-center mb-16 space-y-4">
            <span className="eyebrow justify-center font-semibold">Our Commitment</span>
            <h3
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              className="font-display text-3xl md:text-4xl text-[var(--foreground)]"
            >
              The principles behind every weave.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 border border-stone-200 bg-[var(--background)] flex flex-col justify-between h-full"
              >
                <div>
                  <p.icon strokeWidth={1} className="w-8 h-8 text-stone-600 mb-6" />
                  <h4
                    style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                    className="font-display text-xl text-[var(--foreground)] mb-3"
                  >
                    {p.title}
                  </h4>
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
