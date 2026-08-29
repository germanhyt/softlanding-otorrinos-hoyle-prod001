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
  duration: 0.9,
  ease: easeOutSoft,
} as const;

export const motionTravel = {
  y: 12,
  x: 10,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: motionTravel.y },
  visible: {
    opacity: 1,
    y: 0,
    transition: enter,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -motionTravel.x },
  visible: {
    opacity: 1,
    x: 0,
    transition: enter,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: motionTravel.x },
  visible: {
    opacity: 1,
    x: 0,
    transition: enter,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.75, ease: easeOutSoft },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOutSoft },
  },
};

export const viewportScroll = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -12% 0px",
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
      return { opacity: "0", transform: "scale(0.985)" };
    case "fade":
      return { opacity: "0", transform: "none" };
    default:
      return { opacity: "0", transform: `translate3d(0, ${y}px, 0)` };
  }
}

export const itemEntrance = {
  duration: 0.82,
  ease: easeOutSoft,
} as const;

export const itemInViewOptions = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -10% 0px",
} as const;
