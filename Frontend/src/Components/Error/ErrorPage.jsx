import React from "react";
import { Helmet } from "react-helmet-async";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = ({ message, error }) => {
  const routeError = useRouteError();
  const displayError = error || routeError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Error | Resource Development Foundation</title>
        <meta
          name="description"
          content="Something went wrong on the Resource Development Foundation website. Please return to the home page or contact support."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-red-500"
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

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          {message || "We apologize for the inconvenience. Please try again."}
        </p>

        {process.env.NODE_ENV === "development" && displayError && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details
            </summary>
            <pre className="text-xs text-red-500 mt-2 p-2 bg-red-50 rounded">
              {displayError.toString()}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Try Again
          </button>

          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
          >
            Go Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
