import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ceophoto from "/assets/HomePage/CEOPhoto.jpg";

const WhoWeAre = () => {
  const [open, setopen] = useState(false);

  return (
    <div className="bg-gray-50 mt-10">
      <motion.section
        className="flex flex-col lg:flex-row items-center justify-center lg:space-x-16 p-4 sm:p-6 md:p-8 lg:p-10"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Image Animation */}
        <motion.div
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96  mb-8 "
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="rounded-full border-4 border-green-500 overflow-hidden w-full h-full">
            <img
              src={ceophoto}
              alt="CEO"
              className="w-full h-full rounded-full p-3 sm:p-4 object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:top-60 md:right-37 lg:top-58 lg:right-60 rounded-full  ">
            <div className="p-1 sm:p-2 bg-white  rounded-full">
              <motion.div
                className="bg-green-600 text-white rounded-full shadow-lg flex flex-col justify-center items-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 p-2 "
                whileInView={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                  40+
                </span>
                <span className="text-xs sm:text-sm text-center font-serif">
                  In Experience
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Text Animation */}
        <motion.div
          className="w-full lg:w-1/2 text-gray-700 lg:mt-0 lg:ml-10 font-serif"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-green-500 mt-4 lg:mt-0 text-center lg:text-left">
            A Message From CEO
          </h2>
          <p className="mt-4 text-base sm:text-[18px] leading-relaxed">
            It is just two &amp; half decades since its inception in March 1993
            as a small organization in a remote area of the southern corner of
            Bangladesh, RDF has grown gradually and became one of the most
            successful development organizations in Bangladesh. This watershed
            moment therefore provides an opportunity to reflect on these last 28
            years and look ahead for the challenges that will confront us in the
            years ahead. The year 2022-23, RDF has restored its full energy and
            enthusiasm after the Covid-19 Global Pandemic situation. However,
            during the crisis, our team members were proactively present in the
            field. <br></br>
            RDF has revised and revisited its Strategic and Core Areas of
            Businesses and activities in the six program areas which are,
            (a)Food Security, Livelihood, Skills, and Economic Empowerment (b)
            Resilience to Climate Change &amp; Disaster Risk Reduction (c)
            Emergency Response (d) Child Rights, Ending Child Marriage,
            Education, Health, Nutrition, and Sexual and Reproductive Health
            Rights (SRHR) (e) Water, Sanitation, and Hygiene (WASH) (f)
            Cross-cutting programme: Gender Transformation, Disability Inclusion
            and Locally-led Initiatives .
          </p>

          {/* Read More Animation */}
          <motion.div
            className="flex flex-col mt-4"
            transition={{ type: "spring", stiffness: 300 }}
          >
            {open && (
              <p className="text-base sm:text-[18px] mt-2 leading-relaxed">
                It's our strong belief that with newly redevised thematic areas,
                RDF will be concentrating more to contribute to 10 (ten)
                different SDGs and other national and international commitments
                of the country. Moreover, RDF focus on Research activities,
                Social Development including renewable energy in the upcoming
                years. We are pledge-bound to continue our focus on exploring
                new horizons, embanking new commitments, emphasizing the new
                challenges, demands and opportunities. Let us move forward to
                contribute for achieving the national targets by 2030 and thus
                achieve the status of "developing country". I am thankful to our
                Executive Committee (EC) and management committee for their
                valued guidance and cooperation. Finally, I would like to thank
                all RDF, key personnel and employees of the organization for
                their restless efforts to sustain the trend of program
                activities. I do believe that, the Annual Report 2021-'22
                upholds the yearly facts &amp; figures of the organization's
                intervention to its valued stakeholders.
              </p>
            )}
            <button
              onClick={() => setopen(!open)}
              className="text-green-600 font-semibold underline mt-2 cursor-pointer text-start text-base sm:text-[18px]"
            >
              {open ? "Read Less" : "Read More..."}
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default WhoWeAre;
