import { PersonCard, Tag, TextLink } from "@tum.ai/ui-kit";
import type { Person } from "@/content/event";

type PeopleMarqueeProps = {
  groups: { id: string; role: string; people: Person[] }[];
};

// One slow, endless row of small portrait cards. The list is rendered four
// times and the track moves by half its width, so the loop has no seam even
// with few people. The copies stay clickable (not `inert`, which also blocks
// the mouse) but are hidden from screen readers and skipped by Tab.
// Pauses on hover and focus; with reduced motion it becomes a plain
// horizontal scroller of the first copy (globals.css).
const COPIES = [0, 1, 2, 3];

export function PeopleMarquee({ groups }: PeopleMarqueeProps) {
  const people = groups.flatMap((group) =>
    group.people.map((person) => ({ ...person, role: group.role })),
  );

  return (
    <div className="sf-marquee mask-fade-x mt-12 overflow-hidden">
      <div className="sf-marquee-track flex w-max">
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
