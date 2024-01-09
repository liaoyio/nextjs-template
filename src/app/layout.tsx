import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import cx from "@/lib/utils/cx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + TypeScript Starter",
  description: "A starter template for Next.js and TypeScript",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cx("bg-black", inter.className)}>{children}</body>
    </html>
  );
};

export default RootLayout;
