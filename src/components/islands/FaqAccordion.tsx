import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOutSoft } from "@lib/motion";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: readonly FaqItem[];
};

export default function FaqAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl divide-y divide-brand-navy/10 border-y border-brand-navy/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="group flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-base font-bold text-brand-navy transition group-hover:text-brand-blue sm:text-lg">
                {item.question}
              </span>
              <span
                className={`shrink-0 text-brand-navy transition duration-300 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {reduceMotion ? (
              isOpen ? (
                <p
                  id={`faq-answer-${item.id}`}
                  className="pt-3 text-sm leading-relaxed text-text-muted sm:text-base"
                >
                  {item.answer}
                </p>
              ) : null
            ) : (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: easeOutSoft }}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 text-sm leading-relaxed text-text-muted sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
