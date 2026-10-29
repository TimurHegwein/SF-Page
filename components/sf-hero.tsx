import Image from "next/image";
import { Actions, Anchor, ButtonLink, Container, Heading, Section, SplitWords, Text } from "@tum.ai/ui-kit";
import type { LogoItem } from "@tum.ai/ui-kit";

type SfHeroProps = {
  title: string;
  tagline: string;
  lead: string;
  cta: { href: string; label: string };
  partners: LogoItem[];
};

// Home-page hero as on tum-ai.com: the photo sits inside the logomark
// (an inline mask, since the CSS pipeline drops url() rules), the partner
// row closes the band. Placement lives in globals.css.
export function SfHero({ title, tagline, lead, cta, partners }: SfHeroProps) {
  return (
    <Section
      tone="night"
      spacing="none"
      aria-labelledby="hero-title"
      className="flex min-h-[100svh] flex-col overflow-clip pt-[calc(var(--header-height)+clamp(4rem,12vh,9rem))]"
    >
      <div aria-hidden className="sf-aperture-frame pointer-events-none absolute -z-10 aspect-[477/406] select-none">
        <div
          className="absolute inset-0 bg-violet-950"
          style={{ mask: "url(/mark-mask.svg) center / 100% 100% no-repeat" }}
        >
          <Image
            src="/sf-bridge.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 64rem) 58vw, 118vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-violet-950/20" />
        </div>
      </div>

      <Container className="flex flex-1 flex-col">
        <div>
          <h1 id="hero-title" className="text-display-xl text-highlight">
            <SplitWords delay={160}>{title}</SplitWords>
          </h1>
          <Heading as="p" size="lg" className="mt-6 [animation-delay:420ms] motion-safe:animate-rise-sm">
            {tagline}
          </Heading>
          <Text
            size="lead"
            emphasis="muted"
            className="mt-8 max-w-[34rem] [animation-delay:620ms] motion-safe:animate-rise-sm md:mt-10"
          >
            {lead}
          </Text>
          <Actions className="mt-10 [animation-delay:760ms] motion-safe:animate-rise-sm md:mt-12">
            <ButtonLink href={cta.href} size="lg" arrow="right">
              {cta.label}
            </ButtonLink>
          </Actions>
        </div>

        <div className="mt-auto pt-16 pb-8 [animation-delay:1000ms] motion-safe:animate-fade md:pt-24 md:pb-10">
          <div className="flex flex-col gap-6 border-fg/15 md:border-t md:pt-8 lg:flex-row lg:items-center lg:gap-12">
            <Text size="meta" emphasis="subtle" className="shrink-0">
              Partners include
            </Text>
            {/* The kit's LogoWall multiplies logos into light bands; on this dark
                band they are set white instead, as on tum-ai.com. */}
            <ul
              aria-label="Partners"
              className="grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-10 lg:flex lg:flex-1 lg:justify-between lg:gap-8"
            >
              {partners.map((logo) => (
                <li key={logo.name} className="flex h-7 items-center opacity-70 transition-opacity hover:opacity-100 md:h-8">
                  <PartnerLogo logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PartnerLogo({ logo }: { logo: LogoItem }) {
  const ratio = logo.aspectRatio ?? 3;
  // Marks get the full row height; wide wordmarks are shortened so they
  // carry the same visual weight.
  const height = logo.wordmark ? 28 : Math.round(Math.min(28, 22 * Math.sqrt(3.2 / ratio)));
  const art = (
    <span className="inline-flex items-center gap-2 text-fg">
      <Image
        src={logo.src!}
        alt={logo.wordmark ? "" : (logo.alt ?? logo.name)}
        width={Math.round(height * ratio)}
        height={height}
        unoptimized
        className="w-auto brightness-0 invert"
        style={{ height }}
      />
      {logo.wordmark ? <span className="text-lg font-semibold tracking-[-0.02em]">{logo.wordmark}</span> : null}
    </span>
  );
  return logo.href ? (
    <Anchor href={logo.href} className="inline-flex">
      {art}
    </Anchor>
  ) : (
    art
  );
}
