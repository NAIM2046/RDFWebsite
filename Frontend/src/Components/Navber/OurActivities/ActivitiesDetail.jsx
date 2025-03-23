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
        <h2 className="text-lg font-semibold mb-2">
          Activity under our valuable projects
        </h2>
        <table className="min-w-full border border-gray-300 text-sm text-left shadow-2xl">
          <thead className="bg-gray-200">
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
                <th key={index} className="border px-4 py-2">
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
                  <tr key={index} className="border">
                    <td className="border px-4 py-2">
                      <strong>{index + 1}.</strong> {project.name}
                    </td>
                    <td className="border px-4 py-2">
                      <ul className="list-disc ml-4">
                        {project.implementingAreas?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">
                      <ul className="list-disc ml-4">
                        {project.majorInterventions?.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border px-4 py-2">
                      {project.startDate || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {project.endDate || "N/A"}
                    </td>
                    <td className="border px-4 py-2">{benefitedHHs}</td>
                    <td className="border px-4 py-2">
                      {project.budget ? project.budget.toLocaleString() : "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {project.donor || "N/A"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="border px-4 py-2 text-center">
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
