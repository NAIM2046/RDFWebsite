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
      authority: "National Skills Development Authority (NSDA)",
      regNumber: "STP-BAR-001359",
      regSince: "22.05.2029",
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
        <title>About RDF | Resource Development Foundation</title>
        <meta
          name="description"
          content="Learn about Resource Development Foundation (RDF), driving positive change across Bangladesh since 1995 with programs in social development, economic empowerment, and climate resilience."
        />
      </Helmet>
      <PageCoverPhoto
        title={"ABOUT RDF"}
        subtitle={"Creating Sustainable Impact through Transformation"}
      ></PageCoverPhoto>
      <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen pt-5 pb-5">
        <div className="max-w-5xl mx-auto bg-white  rounded-lg p-6 space-y-4 ">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-6 top-0 h-16 w-2 bg-green-500 rounded-full hidden md:block"></div>

              <h1 className="text-3xl md:text-4xl font-bold text-green-800 font-serif mb-6 relative">
                About RDF
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-green-500 rounded-full mt-2"></div>
              </h1>

              <div className="bg-white p-6 md:p-8 rounded-2xl  border border-green-100">
                <p className="text-gray-700 text-lg md:text-lg leading-relaxed md:leading-loose">
                  Registered with the NGO Affairs Bureau and operating from its
                  Dhaka head office, the{" "}
                  <span className="font-semibold text-green-700">
                    Resource Development Foundation (RDF)
                  </span>{" "}
                  has been driving positive change across Bangladesh since 1995.
                  With a presence in{" "}
                  <span className="font-medium text-blue-600">
                    48 districts
                  </span>
                  , RDF maintains a strong focus on the vulnerable coastal
                  communities of the south. We dedicate our efforts to
                  empowering{" "}
                  <span className="font-medium text-pink-600">
                    women, girls, and children
                  </span>{" "}
                  through comprehensive and innovative programs in various
                  sectors. RDF is recognised for its expertise in designing and
                  executing development projects that synergise with national
                  government strategies and advance the{" "}
                  <span className="font-medium text-purple-600">
                    Sustainable Development Goals (SDGs)
                  </span>
                  .
                </p>

                {/* Visual divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-green-200"></div>
                  <span className="flex-shrink mx-4 text-green-500">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                    </svg>
                  </span>
                  <div className="flex-grow border-t border-green-200"></div>
                </div>

                {/* Key highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-700">28+</div>
                    <div className="text-sm text-green-600">
                      Years of Service
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-700">48</div>
                    <div className="text-sm text-blue-600">
                      Districts Covered
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-700">
                      SDGs
                    </div>
                    <div className="text-sm text-purple-600">
                      Focused Implementation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border-l-8 border-green-600 ">
              <h2 className="text-2xl font-bold text-green-600 font-serif force: pl-1 mb-2">
                Executive Summary
              </h2>
            </div>

            <div className="ml-5">
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
                  Social Development, Economic Empowerment, Resilience to
                  Climate Change and DRR, and Human Resources Capacity Building
                </span>{" "}
                components. During the year{" "}
                <span className="font-bold text-purple-600">2022–‘23</span>,
                RDF’s multifaceted programs were implemented in
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
                  poor, landless, marginal & small farmers, disadvantaged
                  families & communities
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
                (government and non-government) for providing responsive
                services to the disadvantaged people as both target people
                became aware of and demanding their entitlements.
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
                  Violence Against Women, Child Safeguarding, Rights to
                  Education
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
                <span className="text-purple-600 font-bold"> 420 schools</span>.
                A total of{" "}
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
                <span className="text-orange-700 font-bold">
                  ৳17,452,522
                </span>{" "}
                by June 2023.
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
                    <span className="font-bold text-green-600">2,599</span>{" "}
                    Solar Rooftop Systems
                  </li>
                  <li>
                    <span className="font-bold text-green-600">25,640</span>{" "}
                    Steel Ring-based Latrines
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
                <span className="text-blue-600 font-bold">
                  25,763 bighas
                </span>{" "}
                of land across 3 seasons, benefiting
                <span className="text-pink-700 font-bold">
                  10,198 farmers
                </span>{" "}
                with ongoing technical support in
                <span className="text-green-700 font-semibold">2022–23</span>.
              </p>
            </div>
          </div>

          <div className="mt-8 ">
            <h2 className="text-3xl font-bold text-green-700 font-serif mb-4">
              Message from Our Founder and Chief Executive Officer(CEO)
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

          <div className=" w-full   bg-gradient-to-b from-white to-blue-100  ">
            {/* Bottom Section - Group Image */}
            <div className="mt-1 flex justify-center">
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
