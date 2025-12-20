import React from "react";
import { Outlet } from "react-router";
import AuthCards from "./AuthCards";

const AuthLayout = () => {
  return (
    <div className="flex flex-col-reverse gap-15 lg:gap-0 lg:flex-row justify-between overflow-x-hidden ">
      <div className="w-full lg:w-[40%] flex items-center justify-center flex-col gap-[50px]">
        <h3 className="text-5xl font-semibold">Join and win like others</h3>
        <AuthCards></AuthCards>
      </div>
      <div className="w-full lg:w-[60%] flex items-center justify-center mb-15 min-h-[70vh]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
