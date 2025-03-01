import React, { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosPublic from "../../Hook/useAxiosPublice";

const ProjectList = () => {
  const { fetchProjects, projects } = useRDFStore();
  const Axios = useAxiosPublic();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects();
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      Axios.delete(`/projects/${id}`)
        .then((res) => {
          console.log(res.data);
          fetchProjects(); // Refresh the list after deletion
        })
        .catch((err) => console.error(err));
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Project List</h2>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Search by Project Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Project List */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.donor}</p>
              </div>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
