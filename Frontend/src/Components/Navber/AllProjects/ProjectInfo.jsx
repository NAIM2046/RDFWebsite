import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaYoutube } from "react-icons/fa";
import { useState, useEffect } from "react";

const ProjectInfo = () => {
  const project = {
    id: 7,
    name: "Youth Digital Skills Training",
    programName: "wash",
    donor: "Tech Innovation Fund",
    budget: "9,500,000 BDT",
    startDate: "2024-03-01",
    endDate: "2025-12-31",
    projectState: "current",
    implementingAreas: "Dhaka, Comilla",
    directBeneficiaries: { male: 4000, female: 5000 },
    indirectBeneficiaries: { male: 15000, female: 18000 },
    projectGoal:
      "To empower women farmers by income-generating activities through gender equality, capacity building, market access and linkages, and sustainable agriculture.",
    majorInterventions: [
      "Empowering Women Farmers",
      "Income Generation",
      "Gender Equality",
      "Capacity Building",
      "Market Access and Linkages",
      "Sustainable Agriculture",
      "Food Security and Nutrition",
      "Community Development",
      "Women's Leadership and Participation",
      "Monitoring and Evaluation",
    ],
    projectResults:
      "Empowered 9885 women farmers through income-generating activities, gender equality, capacity building, market access, linkages, and sustainable agriculture.",
    projectCompletionReport:
      "Attached Project Final Report / Case Story / Study / Research",
    remarks: "Popular among students",
    coverImage: "/assets/rdfphoto1/DSC03050.JPG",
    images: [
      "/assets/rdfphoto2/IMG_20201231_111258.jpg",
      "/assets/rdfphoto2/IMG_20210308_181619.jpg",
    ],
    video: "https://www.youtube.com/embed/fZAeUuiV6q0",
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 text-gray-800">
      {/* Header Section */}
      <div className="text-center mt-20 md:mt-5">
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-gray-700 mt-2">
          <strong>Donor:</strong> {project.donor} | <strong>Budget:</strong>{" "}
          {project.budget}
        </p>
        <p className="text-gray-700">
          <strong>Duration:</strong> {project.startDate} - {project.endDate}
        </p>
      </div>

      {/* Image & Media Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Cover Image */}
        <div className="">
          <img
            src={project.coverImage}
            alt="Project Cover"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Additional Images & Video */}
        <div className="md:w-3/2">
          <div className="grid grid-cols-1 gap-2">
            {project.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Project ${index}`}
                className="rounded-lg shadow-md w-full object-cover"
              />
            ))}
          </div>
          <div className="mt-4">
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src={project.video}
              title="Project Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="mt-6 p-2 mx-auto max-w-6xl md:p-8">
        <p className="text-lg text-gray-700 font-medium">
          <strong>Project Goal:</strong>
          {project.projectGoal}
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Details */}
          <div>
            <p>
              <strong>Program:</strong> {project.programName}
            </p>
            <p>
              <strong>State:</strong> {project.projectState}
            </p>
            <p>
              <strong>Areas:</strong> {project.implementingAreas}
            </p>
            <p>
              <strong>Completion Report:</strong>{" "}
              {project.projectCompletionReport}
            </p>
            <p>
              <strong>Remarks:</strong> {project.remarks}
            </p>
          </div>

          {/* Beneficiaries */}
          <div>
            <p>
              <strong>Direct Beneficiaries:</strong> Male:{" "}
              {project.directBeneficiaries.male}, Female:{" "}
              {project.directBeneficiaries.female}
            </p>
            <p>
              <strong>Indirect Beneficiaries:</strong> Male:{" "}
              {project.indirectBeneficiaries.male}, Female:{" "}
              {project.indirectBeneficiaries.female}
            </p>
          </div>
        </div>

        {/* Major Interventions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Major Interventions
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {project.majorInterventions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Project Results */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Project Results
          </h2>
          <p className="text-gray-700">{project.projectResults}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
