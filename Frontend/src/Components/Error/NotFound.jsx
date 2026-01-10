import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Helmet>
        <title>404 Not Found | Resource Development Foundation</title>
        <meta
          name="description"
          content="The page you’re looking for couldn’t be found on Resource Development Foundation’s website."
        />
        {/* Google যেন এই পেজ index না করে */}
        <meta name="robots" content="noindex, follow" />
        {/* Canonical URL — মূল হোমপেজে রেফার করা */}
        <link rel="canonical" href="https://rdfbd.org/" />
        {/* Optional structured data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "404 Not Found",
            "description": "This page could not be found on RDF Bangladesh website.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Resource Development Foundation",
              "url": "https://rdfbd.org"
            }
          }
        `}</script>
      </Helmet>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-200 font-medium"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
