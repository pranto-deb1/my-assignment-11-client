import React from "react";
import { NavLink, Outlet } from "react-router";
import UseAuth from "../../Hoocks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";

const UserDashboard = () => {
  const { user, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: participations = [] } = useQuery({
    queryKey: ["participations", user],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const { data: wins = [] } = useQuery({
    queryKey: ["wins", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || !user?.email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-11/12 mx-auto mt-10 mb-16">
      <h2 className="text-4xl font-bold text-center mb-10">User Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,260px)_1fr] gap-5 lg:gap-6 xl:gap-8">
        <aside className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center">User Menu</h3>

          <nav className="flex flex-col gap-3">
            <NavLink
              to="/user-dashboard"
              end
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg ${
                  isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
                }`
              }
            >
              My Participations
            </NavLink>

            <NavLink
              to="/user-dashboard/my-wins"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg ${
                  isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
                }`
              }
            >
              My Wins
            </NavLink>

            <NavLink
              to="/user-dashboard/my-wins"
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg ${
                  isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
                }`
              }
            >
              My Profile
            </NavLink>
          </nav>

          <hr className="my-6" />

          <div className="flex flex-col gap-3 mt-auto">
            <p className="text-sm font-semibold mb-2.5 text-center">
              Quick Stats
            </p>
            <div className="flex flex-col gap-3">
              <div className="w-full h-[100px] bg-purple-600/20 flex justify-center items-center flex-col gap-2 rounded-lg">
                <p className="font-medium">Participations</p>
                <p className="text-lg font-bold">{participations.length}</p>
              </div>
              <div className="w-full h-[100px] bg-green-600/20 flex justify-center items-center flex-col gap-2 rounded-lg">
                <p className="font-medium">Wins</p>
                <p className="text-lg font-bold">{wins.length}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="bg-white rounded-2xl shadow-md p-6 min-h-[400px]">
          <Outlet context={{ participations, wins, user }} />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
