import type { Metadata } from "next";
import Providers from "components/providers";
import TailwindIndicator from "components/tailwind-indicator";
import { poppins } from "lib/fonts";

import AntdRegistry from "@/components/antd/AntdRegistry";

import "@/styles/globals.css";

import cx from "lib/utils/cx";

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
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
        <TailwindIndicator />
      </body>
    </html>
  );
};

export default RootLayout;
