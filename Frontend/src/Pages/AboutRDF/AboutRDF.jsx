import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";

const AboutRDF = () => {
  const data = [
    {
      authority:
        "Department of Social Services, Ministry of Social Welfare, Government of Bangladesh",
      regNumber: "Barguna-91/95",
      regSince: "31.08.1995",
    },
    {
      authority: "NGO Affairs Bureau (NGOAB)",
      regNumber: "1069",
      regSince: "31.08.1996",
    },
    {
      authority:
        "Micro Credit Regulatory Authority (MRA), Ministry of Finance, Government of Bangladesh",
      regNumber: "MRA-00924-00476-00429",
      regSince: "21.07.2009",
    },
    {
      authority: "System for Award Management (SAM)",
      regNumber: "Application Ref:",
      regSince: "Under Process",
    },
  ];
  return (
    <div className="">
      <Helmet>
        <title> About-RDF </title>
      </Helmet>
      <PageCoverPhoto title={"ABOUT RDF"}></PageCoverPhoto>
      <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen pt-5 pb-5">
        <div className="max-w-5xl mx-auto bg-white  rounded-lg p-6 space-y-4 shadow-lg">
          <div className="">
            {/* Header Section */}
            <div className="bg-[#00A651] text-white px-4 py-2 rounded-tr-3xl rounded-bl-3xl w-fit mb-6 font-serif">
              <h2 className="text-2xl font-bold">About RDF</h2>
            </div>

            {/* Content Section */}
            <div className="text-justify text-gray-800 space-y-4 text-[15px] leading-relaxed">
              <p>
                <b className="text-green-500">
                  {" "}
                  Resource Development Foundation (RDF)
                </b>{" "}
                has started its voluntary activities in response to support the
                victims of the catastrophic cyclone in 1970 by responding to
                catastrophe cyclone initiated by the founder of Resource
                Development Foundation. Since then the group of volunteers under
                the leadership of the Founder of RDF, who was a little boy,
                continued with their spirit and early recovery activities for
                the neighboring victims in order to restore their lives into
                livelihood led normalcy.
              </p>
              <p>
                Since then, the philanthropic group continued their voluntary
                social works and got formal organizational identity in 1993
                being registered with department of Social Service (DSS), under
                the ministry of Social Welfare of the Government of Bangladesh,
                as a voluntary social development organization named Resource
                Development Foundation, popularly known with its acronym “RDF”.
              </p>
              <p>
                Since its inception as a devoted social development
                organization, with clear Vision, Mission and Objectives, RDF
                have served local (initially in Barguna, a district located in
                southern part of Bangladesh). Eventually, RDF was registered
                under other concern government authorities and departments, like
                NGO Affairs Bureau, Micro-credit Regulatory Authority (MRA) etc.
              </p>
              <p>
                RDF has recently revisited and revised its strategic pathways as
                its Core Businesses (Focus) based on its expertise as well as
                national and international priorities and commitments into four
                (4) major thematic areas, like <br />
                <b className="text-orange-400">
                  {" "}
                  (i) Social Development, (contributing to the SDG-1,2,3,4,5 &
                  11){" "}
                </b>
                <br />
                <b className="text-green-500">
                  {" "}
                  (ii) Economic Empowerment (contributing to the SDG-1,2,3,5 &
                  8)
                </b>{" "}
                <br />{" "}
                <b className="text-orange-400">
                  (iii) Resilience to Climate Change (contributing to the
                  SDG-1,2,3,7 & 11)
                </b>{" "}
                <br />{" "}
                <b className="text-green-500">
                  (iv) Capacity Building/HRD and Research (contributing to the
                  SDG-1,2,3,4,5,6 & 11)
                </b>{" "}
                <br />
                The strategic priorities of RDF contributes to the mentioned
                SDGs through implementation of all its activities.
              </p>
              <p>
                All these four (4) thematic focuses/areas of interventions are
                interlinked and intra-contributory. Currently, RDF have (in
                2022-23) implemented its interventions in <b>48 districts</b> of
                Bangladesh.
              </p>
            </div>

            {/* Image Section */}
            <div className="mt-8 ">
              <img
                src="https://i.ibb.co.com/0jH0sNMZ/IMG-20190917-160446.jpg" // replace with actual path
                alt="RDF About"
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="border-l-8 border-green-600 pl-4 mb-6">
              <h2 className="text-2xl font-bold text-green-600 font-serif">
                Executive Summary
              </h2>
            </div>

            <p className="text-gray-800 mb-4">
              Focusing service delivery with an inclusive approach, RDF’s
              development intervention continued covering programs under its
              Social Development, Economic Empowerment, Resilience to Climate
              Change and DRR and Human Resources Capacity Building components.
              During the year 2022–‘23, RDF’s multifaceted programs were
              implemented in in <b>48 districts</b> under{" "}
              <b>
                Dhaka, Barishal, Khulna, Rajshahi, Rangpur, Sylhet, Mymensingh
                and Chattogram
              </b>{" "}
              divisions. RDF continued its multifaceted intervention covering
              the poor, landless, marginal & small farmers, disadvantaged
              families & communities in & at coastal zone and Bangladesh. The
              promotion of Social Safeguarding Human rights was focused with
              conduction of different rights-based programs.
            </p>

            <p className="text-gray-800 mb-4">
              Activities under the Social Development component sensitized the
              service providers/stakeholders (government and non-government) for
              providing responsive services to the disadvantaged people as both
              target people became aware of and demanding their entitlements.
              Women participation in decision-making at both family and the
              societal level was especially emphasized.
            </p>

            <p className="text-gray-800 mb-4">
              Under the Social Development Sector, RDF implemented its
              interventions on combatting early and forced marriage, health &
              adolescent girls and young women nutrition and Sexual Reproductive
              Health and Rights, Providing Employable Technical Skills along
              with “productive asset transfer”, “Stop Violence Against Women”,
              “Child Safeguarding” and “Rights to Education” under three
              distinct project like, (i) “Combating Early Marriage in Bangladesh
              (CEMB)”, (ii) “Girls Get Equal (GGE)” which reached <b>180,809</b>{" "}
              and (iii) “Out of School” programme & “Back to School” programme”
              with the support from UK AID and MoPME. Under this component, RDF
              created a scope for <b>12,600</b>
              adolescent girls that supports in <b>420 schools</b>. A total of{" "}
              <b>180,809</b> disadvantaged and vulnerable adolescent girls and
              young women were included in education and life skills training &{" "}
              <b>180,809</b> adolescent girls were covered under SRHR-related
              messages in their households & communities.
            </p>

            <p className="text-gray-800 mb-4">
              Under Economic Empowerment component, RDF provided its services
              like health and gender awareness, creating access to finance for
              income generating activities, etc. under two different
              sub-component, (i) Micro-Finance Support Programme, (ii)
              Entrepreneurship Development Scheme (EDS) to poor & disadvantaged
              people about <b>99%</b> of whom are female.
            </p>

            <p className="text-gray-800 mb-4">
              Under its Microfinance component being operated through{" "}
              <b>68 branches</b> in <b>13 districts</b>, since inception, RDF
              supported
              <b>319,135 borrowers</b> by creating access to finance for income
              generating activities. During the year 2022-‘23, a total{" "}
              <b>83,871 borrowers</b> were directly reached to receive the
              financial support out of which <b>36,608</b> were under credit
              scheme in 13 districts including <b>2,263 entrepreneurs</b> under
              EDS component. During that year, RDF mobilized
              program-participated clients to its savings program who saved
              about <b>17,452,522</b> as of June 2023.
            </p>

            <p className="text-gray-800 mb-4">
              The issues relating to resilience to climate change & DRR were
              addressed as also major components of environment-concerned drive
              under RDF’s Resilience to Climate Change Sector. Targeting the
              most vulnerable population, the multifaceted development on
              Disaster Risk Reduction issues. A total <b>204,829</b> household
              are being directly benefitted under RDF’s resilience program which
              includes <b>2,599 Solar Rooftop System</b>,{" "}
              <b>25,640 Steel Ring based Latrine</b> and <b>144</b> Rainwater
              Irrigation Pumping System (SIPS) producing{" "}
              <b>13.46 MW Solar Power</b> and replaced <b>1,724 diesel units</b>{" "}
              covered <b>25,763 bigahas</b> of land in 3 seasons by{" "}
              <b>10,198</b> farmers (families) for which RDF continued to
              provide technical supports during the year 2022-‘23.
            </p>
          </div>
          <div className="mt-8 ">
            <h2 className="text-xl font-semibold text-green-500 font-serif">
              ABOUT THE FOUNDER
            </h2>
            <p className="text-gray-700 mt-2">
              <b> Resource Development Foundation (RDF)</b> is the ‘brain child’
              of <b>M Golam Mostofa</b>, an economist and a Philanthropist, the
              Founder and the Chief Executive Officer of RDF. The Foundation had
              been in the process of formation when the catastrophic cyclone of
              12th November 1970 hit the coastal districts including Barguna
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
              registered first in <b>1995</b>
            </p>
          </div>

          <div className=" px-4 py-10">
            {/* Title */}
            <div className="bg-green-600 text-white px-6 py-3 rounded-t-lg shadow-md w-fit text-xl font-semibold font-serif">
              Legal Status of RDF
            </div>

            {/* Content */}
            <div className="bg-white p-6 rounded-b-lg shadow-md border border-green-100">
              <p className="text-gray-700 text-base mb-6">
                RDF is registered with Authorities and Departments of Bangladesh
                Government, which are as follows:
              </p>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-sm border border-gray-300">
                  <thead>
                    <tr className="bg-yellow-200 text-gray-800 text-left">
                      <th className="py-3 px-4 border-r border-gray-300">
                        Authorities
                      </th>
                      <th className="py-3 px-4 border-r border-gray-300">
                        Registration Number
                      </th>
                      <th className="py-3 px-4">Registered Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-green-50" : "bg-blue-50"
                        } hover:bg-blue-100 transition`}
                      >
                        <td className="py-3 px-4 border-t border-r border-gray-300">
                          {item.authority}
                        </td>
                        <td className="py-3 px-4 border-t border-r border-gray-300 font-medium text-gray-700">
                          {item.regNumber}
                        </td>
                        <td className="py-3 px-4 border-t border-gray-300 text-gray-600">
                          {item.regSince}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="relative w-full  min-h-screen bg-gradient-to-b from-white to-blue-100 ">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto">
              {/* Left Text Section */}
              <div className="md:w-1/2 p-4">
                <h2 className="text-3xl font-bold text-green-500 mb-4">
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
              <div className="md:w-1/2 flex justify-center  p-5 mt-10 relative">
                <div className=" overflow-hidden">
                  <img
                    src="/assets/RDF Photo/DSC03002.JPG"
                    alt="Smiling Woman"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section - Group Image */}
            <div className="mt-12 flex justify-center">
              <img
                src="/assets/RDF Photo/DSC03483.JPG"
                alt="Group of children "
                className="w-full h-[450px] max-w-5xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRDF;
