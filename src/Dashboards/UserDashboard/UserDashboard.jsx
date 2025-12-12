import React, { useState } from "react";
import { Link, Outlet } from "react-router";

const UserDashboard = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="min-h-[70vh]">
      <div className="grid xl:grid-cols-[1fr_3.5fr] gap-[30px] lg:grid-cols-[1.5fr_3fr] w-10/12 mx-auto ">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-5">
          <div className="flex flex-col gap-3 mb-[30px]">
            <Link
              onClick={() => setActive(1)}
              className={`${
                active === 1 && "bg-blue-400/60 border"
              } px-5 py-1 rounded-lg`}
            >
              HI
            </Link>
            <Link
              onClick={() => setActive(2)}
              className={`${
                active === 2 && "bg-blue-400/60 border"
              } px-5 py-1  rounded-lg`}
            >
              Hello
            </Link>
            <Link
              onClick={() => setActive(3)}
              className={`${
                active === 3 && "bg-blue-400/60 border"
              } px-5 py-1  rounded-lg`}
            >
              what's up
            </Link>
          </div>
          <hr />
          <div className="mt-5">
            <p className="mb-2.5">Quick Stats</p>
            <div className="flex justify-between gap-2.5 ">
              <div className="w-[150px] h-[100px] bg-purple-600/20 flex justify-center items-center flex-col gap-3 rounded-lg">
                <p className="">Participations:</p>
              </div>
              <div className="w-[150px] h-[100px] bg-green-600/20 flex justify-center items-center flex-col gap-3 rounded-lg">
                <p className="">Wins:</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
