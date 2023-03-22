import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="py-10">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
