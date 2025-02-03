import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import img from "/assets/vissionAndMission.webp";
import aboutImage from "/assets/photo-107.1-400x284.png";
import visionImage from "/assets/photo-110.1-400x284.png";
import missionImage from "/assets/photo-113-400x284.jpg";
import valuesImage from "/assets/photo-114-400x284.jpg";
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
      <div className="md:w-1/2 p-4">
        <div className="flex items-center mb-3">
          <img src={icon} alt="icon" className="w-10 h-10 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <div className="h-5 mt-4 ml-2 w-full bg-gradient-to-r from-green-400 to-blue-500 mb-4"></div>
        </div>

        <p className="text-gray-600 mt-2">{text}</p>
      </div>
      <div className="md:w-1/2 p-4">
        <img src={image} alt={title} className="rounded-lg shadow-md w-full" />
      </div>
    </div>
  );
};

const VisionMission = () => {
  return (
    <div>
      <PageCoverPhoto
        title="Our Mission"
        subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        imageUrl={img}
      />
      <div className="bg-gray-100 min-h-screen  ">
        <div className=" mx-auto bg-white shadow-lg rounded-2xl p-8">
          <Section
            icon={visionIcon}
            title="About RDF"
            text="RDF (Resource Development Foundation) is a nonprofit organization operating in 48 districts of Bangladesh. It was founded in response to the catastrophic cyclone of November 12, 1970, by a group of philanthropists. Over time, RDF has evolved into a formal organization, officially registered in 1995 with the Department of Social Services under the Ministry of Social Welfare of the Government of Bangladesh. RDF is committed to sustainable impact through transformation in education, healthcare, and economic development."
            image={aboutImage}
            reverse={false}
          />

          <Section
            icon={visionIcon}
            title="Vision"
            text="Our vision is to create a world where every individual has equal access to education, resources, and opportunities to build a prosperous future."
            image={visionImage}
            reverse={true}
          />

          <Section
            icon={missionIcon}
            title="Mission"
            text="We strive to empower underprivileged communities by providing quality education, healthcare services, and vocational training, fostering self-reliance and growth."
            image={missionImage}
            reverse={false}
          />

          <Section
            icon={valueIcon}
            title="Values"
            text="Empowerment: Enabling individuals to shape their own future. Integrity: Commitment to transparency and ethical practices. Inclusivity: Promoting equal opportunities for all. Sustainability: Developing long-term, impactful solutions."
            image={valuesImage}
            reverse={true}
          />
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
