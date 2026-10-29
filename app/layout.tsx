import type { Metadata } from "next";
import { MotionProvider } from "@tum.ai/ui-kit";
import { SkipLink } from "@tum.ai/ui-kit/shell";
import { hero } from "@/content/event";
import "./globals.css";

export const metadata: Metadata = {
  title: `${hero.title} — San Francisco`,
  description: hero.lead,
  openGraph: {
    title: hero.title,
    description: hero.lead,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <div id="app-root" data-tone="paper">
            <SkipLink />
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
