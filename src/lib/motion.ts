import type { Transition, Variants } from "framer-motion";

/** Long, quiet deceleration — editorial, not snappy. */
export const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const easeOutExpo = easeOutSoft;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

const enter = {
  duration: 0.72,
  ease: easeOutSoft,
} as const;

export const motionTravel = {
  y: 28,
  x: 22,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motionTravel.y },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...enter, delay },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -motionTravel.x },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...enter, delay },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: motionTravel.x },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...enter, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutSoft, delay },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.82, ease: easeOutSoft, delay },
  }),
};

/** Fire as the block approaches, not after it has already landed. */
export const viewportScroll = {
  once: true,
  amount: 0.18,
  margin: "0px 0px 12% 0px",
} as const;

export type MotionVariantName = "up" | "left" | "right" | "fade" | "scale";

export const variantMap: Record<MotionVariantName, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  fade: fadeIn,
  scale: scaleIn,
};

export function hiddenStyleForVariant(
  variant: MotionVariantName,
  y = motionTravel.y,
): { opacity: string; transform: string } {
  switch (variant) {
    case "left":
      return {
        opacity: "0",
        transform: `translate3d(-${motionTravel.x}px, 0, 0)`,
      };
    case "right":
      return {
        opacity: "0",
        transform: `translate3d(${motionTravel.x}px, 0, 0)`,
      };
    case "scale":
      return { opacity: "0", transform: "translate3d(0, 18px, 0) scale(0.96)" };
    case "fade":
      return { opacity: "0", transform: "none" };
    default:
      return { opacity: "0", transform: `translate3d(0, ${y}px, 0)` };
  }
}

export const itemEntrance = {
  duration: 0.68,
  ease: easeOutSoft,
} as const;

export const itemInViewOptions = {
  once: true,
  amount: 0.16,
  margin: "0px 0px 10% 0px",
} as const;
