import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";

import ceophoto from "/assets/HomePage/CEOPhoto.jpg";

const AboutRDF = () => {
  const legalData = [
    {
      authority: "Department of Social Services",
      regNumber: "Barguna-91/95",
      regSince: "1995",
    },
    {
      authority: "NGO Affairs Bureau (NGOAB)",
      regNumber: "1069",
      regSince: "1996",
    },
    {
      authority: "Micro Credit Regulatory Authority (MRA)",
      regNumber: "MRA-00924-00476-00429",
      regSince: "2009",
    },
    {
      authority: "National Skills Development Authority (NSDA)",
      regNumber: "STP-BAR-001359",
      regSince: "2024",
    },
    {
      authority: "System for Award Management (SAM)",
      regNumber: "T3UDU311V6L3",
      regSince: "2024",
    },
  ];

  const affiliations = [
    {
      name: "IDCOL Partner Organizations’ Forum",
      acronym: "IDCOL-PO Forum",
      type: "Forum",
    },
    {
      name: "Association of Development Agencies in Bangladesh",
      acronym: "ADAB",
      type: "Association",
    },
    { name: "Credit and Development Forum", acronym: "CDF", type: "Forum" },
    {
      name: "NGO FORUM for Drinking Water and Sanitation",
      acronym: "NGO FORUM",
      type: "Forum",
    },
    {
      name: "Coastal Fisher-Folk Community Network",
      acronym: "COFCON",
      type: "Network",
    },
    { name: "Coastal NGO Forum", acronym: "CNF", type: "Forum" },
  ];

  const partners = [
    "World Bank",
    "JICA",
    "Bangladesh Bank",
    "GIZ",
    "CARE-Bangladesh",
    "OSI-USA",
    "BRRI",
    "BFRI",
    "BARC",
    "BARI",
  ];

  return (
    <div className="">
      <Helmet>
        <title>About Us | Resource Development Foundation (RDF)</title>
        <meta
          name="description"
          content="Discover the inspiring journey of Resource Development Foundation (RDF), founded by M Golam Mostofa. Learn about our impactful work in climate resilience, microfinance, and social development across Bangladesh."
        />
        <meta
          name="keywords"
          content="RDF Bangladesh, M Golam Mostofa, NGO Bangladesh, social development, climate resilience, microfinance, renewable energy"
        />
        <link rel="canonical" href="https://rdfbd.org/about-rdf" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            name: "Resource Development Foundation",
            alternateName: "RDF",
            url: "https://rdfbd.org",
            foundingDate: "1993",
            founder: {
              "@type": "Person",
              name: "M Golam Mostofa",
              jobTitle: "Founder & CEO",
            },
            description:
              "A pioneering NGO in Bangladesh working since 1993 on renewable energy, microfinance, and social development.",
          })}
        </script>
      </Helmet>

      <PageCoverPhoto
        title={"ABOUT RDF"}
        subtitle={"Empowering Communities, Transforming Lives Since 1993"}
        imageUrl={"/assets/aboutRdf/about.jpg"}
      />

      <div className="bg-gray-50 min-h-screen pt-10 pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-0 space-y-12">
          {/* Section 1: Intro & The Inspiring Journey (Timeline Format) */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 font-serif mb-4">
                Rising from the Ruins: The Founding Story of RDF
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg font-serif">
                What started as the determination of a young boy has now become one of Bangladesh's most impactful national development organizations.
              </p>
            </div>

            <div className="relative border-l-4 border-green-200 ml-4 md:ml-10 space-y-8 pb-4 text-left">
              {/* 1970 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-green-800">
                  1970: From Devastation to Determination: The Seeds of Change
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  On November 12, 1970, a devastating cyclone struck the southern coastal region of Bangladesh, obliterating lives, livelihoods, and mangrove forests. At just 10 years old, the founder, M. Golam Mostofa, witnessed this widespread destruction. The experience of helping neighbors recover bodies left a profound mark on the young boy, instilling in him a lifelong commitment to fighting against the frequent disasters that plagued the cyclone-prone coastal area.
                </p>
              </div>

              {/* 1971 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[14px] top-1 w-6 h-6 bg-teal-500 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-green-800">
                  1971: A Young Witness to the Fight for Freedom (Independence War)
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  During the 1971 War of Independence, at the age of 11, Mostofa observed further destruction across the region. By sheltering freedom fighters in his home, he deepened his commitment to serving the people of his birthplace who were frequently affected by crisis.
                </p>
              </div>

              {/* 1972-1977 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[14px] top-1 w-6 h-6 bg-cyan-500 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-blue-800">
                  1972-1977: Building Foundations through Community Action
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  Throughout his high school years, Mostofa balanced his academic studies with dedicated community work. Alongside young friends and neighbors, he worked to improve local rural communication and infrastructure in his remote home area.
                </p>
              </div>

              {/* 1978-1985 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[14px] top-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-blue-800">
                  1978-1985: Academic Success Fueling a Future Vision
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  As he progressed through his secondary education, higher secondary schooling, and earned his Honors and Master’s degrees in Economics from Jahangirnagar University, Mostofa maintained his vision. During this time, he operated a business, accumulating the capital necessary to fulfill the commitments he made in 1970 and 1971.
                </p>
              </div>

              {/* 1985-1996 */}
              <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[14px] top-1 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white shadow"></div>
                <h3 className="text-xl font-bold text-indigo-800">
                  1985-1992 and 1993-1996: Scaling Impact: The Birth of a National Powerhouse
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  Mostofa utilized the wealth earned during his student years to fund social development activities in his home district of Barguna. After securing registration from the Department of Social Services (DSS) and the NGO Affairs Bureau, he received his first financial support from the Royal Danish Embassy (DANIDA), allowing him to expand his social development work through foreign funding. Today, this initiative has grown into RDF, a national wide devleopment organization in Bangladesh.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Interventions (What we do) */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-green-800 font-serif mb-8 text-center">
              Our Core Areas of Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="p-6 bg-green-50/50 rounded-xl border border-green-100">
                <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span>🌱</span> Agriculture & Food Security
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  We believe that without agricultural growth, comprehensive
                  development is impossible. We integrate conventional
                  micro-credit with modern technology to boost crops, livestock,
                  and fisheries.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>
                    <strong>Innovation:</strong> Introduced Solar Irrigation
                    Pumping Systems (SIPS).
                  </li>
                  <li>
                    <strong>Goal:</strong> Mitigating food crisis and supporting
                    GoB in reducing food deficiency.
                  </li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span>☀️</span> Renewable Energy Pioneers
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  RDF has established a massive brand image in the green energy
                  sector by utilizing state-of-the-art technology to solve power
                  crises in rural areas.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>
                    Installed <strong>157</strong> Solar Irrigation Pumping
                    Systems.
                  </li>
                  <li>
                    Distributed <strong>56,410</strong> Scientific Burners (ICS)
                    to rural households.
                  </li>
                  <li>
                    Set up <strong>175</strong> Off-grid Rooftop Solar projects.
                  </li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="p-6 bg-yellow-50/50 rounded-xl border border-yellow-100">
                <h3 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <span>💰</span> Microfinance & Entrepreneurship
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Beyond standard loans, we provide holistic financial support
                  to ensure long-term economic stability and entrepreneurship
                  growth.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>Life insurance and future savings for beneficiaries.</li>
                  <li>Entrepreneurship Development Scheme (EDSc) for SMEs.</li>
                  <li>
                    Green Resource Mobilization through Bangladesh Bank
                    refinancing.
                  </li>
                </ul>
              </div>

              {/* Card 4 */}
              <div className="p-6 bg-purple-50/50 rounded-xl border border-purple-100">
                <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
                  <span>🤝</span> Social & Human Development
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Our vision extends to building a just, educated, and healthy
                  society, ready to tackle future challenges and climate
                  disasters.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                  <li>Child & Adult Education, Health & WASH awareness.</li>
                  <li>Protection of indigenous rights (Rakhaign Community).</li>
                  <li>
                    Post-disaster relief, small house building, and ending
                    Violence Against Women (VAW).
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Message from the Founder */}
          <div className="bg-white rounded-2xl p-8 md:p-12 lg:p-16 border border-gray-100 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Side: Professional Profile Image */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200 rounded-full blur-lg opacity-40 scale-110"></div>
                  <img
                    src={ceophoto}
                    alt="M Golam Mostofa, Founder"
                    className="relative object-cover rounded-full w-48 h-48 md:w-64 md:h-64 ring-4 ring-white shadow-lg border border-gray-100"
                  />
                </div>
              </div>

              {/* Right Side: Editorial Text Section */}
              <div className="w-full lg:w-7/12 relative">
                <svg
                  className="w-12 h-12 text-green-200 mb-6"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <p className="text-xl md:text-2xl text-slate-700 font-serif italic leading-relaxed">
                  RDF, established in March 1993, has grown from a small
                  organization in a remote area to one of the most significant
                  development organizations in Bangladesh. We are pledge-bound
                  to explore new horizons and continue focusing on social
                  development, economic empowerment, and climate resilience to
                  contribute to national and international goals.
                </p>

                <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 font-serif">
                      M Golam Mostofa
                    </h4>
                    <p className="text-sm tracking-widest text-green-700 uppercase mt-1.5 font-bold">
                      Founder & Chief Executive Officer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Networks & Partners */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 font-serif mb-8 text-center">
              Our Trusted Partners & Networks
            </h2>

            <div className="mb-10">
              <p className="text-center text-gray-600 mb-6">
                We collaborate with renowned national and international
                organizations to maximize our impact:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {partners.map((partner, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-50 hover:border-green-300 transition cursor-default"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 border-t border-gray-100">
              {/* Legal Registrations */}
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span>📜</span> Legal Status & Registrations
                </h3>
                <div className="space-y-3">
                  {legalData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm border-b border-gray-100 pb-2"
                    >
                      <span className="text-gray-700 font-medium">
                        {item.authority}
                      </span>
                      <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded text-xs whitespace-nowrap">
                        Since {item.regSince}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Affiliations */}
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span>🔗</span> Key Affiliations
                </h3>
                <div className="space-y-3">
                  {affiliations.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm border-b border-gray-100 pb-2"
                    >
                      <span className="text-gray-700 font-medium">
                        {item.name}
                      </span>
                      <span className="text-green-600 font-bold text-xs whitespace-nowrap ml-4">
                        {item.acronym}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Image Area */}
          <div className="w-full rounded-2xl overflow-hidden shadow-md">
            <img
              src="/assets/aboutRdf/bottomChildrenGroup.JPG"
              alt="RDF's commitment to community and child development"
              className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRDF;
