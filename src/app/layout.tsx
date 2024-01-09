import type { Metadata } from "next";

import { poppins } from "@/lib/fonts";
import Providers from "@/components/providers";
import TailwindIndicator from "@/components/tailwind-indicator";

import "@/styles/globals.css";

import cx from "@/lib/utils/cx";

export const metadata: Metadata = {
  title: "Next.js + TypeScript Starter",
  description: "A starter template for Next.js and TypeScript",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cx(
          poppins.variable,
          "font-poppins min-h-screen scroll-smooth antialiased"
        )}
      >
        <Providers>{children}</Providers>

        <TailwindIndicator />
      </body>
    </html>
  );
};

export default RootLayout;
