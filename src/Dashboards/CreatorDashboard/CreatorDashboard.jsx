import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import UseAuth from "../../Hoocks/UseAuth";

const CreatorDashboard = () => {
  const { user, role, loading } = UseAuth();

  if (loading || !user?.email || !role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (role !== "admin" && role !== "creator") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h2 className="text-4xl font-extrabold text-center">
          You are not supposed to view this page
        </h2>
        <Link to="/" className="btn bg-blue-600 text-white">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-11/12 mx-auto mt-10 mb-16 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10">
        Creator Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Creator Menu
          </h3>

          <nav className="flex flex-col gap-3">
            <NavLink
              to="/creator-dashboard"
              end
              className={({ isActive }) =>
                `px-5 py-1 rounded-lg ${
                  isActive ? " bg-blue-500/50 shadow-xl" : ""
                }`
              }
            >
              Create Contest
            </NavLink>

            <NavLink
              to="/creator-dashboard/my-contests"
              className={({ isActive }) =>
                `px-5 py-1 rounded-lg ${
                  isActive ? " bg-blue-500/50 shadow-xl" : ""
                }`
              }
            >
              My Contests
            </NavLink>
          </nav>
        </aside>

        <main className="bg-white rounded-2xl shadow-md p-6 min-h-[400px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CreatorDashboard;
