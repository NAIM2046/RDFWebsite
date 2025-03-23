import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Payment Successful ✅
        </h2>
        <p className="text-lg mt-2">
          Transaction ID: <span className="font-mono">{tranId}</span>
        </p>
        <p className="mt-4 text-gray-600">Thank you for your donation!</p>
        <a
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
