import React from "react";
import ContestCard from "./ContestCard";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hoocks/UseAxiosSecure";

const PopularContest = ({ search }) => {
  const axiosSecure = UseAxiosSecure();
  const limit = 6;

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularContests", search],
    queryFn: async () => {
      let url = `/approved-contests?status=approved&limit=${limit}`;
      if (search && search !== "All") {
        url += `&category=${search}`;
      }
      const res = await axiosSecure.get(url);
      return res.data.contests || [];
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading popular contests...</p>;
  if (error) return <p className="text-center mt-10">Error loading contests</p>;

  const popularContests = data
    .sort((a, b) => (b.participantsCount || 0) - (a.participantsCount || 0))
    .slice(0, 8);

  return (
    <div className="w-11/12 xl:w-9/12 mx-auto mt-20">
      <h2 className="text-5xl font-bold my-14 text-center">Popular Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-9">
        {popularContests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

export default PopularContest;
