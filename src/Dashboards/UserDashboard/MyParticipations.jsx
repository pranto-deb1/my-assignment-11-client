import React from "react";
import { useOutletContext } from "react-router";

const MyParticipations = () => {
  const { participations } = useOutletContext();

  if (participations.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Participations</h2>
        <p className="text-gray-500">You have not submitted any tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">My Participations</h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden xl:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Task Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Transaction Id
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Paid At
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {participations.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium">{item.contestName}</td>
                <td className="py-3 px-4 wrap-break-word">
                  {item.transactionId}
                </td>
                <td className="py-3 px-4">
                  {new Date(item.paidAt).toLocaleString()}
                </td>
                <td
                  className={`py-3 px-4 flex items-center justify-center ${
                    item.paymentStatus === "paid" ? "bg-green-300" : ""
                  }`}
                >
                  {item.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 xl:hidden">
        {participations.map((item) => (
          <div key={item._id} className="border rounded-xl p-4 shadow bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg wrap-break-word">
                {item.contestName}
              </h3>
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  item.paymentStatus === "paid"
                    ? "bg-green-300 text-green-800"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {item.paymentStatus}
              </span>
            </div>

            <p className="text-sm mb-1 wrap-break-word">
              <strong>Transaction:</strong> {item.transactionId}
            </p>
            <p className="text-sm wrap-break-word">
              <strong>Paid At:</strong> {new Date(item.paidAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParticipations;
