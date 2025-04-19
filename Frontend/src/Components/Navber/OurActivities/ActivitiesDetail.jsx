import React, { useEffect } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import { useLocation } from "react-router-dom";
import useRDFStore from "../../../storage/useRDFstorage";

const ActivitiesDetail = () => {
  const location = useLocation();
  const { activity } = location?.state || {};

  const { projects, fetchProjects } = useRDFStore();

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, [fetchProjects, projects.length]);

  const filteredProjects = projects.filter(
    (project) => project.activitiesID === activity?._id
  );

  return (
    <div>
      <PageCoverPhoto title={activity?.title || "Activity Details"} />
      <div className="overflow-x-auto p-4">
        <div className="bg-white p-6 rounded-lg  mb-6  mx-auto">
          <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
            Activity under our valuable projects
          </h2>
          {/* table goes here */}
        </div>

        <table className="min-w-full border border-blue-300 text-sm text-left rounded-lg overflow-hidden shadow-xl">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              {[
                "Project Name",
                "Project Location",
                "Key Intervention Area",
                "Date From",
                "Date To",
                "Benefited HHs",
                "Contract Value (BDT)",
                "Funding Agencies",
              ].map((header, index) => (
                <th
                  key={index}
                  className="border border-blue-300 px-4 py-2 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => {
                const benefitedHHs = project.directBeneficiaries
                  ? (Number(project.directBeneficiaries.male) || 0) +
                    (Number(project.directBeneficiaries.female) || 0)
                  : 0;

                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-blue-50" : "bg-white"
                    } hover:bg-blue-100 transition-colors`}
                  >
                    <td className="border border-blue-200 px-4 py-2">
                      <strong>{index + 1}.</strong> {project.name}
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      <ul className="list-disc ml-4">
                        {project.implementingAreas?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      <ul className="list-disc ml-4">
                        {project.majorInterventions?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      {project.startDate || "N/A"}
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      {project.endDate || "N/A"}
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      {benefitedHHs}
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      {project.budget ? project.budget.toLocaleString() : "N/A"}
                    </td>
                    <td className="border border-blue-200 px-4 py-2">
                      {project.donor || "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border border-blue-200 px-4 py-4 text-center bg-red-50 text-red-500 font-medium"
                >
                  No projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivitiesDetail;
