import React from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { FaDownload } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const certifications = [
  {
    name: "Department of Social Service Certificate",
    link: "/assets/RDF-Annual-Report-2022-23.pdf",
  },
  {
    name: "NGO Affairs Bureau Certificate",
    link: "/assets/CertiRDF/1.jpg",
  },
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
    <div className="font-serif">
      <Helmet>
        <title> RDF-Certification </title>
      </Helmet>
      <PageCoverPhoto title={"Certifications"}></PageCoverPhoto>
      <div className="max-w-7xl mx-auto p-6 ">
        <h2 className="text-3xl font-bold text-center mb-6">
          RDF Certifications
        </h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center bg-white shadow-lg shadow-gray-300 rounded-lg p-4 pr-8 transition-transform transform hover:scale-101 "
            >
              <span className="text-2xl font-poppins  font-medium">
                {cert.name}
              </span>

              <FaDownload className="text-3xl text-green-600" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
