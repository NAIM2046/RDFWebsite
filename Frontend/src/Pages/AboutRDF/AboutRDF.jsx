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
        imgUrl={"/assets/aboutRdf/Coverphoto.JPG"}
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
                  The Resource Development Foundation (RDF) is a
                  non-governmental development organisation established in 1993,
                  with registrations from the Department of Social Welfare, the
                  NGO Affairs Bureau, the Department of Women Affairs, and the
                  Microcredit Regulatory Authority (MRA) under the Government of
                  the People’s Republic of Bangladesh. Since its inception, RDF
                  has been dedicated to serving the most vulnerable populations
                  of Bangladesh—people living in urban slums, remote rural
                  communities, coastal regions, and those displaced by climate
                  change. The organisation pays special attention to girls at
                  risk of early and child marriage, young women striving to
                  enter the labour market, and youth in both rural and urban
                  areas. Over the years, RDF has also built strong
                  collaborations with media, private sectors, civil society
                  networks, and government institutions at both local and
                  national levels.<br></br>
                  RDF adopts a holistic and interconnected development approach
                  through six major programme areas. These include strengthening
                  food security, promoting sustainable livelihoods, and
                  strengthening economic empowerment through initiatives such as
                  climate-smart agriculture, skills training, and
                  entrepreneurship support. At the same time, RDF advances
                  community resilience to climate change and disasters through
                  renewable energy, disaster risk reduction, and locally-led
                  solutions. The organisation also prioritises humanitarian
                  responses in times of crisis, with a focus on the unique needs
                  of women and children in coastal and disaster-prone regions.
                  Through its child rights and protection programme, RDF
                  promotes access to education, health, nutrition, sexual and
                  reproductive health and rights (SRHR), and works tirelessly to
                  end child marriage while fostering leadership and life skills
                  among adolescents. <br></br>
                  In addition, RDF strengthens access to safe water, sanitation,
                  and hygiene (WASH) services in underserved communities,
                  improving public health and reducing inequalities. Across all
                  its programmes, RDF is deeply committed to gender equality,
                  disability inclusion, and the empowerment of marginalised
                  groups. By mainstreaming these cross-cutting priorities, RDF
                  ensures that its interventions are impactful in the short term
                  and also sustainable, inclusive, and transformative for
                  generations to come. The organisation also maintains robust
                  policies and systems in finance, HR, administration,
                  logistics, and safeguarding, ensuring accountability,
                  transparency, and efficiency in its operations. <br></br>
                  RDF’s vision is closely aligned with Bangladesh’s national
                  development priorities, including the 8th Five-Year Plan, as
                  well as policies on education, skills, climate change, and
                  WASH. At the same time, its programmes contribute directly to
                  achieving the Sustainable Development Goals (SDGs), bridging
                  global aspirations with local realities. With over three
                  decades of experience and a strong reputation for partnership
                  and innovation, RDF continues to stand beside the most
                  vulnerable communities, working to create a just, resilient,
                  and inclusive Bangladesh.
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
                    <div className="text-3xl font-bold text-green-700">30+</div>
                    <div className="text-sm text-green-600">
                      Years of Service
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-700">21</div>
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

          {/* <div className="mt-8 ">
            <h2 className="text-3xl font-bold text-green-700 font-serif mb-4">
              Message from Our Founder and Chief Executive Officer(CEO)
            </h2>
            <FounderMessage></FounderMessage>
          </div> */}

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
                src="/assets/aboutRdf/bottomChildrenGroup.JPG"
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
