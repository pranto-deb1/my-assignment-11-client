import React from "react";
import { Link, Outlet } from "react-router";
import UseAuth from "../../Hoocks/UseAuth";

const CreatorDashboard = () => {
  const { user, role, loading } = UseAuth();
  if (loading || !user.email || !role)
    return (
      <span className="loading loading-spinner loading-xl flex justify-self-center mt-[500px]"></span>
    );

  if (role !== "admin" && role !== "creator") {
    return (
      <div>
        <h2 className="text-5xl font-black text-center mt-[300px]">
          You are not suppose to view this page
        </h2>
        <Link
          to={"/"}
          className="flex justify-self-center mt-5 btn bg-blue-600"
        >
          Go back
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="">Creator Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_4fr]">
        <div className="bg-white rounded-2xl flex flex-col p-10">
          <nav>
            <Link
              to={"/creator-dashboard/create-contest"}
              className="btn btn-primary"
            >
              Create contest
            </Link>
          </nav>
        </div>
        <div className="">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
