import { useReducedMotion, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  type MotionVariantName,
  variantMap,
  viewportScroll,
} from "@lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: MotionVariantName;
  trigger?: "view" | "mount";
};

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function MotionReveal({
  children,
  className,
  delay = 0,
  variant = "up",
  trigger = "view",
}: Props) {
  const reduceMotion = useReducedMotion();
  const variants = variantMap[variant];
  const classes = cx("motion-reveal", className);

  if (reduceMotion) {
    return <div className={cx(className, "is-revealed")}>{children}</div>;
  }

  if (trigger === "mount") {
    return (
      <motion.div
        className={classes}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={classes}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportScroll}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
