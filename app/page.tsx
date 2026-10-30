import {
  BulletList,
  ButtonLink,
  Container,
  CtaBand,
  Eyebrow,
  Heading,
  PersonCard,
  Section,
  SectionHeader,
  SpotlightCard,
  StatGrid,
  Text,
  TextLink,
} from "@tum.ai/ui-kit";
import { Footer, Header } from "@tum.ai/ui-kit/shell";
import { SfHero } from "@/components/sf-hero";
import { asset } from "@/lib/asset";
import {
  people,
  CONTACT_EMAIL,
  EVENT_NAME,
  cta,
  hero,
  mailto,
  partners,
  stats,
  tracks,
} from "@/content/event";

const logo = {
  src: asset("/tum_ai_logo_new.svg"),
  width: 1640,
  height: 406,
  alt: "TUM.ai",
  unoptimized: true,
};

const partnerMail = mailto(`Partnering with the ${EVENT_NAME}`);

export default function Page() {
  return (
    <>
      <Header
        logo={logo}
        homeHref="#main-content"
        navigation={[
          { href: "#format", label: "Format" },
          { href: "#why-now", label: "Why now" },
          { href: "#people", label: "People" },
          { href: "#contact", label: "Contact" },
        ]}
        cta={{ href: partnerMail, label: "Become a partner" }}
      />

      <main id="main-content" tabIndex={-1}>
        <SfHero
          title={hero.title}
          tagline={hero.tagline}
          lead={hero.lead}
          cta={{ href: partnerMail, label: "Become a partner" }}
          partners={partners}
        />

        <Section id="format" tone="paper">
          <Container>
            <SectionHeader
              eyebrow="Format"
              title="A summit and a hackathon in San Francisco."
              lead="Come for the stage, stay for the build, or back both."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {tracks.map((track) => (
                <SpotlightCard key={track.id} variant="outline" padding="lg" className="flex flex-col">
                  <Eyebrow>{track.eyebrow}</Eyebrow>
                  <Heading as="h3" size="lg" className="mt-4">
                    {track.title}
                  </Heading>
                  <Text size="lead" emphasis="muted" className="mt-3">
                    {track.lead}
                  </Text>
                  <BulletList className="mt-6" items={track.items} />
                  <div className="mt-auto pt-8">
                    <TextLink href={mailto(track.cta.subject)} arrow>
                      {track.cta.label}
                    </TextLink>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="why-now" tone="mist">
          <Container>
            <SectionHeader
              eyebrow="Why now"
              title="The Munich–Bay pipeline is already running."
              lead="German engineers have been building the Bay for decades. TUM.ai is where the next ones meet."
            />
            <StatGrid className="mt-12" columns={4} items={stats} />
          </Container>
        </Section>

        <Section id="people" tone="lavender">
          <Container>
            <SectionHeader
              eyebrow="People"
              title="Built by people who made the move"
            />
            {people.map((group) => (
              <div key={group.id} id={group.id} className="mt-12">
                <Eyebrow>{group.title}</Eyebrow>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {group.people.map((person) => (
                    <PersonCard
                      key={person.name}
                      name={person.name}
                      byline={person.byline}
                      image={{ src: person.image, alt: "" }}
                      unoptimized
                    >
                      {person.linkedin && (
                        <TextLink href={person.linkedin} emphasis="muted">
                          LinkedIn
                        </TextLink>
                      )}
                    </PersonCard>
                  ))}
                </div>
              </div>
            ))}
          </Container>
        </Section>

        <CtaBand
          id="contact"
          variant="band"
          tone="violet"
          mark
          titleId="contact-title"
          eyebrow={cta.eyebrow}
          title={cta.title}
          lead={cta.lead}
          actions={
            <ButtonLink href={partnerMail} variant="inverse" arrow="right">
              {CONTACT_EMAIL}
            </ButtonLink>
          }
        />
      </main>

      <Footer
        logo={logo}
        tagline="See you in SF."
        columns={[
          {
            id: "event",
            title: "Event",
            links: [
              { href: "#format", label: "Format" },
              { href: "#why-now", label: "Why now" },
              { href: "#people", label: "People" },
            ],
          },
          {
            id: "contact",
            title: "Contact",
            links: [
              { href: partnerMail, label: CONTACT_EMAIL },
              { href: "https://www.tum-ai.com", label: "tum-ai.com", external: true },
            ],
          },
        ]}
        bottomLine="© TUM.ai"
      />
    </>
  );
}
