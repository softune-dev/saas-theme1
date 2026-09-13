"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageOff, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/theme-types";
import { formatTaka } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/components/ui/Toast";
import { useTheme } from "@/lib/theme-context";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { getButtonRadiusClass } = useTheme();
  const radius = getButtonRadiusClass();
  const images = (product.images ?? []).filter(Boolean);
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [quickView, setQuickView] = useState(false);

  useEffect(() => {
    if (!hovered || images.length < 2) {
      if (!hovered) setImageIndex(0);
      return;
    }
    const id = window.setInterval(() => {
      setImageIndex((i) => (i + 1) % images.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [hovered, images.length]);

  const shown = images[imageIndex] ?? images[0];

  function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]?.name);
    showToast(
      "Added to bag",
      `${product.name} added to your bag.`,
      "success",
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.7,
          delay: Math.min(index, 6) * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/shop/${product.slug}`} className="group block w-full">
          <div className="relative w-full overflow-hidden bg-stone-200 aspect-[3/4]">
            {shown ? (
              <Image
                src={shown}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-stone-400">
                <ImageOff className="size-6" strokeWidth={1.25} />
              </div>
            )}

            <div
              className={[
                "absolute inset-x-2 bottom-2 z-10 flex overflow-hidden transition-all duration-300",
                radius,
                hovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0 max-md:translate-y-0 max-md:opacity-100",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickView(true);
                }}
                className="flex-1 bg-[var(--brand)] py-2.5 text-center text-[10px] font-semibold tracking-[0.16em] text-[var(--background)] uppercase md:py-3 md:text-xs"
              >
                Quick View
              </button>
              <button
                type="button"
                aria-label="Add to bag"
                onClick={addToCart}
                className="flex size-10 shrink-0 items-center justify-center border-l border-[var(--background)]/25 bg-[var(--brand)] text-[var(--background)] md:size-11"
              >
                <ShoppingBag className="size-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <div className="mt-3 w-full space-y-1 text-left">
            <div className="hidden text-[10px] font-medium leading-none tracking-[0.18em] text-stone-500 uppercase sm:block sm:text-[11px]">
              {product.categoryName}
            </div>
            <h3
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              className="font-display text-base leading-snug text-[var(--foreground)] transition-opacity group-hover:opacity-75 sm:text-lg md:text-xl"
            >
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 text-xs font-medium sm:text-sm">
              <span className="text-[var(--foreground)]">
                {formatTaka(product.price)}
              </span>
              {product.originalPrice ? (
                <span className="text-[10px] text-stone-400 line-through sm:text-xs">
                  {formatTaka(product.originalPrice)}
                </span>
              ) : null}
            </div>
          </div>
        </Link>
      </motion.div>

      <QuickViewModal
        product={quickView ? product : null}
        isOpen={quickView}
        onClose={() => setQuickView(false)}
      />
    </>
  );
}
