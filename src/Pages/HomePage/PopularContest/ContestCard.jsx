import React from "react";
import { Link } from "react-router";
const ContestCard = ({ contest }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden 
                    transform transition-all duration-300 hover:scale-[1.03]
                    hover:shadow-2xl"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{contest.name}</h2>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="px-2 py-1 bg-blue-100 rounded-full">
            {contest.type}
          </span>

          <span className="font-semibold">
            👥 {contest.participants} joined
          </span>
        </div>

        <p className="text-gray-500 text-sm">
          {contest.description.slice(0, 70)}...
        </p>

        <div className="text-green-600 font-bold text-lg">
          Prize: ৳{contest.prize}
        </div>

        <Link
          to={`/contest/${contest._id}`}
          className="block text-center bg-blue-600 text-white py-2 rounded-xl
                     hover:bg-blue-700 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ContestCard;
