import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Side = { title: string; body: string };

type Props = {
  image: { src: string; alt: string };
  pair: { left: Side; right: Side };
  detail: { title: string; body: string; cta: { label: string; href: string } };
};

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
      if (!left || !right || !detailEl) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set([left, right, detailEl], { autoAlpha: 1, x: 0 });
        return;
      }

      gsap.set(left, { autoAlpha: 0, x: -56 });
      gsap.set(right, { autoAlpha: 0, x: 56 });
      gsap.set(detailEl, { autoAlpha: 0, x: -48 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinType: "transform",
          scrub: true,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            document.documentElement.style.scrollBehavior = self.isActive ? "auto" : "";
          },
        },
      });

      timeline
        .to(left, { x: 0, autoAlpha: 1, duration: 1 })
        .to(right, { x: 0, autoAlpha: 1, duration: 1 }, "<")
        .to({}, { duration: 1.25 })
        .to([left, right], { autoAlpha: 0, duration: 0.7 }, "swap")
        .to(detailEl, { x: 0, autoAlpha: 1, duration: 0.9 }, "swap+=0.2")
        .to({}, { duration: 0.85 });
    }, root);

    return () => {
      document.documentElement.style.scrollBehavior = "";
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-[100svh] overflow-hidden bg-brand-navy">
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover object-[62%_40%]"
        width="1600"
        height="900"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,28,72,0.62)_0%,rgba(36,44,96,0.48)_46%,rgba(28,36,84,0.55)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="container grid w-full grid-cols-2 items-center gap-6 md:gap-16">
          <div data-side="left" className="max-w-[16rem] text-white sm:max-w-xs md:max-w-sm">
            <h2 className="font-serif text-[2.4rem] font-medium leading-none sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {pair.left.title}
            </h2>
            <p className="mt-3 font-dm text-sm text-white/90 sm:text-base md:text-lg">
              {pair.left.body}
            </p>
          </div>
          <div data-side="right" className="ml-auto max-w-[16rem] text-right text-white sm:max-w-xs md:max-w-sm">
            <h2 className="font-serif text-[2.4rem] font-medium leading-none sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {pair.right.title}
            </h2>
            <p className="mt-3 font-dm text-sm text-white/90 sm:text-base md:text-lg">
              {pair.right.body}
            </p>
          </div>
        </div>
      </div>

      <div data-detail className="absolute inset-0 z-10 flex items-center">
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
  );
}
