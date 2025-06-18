import React, { useEffect, useState } from "react";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";
import { FaDownload } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const AxiosSecure = useAxiosSecure();
  const fetchCertifications = async () => {
    try {
      const res = await AxiosSecure.get("/api/admin/certifications");
      setCertifications(res.data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);
  console.log(certifications);
  return (
    <div className="font-serif">
      <Helmet>
        <title> RDF-Certification </title>
      </Helmet>
      <PageCoverPhoto title={"Certifications"}></PageCoverPhoto>
      <div className=" mx-auto p-6 bg-green-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-green-500">
            RDF Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.filePath}
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
    </div>
  );
};

export default Certifications;
