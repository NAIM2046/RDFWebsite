import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";
import FounderMessage from "../FounderMessage/FounderMessage";

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
      authority: "UEI/System for Award Management (SAM)",
      regNumber: "T3UDU311V6L3",
      regSince: "27.11.2024",
    },
  ];
  const affiliations = [
    {
      name: "Infrastructure Development Company Limited Partner Organizations’ Forum",
      acronym: "IDCOL-PO Forum",
      type: "Forum",
    },
    {
      name: "Association of Development Agencies in Bangladesh",
      acronym: "ADAB",
      type: "NGO Association",
    },
    {
      name: "Credit and Development Forum",
      acronym: "CDF",
      type: "Forum",
    },
    {
      name: "NGO FORUM for Drinking Water and Sanitation",
      acronym: "NGO FORUM",
      type: "Forum",
    },
    {
      name: "Coastal Fisher-Folk Community Network",
      acronym: "COFCON",
      type: "Community Network",
    },
    {
      name: "Coastal NGO Forum",
      acronym: "CNF",
      type: "Forum",
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
            <div className="text-justify text-gray-800 space-y-5 text-[16px] leading-relaxed">
              <p>
                <b className="text-green-600 text-lg">
                  Resource Development Foundation (RDF)
                </b>
                started its{" "}
                <span className="text-blue-600 font-medium">
                  voluntary journey in 1970
                </span>{" "}
                in response to the devastating cyclone. The initiative was led
                by the{" "}
                <span className="text-orange-500 font-medium">
                  Founder of RDF
                </span>
                , who at that time was just a young boy. The spirit of{" "}
                <span className="italic text-blue-600">
                  humanitarian response and recovery
                </span>{" "}
                laid the foundation of RDF's legacy.
              </p>

              <p>
                Over time, the group transformed into an official entity and in{" "}
                <b className="text-green-600">1993</b>, it was registered with
                the{" "}
                <span className="text-purple-600 font-medium">
                  Department of Social Service (DSS)
                </span>
                , under the{" "}
                <span className="text-purple-600 font-medium">
                  Ministry of Social Welfare
                </span>
                , Government of Bangladesh, as a voluntary social development
                organization. Since then,{" "}
                <b className="text-green-600">
                  Resource Development Foundation (RDF)
                </b>{" "}
                has been known and respected for its grassroots efforts.
              </p>

              <p>
                Initially focusing on{" "}
                <span className="text-blue-600 font-medium">Barguna</span>{" "}
                district, RDF later registered with
                <span className="text-purple-600 font-medium">
                  {" "}
                  NGO Affairs Bureau
                </span>{" "}
                and
                <span className="text-purple-600 font-medium">
                  {" "}
                  Micro-credit Regulatory Authority (MRA)
                </span>
                to expand its reach and capabilities across the nation.
              </p>

              <p>
                <b className="text-xl text-green-700">
                  Strategic Focus Areas of RDF:
                </b>
                <br />
                RDF has recently revised its strategic focus areas based on
                national and global development priorities. It now operates
                through{" "}
                <b className="text-blue-700 font-semibold">
                  six (6) major thematic areas
                </b>
                :
                <br />
                <b className="text-orange-500">
                  ➊ Food Security, Livelihood, Skills, and Economic Empowerment
                </b>{" "}
                <br />
                <b className="text-green-600">
                  ➋ Resilience to Climate Change & Disaster Risk Reduction
                </b>{" "}
                <br />
                <b className="text-orange-500">➌ Emergency Response</b> <br />
                <b className="text-green-600">
                  ➍ Child Rights, Ending Child Marriage, Education, Health,
                  Nutrition, and SRHR
                </b>{" "}
                <br />
                <b className="text-orange-500">
                  ➎ Water, Sanitation, and Hygiene (WASH)
                </b>{" "}
                <br />
                <b className="text-green-600">
                  ➏ Cross-cutting programme: Gender Transformation, Disability
                  Inclusion, and Locally-led Initiatives
                </b>
              </p>

              <p>
                📌 These thematic areas are{" "}
                <span className="text-blue-600 font-semibold">
                  interlinked and mutually reinforcing
                </span>
                , ensuring holistic development across all RDF programs.
                <br />✅ RDF’s activities directly support the{" "}
                <span className="text-purple-600 font-semibold">
                  Sustainable Development Goals (SDGs)
                </span>
                :
                <span className="text-pink-500 font-medium">
                  {" "}
                  1, 2, 3, 4, 5, 6, 8, 11
                </span>{" "}
                and <span className="text-pink-500 font-medium">13</span>.
              </p>

              <p>
                🌍 As of <b className="text-green-700">2022–2023</b>, RDF has
                implemented its interventions in
                <b className="text-orange-600 text-lg"> 48 districts</b> across
                Bangladesh, reaching communities with impact-driven, sustainable
                programs.
              </p>
            </div>

            {/* Image Section */}
            <div className="mt-8 ">
              <img
                src="https://i.ibb.co/8nNpR7VM/276995751-7840379539312908-4749845572993626328-n-webp.webp" // replace with actual path
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

            {/* Intro Paragraph */}
            <p className="text-gray-800 mb-4">
              Focusing service delivery with an inclusive approach,
              <span className="font-semibold text-green-700">
                {" "}
                RDF’s development intervention
              </span>
              continued covering programs under its
              <span className="text-blue-600 font-medium">
                {" "}
                Social Development, Economic Empowerment, Resilience to Climate
                Change and DRR, and Human Resources Capacity Building
              </span>{" "}
              components. During the year{" "}
              <span className="font-bold text-purple-600">2022–‘23</span>, RDF’s
              multifaceted programs were implemented in
              <span className="font-bold text-orange-600">
                {" "}
                48 districts
              </span>{" "}
              under
              <span className="text-blue-700 font-semibold">
                Dhaka, Barishal, Khulna, Rajshahi, Rangpur, Sylhet, Mymensingh
                and Chattogram
              </span>{" "}
              divisions. RDF continued its multifaceted intervention covering
              the
              <span className="text-pink-600 font-semibold">
                {" "}
                poor, landless, marginal & small farmers, disadvantaged families
                & communities
              </span>
              in & at coastal zone and Bangladesh. The promotion of
              <span className="text-indigo-600 font-semibold">
                {" "}
                Social Safeguarding Human rights
              </span>{" "}
              was focused with conduction of different rights-based programs.
            </p>

            {/* Social Development */}
            <p className="text-gray-800 mb-4">
              Activities under the{" "}
              <span className="font-semibold text-green-700">
                Social Development
              </span>{" "}
              component sensitized the service providers/stakeholders
              (government and non-government) for providing responsive services
              to the disadvantaged people as both target people became aware of
              and demanding their entitlements.
              <span className="text-pink-600 font-medium">
                Women participation
              </span>{" "}
              in decision-making at both family and the societal level was
              especially emphasized.
            </p>

            {/* Key Projects Under Social Development */}
            <p className="text-gray-800 mb-4">
              Under the{" "}
              <span className="text-green-700 font-semibold">
                Social Development Sector
              </span>
              , RDF implemented its interventions on:
              <span className="text-purple-700 font-semibold">
                {" "}
                combatting early and forced marriage
              </span>
              ,
              <span className="text-blue-700 font-semibold">
                {" "}
                health & adolescent girls and young women nutrition
              </span>
              , and{" "}
              <span className="text-rose-700 font-semibold">
                Sexual Reproductive Health and Rights (SRHR)
              </span>
              . Other efforts included:
              <span className="font-medium text-orange-600">
                {" "}
                Employable Technical Skills, Productive Asset Transfer, Stop
                Violence Against Women, Child Safeguarding, Rights to Education
              </span>
              under three projects:
              <br />
              <span className="pl-4 block text-green-800 font-semibold">
                • (i) “Combating Early Marriage in Bangladesh (CEMB)”
              </span>
              <span className="pl-4 block text-green-800 font-semibold">
                • (ii) “Girls Get Equal (GGE)” – reached{" "}
                <span className="text-purple-700 font-bold">180,809</span>{" "}
                beneficiaries
              </span>
              <span className="pl-4 block text-green-800 font-semibold">
                • (iii) “Out of School” & “Back to School” programmes
              </span>
              <br />
              With support from{" "}
              <span className="text-indigo-700 font-semibold">
                UK AID and MoPME
              </span>
              , RDF created opportunities for
              <span className="text-purple-600 font-bold">
                {" "}
                12,600 adolescent girls
              </span>{" "}
              in
              <span className="text-purple-600 font-bold"> 420 schools</span>. A
              total of{" "}
              <span className="text-purple-600 font-bold">180,809</span> girls
              and young women received
              <span className="text-blue-700 font-semibold">
                {" "}
                life skills training
              </span>{" "}
              and
              <span className="text-rose-700 font-semibold">
                SRHR awareness
              </span>{" "}
              in households and communities.
            </p>

            {/* Economic Empowerment */}
            <p className="text-gray-800 mb-4">
              Under{" "}
              <span className="text-green-700 font-semibold">
                Economic Empowerment
              </span>
              , RDF provided services like
              <span className="text-blue-700 font-semibold">
                {" "}
                health, gender awareness, and access to finance
              </span>{" "}
              under:
              <br />
              <span className="pl-4 block text-green-800 font-semibold">
                • (i) Micro-Finance Support Programme
              </span>
              <span className="pl-4 block text-green-800 font-semibold">
                • (ii) Entrepreneurship Development Scheme (EDS)
              </span>
              benefiting mostly
              <span className="text-pink-600 font-bold">
                99% female participants
              </span>
              .
            </p>

            {/* Microfinance Details */}
            <p className="text-gray-800 mb-4">
              RDF’s{" "}
              <span className="text-indigo-700 font-semibold">
                Microfinance
              </span>{" "}
              operations through
              <span className="text-blue-600 font-bold"> 68 branches</span> in
              <span className="text-blue-600 font-bold">
                {" "}
                13 districts
              </span>{" "}
              have supported
              <span className="text-purple-700 font-bold">
                319,135 borrowers
              </span>
              . In
              <span className="text-green-700 font-bold">2022–23</span> alone,
              <span className="text-purple-700 font-bold">
                83,871 borrowers
              </span>{" "}
              were served, including{" "}
              <span className="text-pink-600 font-bold">
                36,608 under credit schemes
              </span>{" "}
              and
              <span className="text-pink-600 font-bold">
                2,263 entrepreneurs
              </span>{" "}
              via EDS. Clients saved a total of
              <span className="text-orange-700 font-bold">৳17,452,522</span> by
              June 2023.
            </p>

            {/* Climate Change & DRR */}
            <p className="text-gray-800 mb-4">
              RDF addressed{" "}
              <span className="text-green-700 font-semibold">
                Resilience to Climate Change & Disaster Risk Reduction (DRR)
              </span>
              through multifaceted development programs for vulnerable
              populations. A total of{" "}
              <span className="text-purple-700 font-bold">
                204,829 households
              </span>{" "}
              benefited from:
              <ul className="list-disc list-inside text-gray-700 pl-2">
                <li>
                  <span className="font-bold text-green-600">2,599</span> Solar
                  Rooftop Systems
                </li>
                <li>
                  <span className="font-bold text-green-600">25,640</span> Steel
                  Ring-based Latrines
                </li>
                <li>
                  <span className="font-bold text-green-600">144</span>{" "}
                  Rainwater Irrigation Pumping Systems (SIPS)
                </li>
              </ul>
              These initiatives produced{" "}
              <span className="font-bold text-orange-700">
                13.46 MW solar power
              </span>
              , replaced
              <span className="text-red-600 font-bold">
                {" "}
                1,724 diesel units
              </span>
              , and irrigated
              <span className="text-blue-600 font-bold">25,763 bighas</span> of
              land across 3 seasons, benefiting
              <span className="text-pink-700 font-bold">
                10,198 farmers
              </span>{" "}
              with ongoing technical support in
              <span className="text-green-700 font-semibold">2022–23</span>.
            </p>
          </div>

          <div className="mt-8 ">
            <h2 className="text-xl font-semibold text-green-500 font-serif">
              ABOUT THE FOUNDER
            </h2>
            <FounderMessage></FounderMessage>
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
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-green-700 font-serif mb-6  ">
              Affiliation
            </h1>
            <p className="text-gray-700 text-lg mb-10 leading-relaxed  max-w-4xl mx-auto">
              <strong>Resource Development Foundation (RDF)</strong> is
              affiliated with several national and regional networking
              organizations and forums. These strategic alliances enhance RDF’s
              institutional capacity, foster collaboration, and enable
              collective action to address critical development challenges
              across Bangladesh.
            </p>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-green-100 text-green-800 text-base">
                  <tr>
                    <th className="text-left px-6 py-4 border-r border-b border-gray-300">
                      Networking Organization
                    </th>
                    <th className="text-left px-6 py-4 border-b border-r border-gray-300">
                      Acronym
                    </th>
                    <th className="text-left px-6 py-4 border-b border-gray-300">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {affiliations.map((affiliation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 border-r border-b border-gray-200 text-gray-800">
                        {affiliation.name}
                      </td>
                      <td className="px-6 py-4 border-r border-b border-gray-200 text-gray-700 font-medium">
                        {affiliation.acronym}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-gray-600">
                        {affiliation.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
