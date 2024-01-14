"use client";

import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Alert, Avatar, Col, Row, Spin } from "antd";

function Profile() {
  const { user, isLoading } = useUser();
  return (
    <>
      {isLoading && <Spin />}
      {user && (
        <>
          <Row className="mb-5 text-center">
            <Col md={2}>
              <Avatar size="large" src={user.picture!} alt="Profile" />
            </Col>
            <Col>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </Col>
          </Row>
          <Row>{JSON.stringify(user, null, 2)}</Row>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Spin />,
  onError: (error) => <Alert message={error.message}></Alert>,
});
