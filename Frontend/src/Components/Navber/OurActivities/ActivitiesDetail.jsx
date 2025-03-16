import React, { useEffect } from "react";
import PageCoverPhoto from "../PageCoverPhoto/PageCoverPhoto";
import { useLocation } from "react-router-dom";
import useRDFStore from "../../../storage/useRDFstorage";

const ActivitiesDetail = () => {
  const location = useLocation();
  const { activity } = location?.state;
  console.log(activity);
  const { projects, fetchProjects } = useRDFStore();
  console.log(projects);
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, []);
  const filteredProjects = projects
    ? projects.filter((project) => project.activitiesID === activity?._id)
    : [];

  return (
    <div className="">
      <PageCoverPhoto title={activity.title}></PageCoverPhoto>
      <div>
        <div className="overflow-x-auto p-4 ">
          <h2>Activity upder our valuable project</h2>
          <table className="min-w-full border border-gray-300 text-sm text-left shadow-2xl">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Project Name</th>
                <th className="border px-4 py-2">Project Location</th>
                <th className="border px-4 py-2">Key Intervention Area</th>
                <th className="border px-4 py-2">Date From</th>
                <th className="border px-4 py-2">Date To</th>
                <th className="border px-4 py-2">Benefited HHs</th>
                <th className="border px-4 py-2">Contract Value (BDT)</th>
                <th className="border px-4 py-2">Funding Agencies</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <tr key={index} className="border">
                    <td className="border px-4 py-2">
                      {" "}
                      <strong>{index + 1}.</strong> {project.name}
                    </td>
                    <td className="border px-4 py-2">
                      {" "}
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
                    <td className="border px-4 py-2">{project.startDate}</td>
                    <td className="border px-4 py-2">{project.endDate}</td>
                    <td className="border px-4 py-2">
                      {project.directBeneficiaries
                        ? parseInt(project.directBeneficiaries.male || 0, 10) +
                          parseInt(project.directBeneficiaries.female || 0, 10)
                        : 0}
                    </td>
                    <td className="border px-4 py-2">{project.budget}</td>
                    <td className="border px-4 py-2">{project.donor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="border px-4 py-2 text-center">
                    No projects available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDetail;
