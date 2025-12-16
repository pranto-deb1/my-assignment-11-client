import React from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import UseAuth from "../../Hoocks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { GiPodiumWinner } from "react-icons/gi";
import { toast } from "react-toastify";

const SeeSubmitions = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const { contestId } = useParams();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions", contestId],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?contestId=${contestId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleSetWinner = async (item) => {
    try {
      const winnerDetails = {
        name: item.userName,
        winnerId: item._id,
        userEmail: item.userEmail,
        image: item.userPhoto,
        prize: item.winingPrize,
        contestId: item.contestId,
      };

      const res = await axiosSecure.post("/winners", winnerDetails);

      if (res.data?.insertedId) {
        toast.success("Winner successfully selected!");
      }
    } catch (error) {
      toast.error("Failed to set winner", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Contest Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-500">
          No submissions found for this contest.
        </p>
      ) : (
        <>
          {/* ===== Desktop Table ===== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Task Link</th>
                  <th>Submitted At</th>
                  <th>Set Winner</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((item) => (
                  <tr key={item._id}>
                    <td className="flex items-center gap-3">
                      <img
                        src={item.userPhoto}
                        alt={item.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold">{item.userName}</span>
                    </td>
                    <td>{item.userEmail}</td>
                    <td>
                      <a
                        href={item.taskLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Task
                      </a>
                    </td>
                    <td>{new Date(item.submitedAt).toLocaleDateString()}</td>
                    <td
                      onClick={() => handleSetWinner(item)}
                      className="btn text-green-600 text-2xl"
                    >
                      <GiPodiumWinner />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Mobile Cards ===== */}
          <div className="grid grid-cols-1 gap-5 md:hidden">
            {submissions.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-5 shadow-sm bg-base-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.userPhoto}
                    alt={item.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold">{item.userName}</h3>
                    <p className="text-sm text-gray-500">{item.userEmail}</p>
                  </div>
                </div>

                <p className="text-sm mb-2">
                  <span className="font-semibold">Submitted:</span>{" "}
                  {new Date(item.submitedAt).toLocaleDateString()}
                </p>

                <p className="text-sm mb-3">
                  <span className="font-semibold">Prize:</span>{" "}
                  <span
                    onClick={() => handleSetWinner(item)}
                    className="btn text-green-600 text-2xl"
                  >
                    <GiPodiumWinner />
                  </span>
                </p>

                <a
                  href={item.taskLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline w-full"
                >
                  View Task Link
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SeeSubmitions;
