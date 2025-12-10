import React from "react";
import UseAuth from "../Hoocks/UseAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) return <span className="loading loading-bars loading-xl"></span>;

  if (!user)
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;

  return children;
};

export default PrivetRoute;
