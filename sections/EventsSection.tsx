"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Event } from "@/lib/theme-types";

interface EventsSectionProps {
  selectedEventIds: string[];
  events: Event[];
}

const MAX_EVENTS = 3;

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <Link
        href={`/shop?event=${encodeURIComponent(event.slug)}`}
        className="group relative block aspect-[3/4] w-full overflow-hidden bg-stone-200"
      >
        {event.image ? (
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : null}
        {/* Gradient keeps left-aligned text legible over any photo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

        <div className="relative flex h-full flex-col justify-end p-6 text-left md:p-8">
          <h3
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            className="font-display text-xl leading-tight tracking-tight text-white sm:text-2xl"
          >
            {event.name}
          </h3>
          {event.description ? (
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">
              {event.description}
            </p>
          ) : null}
          <span className="mt-5 inline-flex w-fit items-center justify-center rounded-[var(--theme-btn-radius)] bg-[var(--brand)] px-5 py-2.5 text-xs font-semibold tracking-wider text-[var(--background)] uppercase transition-opacity group-hover:opacity-90">
            {event.ctaLabel || "Shop now"}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonEventCard({ eventIndex }: { eventIndex: number }) {
  return (
    <div className="relative flex aspect-[3/4] w-full flex-col items-start justify-end border border-stone-300/80 bg-stone-200/90 p-6 text-left select-none md:p-8">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-stone-300/80 text-stone-600">
        <Plus className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <span
        style={{ fontFamily: '"Fraunces", Georgia, serif' }}
        className="font-display text-lg text-stone-600 sm:text-xl"
      >
        Add event {eventIndex}
      </span>
      <div className="mt-2 h-3.5 w-3/4 rounded-xs bg-stone-300/70" />
      <div className="mt-5 h-9 w-28 rounded-[var(--theme-btn-radius)] bg-stone-300/80" />
    </div>
  );
}

/** Up to 3 merchant-featured sale/promo campaigns, right under Hero. Fully
 * curated — an empty/unresolved selectedEventIds always renders the
 * skeleton, never "show every active event" (see CategoryShowcaseSection's
 * own comment for the same rule applied to categories). */
export function EventsSection({ selectedEventIds, events }: EventsSectionProps) {
  const selected =
    selectedEventIds?.length > 0
      ? selectedEventIds
          .map((id) => events.find((e) => e.id === id))
          .filter((e): e is Event => Boolean(e))
          .slice(0, MAX_EVENTS)
      : [];

  const isSkeleton = selected.length === 0;

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isSkeleton
            ? Array.from({ length: MAX_EVENTS }).map((_, i) => (
                <SkeletonEventCard key={i} eventIndex={i + 1} />
              ))
            : selected.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
