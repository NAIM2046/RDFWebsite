import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "react-feather";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl space-y-6 text-center"
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="p-4 bg-green-100 rounded-full"
          >
            <CheckCircle className="w-16 h-16 text-green-600 stroke-[3px]" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Payment Successful
          </h2>
          <p className="text-gray-600">
            Your transaction has been completed successfully
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Transaction ID</p>
          <p className="mt-1 font-mono text-lg font-semibold text-gray-800 break-all">
            {tranId}
          </p>
        </div>

        <p className="text-gray-600">
          Thank you for your donation! A receipt has been sent to your email.
        </p>

        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="/"
          className="inline-block w-full px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Return to Home
        </motion.a>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
