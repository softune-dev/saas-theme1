"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, CheckCircle2, HeartHandshake } from "lucide-react";

interface WhyChooseUsSectionProps {
  whyTitle: string;
  whyImage: string;
  why1Title: string;
  why1: string;
  why2Title: string;
  why2: string;
  why3Title: string;
  why3: string;
}

const ICONS = [Award, CheckCircle2, HeartHandshake] as const;

/**
 * No DEFAULTS fallback — empty merchant fields must not invent “Maison”
 * copy. Hide the whole section when nothing real is configured.
 */
export function WhyChooseUsSection({
  whyTitle,
  whyImage,
  why1Title,
  why1,
  why2Title,
  why2,
  why3Title,
  why3,
}: WhyChooseUsSectionProps) {
  const points = [
    { title: (why1Title ?? "").trim(), body: (why1 ?? "").trim(), Icon: ICONS[0], n: "01" },
    { title: (why2Title ?? "").trim(), body: (why2 ?? "").trim(), Icon: ICONS[1], n: "02" },
    { title: (why3Title ?? "").trim(), body: (why3 ?? "").trim(), Icon: ICONS[2], n: "03" },
  ].filter((p) => p.title || p.body);

  const title = (whyTitle ?? "").trim();
  const image = (whyImage ?? "").trim();

  if (points.length === 0) return null;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 md:py-14">
        {/* Image is secondary and compact — text leads, especially on mobile */}
        <div className="grid w-full grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-10 lg:gap-12">
          <div className="order-1 w-full space-y-5 md:col-span-7 lg:col-span-7">
            {title ? (
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                className="font-display text-2xl leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl"
              >
                {title}
              </motion.h2>
            ) : null}

            <div className="w-full divide-y divide-stone-200/80 border-t border-stone-200/80">
              {points.map((pt, idx) => {
                const Icon = pt.Icon;
                return (
                  <motion.div
                    key={pt.n}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 py-4 sm:gap-x-4 sm:py-5"
                  >
                    <Icon
                      className="mt-0.5 size-5 shrink-0 text-stone-700"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      {pt.title ? (
                        <h3
                          style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                          className="font-display text-base leading-snug text-[var(--foreground)] sm:text-lg md:text-xl"
                        >
                          <span className="mr-2 font-display text-xs text-stone-400 tabular-nums sm:text-sm">
                            {pt.n}
                          </span>
                          {pt.title}
                        </h3>
                      ) : null}
                      {pt.body ? (
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-stone-500">
                          {pt.body}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {image ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 w-full md:col-span-5 lg:col-span-5"
            >
              {/* Shorter aspect so copy isn’t dwarfed; capped width on mobile */}
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden bg-stone-100 md:mx-0 md:max-w-none md:aspect-[5/4]">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
