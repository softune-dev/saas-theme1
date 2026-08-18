"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FeatureIcon } from "@/lib/icon-map";

interface FeaturesSectionProps {
  featuresTitle?: string;
  feature1Title?: string;
  feature1?: string;
  feature1IconKind?: "icon" | "image";
  feature1Icon?: string;
  feature1Image?: string;
  feature2Title?: string;
  feature2?: string;
  feature2IconKind?: "icon" | "image";
  feature2Icon?: string;
  feature2Image?: string;
  feature3Title?: string;
  feature3?: string;
  feature3IconKind?: "icon" | "image";
  feature3Icon?: string;
  feature3Image?: string;
}

type FeatureItem = {
  iconName?: string;
  image?: string;
  title: string;
  description: string;
};

/** No mock titles/bodies — empty slots are dropped; empty section is hidden. */
export function FeaturesSection({
  featuresTitle,
  feature1Title,
  feature1,
  feature1IconKind,
  feature1Icon,
  feature1Image,
  feature2Title,
  feature2,
  feature2IconKind,
  feature2Icon,
  feature2Image,
  feature3Title,
  feature3,
  feature3IconKind,
  feature3Icon,
  feature3Image,
}: FeaturesSectionProps) {
  const raw: FeatureItem[] = [
    {
      iconName:
        feature1IconKind === "icon" && feature1Icon
          ? feature1Icon
          : undefined,
      image:
        feature1IconKind === "image" && feature1Image
          ? feature1Image
          : undefined,
      title: (feature1Title ?? "").trim(),
      description: (feature1 ?? "").trim(),
    },
    {
      iconName:
        feature2IconKind === "icon" && feature2Icon
          ? feature2Icon
          : undefined,
      image:
        feature2IconKind === "image" && feature2Image
          ? feature2Image
          : undefined,
      title: (feature2Title ?? "").trim(),
      description: (feature2 ?? "").trim(),
    },
    {
      iconName:
        feature3IconKind === "icon" && feature3Icon
          ? feature3Icon
          : undefined,
      image:
        feature3IconKind === "image" && feature3Image
          ? feature3Image
          : undefined,
      title: (feature3Title ?? "").trim(),
      description: (feature3 ?? "").trim(),
    },
  ];

  const commitments = raw.filter((item) => item.title || item.description);
  if (commitments.length === 0) return null;

  const title = (featuresTitle ?? "").trim();

  return (
    <section className="w-full border-t hairline bg-transparent">
      <div className="mx-auto max-w-[1600px]">
        {title ? (
          <h2
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display px-6 pt-8 text-center text-2xl leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl md:pt-10 md:text-4xl"
          >
            {title}
          </h2>
        ) : null}
        <div
          className={[
            "grid grid-cols-1 divide-y hairline md:divide-y-0 md:divide-x",
            commitments.length === 1
              ? "md:grid-cols-1"
              : commitments.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3",
          ].join(" ")}
        >
          {commitments.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col items-center px-6 py-8 text-center transition-colors duration-300 hover:bg-stone-100/40 md:py-10"
            >
              {item.image ? (
                <span className="relative mb-5 h-10 w-10 overflow-hidden rounded-full">
                  <Image src={item.image} alt="" fill className="object-cover" />
                </span>
              ) : item.iconName ? (
                <FeatureIcon
                  name={item.iconName}
                  strokeWidth={1.1}
                  className="mb-5 h-7 w-7 text-stone-600 transition-colors group-hover:text-stone-900"
                />
              ) : null}
              {item.title ? (
                <h3
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                  className="font-display mb-3 text-xl text-[var(--foreground)] md:text-2xl"
                >
                  {item.title}
                </h3>
              ) : null}
              {item.description ? (
                <p className="max-w-[280px] text-xs leading-relaxed text-stone-500 md:text-sm">
                  {item.description}
                </p>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
