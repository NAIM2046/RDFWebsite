import React from "react";
import { useRouteError, Link } from "react-router-dom";

const AdminErrorPage = ({ message, error }) => {
  const routeError = useRouteError();
  const displayError = error || routeError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Admin Panel Error
        </h1>
        <p className="text-gray-600 mb-4">
          {message || "An error occurred in the admin panel. Please try again."}
        </p>

        <div className="space-y-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-200 font-medium"
          >
            Reload Page
          </button>

          <Link
            to="/admin-login"
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition duration-200 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminErrorPage;
