import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { pauseSmoothScroll, resumeSmoothScroll } from "@lib/lenis";

export type MobileNavLink = {
  label: string;
  href: string;
};

type Props = {
  links: MobileNavLink[];
  ctaHref: string;
  ctaLabel: string;
};

function padIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export default function MobileNav({ links, ctaHref, ctaLabel }: Props) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const headerEl = document.getElementById("site-header");
    if (!headerEl) return;

    if (open) {
      headerEl.classList.add("is-solid", "is-nav-open");
    } else {
      headerEl.classList.remove("is-nav-open");
      const hero = document.getElementById("inicio");
      const threshold = hero ? Math.max(hero.offsetHeight - 96, 80) : 120;
      if (window.scrollY <= threshold) {
        headerEl.classList.remove("is-solid");
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseSmoothScroll();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      resumeSmoothScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const panel = (
    <nav
      id={panelId}
      aria-label="Menú móvil"
      data-lenis-prevent
      className={`mobile-nav-clippy ${open ? "is-open" : ""}`}
      {...(!open ? { inert: true as const } : {})}
    >
      <div className="mobile-nav-clippy__inner">
        <p className="mobile-nav-kicker">Hoyle Otorrinos</p>

        <ul className="mobile-nav-list">
          {links.map((link, index) => (
            <li key={link.href}>
              <a href={link.href} className="mobile-nav-link" onClick={close}>
                <span className="mobile-nav-link__index">{padIndex(index)}</span>
                <span className="mobile-nav-link__label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-cta">
          <a href={ctaHref} className="mobile-nav-cta__btn" onClick={close}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="ml-auto shrink-0 lg:hidden">
      <button
        type="button"
        className="nav-burger-btn relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">Menú</span>
        <span className={`nav-burger ${open ? "is-open" : ""}`} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
