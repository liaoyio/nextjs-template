import React from "react";
// App Router 使用 Antd: https://ant-design.antgroup.com/docs/react/use-with-next-cn#%E4%BD%BF%E7%94%A8-app-router
import { AntdRegistry as AntDesignProvider } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import en_US from "antd/locale/en_US";

import theme from "./themeConfig";

const AntdRegistry = ({ children }: React.PropsWithChildren) => {
  return (
    <AntDesignProvider>
      <ConfigProvider locale={en_US} theme={theme}>
        {children}
      </ConfigProvider>
    </AntDesignProvider>
  );
};

export default AntdRegistry;
