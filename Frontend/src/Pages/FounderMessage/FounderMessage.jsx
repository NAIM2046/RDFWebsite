import React from "react";
import demonfounder from "/assets/CEOphoto/CEO Pic PP.jpg";
import tower from "/assets/RDF Photo/tower.jpg";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { Helmet } from "react-helmet-async";
const FounderMessage = () => {
  return (
    <div>
      <div>
        <div className="min-h-screen flex items-center justify-center ">
          <div className="max-w-7xl  space-x-4 rounded-2xl  md:flex">
            {/* Left Side - Founder Image */}
            <div className=" w-full md:w-1/3 flex flex-col justify-center items-center p-6 shadow-lg space-y-4 rounded-lg bg-white ">
              <img
                src={demonfounder} // Replace with your actual image path
                alt="Founder"
                className=" shadow-2xl rounded-xl "
              />
              <div>
                <p className="text-xl font-serif italic ">
                  RDF, established in 1993, has grown significantly. In 2022-23,
                  it revitalized efforts post-COVID, focusing on social
                  development, economic empowerment, climate resilience,
                  capacity building, and research to support national goals.
                </p>
                <div className="flex  flex-col justify-center items-center font-serif mt-2">
                  <p className="text-green-500 text-lg"> M Golam Mostofa </p>
                  <h3 className="font-semibold text-sm text-red-500">
                    Founder & Chief Executive officer
                  </h3>
                </div>
              </div>
              {/* <div className="w-full">
                <img
                  src={tower} // Replace with your actual image path
                  alt="Founder"
                  className=" shadow-2xl w-full object-cover "
                />
                <p className="text-center text-sm font-light">RDF TOWER</p>
              </div> */}
            </div>

            {/* Right Side - Founder Message */}
            <div className="md:w-2/3 p-6 flex flex-col rounded-lg  shadow-lg bg-white">
              <h2 className="text-2xl md:text-3xl font-bold text-green-400 text-center font-serif ">
                Message from Our Founder
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                It is just two & half decades since its inception in March 1993
                as a small organization in a remote area of the southern corner
                of Bangladesh, RDF has grown gradually and became one of the
                most successful development organizations in Bangladesh. This
                watershed moment therefore provides an opportunity to reflect on
                these last 28 years and look ahead for the challenges that will
                confront us in the years ahead. The year 2022-23, RDF has
                restored its full energy and enthusiasm after the Covid-19
                Global Pandemic situation. However, during the crisis, our team
                members were proactively present in the field. RDF has revised
                and revisited its Strategic and Core Areas of Businesses and
                activities in the four thematic areas which are, (a) Social
                Development, (b) Economic Empowerment, (c) Resilience to Climate
                Change and (d) Capacity Building, Green Energy Activities and
                Research. It is our strong belief that with newly redevised
                thematic areas, RDF will be concentrating more to contribute to
                10 (ten) different SDGs and other national and international
                commitments of the country. Moreover, RDF will also focus on
                Social Development Research activities including renewable
                energy in the upcoming years. We are pledge-bound to continue
                our focus on exploring new horizons, embanking new commitments,
                emphasizing the new challenges, demands and opportunities. Let
                us move forward to contribute to achieving the national targets
                by 2030 and thus achieve the status of “developing country”. I
                am thankful to our Executive Committee (EC) and management
                committee for their valued guidance and cooperation. Finally, I
                would like to thank all RDF employees for their restless efforts
                to sustain the trend of program activities. I do believe that
                the Annual Report 2021-’22 upholds the yearly facts & figures of
                the organization intervention to its valued stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderMessage;
