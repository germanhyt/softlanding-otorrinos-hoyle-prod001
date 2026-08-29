import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutSoft } from "@lib/motion";
import { parseCountToken } from "@utils/helpers";

export type HeroStat = {
  value: string;
  label: string;
};

type Props = {
  stats: readonly HeroStat[];
};

function CountUp({
  token,
  active,
  delay = 0,
}: {
  token: string;
  active: boolean;
  delay?: number;
}) {
  const { prefix, suffix, value, hasNumber } = parseCountToken(token);
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(reduceMotion || !hasNumber ? value : 0);

  useEffect(() => {
    if (!hasNumber || !active) return;
    if (reduceMotion) {
      setCurrent(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: easeOutSoft,
      onUpdate: (latest) => setCurrent(Math.round(latest)),
    });

    return () => controls.stop();
  }, [active, delay, hasNumber, reduceMotion, value]);

  if (!hasNumber) return null;

  return (
    <span>
      {prefix}
      {current.toLocaleString("es-PE")}
      {suffix}
    </span>
  );
}

export default function HeroStats({ stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const active = inView || Boolean(reduceMotion);

  return (
    <div ref={ref} className="hero-stats is-revealed ">
      <div className="container">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
          {stats.map((item, index) => (
            <motion.article
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                ease: easeOutSoft,
                delay: reduceMotion ? 0 : 0.12 + index * 0.08,
              }}
              className="hero-stat-card flex min-h-[6.5rem] flex-col items-center justify-center rounded-2xl px-3 py-4 text-center text-brand-navy sm:min-h-[7.25rem] sm:px-4 sm:py-5 lg:min-h-[8rem]"
            >
              {item.value ? (
                <p className="text-[1.65rem] font-bold leading-none tracking-tight tabular-nums sm:text-3xl lg:text-[2.15rem]">
                  <CountUp
                    token={item.value}
                    active={active}
                    delay={index * 0.1}
                  />
                </p>
              ) : null}
              <p
                className={
                  item.value
                    ? "mt-2 max-w-[11rem] text-[0.78rem] font-medium leading-snug text-brand-navy sm:text-sm"
                    : "max-w-[12.5rem] text-[1.2rem] font-bold leading-[1.15] tracking-tight text-brand-navy sm:text-[1.4rem] lg:text-[1.55rem]"
                }
              >
                {item.label}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
