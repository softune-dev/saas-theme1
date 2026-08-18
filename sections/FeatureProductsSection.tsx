"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/theme-types";
import { ProductCard } from "@/components/product/ProductCard";

interface FeatureProductsSectionProps {
  featureProductsTitle: string;
  selectedProductIds?: string[];
  products: Product[];
}

export function FeatureProductsSection({
  featureProductsTitle,
  selectedProductIds,
  products: allProducts,
}: FeatureProductsSectionProps) {
  // The merchant must explicitly pick products in the editor — no
  // "nothing selected = show everything" fallback. Until they do, this
  // section has nothing configured yet, not an arbitrary catalog dump.
  const displayProducts =
    selectedProductIds && selectedProductIds.length > 0
      ? allProducts.filter((p) => selectedProductIds.includes(p.id))
      : [];

  if (displayProducts.length === 0) return null;

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-end justify-between md:mb-8"
      >
        <div>
          <h2
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-2xl leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl"
          >
            {(featureProductsTitle ?? "").trim() || "Featured"}
          </h2>
        </div>

        <Link
          href="/shop"
          className="hidden md:inline-block text-[12px] uppercase tracking-[0.24em] link-underline text-[var(--foreground)]"
        >
          Shop latest
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {displayProducts.slice(0, 8).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      </div>
    </section>
  );
}
