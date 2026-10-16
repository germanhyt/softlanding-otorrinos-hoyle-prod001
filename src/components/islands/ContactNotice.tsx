import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@config/site.config";
import { contactNotice, logos } from "@content/content";
import { pauseSmoothScroll, resumeSmoothScroll } from "@lib/lenis";
import { CONTACT_NOTICE_EVENT, type ContactNoticeDetail } from "@lib/contact-notice";
import { buildWhatsAppUrl } from "@utils/helpers";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactNotice() {
  const reduced = useReducedMotion();
  const [message, setMessage] = useState<string | null>(null);
  const open = message !== null;

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<ContactNoticeDetail>).detail;
      if (!detail?.message) return;
      setMessage(detail.message);
    };
    window.addEventListener(CONTACT_NOTICE_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_NOTICE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    pauseSmoothScroll();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMessage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      resumeSmoothScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const duration = reduced ? 0.01 : 0.45;
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsapp, message ?? undefined);

  const dialog = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2a2a2a]/55 px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease }}
          onClick={() => setMessage(null)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-notice-title"
            data-lenis-prevent
            className="relative w-full max-w-[36rem] rounded-[1.75rem] bg-white px-6 py-8 text-brand-navy shadow-2xl sm:px-10 sm:py-10"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration, ease }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMessage(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-brand-navy/70 transition hover:bg-brand-navy/5 hover:text-brand-navy"
              aria-label={contactNotice.closeLabel}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <img
              src={logos.dark.src}
              alt={logos.dark.alt}
              className="mx-auto h-12 w-auto max-w-[12.5rem] object-contain"
              width="200"
              height="48"
            />

            <h2
              id="contact-notice-title"
              className="mt-6 text-center font-serif text-[1.65rem] font-semibold uppercase tracking-[0.04em] sm:text-[1.85rem]"
            >
              {contactNotice.title}
            </h2>

            <p className="mx-auto mt-4 max-w-[32rem] text-center font-dm text-sm leading-relaxed text-brand-navy/90 sm:text-[0.98rem]">
              {contactNotice.lead}{" "}
              <strong className="font-semibold text-brand-navy">{contactNotice.doctors}</strong>
              {contactNotice.tail}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7C63C9] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#6d54b8] sm:min-w-[9.5rem]"
              >
                <FaPhoneAlt className="text-base" aria-hidden="true" />
                {contactNotice.callLabel}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/70 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/[0.04]"
              >
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                {contactNotice.whatsappLabel}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(dialog, document.body);
}
