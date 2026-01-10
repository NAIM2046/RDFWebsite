import React from "react";
import { Helmet } from "react-helmet-async";

// Sample Data updated with specific Title, Author, and Description
const publicationData = [
  {
    id: 1,
    title: "Renewable Energy In Bangladesh",
    author: "M Golam Mostofa",
    designation: "Founder & CEO, RDF",
    description: "This comprehensive publication addresses the critical impact of climate change and outlines a pollution-free roadmap for the future. It details strategic renewable solutions—including Solar Home Systems, Rooftop Solar, and Net Metering—aligned with Bangladesh's vision to achieve 40% green energy by 2041.",
    date: "January 10, 2025",
    category: "Environment",
    pdfLink: "/assets/publication/Renewable Energy_M Golam Mostofa.pdf", 
    coverImage: "/assets/publication/Screenshot 2026-01-10 152535.png", 
  },
];

const Publication = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>RDF - Publications</title>
      </Helmet>

      {/* --- Page Header --- */}
      <div className="bg-slate-800 text-white py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Publications & Research
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our latest findings, articles, and guidelines for a sustainable future.
        </p>
      </div>

      {/* --- Content Container --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {publicationData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden group">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Date */}
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
                  {item.title}
                </h3>

                {/* --- Author Section (New) --- */}
                <div className="mb-4 pb-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {item.author}
                    </p>
                    <p className="text-xs text-gray-500 ml-5">
                        {item.designation}
                    </p>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {item.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-2">
                  {/* Read Button */}
                  <a 
                    href={item.pdfLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Read
                  </a>

                  {/* Download Button */}
                  <a 
                    href={item.pdfLink} 
                    download
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold transition-colors border border-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Save
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publication;