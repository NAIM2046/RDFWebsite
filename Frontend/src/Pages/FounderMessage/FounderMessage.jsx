import React from "react";
import demonfounder from "/assets/FounderMessage/CEO PIC-88 (1).jpg";
import { Helmet } from "react-helmet-async";

const FounderMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 md:p-12">
           {" "}
      <Helmet>
                <title>Founder's Message - RDF</title>     {" "}
      </Helmet>
           {" "}
      <div className="max-w-7xl flex flex-col md:flex-row items-center gap-10 font-serif">
                {/* Left Side - Founder Image */}       {" "}
        <div className="w-full md:w-2/5 flex flex-col justify-center items-center p-6 space-y-4 rounded-lg bg-white shadow-lg ">
                   {" "}
          <img
            src={demonfounder}
            alt="M Golam Mostofa, Founder & CEO, RDF"
            className="object-cover rounded-xl shadow-lg w-full h-auto"
          />
                 {" "}
        </div>
                {/* Right Side - Founder Message */}       {" "}
        <div className="w-full md:w-3/5 p-10 flex flex-col items-start bg-white rounded-lg shadow-lg">
                    {/* Pink Quote Mark */}         {" "}
          <div className="text-[120px] leading-none text-pink-500 font-bold mt-[-40px] ml-[-20px]">
            “
          </div>
                    {/* Quote Text - Condensed for impact */}         {" "}
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed -mt-6">
                        RDF, established in March 1993, has grown from a small
            organization in a remote area to one of the most significant
            development organizations in Bangladesh. We are pledge-bound to
            explore new horizons and continue focusing on social development,
            economic empowerment, and climate resilience to contribute to
            national and international goals.          {" "}
          </p>
                    {/* Attribution */}         {" "}
          <p className="text-base text-gray-600 mt-10">
                      M Golam Mostofa, Founder & CEO, RDF          {" "}
          </p>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default FounderMessage;
