import React from "react";
import { Helmet } from "react-helmet-async";

const CareerWithRDF = () => {
  const applyLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=hr@rdfbd.org&su=Job%20Application%20-%20RDF&body=Dear%20HR%20Team,%0A%0APlease%20find%20my%20application%20attached.%0A%0ARegards,";

  const jobs = [
    {
      img: "/assets/careerwithrdf/Screenshot 2026-01-13 200742.png",
    },
    {
      img: "/assets/careerwithrdf/job.jpg",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4">
      <Helmet>
        <title>RDF | Career</title>
      </Helmet>

      {/* Page Title */}
      <div className="text-center mt-20 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
          Career With RDF
        </h2>
        <p className="text-gray-600 mt-2">
          Join our team and build a meaningful career with RDF
        </p>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-10">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            {/* Job Image */}
            <img
              src={job.img}
              alt="Job Vacancy"
              className="mx-auto w-full max-w-[800px] object-contain"
            />

            {/* Card Footer */}
            <div className="p-6 text-center">
              <a
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300"
              >
                📧 Apply via Gmail
              </a>

              <p className="text-sm text-gray-500 mt-4">
                Send your CV to{" "}
                <span className="font-medium text-gray-700">
                  hr@rdfbd.org
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerWithRDF;
