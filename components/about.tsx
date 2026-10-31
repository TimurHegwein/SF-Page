import type { ReactNode } from "react";
import { Container, Section, SectionHeader, Text, TextLink } from "@tum.ai/ui-kit";
import { EHL_URL } from "@/content/event";

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <TextLink href={href} emphasis="accent">
    {children}
  </TextLink>
);

// Inline emphasis: full-strength text inside the muted lead paragraphs.
const Em = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-fg">{children}</strong>;

export function About() {
  return (
    <Section id="about" tone="paper">
      <Container>
        <SectionHeader eyebrow="About TUM.ai" title="Europe's leading student AI initiative." />
        <div className="mt-10 max-w-3xl space-y-6">
          <Text size="lead" emphasis="muted">
            <Link href="https://www.tum-ai.com">TUM.ai</Link> is rooted at the{" "}
            <Link href="https://www.tum.de/en">Technical University of Munich</Link>, <Em>Germany&apos;s MIT</Em>. We
            run hackathons across Europe with the <Link href={EHL_URL}>European Hackathon League</Link>, back
            Munich&apos;s brightest minds in <Link href="https://www.tum-ai.com/e-lab">our own incubator</Link>, and
            publish <Link href="https://www.tum-ai.com/research">state-of-the-art research</Link> at venues like{" "}
            <Em>ICLR and ICML</Em> with <Em>MIT, Cambridge, IBM</Em> and others. Our alumni join{" "}
            <Em>top companies and startups</Em>, do research at leading institutions, and found{" "}
            <Em>breakout YC companies</Em>.
          </Text>
          <Text size="lead">
            Now we&apos;re coming to San Francisco to <Em>connect two ecosystems</Em>: Munich&apos;s brightest students
            in the same room as the Bay&apos;s sharpest builders, with founders and investors there to meet them early.
          </Text>
        </div>
      </Container>
    </Section>
  );
}
