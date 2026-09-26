import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;
let ticker: ((time: number) => void) | null = null;
let onLoad: (() => void) | null = null;
let pauses = 0;
let sceneHeld = false;
let navigating = false;

function shouldHold(): boolean {
  return !navigating && (pauses > 0 || sceneHeld);
}

function applyHold() {
  if (!lenis) return;
  if (shouldHold()) {
    if (!lenis.isStopped) lenis.stop();
    return;
  }
  if (lenis.isStopped) lenis.start();
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function initSmoothScroll(): Lenis {
  if (lenis) return lenis;

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({
    autoRaf: false,
    lerp: 0.085,
    anchors: false,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
    smoothWheel: true,
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  ticker = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  onLoad = () => {
    lenis?.resize();
    ScrollTrigger.refresh();
  };
  window.addEventListener("load", onLoad);
  window.__lenis = lenis;
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return lenis;
}

export function destroySmoothScroll() {
  if (onLoad) window.removeEventListener("load", onLoad);
  onLoad = null;
  if (ticker) gsap.ticker.remove(ticker);
  ticker = null;
  lenis?.destroy();
  lenis = null;
  delete window.__lenis;
  pauses = 0;
  sceneHeld = false;
  navigating = false;
}

export function pauseSmoothScroll() {
  pauses += 1;
  applyHold();
}

export function resumeSmoothScroll() {
  pauses = Math.max(0, pauses - 1);
  applyHold();
}

/** Freeze the page on a y position while a guided scene owns the wheel. */
export function holdScroll(y: number) {
  sceneHeld = true;
  applyHold();
  window.scrollTo(0, y);
}

export function releaseScroll() {
  sceneHeld = false;
  applyHold();
}

export function glideScroll(y: number, duration = 1.05) {
  const current = lenis;
  sceneHeld = false;
  if (!current) {
    window.scrollTo({ top: y, behavior: "smooth" });
    return;
  }
  navigating = true;
  applyHold();
  current.scrollTo(y, {
    duration,
    force: true,
    onComplete: () => {
      navigating = false;
      applyHold();
    },
  });
}

export function navigateScroll(y: number, immediate: boolean, onComplete?: () => void) {
  const current = lenis;
  sceneHeld = false;
  const done = () => {
    navigating = false;
    applyHold();
    onComplete?.();
  };
  if (!current) {
    window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
    done();
    return;
  }
  navigating = true;
  applyHold();
  current.scrollTo(y, {
    immediate,
    force: true,
    duration: 1.15,
    lock: !immediate,
    onComplete: done,
  });
}
