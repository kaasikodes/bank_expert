import React from "react";
import AuthLayout from "./AuthenticationLayout";
import LoginOptions from "./LoginOptions";

const RegisterContainer = () => {
  return (
    <AuthLayout
      heading={"Login"}
      alternativeAction={{ text: "Login", link: "/auth/login", promptText: "Already have an account?" }}
    >
      <LoginOptions isRegister />
    </AuthLayout>
  );
};

export default RegisterContainer;
