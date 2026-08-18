"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Tag, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatTaka } from "@/lib/utils";
import { Footer } from "@/components/footer/Footer";

export function CartPageClient() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    deliveryFee,
    freeDeliveryThreshold,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({
      text: res.message,
      isError: !res.success,
    });
    if (res.success) {
      setCouponInput("");
    }
  };

  const progressPercentage = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );

  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col text-[var(--foreground)]">
      {/* Header Banner */}
      <div className="bg-stone-50 border-b hairline py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-left">
          <span className="eyebrow mb-2">Shopping Bag</span>
          <h1
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-3xl sm:text-5xl font-semibold text-[var(--foreground)] tracking-tight"
          >
            Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 pb-20 md:pb-32 flex-1 w-full">
        {items.length === 0 ? (
          <div className="bg-stone-50 border hairline p-16 text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">
              Your bag is empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto">
              Discover handcrafted pieces made to last across generations.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-4 rounded-[var(--theme-btn-radius)] px-8 py-4 bg-[var(--brand)] text-[var(--background)] text-xs uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Items Column */}
            <div className="lg:col-span-7 space-y-6">

              {/* Free delivery progress bar */}
              <div className="p-4 bg-stone-50 border hairline">
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  <span className="text-stone-750">
                    {amountNeeded === 0 ? (
                      <span className="text-emerald-700 font-semibold">
                        You&apos;ve unlocked free nationwide delivery!
                      </span>
                    ) : (
                      <span>
                        Add{""}
                        <strong className="text-[var(--foreground)]">
                          {formatTaka(amountNeeded)}
                        </strong>{""}
                        more for free delivery
                      </span>
                    )}
                  </span>
                  <span className="text-stone-500">{progressPercentage}%</span>
                </div>
                <div className="w-full h-1 bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-[var(--brand)] transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Line Items List */}
              <div className="bg-stone-50 border hairline divide-y hairline">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                    className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-28 bg-stone-100 shrink-0 border hairline">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="space-y-1 text-left">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-semibold text-sm sm:text-base text-[var(--foreground)] hover:opacity-75 transition-opacity line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-stone-500">
                          {item.product.categoryName}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-stone-500 pt-1">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>• Color: {item.selectedColor}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                      {/* Stepper */}
                      <div className="inline-flex items-center border hairline bg-[var(--background)]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="p-1.5 text-stone-600 hover:bg-stone-200/50 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus strokeWidth={1.25} className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="p-1.5 text-stone-600 hover:bg-stone-200/50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus strokeWidth={1.25} className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-sm sm:text-base">
                          {formatTaka(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="text-xs uppercase tracking-[0.18em] text-stone-500 hover:text-[var(--foreground)] link-underline font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-left">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--foreground)] link-underline inline-block"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-stone-50 border hairline p-6 sm:p-8 space-y-6 sticky top-28">
                <h2 className="text-[13px] uppercase tracking-[0.2em] font-semibold text-stone-500 border-b hairline pb-3 text-left">
                  Summary
                </h2>

                {/* Coupon form */}
                <div>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50/50 border border-emerald-250 text-xs text-emerald-800 font-medium">
                      <span className="flex items-center gap-1.5">
                        Code: <strong>{appliedCoupon}</strong> (-{formatTaka(couponDiscount)})
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-emerald-700 font-semibold underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Promo code (e.g. ANANYA10)"
                            className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 focus:outline-none focus:border-[var(--brand)] bg-transparent"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 border hairline text-xs font-semibold uppercase tracking-wider hover:bg-stone-200/50 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponFeedback && !appliedCoupon && (
                        <p
                          className={`text-xs ${couponFeedback.isError ? "text-rose-600" : "text-emerald-600"
                            }`}
                        >
                          {couponFeedback.text}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                <div className="space-y-2.5 text-xs text-stone-600 border-t hairline pt-4 text-left">
                  <div className="flex justify-between">
                    <span className="uppercase tracking-[0.16em] text-[11px] text-stone-500">Subtotal</span>
                    <span className="font-semibold text-sm">
                      {formatTaka(subtotal)}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Discount</span>
                      <span>-{formatTaka(couponDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="uppercase tracking-[0.16em] text-[11px] text-stone-500">Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-emerald-700 font-semibold">Free</strong>
                      ) : (
                        formatTaka(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-semibold text-[var(--foreground)] border-t hairline pt-3">
                    <span>Total</span>
                    <span className="font-bold">
                      {formatTaka(total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center rounded-[var(--theme-btn-radius)] bg-[var(--brand)] text-[var(--background)] py-4 text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout • {formatTaka(total)}
                </Link>

                <div className="pt-2 border-t hairline text-xs text-stone-500 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% safe & secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[var(--foreground)] shrink-0" />
                    <span>Cash on delivery available nationwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
