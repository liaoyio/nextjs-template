"use client";

import * as React from "react";
import AntdRegistry from "components/antd/AntdRegistry";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

type Props = {
  theme?: ThemeProviderProps;
  children: React.ReactNode;
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
      <AntdRegistry>{children}</AntdRegistry>
    </ThemeProvider>
  );
}
