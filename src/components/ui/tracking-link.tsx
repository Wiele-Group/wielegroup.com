"use client";

/**
 * TrackingLink — wraps Next.js Link with a track() call on click.
 *
 * Use in server components to fire analytics events from CTA links.
 * Renders identical DOM to <Link>; all props forwarded through.
 * track() is fire-and-forget — never interrupts navigation.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { track } from "@/lib/track";

interface TrackingLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
}

export function TrackingLink({
  eventName,
  eventProps,
  onClick,
  ...props
}: TrackingLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(eventName, eventProps);
        onClick?.(e);
      }}
    />
  );
}
