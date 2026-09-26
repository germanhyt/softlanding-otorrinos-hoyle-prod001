import { useEffect } from "react";
import { destroySmoothScroll, initSmoothScroll } from "@lib/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return null;
}
