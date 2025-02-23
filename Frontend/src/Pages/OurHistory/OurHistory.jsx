import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const OurHistory = () => {
  return (
    <div className="">
      <PageCoverPhoto title={"Our History"}></PageCoverPhoto>
      <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-blue-900 border-b-4 border-green-400 pb-2 mb-6">
            OUR HISTORY
          </h1>
          <p className="text-gray-700 leading-relaxed">
            The Resource Development Foundation (RDF) was founded in response to
            the catastrophic cyclone of November 12, 1970. The founder,
            alongside local philanthropists, initiated voluntary social
            activities to support the victims.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Under the leadership of the founder, these efforts grew into a
            formally recognized organization. In 1995, RDF was officially
            registered with the Department of Social Services (DSS), under the
            Ministry of Social Welfare of the Government of Bangladesh. Over
            time, RDF also received recognition from the NGO Affairs Bureau, the
            Prime Minister’s Office, and the Government of Bangladesh.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Today, RDF continues its mission as a devoted social development
            organization with a clear vision, mission, and values. Starting in
            Barguna, it has expanded its operations across 48 districts in
            Bangladesh with over 850 dedicated employees, striving for
            sustainable social development.
          </p>

          <div className="mt-8 bg-orange-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-orange-700">
              ABOUT THE FOUNDER
            </h2>
            <p className="text-gray-700 mt-2">
              Resource Development Foundation (RDF) is the ‘brain child’ of M
              Golam Mostofa, an economist and a Philanthropist, the Founder and
              the Chief Executive Officer of RDF. The Foundation had been in the
              process of formation when the catastrophic cyclone of 12th
              November 1970 hit the coastal districts including Barguna
              district, resulting great miseries of the people of the coastal
              area of Bangladesh where the Founder was born in. Mr. Mostofa
              carried this “trauma like” condition in his mind till he became
              adult. In the mean time he witnessed several more catastrophic
              natural disasters almost every year. He also witnessed the
              destruction sufferings, migration, trafficking and hunger induced
              by the natural calamities. Finally, in 1993 he along with his
              mates who were committed and contributed to support the victims,
              formally transformed their group into a formal organization and
              named it as “Resource Development Foundation (RDF) and was legally
              registered first in 1995
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Legal status of RDF:
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-yellow-200">
                  <th className="border border-gray-400 px-4 py-2 text-left">
                    Authorities
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left">
                    Registration Number
                  </th>
                  <th className="border border-gray-400 px-4 py-2 text-left">
                    Reg. Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">
                    Department of Social Services, Ministry of Social Welfare,
                    Government of Bangladesh
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    Barguna-91/95
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    31.08.1995
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">
                    NGO Affairs Bureau (NGOAB)
                  </td>
                  <td className="border border-gray-400 px-4 py-2">1069</td>
                  <td className="border border-gray-400 px-4 py-2">
                    31.08.1996
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-400 px-4 py-2">
                    Microcredit Regulatory Authority (MRA), Ministry of Finance,
                    Government of Bangladesh
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    MRA-00924-00476-00429
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    21.07.2009
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="relative w-full min-h-screen bg-gradient-to-b from-white to-blue-200 p-8">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto">
              {/* Left Text Section */}
              <div className="md:w-1/2 p-4">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                  The Fundamental
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Resource Development Foundation (RDF) has started its formal
                  philanthropic and social development activities in 1995. RDF
                  with its 850 devoted staff members has been supplementing GoB
                  efforts in reducing food deficiency in the country and has
                  been trying to integrate non-conventional and innovative
                  approaches through solar irrigation pumping systems to resolve
                  food security issues. Agricultural development through micro-
                  credit support and development through Solar Energy is one of
                  the most modern and innovative ideas that has already been
                  incorporated to mitigate the energy & food security crisis of
                  the country. Now, RDF is the national non-government
                  development organization rooted in Southern Bangladesh.
                </p>
              </div>

              {/* Right Image Section with Curved Design */}
              <div className="md:w-1/2 flex justify-center relative">
                <div className=" overflow-hidden rounded-l-full w-96 border-8 border-l-blue-400 ">
                  <img
                    src="/assets/RDF Photo/DSC03002.JPG"
                    alt="Smiling Woman"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section - Group Image */}
            <div className="mt-12 flex justify-center">
              <img
                src="/assets/RDF Photo/DSC03483.JPG"
                alt="Group of children"
                className="w-full h-[400px] max-w-5xl rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHistory;
