"use client";

import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

/**
 * 客户端渲染页面
 * 使用 withPageAuthRequired 包装组件
 * 使用 useUser hook 获取用户信息
 * useUser 挂钩依赖于 UserProvider Context Provider，需要在根组件包装 UserProvider。
 * 只有登录的用户才能访问页面，如果用户注销，将被重定向到登录页面
 * @returns {React.ReactNode}
 */
function CSR() {
  const session = useUser();
  if (!session) {
    return <></>;
  }
  return (
    <>
      <div>
        <h6 className="muted">User</h6>
        {JSON.stringify(session.user, null, 2)}
      </div>
    </>
  );
}

export default withPageAuthRequired(CSR);
