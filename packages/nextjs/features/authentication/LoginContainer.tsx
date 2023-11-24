import React from "react";
import AuthLayout from "./AuthenticationLayout";
import LoginOptions from "./LoginOptions";

const LoginContainer = () => {
  return (
    <AuthLayout
      heading={"Login"}
      alternativeAction={{ text: "Register", link: "/auth/register", promptText: "Don't have an account?" }}
    >
      <LoginOptions />
    </AuthLayout>
  );
};

export default LoginContainer;
