import React from "react";

const Auth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  return <div style={{ color: "#fff" }}>{code}</div>;
};

export default Auth;
