import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import UseAuth from "../Hoocks/UseAuth";
import UseAxiosSecure from "../Hoocks/UseAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user } = UseAuth();
  const [searchParams] = useSearchParams();
  const [saving, setSaving] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    const storePayment = async () => {
      try {
        const transactionId = searchParams.get("session_id");

        const contestId = localStorage.getItem("contestId");
        const contestName = localStorage.getItem("contestName");
        const amount = localStorage.getItem("amount");

        if (!transactionId || !contestId || !contestName || !amount) {
          setSaving(false);

          return;
        }
        // console.log(transactionId);
        // console.log(contestId);
        // console.log(contestName);
        // console.log(amount);
        const data = {
          contestId,
          contestName,
          amount,
          userEmail: user.email,
          transactionId,
        };

        await axiosSecure.post("/payments", data);

        setSaving(false);
      } catch (error) {
        console.error("Payment storing error:", error);
        setSaving(false);
      }
    };
    storePayment();
    hasRun.current = true;
  }, [axiosSecure, searchParams, user.email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center animate-fade-in">
        {saving ? (
          <p className="text-gray-600">Saving your payment...</p>
        ) : (
          <>
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for registering for the contest. Your payment has been
              processed successfully.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                Go to Home
              </button>
              <button
                onClick={() => navigate("/all-contests")}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Browse Contests
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
