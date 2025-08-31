import React from "react";
import { Helmet } from "react-helmet-async";

const CareerWithRDF = () => {
  const jobs = [
    {
      img: "/assets/careerwithrdf/job.jpg",
      applyLink: "mailto:hr@rdfbd.org", // Email link for applying
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Helmet>
        <title> RDF-Career </title>
      </Helmet>
      <div className="container mx-auto p-6 ">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 mt-20 md:mt-1 font-serif">
          Job Vacancy
        </h2>
        <div className="flex flex-col items-center">
          {jobs.map((job, index) => (
            <div key={index} className="text-center">
              {/* Job Image */}
              <img src={job.img} alt="Job Vacancy" className="w-full" />
              {/* Apply Now Button */}
            </div>
          ))}
        </div>
        <a
          href={jobs[0].applyLink}
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-xl shadow-lg  shadow-blue-600 transition duration-300 md:absolute top-30 right-10"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default CareerWithRDF;
