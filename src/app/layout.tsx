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
    <html lang="en">
      <body
        className={cx(
          "layout min-h-screen bg-black/90 px-8 pt-4 text-white antialiased md:pt-2 lg:px-16",
          poppins.className
        )}
      >
        <Providers>{children}</Providers>

        <TailwindIndicator />
      </body>
    </html>
  );
};

export default RootLayout;
