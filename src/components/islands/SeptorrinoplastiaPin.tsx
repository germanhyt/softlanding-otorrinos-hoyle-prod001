import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

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

const ENTER_DUR = 1.0;
const SWAP_DUR = 0.85;
const AFTER_ENTER_GAP = 450;
const AFTER_SWAP_GAP = 650;
const WHEEL_NEED = 60;
const TOUCH_NEED = 30;

export default function SeptorrinoplastiaPin({ image, pair, detail }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

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

    // Flujo por pasos con pausa: al llegar se frena y entra el par;
    // el siguiente gesto pasa al detalle y el siguiente libera la página.
    // Sin pin de GSAP: sticky nativo + bloqueo de scroll por JS.
    const xDist = () => Math.min(150, Math.max(72, window.innerWidth * 0.09));
    const yDist = () => Math.min(84, Math.max(40, window.innerHeight * 0.08));

    const hidePair = () => {
      gsap.set(left, { autoAlpha: 0, x: -xDist(), y: -yDist(), scale: 0.98 });
      gsap.set(right, { autoAlpha: 0, x: xDist(), y: -yDist(), scale: 0.98 });
    };
    const showPair = () => {
      gsap.set([left, right], { autoAlpha: 1, x: 0, y: 0, scale: 1 });
    };
    const hideDetail = () => {
      gsap.set(detailEl, { autoAlpha: 0, y: 56, scale: 0.97 });
    };

    hidePair();
    hideDetail();
    gsap.set(bg, { scale: 1.06, yPercent: -2 });
    if (shade) gsap.set(shade, { opacity: 0.9 });

    const st = {
      step: 0,
      busy: false,
      coolUntil: 0,
      exitUntil: 0,
      wheelAcc: 0,
      touchAcc: 0,
      touchY: 0,
      selfLock: false,
    };

    const topOf = () => root.getBoundingClientRect().top + window.scrollY;
    const bottomOf = () => topOf() + root.offsetHeight - window.innerHeight;
    const prog = () => document.documentElement.dataset.programmaticScroll === "1";

    const lockTo = (y: number) => {
      st.selfLock = true;
      window.scrollTo(0, y);
      window.setTimeout(() => {
        st.selfLock = false;
      }, 140);
    };

    const playEnter = () => {
      st.busy = true;
      const tl = gsap.timeline({
        onComplete: () => {
          st.busy = false;
          st.coolUntil = performance.now() + AFTER_ENTER_GAP;
        },
      });
      tl.fromTo(
        left,
        { autoAlpha: 0, x: () => -xDist(), y: () => -yDist(), scale: 0.98 },
        { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: ENTER_DUR, ease: "power3.out" },
        0,
      )
        .fromTo(
          right,
          { autoAlpha: 0, x: () => xDist(), y: () => -yDist(), scale: 0.98 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: ENTER_DUR, ease: "power3.out" },
          0.08,
        )
        .to(bg, { scale: 1.02, yPercent: 0, duration: ENTER_DUR + 0.2, ease: "power2.out" }, 0);
      if (shade) tl.to(shade, { opacity: 0.94, duration: 0.6, ease: "power2.out" }, 0);
    };

    const playSwap = () => {
      st.busy = true;
      const tl = gsap.timeline({
        onComplete: () => {
          st.busy = false;
          st.coolUntil = performance.now() + AFTER_SWAP_GAP;
        },
      });
      tl.to([left, right], { autoAlpha: 0, y: -40, scale: 0.97, duration: SWAP_DUR, ease: "power2.inOut" }, 0)
        .to(detailEl, { autoAlpha: 1, y: 0, scale: 1, duration: SWAP_DUR, ease: "power2.inOut" }, 0.06);
      if (shade) tl.to(shade, { opacity: 1, duration: SWAP_DUR, ease: "power2.inOut" }, 0);
    };

    const playBack = () => {
      st.busy = true;
      const tl = gsap.timeline({
        onComplete: () => {
          st.busy = false;
          st.coolUntil = performance.now() + AFTER_ENTER_GAP;
        },
      });
      tl.to(detailEl, { autoAlpha: 0, y: 56, scale: 0.97, duration: SWAP_DUR, ease: "power2.inOut" }, 0)
        .to([left, right], { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: SWAP_DUR, ease: "power2.inOut" }, 0.06);
    };

    const goDown = () => {
      if (st.step === 1) {
        st.step = 2;
        st.coolUntil = performance.now() + (SWAP_DUR * 1000 + AFTER_SWAP_GAP);
        playSwap();
      } else if (st.step === 2) {
        st.step = 3;
        window.scrollTo({ top: bottomOf() + 2, behavior: "smooth" });
      }
    };

    const goUp = () => {
      if (st.step === 2) {
        st.step = 1;
        st.coolUntil = performance.now() + (SWAP_DUR * 1000 + AFTER_ENTER_GAP);
        playBack();
      } else if (st.step === 1) {
        st.step = 0;
        st.exitUntil = performance.now() + 1800;
        hidePair();
        hideDetail();
        window.scrollTo({ top: topOf() - window.innerHeight * 0.3, behavior: "smooth" });
      }
    };

    const onScroll = () => {
      if (st.selfLock || prog()) return;
      const y = window.scrollY;
      const t = topOf();
      const b = bottomOf();
      if (st.step === 0) {
        if (performance.now() < st.exitUntil) return;
        if (y >= t - 24) {
          st.step = 1;
          st.wheelAcc = 0;
          st.touchAcc = 0;
          lockTo(t);
          playEnter();
        }
      } else if (st.step === 1 || st.step === 2) {
        if (y < t - 80) {
          st.step = 0;
          st.wheelAcc = 0;
          st.touchAcc = 0;
          hidePair();
          hideDetail();
          return;
        }
        if (Math.abs(y - t) > 4) lockTo(t);
      } else {
        if (y < t - window.innerHeight) {
          st.step = 0;
          hidePair();
          hideDetail();
        }
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (st.step !== 1 && st.step !== 2) return;
      event.preventDefault();
      if (st.busy || performance.now() < st.coolUntil) return;
      if (event.deltaY === 0) return;
      st.wheelAcc += event.deltaY;
      if (Math.abs(st.wheelAcc) < WHEEL_NEED) return;
      const dir = Math.sign(st.wheelAcc);
      st.wheelAcc = 0;
      if (dir > 0) goDown();
      else goUp();
    };

    const onTouchStart = (event: TouchEvent) => {
      st.touchY = event.touches[0]?.clientY ?? 0;
      st.touchAcc = 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (st.step !== 1 && st.step !== 2) return;
      event.preventDefault();
      if (st.busy || performance.now() < st.coolUntil) return;
      const y = event.touches[0]?.clientY ?? st.touchY;
      const delta = st.touchY - y;
      st.touchY = y;
      if (delta === 0) return;
      st.touchAcc += delta;
      if (Math.abs(st.touchAcc) < TOUCH_NEED) return;
      const dir = Math.sign(st.touchAcc);
      st.touchAcc = 0;
      if (dir > 0) goDown();
      else goUp();
    };

    const onKey = (event: KeyboardEvent) => {
      if (st.step !== 1 && st.step !== 2) return;
      if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select")) return;
      const down = event.key === "ArrowDown" || event.key === "PageDown" || event.key === " ";
      const up = event.key === "ArrowUp" || event.key === "PageUp";
      if (!down && !up) return;
      event.preventDefault();
      if (st.busy || performance.now() < st.coolUntil) return;
      if (down) goDown();
      else goUp();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      gsap.killTweensOf([left, right, detailEl, bg]);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-scene
      data-intro-end={INTRO_END}
      className="relative h-[165svh] bg-brand-navy md:h-[200svh]"
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
