// src/components/Home/ExtraSection.jsx
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../../Hoocks/UseAxiosSecure";
import { Link } from "react-router";

const ExtraSection = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: winers = [] } = useQuery({
    queryKey: ["winers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/winners");
      return res.data;
    },
  });
  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/approved-contests");
      return res.data;
    },
  });

  const { data: participants = { count: 0 } } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments-length");
      return res.data;
    },
  });

  // console.log(contests.totalCount);
  // console.log(participants.count);

  return (
    <section className="bg-linear-to-r rounded-3xl mb-[200px] from-indigo-500 via-purple-500 to-pink-500 text-white py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join the Creative Revolution!
        </h2>
        <p className="text-lg md:text-xl mb-8">
          ContestHub empowers creators and participants to showcase their
          talent, win exciting prizes, and gain recognition. Explore trending
          contests or create your own masterpiece today.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Link
            to={"/all-contests"}
            className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Explore Contests
          </Link>
          <Link
            to={"/auth/login"}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg  text-black">
            <h3 className="text-3xl font-bold">{contests.totalCount}+</h3>
            <p>Contests Hosted</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg  text-black">
            <h3 className="text-3xl font-bold">{participants.count}+</h3>
            <p>Active Participants</p>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-lg text-black">
            <h3 className="text-3xl font-bold">{winers.length}+</h3>
            <p>Winners Celebrated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
