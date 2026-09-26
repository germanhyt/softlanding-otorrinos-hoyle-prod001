import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Side = { title: string; body: string };

type Props = {
  image: { src: string; alt: string };
  pair: { left: Side; right: Side };
  detail: { title: string; body: string; cta: { label: string; href: string } };
};

const INTRO = 0.7;
const HOLD = 0.6;
const SWAP = 0.55;
const TAIL = 0.4;
/** Scroll fraction where Función and Armonía are already at rest. */
const INTRO_END = INTRO / (INTRO + HOLD + SWAP + TAIL);

export default function SeptorrinoplastiaPin({ image, pair, detail }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const left = root.querySelector("[data-side='left']");
      const right = root.querySelector("[data-side='right']");
      const detailEl = root.querySelector("[data-detail]");
      const bg = root.querySelector("[data-bg]");
      const shade = root.querySelector("[data-shade]");
      if (!left || !right || !detailEl || !bg) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set([left, right, detailEl], { autoAlpha: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      // Scrollytelling sin pin: la sección es alta y el visual queda fijo
      // con sticky nativo. El par entra desde arriba y desde cada lado
      // hasta su base; después se mantiene el cambio al detalle.
      const xDist = () => Math.min(150, Math.max(72, window.innerWidth * 0.09));
      const yDist = () => Math.min(84, Math.max(40, window.innerHeight * 0.08));

      gsap.set(left, { autoAlpha: 0, x: () => -xDist(), y: () => -yDist(), scale: 0.98 });
      gsap.set(right, { autoAlpha: 0, x: xDist, y: () => -yDist(), scale: 0.98 });
      gsap.set(detailEl, { autoAlpha: 0, y: 56, scale: 0.97 });
      gsap.set(bg, { scale: 1.1, yPercent: -4 });
      if (shade) gsap.set(shade, { opacity: 0.9 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          left,
          { autoAlpha: 0, x: () => -xDist(), y: () => -yDist(), scale: 0.98 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: INTRO },
          0,
        )
        .fromTo(
          right,
          { autoAlpha: 0, x: xDist, y: () => -yDist(), scale: 0.98 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: INTRO },
          0,
        )
        .to({}, { duration: HOLD })
        .to([left, right], { autoAlpha: 0, y: -40, scale: 0.97, duration: SWAP }, "swap")
        .to(detailEl, { autoAlpha: 1, y: 0, scale: 1, duration: SWAP }, "swap")
        .to({}, { duration: TAIL });
      if (shade) timeline.to(shade, { opacity: 1, duration: SWAP }, "swap");
      // Fondo: respiración continua durante TODO el recorrido
      timeline.fromTo(
        bg,
        { scale: 1.1, yPercent: -4 },
        { scale: 1, yPercent: 4, duration: timeline.duration(), ease: "none" },
        0,
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      data-scene
      data-intro-end={INTRO_END}
      className="relative h-[200svh] bg-brand-navy"
    >
      <div data-sticky className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <img
          data-bg
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-cover object-[62%_40%] will-change-transform"
          width="1600"
          height="900"
        />
        <div
          data-shade
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,28,72,0.62)_0%,rgba(36,44,96,0.48)_46%,rgba(28,36,84,0.55)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full w-full items-center">
          <div className="container grid w-full grid-cols-1 items-start gap-8 md:grid-cols-2 md:items-center md:gap-16">
            <div data-side="left" className="max-w-[16rem] justify-self-start text-left text-white sm:max-w-xs md:max-w-md">
              <h2 className="font-serif text-[2.6rem] font-medium leading-none sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                {pair.left.title}
              </h2>
              <p className="mt-3 font-dm text-base text-white/90 sm:mt-4 sm:text-lg md:text-xl">
                {pair.left.body}
              </p>
            </div>
            <div
              data-side="right"
              className="ml-auto max-w-[16rem] justify-self-end text-right text-white sm:max-w-xs md:max-w-md"
            >
              <h2 className="font-serif text-[2.6rem] font-medium leading-none sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                {pair.right.title}
              </h2>
              <p className="mt-3 font-dm text-base text-white/90 sm:mt-4 sm:text-lg md:text-xl">
                {pair.right.body}
              </p>
            </div>
          </div>
        </div>

        <div data-detail className="absolute inset-0 z-10 flex items-center opacity-0">
          <div className="container flex w-full justify-start text-white">
            <div className="max-w-xl text-left">
              <h2 className="font-serif text-[2.5rem] font-medium leading-none sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {detail.title}
              </h2>
              <p className="mt-5 font-dm text-sm leading-relaxed text-white/92 sm:text-base md:text-lg">
                {detail.body}
              </p>
              <a
                href={detail.cta.href}
                className="mt-7 inline-flex items-center rounded-full bg-[#7C63C9] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6d54b8] sm:px-7 sm:py-3 sm:text-base"
              >
                {detail.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
