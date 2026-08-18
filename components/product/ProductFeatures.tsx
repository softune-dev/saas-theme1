"use client";

import React from "react";
import { Package, ShieldCheck, RefreshCcw } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function ProductFeatures() {
  const { settings } = useTheme();

  return (
    <div className="py-16 md:py-24 border-t hairline w-full">
      <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

        {/* Feature 1 */}
        <div className="flex flex-col text-left">
          <div className="w-12 h-12 rounded-full border hairline bg-stone-50 flex items-center justify-center mb-6 text-[var(--foreground)]">
            <Package strokeWidth={1.25} className="w-5 h-5" />
          </div>
          <h4 className="text-[12px] uppercase tracking-[0.24em] font-semibold text-[var(--foreground)] mb-3">
            Premium Packaging
          </h4>
          <p className="text-sm text-stone-500 leading-relaxed">
            {settings.feature1 || "Delivered in signature sustainable packaging to ensure your garments arrive in perfect condition."}
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col text-left">
          <div className="w-12 h-12 rounded-full border hairline bg-stone-50 flex items-center justify-center mb-6 text-[var(--foreground)]">
            <ShieldCheck strokeWidth={1.25} className="w-5 h-5" />
          </div>
          <h4 className="text-[12px] uppercase tracking-[0.24em] font-semibold text-[var(--foreground)] mb-3">
            Made to Last
          </h4>
          <p className="text-sm text-stone-500 leading-relaxed">
            {settings.feature2 || "Our garments are made to last. We offer care guides and repairs to keep your pieces in perfect condition."}
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col text-left">
          <div className="w-12 h-12 rounded-full border hairline bg-stone-50 flex items-center justify-center mb-6 text-[var(--foreground)]">
            <RefreshCcw strokeWidth={1.25} className="w-5 h-5" />
          </div>
          <h4 className="text-[12px] uppercase tracking-[0.24em] font-semibold text-[var(--foreground)] mb-3">
            Easy Returns
          </h4>
          <p className="text-sm text-stone-500 leading-relaxed">
            {settings.feature3 || "7-day straightforward doorstep exchange on all unworn pieces. Shop with absolute confidence."}
          </p>
        </div>

      </div>
    </div>
  );
}
