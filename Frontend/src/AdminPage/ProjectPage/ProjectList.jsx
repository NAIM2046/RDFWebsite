import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import { FaEdit, FaTrash, FaEye, FaSpinner } from "react-icons/fa";

const ProjectList = ({ onEdit }) => {
  const { fetchProjects, projects } = useRDFStore();
  const Axios = useAxiosSecure();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (projects.length === 0) {
      setLoading(true);
      fetchProjects().finally(() => setLoading(false));
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setDeletingId(id);
      Axios.delete(`/projects/${id}`)
        .then((res) => {
          console.log(res.data);
          fetchProjects(); // Refresh the list after deletion
        })
        .catch((err) => console.error(err))
        .finally(() => setDeletingId(null));
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Project List</h2>

      {/* Filter Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Project Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-sm text-gray-500 flex items-center">
          {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin text-2xl text-blue-500 mr-2" />
          <span>Loading projects...</span>
        </div>
      )}

      {/* Project List */}
      <div className="space-y-4">
        {!loading && filteredProjects.length > 0
          ? filteredProjects.map((project) => (
              <div
                key={project._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Donor:</span>{" "}
                        {project.donor || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            project.projectState === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.projectState}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Budget:</span>{" "}
                        {project.budget || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : "N/A"}{" "}
                        -{" "}
                        {project.endDate
                          ? new Date(project.endDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => onEdit(project)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors"
                      title="Edit Project"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deletingId === project._id}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors disabled:bg-red-300"
                      title="Delete Project"
                    >
                      {deletingId === project._id ? (
                        <FaSpinner className="animate-spin mr-1" />
                      ) : (
                        <FaTrash className="mr-1" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>

                {/* Project Summary Preview */}
                {project.projectSummary && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.projectSummary}
                    </p>
                  </div>
                )}
              </div>
            ))
          : !loading && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No projects found.</p>
                {filter && (
                  <p className="text-sm mt-2">
                    Try adjusting your search term or clear the search filter.
                  </p>
                )}
              </div>
            )}
      </div>
    </div>
  );
};

export default ProjectList;
