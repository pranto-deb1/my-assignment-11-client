import React from "react";
import UseAuth from "../../Hoocks/UseAuth";
import { Link, NavLink, Outlet } from "react-router";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import defaultImage from "../../assets/default-user.png";

// import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, role, loading } = UseAuth();

  if (loading || !user.email || !role)
    return (
      <span className="loading loading-spinner loading-xl flex justify-self-center mt-[300px]"></span>
    );
  //   console.log(user);
  //   console.log(role);

  if (role !== "admin") {
    return (
      <div className="my-[300px]">
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
      <h2 className="text-5xl text-center mt-[50px] font-semibold">
        Admin Dashboard
      </h2>

      <div className="w-full lg:11/12 xl:w-10/12 mx-auto">
        <div className="bg-white rounded-2xl p-5 mt-14 max-w-[600px]">
          <div className="flex items-center gap-6 flex-col md:flex-row ">
            <img
              src={user?.photoURL || defaultImage}
              className="rounded-full w-[100px] h-[100px]"
              alt="User"
            />

            <div className="">
              <h4 className="text-2xl font-bold ">{user?.displayName}</h4>
              <h5 className="text-xl font-bold">{user?.email}</h5>
            </div>

            <div className="self-stretch w-px border-r border-dashed border-gray-300"></div>

            <div className="flex flex-col gap-3">
              <NavLink
                to="/admin-dashboard"
                end
                className={({ isActive }) =>
                  `px-5 py-1 rounded-lg ${
                    isActive ? " bg-blue-500/50 shadow-xl" : ""
                  }`
                }
              >
                Manage Users
              </NavLink>

              <NavLink
                to="/admin-dashboard/manage-contests"
                className={({ isActive }) =>
                  `px-5 py-1 rounded-lg ${
                    isActive ? "bg-blue-500/50 shadow-xl" : ""
                  }`
                }
              >
                Manage Contests
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:11/12 xl:w-10/12 mx-auto mt-14 mb-14">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminDashboard;
