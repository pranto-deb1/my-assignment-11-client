import React, { useState } from "react";
import ContestCard from "../HomePage/PopularContest/ContestCard";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 9;

const AllContests = () => {
  const axiosSecure = UseAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");

  const { data = {}, isLoading } = useQuery({
    queryKey: ["approvedContests", currentPage, category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/approved-contests?status=approved&page=${currentPage}&limit=${ITEMS_PER_PAGE}${
          category !== "All" ? `&category=${category}` : ""
        }`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const contests = data.contests || [];
  const totalPages = Math.ceil((data.totalCount || 0) / ITEMS_PER_PAGE);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen">
      <h2 className="text-5xl font-bold text-center mb-5">All Contests</h2>

      <div className="flex justify-end mt-10 mb-10 w-11/12 xl:w-9/12 mx-auto">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="select select-bordered w-52"
        >
          <option value="All">All</option>
          <option value="Writing">Writing</option>
          <option value="UiUxDesign">UI/UX Design</option>
          <option value="Creation">Creation</option>
          <option value="Gaming">Gaming</option>
          <option value="GameReview">Game review</option>
          <option value="ArticleWriting">Article Writing</option>
          <option value="ImageDesign">Image Design</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-11/12 xl:w-9/12 mx-auto mb-16">
        {contests.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-[200px]">
          <button
            className="btn btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`btn ${
                currentPage === page + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            className="btn btn-outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllContests;
