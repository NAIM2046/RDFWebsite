import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import img from "/assets/vissionAndMission.webp";
import aboutImage from "/assets/photo-107.1-400x284.png";
import visionImage from "/assets/photo-110.1-400x284.png";
import missionImage from "/assets/photo-113-400x284.jpg";
import valuesImage from "/assets/6-circle-value9999s.jpg";
import visionIcon from "/assets/vission.jpg";
import missionIcon from "/assets/mission.jpg";
import valueIcon from "/assets/value-1.jpg";

const Section = ({ icon, title, text, image, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center mb-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Text Section */}
      <div className="md:w-1/2 p-6 md:p-8">
        <div className="flex items-center mb-3">
          <img src={icon} alt="icon" className="w-12 h-12 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-blue-500 mb-4"></div>
        <p className="text-gray-600 leading-relaxed">{text}</p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 p-6">
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-md w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

const VisionMission = () => {
  return (
    <div>
      {/* Page Cover */}
      <PageCoverPhoto
        title="Our Mission"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={img}
      />

      {/* Main Content */}
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          {/* About Section */}
          <Section
            icon={visionIcon}
            title="About RDF"
            text="RDF (Resource Development Foundation) is a nonprofit organization operating in 48 districts of Bangladesh. It was founded in response to the catastrophic cyclone of November 12, 1970, by a group of philanthropists. Over time, RDF has evolved into a formal organization, officially registered in 1995 with the Department of Social Services under the Ministry of Social Welfare of the Government of Bangladesh. RDF is committed to sustainable impact through transformation in education, healthcare, and economic development."
            image={aboutImage}
            reverse={false}
          />

          {/* Vision Section */}
          <Section
            icon={visionIcon}
            title="Vision"
            text="Our vision is to create a world where every individual has equal access to education, resources, and opportunities to build a prosperous future."
            image={visionImage}
            reverse={true}
          />

          {/* Mission Section */}
          <Section
            icon={missionIcon}
            title="Mission"
            text="We strive to empower underprivileged communities by providing quality education, healthcare services, and vocational training, fostering self-reliance and growth."
            image={missionImage}
            reverse={false}
          />

          {/* Values Section */}
          <Section
            icon={valueIcon}
            title="Values"
            text="Empowerment: Enabling individuals to shape their own future. Integrity: Commitment to transparency and ethical practices. Inclusivity: Promoting equal opportunities for all. Sustainability: Developing long-term, impactful solutions."
            image={valuesImage}
            reverse={true}
          />
        </div>

        {/* Vision 2030 Section */}
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Vision 2030
            </h1>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              RDF’s shared vision for the future
            </h3>
            <p className="text-gray-700 leading-relaxed">
              RDF's Vision 2030 aims to create a sustainable future by
              integrating community-driven initiatives in education, healthcare,
              and economic development. By focusing on gender equality, resource
              allocation, and humanitarian aid, we strive to build a society
              where everyone has equal opportunities to thrive. Through a set of
              agreed goals based on SDGs, employing a theory of change derived
              from our years of experience, and proper utilization of resources,
              we will systematically move towards fulfilling this vision
              collectively.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 p-6">
            <img
              src="/assets/care-2030.png"
              alt="care img"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
