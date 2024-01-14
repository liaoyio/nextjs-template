"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, Button } from "antd";

export default function NavBar() {
  const { user, isLoading } = useUser();
  return (
    <nav className="container mx-auto flex min-h-16 items-center justify-between border-b border-dashed px-8 py-4">
      <div className="flex items-center gap-4">
        {/* <Button type="link">Auth0</Button> */}
        {user && (
          <div>
            <Button type="link" href="/csr">
              Client-side rendered page
            </Button>
            <Button href="/ssr" type="link">
              Server-side rendered page
            </Button>
            <Button href="/profile" type="link">
              profile
            </Button>
          </div>
        )}
      </div>
      {!isLoading && !user && (
        <Link href="/api/auth/login">
          <Button type="primary">Login</Button>
        </Link>
      )}

      {!isLoading && user && (
        <div className="flex items-center gap-4">
          <Avatar src={user.picture} />
          <a href="/api/auth/logout">
            <Button>Logout</Button>
          </a>
        </div>
      )}
    </nav>
  );
}
