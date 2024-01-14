import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

/**
 * 服务端渲染页面
 * 使用 withPageAuthRequired 包装组件
 * 使用 getSession 获取用户信息
 * 只有登录的用户才能访问页面，如果用户注销，将被重定向到登录页面
 * @returns {React.ReactNode}
 */
async function SSR() {
  const session = await getSession();
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

export default withPageAuthRequired(SSR, { returnTo: "/ssr" });
