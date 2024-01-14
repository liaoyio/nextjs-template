"use client";

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { ConfigProvider } from "antd";
import en_US from "antd/locale/en_US";

import theme from "./themeConfig";

const AntdRegistry = ({ children }: React.PropsWithChildren) => {
  const isServerInserted = React.useRef<boolean>(false);
  const cache = React.useMemo<Entity>(() => createCache(), []);

  useServerInsertedHTML(() => {
    // 避免 css 重复插入
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });
  return (
    <StyleProvider cache={cache} hashPriority="high">
      <ConfigProvider locale={en_US} theme={theme}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdRegistry;
