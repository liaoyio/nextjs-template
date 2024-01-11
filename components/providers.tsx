"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

type Props = {
  theme?: ThemeProviderProps;
  children: ReactNode;
};

export default function Providers({ children, theme }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...theme}
    >
      {children}
    </ThemeProvider>
  );
}
