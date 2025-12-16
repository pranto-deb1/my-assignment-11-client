import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import Swal from "sweetalert2";
import UseAuth from "../../Hoocks/UseAuth";

const ContestDetails = () => {
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  const { user } = UseAuth();

  const [timeLeft, setTimeLeft] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskLink, setTaskLink] = useState("");

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  const { data: submitions = [], refetch } = useQuery({
    queryKey: ["submition", user],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?email=${user.email}`);
      return res.data;
    },
  });

  const { data: winner = {} } = useQuery({
    queryKey: ["winner", user, id],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/winners?contestId=${id}`);
      return res.data[0];
    },
  });

  // console.log(winner);

  const [alreadyPaid, setAlreadyPaid] = useState(null);
  const [alreadySubmited, setAlreadySubmited] = useState(null);
  useEffect(() => {
    if (!contest._id || !user?.email) return;
    const filtered = submitions.filter(
      (submition) =>
        submition.userEmail === user.email &&
        submition.contestId === contest._id
    );
    setAlreadySubmited(filtered);
  }, [submitions, user?.email, contest._id]);

  useEffect(() => {
    if (!contest._id || !user?.email) return;
    const filtered = payments.filter(
      (payment) =>
        payment.email === user.email && payment.contestId === contest._id
    );
    setAlreadyPaid(filtered);
  }, [payments, user?.email, contest._id]);

  useEffect(() => {
    if (!contest.deadline) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(contest.deadline).getTime() - now;

      if (distance < 0) {
        setTimeLeft("Contest Ended");
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest.deadline]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (user && contest) {
      const submition = {
        taskLink: taskLink,
        contestId: contest._id,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        winingPrize: contest.prize,
      };

      try {
        await axiosSecure.post("/submissions", submition);
        Swal.fire("Success!", "Your task has been submitted.", "success");
        setIsModalOpen(false);
        setTaskLink("");
        refetch();
      } catch (error) {
        Swal.fire("Error", "Something went wrong!", "error", error.message);
      }
    }
  };

  const handlePayment = async () => {
    if (contest && user) {
      const paymentInfo = {
        amount: contest.price,
        contestName: contest.name,
        userEmail: user.email,
        contestId: contest._id,
        contestEnds: timeLeft,
      };

      localStorage.setItem("contestId", paymentInfo.contestId);
      localStorage.setItem("contestName", paymentInfo.contestName);
      localStorage.setItem("amount", paymentInfo.amount);

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      window.location.href = res.data.url;
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  const isEnded = timeLeft === "Contest Ended";
  const hasWinner = winner.name && winner.email;
  const isPaid = alreadyPaid && alreadyPaid.length > 0;
  const isSubmited = alreadySubmited && alreadySubmited.length > 0;
  return (
    <div className="min-h-screen py-10 px-4 ">
      <div className="max-w-4xl mx-auto bg-white  rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={contest.image}
            alt={contest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full font-bold">
            {timeLeft}
          </div>
        </div>

        <div className="p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
            {contest.name}
          </h1>
          <p className="text-gray-600  text-lg mb-6">{contest.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y py-6 my-6 border-gray-200">
            <div>
              <p className="text-sm text-gray-500 uppercase">Participants</p>
              <p className="text-2xl font-bold text-gray-800 ">
                {contest.participantsCount || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase">Prize Money</p>
              <p className="text-2xl font-bold text-green-600">
                ${contest.prize}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 uppercase font-bold mb-2">
                Task Instruction
              </p>
              <p className="bg-blue-50 p-4 rounded-lg italic">
                {contest.taskInstruction}
              </p>
            </div>
          </div>

          {hasWinner && (
            <div className="bg-yellow-50  border-2 border-yellow-400 p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-bold text-yellow-700  mb-4 text-center">
                🏆 Winner Declared! 🏆
              </h2>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={winner.image}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400"
                  alt=""
                />
                <div>
                  <p className="text-xl font-bold ">{winner.name}</p>
                  <p className="text-gray-500">
                    Won the prize of ${winner.prize}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!hasWinner && (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={handlePayment}
                disabled={isEnded || (alreadyPaid && alreadyPaid.length > 0)}
                className={`px-10 py-4 rounded-xl font-bold text-white transition-all ${
                  isEnded || (alreadyPaid && alreadyPaid.length > 0)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg"
                }`}
              >
                {isEnded
                  ? "Contest Ended"
                  : alreadyPaid && alreadyPaid.length > 0
                  ? "Already Registered"
                  : "Register / Pay"}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={!isPaid || isSubmited || isEnded}
                className={`px-10 py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                  !isPaid || isSubmited || isEnded
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Submit Task
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white  w-full max-w-md p-6 rounded-2xl shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 ">Submit Your Task</h2>
            <form onSubmit={handleTaskSubmit}>
              <textarea
                required
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
                placeholder="Enter your task links or details here..."
                className="w-full h-32 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
