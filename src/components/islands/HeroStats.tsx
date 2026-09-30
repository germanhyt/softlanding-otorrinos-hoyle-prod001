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
    <div ref={ref} className="hero-stats is-revealed">
      {/* div (contorno ovalado) */}
      <div className="hero-stats-oval">
        {/* div (group de labels con max width) */}
        <div className="hero-stats-group">
          {/* los divs de los labels (aún con efecto glass como estaba) */}
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: easeOutSoft,
                delay: reduceMotion ? 0 : 0.28 + index * 0.1,
              }}
              className="hero-stat-card flex min-h-[6.5rem] flex-col items-center justify-center rounded-[20px] px-3 py-3 text-center text-[#211E46] sm:min-h-[7.25rem] md:h-[127px] md:min-h-[127px]"
            >
              {item.value ? (
                <p className="font-dm text-[1.65rem] font-bold leading-none tracking-tight tabular-nums sm:text-3xl md:text-[35px] md:leading-[28px]">
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
                    ? "mt-2 max-w-[11rem] font-dm text-[0.85rem] font-bold leading-snug text-[#211E46] md:text-[1.05rem] md:leading-[1.15]"
                    : "max-w-[11rem] font-dm text-[1.05rem] font-bold leading-[1.15] text-[#211E46] md:text-[1.24rem]"
                }
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
