"use client";

import React from "react";
import { useTheme } from "@/lib/theme-context";
import { SectionRenderer } from "@/sections/SectionRenderer";
import type { Product, ProductCategory } from "@/lib/theme-types";

type HomePageClientProps = {
  categories: ProductCategory[];
  products: Product[];
};

export function HomePageClient({ categories, products }: HomePageClientProps) {
  const { settings } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      {settings.sections.map((section) => (
        <SectionRenderer
          key={section.id}
          type={section.type}
          settings={settings}
          categories={categories}
          products={products}
        />
      ))}
    </div>
  );
}
