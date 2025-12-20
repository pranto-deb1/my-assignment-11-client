import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";

const Leaderboard = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/leaderboard");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500">
        Loading leaderboard...
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <section className="py-12 bg-gray-50 min-h-screen mb-[100px] rounded-3xl">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-5 text-gray-800">
          Leaderboard
        </h1>
        <p className="mb-10 text-center font-semibold text-xl">
          See our top winers who has work hard and challenge themself
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {topThree.map((user, index) => (
            <div
              key={user._id}
              className="bg-white border rounded-xl shadow-sm p-6 text-center"
            >
              <p className="text-sm font-semibold text-indigo-600 mb-2">
                Rank #{index + 1}
              </p>

              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 mx-auto rounded-full object-cover mb-3"
              />

              <h3 className="font-semibold text-gray-800">{user.name}</h3>

              <p className="mt-2 text-gray-600">
                Wins:{" "}
                <span className="font-bold text-gray-800">
                  {user.totalWins}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-center">Total Wins</th>
              </tr>
            </thead>

            <tbody>
              {rest.map((user, index) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 4}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-gray-800">{user.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-center font-medium text-gray-700">
                    {user.totalWins}
                  </td>
                </tr>
              ))}

              {leaderboard.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-gray-500">
                    No leaderboard data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
