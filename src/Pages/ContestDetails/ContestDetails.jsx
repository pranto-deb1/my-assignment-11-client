import React from "react";
import { useParams } from "react-router";

const ContestDetails = () => {
  const { id } = useParams();
  const data = {
    _id: "c001",
    name: "Minimal Logo Design Challenge",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381",
    description:
      "Create a clean and minimal logo for a fictional tech startup.",
    price: 200,
    prize: 3000,
    taskInstruction:
      "Submit your logo in PNG format with transparent background.",
    type: "Image Design",
    deadline: "2025-12-20T23:59:59",
    creatorEmail: "creator1@mail.com",
    participants: 12,
    winner: null,
    status: "confirmed",
  };

  console.log(id);
  return (
    <div className="">
      <div className="p-5 md:p-9 bg-black/70 rounded-3xl w-[70%] mx-auto">
        <div className="w-full h-[500px] overflow-hidden mx-auto rounded-2xl shadow-2xl shadow-blue-400/50">
          <img
            src={data.image}
            alt=""
            className="w-full h-full mx-auto object-cover object-center transition-transform duration-500 hover:scale-110 "
          />
        </div>

        <div className=" mt-10 flex flex-col gap-5 text-white">
          <h3 className="text-4xl font-bold text-yellow-500">{data.name}</h3>
          <p className="text-2xl font-semibold">
            Participants count:{" "}
            <span className="text-yellow-500">{data.participants}</span>
          </p>
          {/* Full Contest Description & Task details */}

          <p className="text-xl">
            <span className="font-bold">Task Details:</span> <br></br>
            {data.description}
          </p>
          <p className="text-xl font-bold">
            Prize:
            <span className="text-yellow-500 ml-2">{data.prize}</span> taka
          </p>
        </div>
        {data.status === "confirmed" && (
          <div className="flex justify-between">
            <p className=""></p>
            <button className="btn bg-amber-200 hover:bg-amber-300 mt-5">
              Register Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetails;
