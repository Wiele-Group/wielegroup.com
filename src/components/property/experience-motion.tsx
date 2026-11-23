"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { useDecorativeMotionDisabled } from "./luxury-motion";

export function ScrollImage({ children, className }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLPictureElement>(null);
  const disabled = useDecorativeMotionDisabled();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <motion.picture
      ref={frame}
      className={className ? `scroll-image ${className}` : "scroll-image"}
      data-scroll-depth={!disabled}
      style={{ "--image-scroll-offset": disabled ? 0 : offset } as MotionStyle}
    >
      {children}
    </motion.picture>
  );
}
