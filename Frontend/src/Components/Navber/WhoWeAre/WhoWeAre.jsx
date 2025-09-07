import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ceophoto from "/assets/HomePage/CEOPhoto.jpg";
const WhoWeAre = () => {
  const [open, setopen] = useState(false);
  return (
    <div className="bg-gray-50 mt-10">
      {/* Title Animation */}
      {/* <motion.h1
        className="text-4xl font-bold text-black text-center font-serif"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }} // Animates once when in view
      >
        Who We Are
      </motion.h1> */}

      <motion.section
        className="flex flex-col lg:flex-row items-center justify-center space-x-16 p-10  "
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Image Animation */}
        <motion.div
          className="relative w-96 h-96 pl-10"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="rounded-full border-3 border-green-500 overflow-hidden w-96 h-96 ">
            <img
              src={ceophoto}
              alt="CEO"
              className="w-full h-full rounded-full p-4 object-cover"
            />
          </div>

          <div className="absolute top-60 right-40 md:top-55 md:right-45 rounded-full border-2 border-red-600">
            <div className="p-2 bg-white rounded-full">
              <motion.div
                className="bg-green-600 text-white rounded-full shadow-lg flex flex-col justify-center items-center w-48 h-48 p-2"
                whileInView={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl font-bold">40+</span>
                <span className="text-sm text-center font-serif">
                  In Experience
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Text Animation */}
        <motion.div
          className="lg:w-1/2 text-gray-700 lg:mt-0 lg:ml-10 font-serif"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-green-500 mt-20 md:mt-0 ">
            A Message From CEO
          </h2>
          <p className="mt-4 text-[18px]">
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
            className="flex  flex-col mt-4"
            transition={{ type: "spring", stiffness: 300 }}
          >
            {open && (
              <p className="text-[18px] mt-2">
                It’s our strong belief that with newly redevised thematic areas,
                RDF will be concentrating more to contribute to 10 (ten)
                different SDGs and other national and international commitments
                of the country. Moreover, RDF focus on Research activities,
                Social Development including renewable energy in the upcoming
                years. We are pledge-bound to continue our focus on exploring
                new horizons, embanking new commitments, emphasizing the new
                challenges, demands and opportunities. Let us move forward to
                contribute for achieving the national targets by 2030 and thus
                achieve the status of “developing country”. I am thankful to our
                Executive Committee (EC) and management committee for their
                valued guidance and cooperation. Finally, I would like to thank
                all RDF, key personnel and employees of the organization for
                their restless efforts to sustain the trend of program
                activities. I do believe that, the Annual Report 2021-’22
                upholds the yearly facts &amp; figures of the organization’s
                intervention to its valued stakeholders.
              </p>
            )}
            <button
              onClick={() => setopen(!open)}
              className="text-green-600 font-semibold underline mt-2 cursor-pointer text-start"
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
