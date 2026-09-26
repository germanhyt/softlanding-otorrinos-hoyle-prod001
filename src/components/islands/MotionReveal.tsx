import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MotionVariantName } from "@lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: MotionVariantName;
  trigger?: "view" | "mount";
  /** Scrub follows the scroll. Settle plays once and stays visible. */
  mode?: "scrub" | "settle";
};

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function fromVars(variant: MotionVariantName): gsap.TweenVars {
  switch (variant) {
    case "left":
      return { autoAlpha: 0, x: -64, y: 0, scale: 1 };
    case "right":
      return { autoAlpha: 0, x: 64, y: 0, scale: 1 };
    case "scale":
      return { autoAlpha: 0, x: 0, y: 40, scale: 0.96 };
    case "fade":
      return { autoAlpha: 0, x: 0, y: 0, scale: 1 };
    default:
      return { autoAlpha: 0, x: 0, y: 48, scale: 1 };
  }
}

const rest = { autoAlpha: 1, x: 0, y: 0, scale: 1 };

export default function MotionReveal({
  children,
  className,
  delay = 0,
  variant = "up",
  trigger = "view",
  mode = "scrub",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, rest);
      el.classList.add("is-revealed");
      return;
    }

    const from = fromVars(variant);
    const lag = Math.round(delay * 140);
    const ctx = gsap.context(() => {
      if (trigger === "mount") {
        gsap.fromTo(el, from, {
          ...rest,
          duration: 0.72,
          delay,
          ease: "power2.out",
          onStart: () => el.classList.add("is-revealed"),
        });
        return;
      }

      if (mode === "settle") {
        const soft = {
          ...from,
          y: typeof from.y === "number" ? from.y * 0.4 : from.y,
          x: typeof from.x === "number" ? from.x * 0.4 : from.x,
        };
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.fromTo(el, soft, {
              ...rest,
              duration: 1.15,
              delay,
              ease: "power2.out",
              overwrite: "auto",
              onStart: () => el.classList.add("is-revealed"),
            });
          },
        });
        return;
      }

      gsap.fromTo(el, from, {
        ...rest,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: `top bottom-=${lag}px`,
          end: `top 62%-=${lag}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, mode, trigger, variant]);

  return (
    <div ref={ref} className={cx("motion-reveal", className)}>
      {children}
    </div>
  );
}
