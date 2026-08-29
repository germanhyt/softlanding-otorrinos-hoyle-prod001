import { animate, inView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import {
  type MotionVariantName,
  hiddenStyleForVariant,
  itemEntrance,
  itemInViewOptions,
  motionTravel,
} from "@lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  variant?: MotionVariantName;
  staggerDelay?: number;
  y?: number;
  trigger?: "view" | "mount";
};

function applyHiddenStyle(
  el: HTMLElement,
  variant: MotionVariantName,
  y: number,
) {
  const hidden = hiddenStyleForVariant(variant, y);
  el.style.opacity = hidden.opacity;
  el.style.transform = hidden.transform;
  el.style.willChange = "opacity, transform";
}

export default function MotionScope({
  children,
  className,
  itemSelector = "[data-motion-item]",
  variant = "up",
  staggerDelay = 0.1,
  y = motionTravel.y,
  trigger = "view",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(itemSelector));
    if (items.length === 0) return;

    if (reduceMotion) {
      items.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const played = new WeakSet<HTMLElement>();
    const cleanups: (() => void)[] = [];

    const reveal = (el: HTMLElement, order: number) => {
      if (played.has(el)) return;
      played.add(el);

      applyHiddenStyle(el, variant, y);
      el.classList.add("is-revealed");

      requestAnimationFrame(() => {
        void animate(
          el,
          { opacity: 1, y: 0, x: 0, scale: 1 },
          {
            ...itemEntrance,
            delay: order * staggerDelay,
          },
        ).then(() => {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.willChange = "";
        });
      });
    };

    if (trigger === "mount") {
      items.forEach((el, index) => reveal(el, index));
      return;
    }

    items.forEach((el, index) => {
      cleanups.push(inView(el, () => reveal(el, index), itemInViewOptions));
    });

    return () => cleanups.forEach((stop) => stop());
  }, [reduceMotion, itemSelector, variant, staggerDelay, y, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
