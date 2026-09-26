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
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const reduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className="border-b border-[#E4E2EC] py-5 sm:py-6">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="group flex w-full items-center justify-between gap-6 text-left"
            >
              <span className="font-dm text-[0.98rem] font-bold leading-snug text-[#211E46] sm:text-[1.05rem]">
                {item.question}
              </span>
              <span className="shrink-0 text-[#211E46]" aria-hidden="true">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {reduceMotion ? (
              isOpen ? (
                <p
                  id={`faq-answer-${item.id}`}
                  className="max-w-[40rem] pt-2.5 font-dm text-sm leading-[1.55] text-[#6B7085] sm:text-[0.95rem]"
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
                    <p className="max-w-[40rem] pt-2.5 font-dm text-sm leading-[1.55] text-[#6B7085] sm:text-[0.95rem]">
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
