import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-col-reverse gap-15 lg:gap-0 lg:flex-row justify-between">
      <div className="w-full lg:w-[40%] bg-amber-400 h-[80vh]"></div>
      <div className="w-full lg:w-[60%] flex items-center justify-center">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
