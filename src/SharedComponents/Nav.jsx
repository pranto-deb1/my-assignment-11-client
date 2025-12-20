import React, { useEffect, useRef, useState } from "react";
import NavLogo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import defaultUserImage from "../assets/default-user.png";
import UseAuth from "../Hoocks/UseAuth";
import { RxCross2, RxDropdownMenu } from "react-icons/rx";
// import UseAxiosSecure from "../Hoocks/UseAxiosSecure"

const Nav = () => {
  const [dashboardRoute, setDashboardRoute] = useState("");
  const { user, logOut, loading, role } = UseAuth();

  useEffect(() => {
    if (!user || !role) return;

    if (role === "admin") {
      setDashboardRoute("/admin-dashboard");
    } else if (role === "creator") {
      setDashboardRoute("/creator-dashboard");
    } else {
      setDashboardRoute("/user-dashboard");
    }
  }, [user, role]);

  // console.log("USER:", user);
  // console.log("LOADING:", loading);
  // console.log("PHOTO:", user?.photoURL);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const sidebarRef = useRef(null);
  const sidebar2Ref = useRef(null);

  // const axiosSecure= UseAxiosSecure()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebar2Ref.current && !sidebar2Ref.current.contains(event.target)) {
        setShowRightSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOut();
  };

  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `px-2 py-1 rounded-lg ${
            isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-lg ${
            isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
          }`
        }
        to={"/all-contests"}
      >
        All Contests
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-lg ${
            isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
          }`
        }
        to={"/leaderboard"}
      >
        Leaderboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-lg ${
            isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
          }`
        }
        to={"/about"}
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-2 py-1 rounded-lg ${
            isActive ? "bg-blue-500/50 shadow-xl" : "hover:bg-blue-100/50"
          }`
        }
        to={"/faq"}
      >
        FAQ's
      </NavLink>
    </>
  );

  if (loading) {
    return (
      <span className="loading loading-spinner loading-xl flex justify-self-center mt-[500px]"></span>
    );
  }

  return (
    <nav className="w-full mt-0 md:mt-8 md:w-11/12 md:rounded-xl mx-auto flex justify-around h-20 items-center z-50 bg-white shadow-sm">
      {showSidebar && <div className="fixed inset-0 z-10 bg-black/60 "></div>}
      <div
        ref={sidebarRef}
        className={`h-full flex items-center gap-5 flex-col absolute left-0 top-0 bg-white w-[200px] transition-all duration-200 ease-in-out z-20 ${
          showSidebar
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none -translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3.5 items-center mt-8">{links}</div>
      </div>

      {user && (
        <div
          ref={sidebar2Ref}
          className={`w-[200px] flex flex-col gap-4 items-center z-50 shadow-2xl rounded-xl absolute top-20 right-0  md:right-[100px] md:top-28 h-[400px] p-[22px] bg-white transition-all duration-200 ${
            showRightSidebar
              ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
              : "opacity-0 translate-x-full scale-0 pointer-events-none"
          }`}
        >
          <div className="w-full relative">
            <button
              className="text-xl font-black absolute -top-5 -right-4 p-2 hover:text-red-500"
              onClick={() => setShowRightSidebar(false)}
            >
              <RxCross2 />
            </button>
          </div>
          <p className="text-2xl font-bold">{user.displayName}</p>
          <button onClick={handleLogOut} className="btn bg-blue-500 w-full">
            Log Out
          </button>

          {dashboardRoute && (
            <Link
              className="btn bg-blue-500 rounded w-full"
              to={dashboardRoute}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}

      <div className="flex items-center">
        <img src={NavLogo} alt="" className="w-[120px] md:w-[150px] h-auto" />
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="mr-14 h-auto md:hidden ml-2.5 text-2xl"
        >
          {showSidebar ? "" : <RxDropdownMenu />}
        </button>
      </div>
      <div className="flex justify-between items-center gap-7">
        <div className="gap-3.5 hidden md:flex">{links}</div>
        <div className="">
          {user && user.photoURL ? (
            <img
              onClick={() => setShowRightSidebar(true)}
              src={user?.photoURL || defaultUserImage}
              className="w-[50px] h-[50px] rounded-full z-50"
            />
          ) : (
            <Link to={"/auth/login"} className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
