"use client";

import { PersonCard, Tag, TextLink } from "@tum.ai/ui-kit";
import { useEffect, useRef } from "react";
import type { Person } from "@/content/event";

type PeopleMarqueeProps = {
  groups: { id: string; role: string; people: Person[] }[];
};

// One slow, endless row of small portrait cards. It is a real horizontal
// scroller, so people can swipe it (or scroll it with a trackpad); a frame
// loop advances it while nobody touches it. The list is rendered four times
// and the scroll position wraps by half the track, so the loop has no seam
// in either direction. The copies stay clickable (not `inert`, which also
// blocks the mouse) but are hidden from screen readers and skipped by Tab.
// Pauses on hover and focus, and for a moment after a swipe; with reduced
// motion it is a plain scroller of the first copy (globals.css).
const COPIES = [0, 1, 2, 3];
// Seconds to move by half the track (two copies).
const LOOP_SECONDS = 60;
// How long the row stays put after someone swipes or scrolls it.
const RESUME_MS = 2000;

function useAutoScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const half = () => el.scrollWidth / 2;

    // `pos` keeps the fractional position: scrollLeft rounds, and at this
    // speed a frame moves less than a pixel.
    let pos = el.scrollLeft;
    let last = performance.now();
    let pausedUntil = 0;
    let hovered = false;
    let touching = false;
    let frame = 0;

    const hold = () => {
      pausedUntil = performance.now() + RESUME_MS;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (!reduceMotion.matches && !hovered && !touching && now > pausedUntil) {
        pos += (half() / LOOP_SECONDS) * dt;
        if (pos >= half() + 1) pos -= half();
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reduceMotion.matches) return;
      // A position the loop did not set means a person moved the row.
      if (Math.abs(el.scrollLeft - pos) > 2) {
        hold();
        pos = el.scrollLeft;
      }
      // Keep the position in [1, half + 1): each wrap lands inside the range,
      // so the two never undo each other.
      if (el.scrollLeft < 1) el.scrollLeft = pos = el.scrollLeft + half();
      else if (el.scrollLeft >= half() + 1) el.scrollLeft = pos = el.scrollLeft - half();
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true;
    };
    const onPointerLeave = () => {
      hovered = false;
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      hold();
    };
    const onFocusIn = () => {
      hovered = true;
    };
    const onFocusOut = () => {
      hovered = false;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", hold);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return ref;
}

export function PeopleMarquee({ groups }: PeopleMarqueeProps) {
  const scroller = useAutoScroll();
  const people = groups.flatMap((group) =>
    group.people.map((person) => ({ ...person, role: group.role })),
  );

  return (
    <div ref={scroller} className="sf-marquee mask-fade-x mt-12 overflow-x-auto">
      <div className="flex w-max">
        {COPIES.map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="sf-marquee-copy flex shrink-0 gap-6 pr-6"
          >
            {people.map((person) => (
              <li key={person.name} className="relative w-36 shrink-0 sm:w-40">
                <PersonCard
                  name={person.name}
                  byline={person.byline}
                  image={{ src: person.image, alt: "" }}
                  sizes="10rem"
                  unoptimized
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Tag>{person.role}</Tag>
                    {person.linkedin && (
                      // The link stretches over the whole card, so the photo is clickable too.
                      <TextLink
                        href={person.linkedin}
                        emphasis="muted"
                        aria-label={`${person.name} on LinkedIn`}
                        tabIndex={copy > 0 ? -1 : undefined}
                        className="after:absolute after:inset-0"
                      >
                        LinkedIn
                      </TextLink>
                    )}
                  </div>
                </PersonCard>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
