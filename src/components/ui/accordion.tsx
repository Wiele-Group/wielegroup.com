"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

export type AccordionProps = {
  items: AccordionItem[];
  /** Allow more than one item open at once. Defaults to single-open. */
  multiple?: boolean;
  /** id of the item to open by default. */
  defaultOpen?: string;
  className?: string;
};

export function Accordion({
  items,
  multiple = false,
  defaultOpen,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(defaultOpen ? [defaultOpen] : []),
  );

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        "divide-y divide-[var(--color-border-default)] border-y border-[var(--color-border-default)]",
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const triggerId = `accordion-trigger-${item.id}`;
        return (
          <div key={item.id}>
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left text-cloud hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white"
            >
              <span className="text-heading-sm font-medium">{item.question}</span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 text-silver transition-transform duration-[var(--duration-base)] ease-[var(--ease-emphasized)]",
                  isOpen && "rotate-180 text-electric",
                )}
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-9 text-body-md text-silver">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
