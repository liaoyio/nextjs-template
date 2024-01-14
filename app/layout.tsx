import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Providers from "components/providers";
import TailwindIndicator from "components/tailwind-indicator";
import { poppins } from "lib/fonts";

import "@/styles/globals.css";

import cx from "lib/utils/cx";

import NavBar from "@/components/auth0/navbar";

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
        <UserProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
          <TailwindIndicator />
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
