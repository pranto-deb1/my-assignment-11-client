import React from "react";
import ContestCard from "./ContestCard";

const contests = [
  {
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
  },
  {
    _id: "c002",
    name: "Technology Article Writing",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description: "Write a 1000-word article about AI trends in 2025.",
    price: 150,
    prize: 2500,
    taskInstruction: "Submit your article as a Google Drive link.",
    type: "Article Writing",
    deadline: "2025-12-25T18:00:00",
    creatorEmail: "creator2@mail.com",
    participants: 8,
    winner: {
      name: "Rahul Mazumder",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    status: "confirmed",
  },
  {
    _id: "c003",
    name: "Best Gaming Review",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    description: "Review any PC game released in 2024–2025.",
    price: 100,
    prize: 1500,
    taskInstruction: "Submit a YouTube link or blog link.",
    type: "Gaming Review",
    deadline: "2025-12-15T20:30:00",
    creatorEmail: "creator3@mail.com",
    participants: 20,
    winner: null,
    status: "pending",
  },
  {
    _id: "c004",
    name: "Business Idea Pitch",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    description:
      "Pitch a creative business idea with a clear problem-solution fit.",
    price: 300,
    prize: 5000,
    taskInstruction: "Upload a PDF or provide a Notion link.",
    type: "Business Idea",
    deadline: "2025-12-30T23:59:59",
    creatorEmail: "creator1@mail.com",
    participants: 4,
    winner: null,
    status: "rejected",
  },
  {
    _id: "c005",
    name: "Short Story Competition",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    description: "Write a compelling short story under 800 words.",
    price: 50,
    prize: 800,
    taskInstruction: "Submit story in Google Docs format.",
    type: "Writing",
    deadline: "2025-12-18T12:00:00",
    creatorEmail: "creator4@mail.com",
    participants: 15,
    winner: null,
    status: "confirmed",
  },
  {
    _id: "c006",
    name: "UI/UX Mobile App Design",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    description: "Design a modern mobile UI for a fitness app.",
    price: 250,
    prize: 4000,
    taskInstruction: "Submit Figma link or exported screens.",
    type: "UI/UX Design",
    deadline: "2025-12-22T17:45:00",
    creatorEmail: "creator2@mail.com",
    participants: 9,
    winner: null,
    status: "confirmed",
  },
];

const PopularContest = () => {
  return (
    <div className=" w-11/12 xl:w-9/12 mx-auto mt-[200px]">
      <h2 className="text-4xl font-bold my-14">Popular Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 ">
        {contests.map((contest) => (
          <ContestCard contest={contest} key={contest._id}></ContestCard>
        ))}
      </div>
    </div>
  );
};

export default PopularContest;
