import React, { useState } from "react";
import axios from "axios";

const CheakOutPage = () => {
  const [amount, setAmount] = useState(100);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/payment", {
        amount,
        name,
        email,
      });

      console.log(response.data);

      if (response.data && response.data.GatewayPageURL) {
        window.location.href = response.data.GatewayPageURL;
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Donate to RDF</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (BDT)"
          className="w-full p-2 border rounded mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheakOutPage;
