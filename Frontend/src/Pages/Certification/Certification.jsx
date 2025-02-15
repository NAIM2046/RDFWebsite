import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

const certifications = [
  {
    name: "Department of Social Service Certificate",
    link: "/assets/RDF-Annual-Report-2022-23.pdf",
  },
  { name: "NGO Affairs Bureau Certificate", link: "#" },
  { name: "Microcredit Regulatory Authority (MRA) Certificate", link: "#" },
  { name: "BTEB Certificate", link: "#" },
  { name: "Copyright Registration Certificate", link: "#" },
  {
    name: "National Skills Development Authority (NSDA) Certificate",
    link: "#",
  },
  { name: "Income Tax Certificate 2023-2024", link: "#" },
];

const Certifications = () => {
  return (
    <div>
      <PageCoverPhoto
        imageUrl={`/assets/RDF Photo/DJI_0161.JPG`}
        title={"Certifications"}
      ></PageCoverPhoto>
      <div className="max-w-7xl mx-auto p-6 ">
        <h2 className="text-3xl font-bold text-center mb-6">
          NGO Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 "
            >
              <span className="text-2xl font-poppins  font-medium">
                {cert.name}
              </span>
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer">
                  ⬇️ Download
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
