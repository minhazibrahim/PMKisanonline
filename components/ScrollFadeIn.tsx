"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Renders nothing visually. Watches for any element with a
 * `data-scroll-fade` attribute (e.g. SchemeCard) and, the first time it
 * scrolls into view, adds the `scroll-fade-in` class which triggers the
 * CSS fade/slide-up transition defined in globals.css (mobile only -
 * desktop is untouched, see the max-width media query there).
 *
 * A MutationObserver keeps watching after the initial mount so cards
 * that appear later (e.g. after client-side navigation) are covered too.
 * This is purely additive: it never changes existing markup, layout,
 * colors or spacing - it only toggles one class used solely for the
 * fade-in transition.
 */
export default function ScrollFadeIn() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-fade-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll("[data-scroll-fade]:not(.scroll-fade-in)").forEach((el) => {
        observer.observe(el);
      });
    };

    observeAll();

    // Re-scan when new nodes are added to the page (e.g. lists loading in).
    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
