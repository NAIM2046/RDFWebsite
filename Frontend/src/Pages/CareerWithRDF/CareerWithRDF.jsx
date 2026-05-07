import React from "react";
import { Helmet } from "react-helmet-async";

const CareerWithRDF = () => {
  const applyLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=hr@rdfbd.org&su=Job%20Application%20-%20RDF&body=Dear%20HR%20Team,%0A%0APlease%20find%20my%20application%20attached.%0A%0ARegards,";

  const jobs = [
    {
      title: "Technical Officer-Education", // Added a title for better context
      file: "/assets/careerwithrdf/jobpdf.pdf",
    },
  ];

  // Helper function to check if a file is a PDF
  const isPdf = (filename) => filename.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Career at RDF | Join Our Team</title>
        </Helmet>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
            Opportunities
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Career With RDF
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            Join our team and build a meaningful career. Explore our open
            positions and become part of a community that makes a difference.
          </p>
        </div>

        {/* Job Postings List */}
        <div className="space-y-12">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-shadow hover:shadow-md"
            >
              {/* Card Header (Optional context for the document) */}
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <h3 className="text-lg font-semibold text-slate-800">
                  {job.title || "Job Description"}
                </h3>
                {isPdf(job.file) && (
                  <a
                    href={job.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    Open in new tab
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Document/Image Viewer Area */}
              <div className="bg-slate-100/50 p-4 md:p-8 flex justify-center">
                {isPdf(job.file) ? (
                  <div className="w-full max-w-[900px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <iframe
                      src={`${job.file}#toolbar=0`} // #toolbar=0 hides the default ugly PDF top bar
                      title={`Job Vacancy PDF ${index + 1}`}
                      className="w-full h-[600px] md:h-[800px]"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-[800px] bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                    <img
                      src={job.file}
                      alt={`Job Vacancy ${index + 1}`}
                      className="w-full object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Action / Application Footer */}
              <div className="p-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-800">
                    Ready to join us?
                  </h4>
                  <p className="text-slate-500 mt-1">
                    Send your updated CV to{" "}
                    <a
                      href="mailto:hr@rdfbd.org"
                      className="font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      hr@rdfbd.org
                    </a>
                  </p>
                </div>

                <a
                  href={applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 w-full md:w-auto shadow-sm hover:shadow-md"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Apply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerWithRDF;
