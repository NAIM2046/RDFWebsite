import React, { useState } from "react";
import axios from "axios";

const CheckOutPage = () => {
  const [amount, setAmount] = useState(100);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [donationType, setDonationType] = useState("one-time");
  const [message, setMessage] = useState("");

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const handlePayment = async () => {
    if (!name || !email) {
      setMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3001/api/payment", {
        amount: amount, // converting to paisa if needed
        name,
        email,
        donationType,
      });

      if (response.data?.GatewayPageURL) {
        window.location.href = response.data.GatewayPageURL;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setMessage("Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
        {/* Header with nature imagery */}
        <div className="bg-green-600 p-6 text-center relative">
          <div className="absolute inset-0 bg-[url('/assets/leaf-pattern.png')] opacity-10"></div>
          <h2 className="text-3xl font-bold text-white relative z-10">
            Support Our Mission
          </h2>
          <p className="text-green-100 mt-2 relative z-10">
            Your donation helps create sustainable change
          </p>
        </div>

        <div className="p-6">
          {message && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Donation Type
            </label>
            <div className="flex gap-2">
              <button
                className={`flex-1 py-2 rounded-lg border ${
                  donationType === "one-time"
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "border-gray-300"
                }`}
                onClick={() => setDonationType("one-time")}
              >
                One-Time
              </button>
              <button
                className={`flex-1 py-2 rounded-lg border ${
                  donationType === "monthly"
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "border-gray-300"
                }`}
                onClick={() => setDonationType("monthly")}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Select Amount (BDT)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  className={`py-2 rounded-lg border ${
                    amount === amt
                      ? "bg-green-500 text-white border-green-500"
                      : "border-gray-300 hover:bg-green-50"
                  }`}
                  onClick={() => setAmount(amt)}
                >
                  {amt}
                </button>
              ))}
              <button
                className={`py-2 rounded-lg border col-span-3 ${
                  !presetAmounts.includes(amount)
                    ? "bg-green-500 text-white border-green-500"
                    : "border-gray-300 hover:bg-green-50"
                }`}
                onClick={() => setAmount("")}
              >
                Custom Amount
              </button>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Or enter custom amount (BDT)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className={`w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              `Donate ${amount} BDT ${
                donationType === "monthly" ? "Monthly" : ""
              }`
            )}
          </button>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Your donation will help us create sustainable change in communities.
            <br />
            <span className="text-green-600">Thank you for your support!</span>
          </p>
        </div>

        {/* Nature-inspired footer */}
        <div className="bg-green-50 p-4 text-center text-sm text-gray-600 border-t border-green-100">
          <div className="flex justify-center space-x-4 mb-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure Payment</span>
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Privacy Protected</span>
          </div>
          © {new Date().getFullYear()} Resource Development Foundation
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
