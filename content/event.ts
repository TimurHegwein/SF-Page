import type { LogoItem, StatItem } from "@tum.ai/ui-kit";
import { asset } from "@/lib/asset";

// All page copy and data. Anything marked TODO is a placeholder to confirm.

// TODO: confirm the address partners should write to.
export const CONTACT_EMAIL = "partners@tum-ai.com";

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const EVENT_NAME = "TUM.ai Summit";

export const hero = {
  title: EVENT_NAME,
  tagline: "Overengineered. Overregulated. Still world class.",
  lead: "For decades, Germany's best engineers moved to the Bay and built world-class companies. The next generation is landing right now.",
};

// Munich–Bay figures. Sources:
// - Unicorn value abroad vs at home, US share: Dealroom German Diaspora Index
//   (dealroom.co/resources/german-diaspora-index-vs-home, .../german-diaspora-index-founder-flows; live data)
// - Google check: Wikipedia, "Andy Bechtolsheim" (TUM electrical engineering, Sun 1982, Google Sept 1998)
// - Start-ups 2025: TUM press release, 26 Jun 2026 ("Presidential award for space start-up")
export const stats: StatItem[] = [
  {
    value: "$342.5B",
    count: true,
    label: "In unicorns German founders built abroad",
    description: "More than twice the $144.7B they built at home.",
  },
  {
    value: 33,
    suffix: "%",
    label: "Of German-founded unicorns were built in the US",
    description: "Only 40% were built in Germany.",
  },
  {
    value: "$100K",
    label: "Google's first check",
    description: "Written in 1998 by TUM alumnus Andy Bechtolsheim, who co-founded Sun Microsystems.",
  },
  {
    value: 115,
    label: "Start-ups founded at TUM in 2025",
    description: "A new record. The next wave is on its way.",
  },
];

export const tracks = [
  {
    id: "summit",
    eyebrow: "Track 01",
    title: "Summit",
    lead: "Talks and panels with German founders, operators and investors who built in the Bay.",
    items: [
      "Keynotes from founders who made the move",
      "Panels on building, hiring and fundraising across both ecosystems",
      "Curated networking with students, founders and investors",
    ],
    cta: { label: "Pitch a talk", subject: `Speaking at the ${EVENT_NAME}` },
  },
  {
    id: "hackathon",
    eyebrow: "Track 02",
    title: "Hackathon",
    lead: "Builders from TUM.ai and the Bay Area ship real products in one weekend.",
    items: [
      "Challenges set by partner companies",
      "Mentors from partner teams on site",
      "Prizes and a final demo in front of the summit audience",
    ],
    cta: { label: "Bring a challenge", subject: `Hackathon challenge for the ${EVENT_NAME}` },
  },
];

// Logos live in /public/logos. Mark-only logos get a `wordmark` set beside them.
export const partners: LogoItem[] = [
  { name: "OpenAI", src: asset("/logos/openai.svg"), href: "https://openai.com", aspectRatio: 928 / 308 },
  { name: "Antler", src: asset("/logos/antler.svg"), href: "https://www.antler.co", aspectRatio: 117 / 28 },
  { name: "Modal", src: asset("/logos/modal.svg"), href: "https://modal.com", aspectRatio: 187 / 35 },
  { name: "Cognition", src: asset("/logos/cognition.svg"), href: "https://cognition.ai", aspectRatio: 1, wordmark: "Cognition" },
  { name: "Headline", src: asset("/logos/headline.svg"), href: "https://headline.com", aspectRatio: 217 / 378, wordmark: "Headline" },
  { name: "Tenor", src: asset("/logos/tenor.svg"), href: "https://heytenor.com", aspectRatio: 825 / 172 },
];

export type Person = {
  name: string;
  byline: string;
  image: string;
  linkedin: string;
};

// Photos live in /public/people.
export const speakers: Person[] = [
  {
    name: "Hamze Al-Zamkan",
    byline: "Founder, Tenor",
    image: asset("/people/Hamze.png"),
    linkedin: "https://www.linkedin.com/in/hamze-al-zamkan/",
  },
];

export const advisors: Person[] = [
  {
    name: "Mike Mahlkow",
    byline: "Co-founder & CEO, Fastgen (YC W23). Previously co-founded Blair (YC S19).",
    image: asset("/people/Mike.jpg"),
    linkedin: "https://www.linkedin.com/in/mikemahlkow/",
  },
  {
    name: "Tim Saval",
    byline: "Founder & CEO, Plural",
    image: asset("/people/Tim.png"),
    linkedin: "https://www.linkedin.com/in/timsaval/",
  },
  {
    name: "Luis Schmitz",
    byline: "Headline",
    image: asset("/people/Luis.png"),
    linkedin: "https://www.linkedin.com/in/luis-schmitz/",
  },
];

export const organizers: Person[] = [
  {
    name: "Jakob Liebig",
    byline: "Organizer, TUM.ai",
    image: asset("/people/Jakob.png"),
    linkedin: "https://www.linkedin.com/in/jakob-liebig/",
  },
  {
    name: "Timur Hegwein",
    byline: "Organizer, TUM.ai",
    image: asset("/people/Timur.jpg"),
    linkedin: "https://www.linkedin.com/in/timur-hegwein-9b2948332/",
  },
];

export const people = [
  { id: "speakers", title: "Speakers", people: speakers },
  { id: "advisors", title: "Advisors", people: advisors },
  { id: "organizers", title: "Organizers", people: organizers },
];

export const cta = {
  eyebrow: "Partner with us",
  title: "We're looking for partners.",
  lead: "Sponsors, speakers and companies who want to set a hackathon challenge. If you built your company between Munich and the Bay, we'd love to have you on board.",
};
