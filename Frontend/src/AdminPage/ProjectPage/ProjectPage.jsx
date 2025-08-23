import { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import ProjectList from "./ProjectList";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import {
  FaSpinner,
  FaTrash,
  FaCheckCircle,
  FaTimes,
  FaEdit,
} from "react-icons/fa";

const ProjectPage = () => {
  const {
    programs,
    fetchPrograms,
    fetchProjects,
    fetchActivites,
    activities,
    projects,
  } = useRDFStore();
  const Axios = useAxiosSecure();

  const [imgLoading, setImgLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [project, setProject] = useState({
    name: "",
    programName: "",
    donor: "",
    budget: "",
    startDate: "",
    endDate: "",
    projectState: "",
    implementingAreas: "",
    directBeneficiaries: { male: "", female: "" },
    indirectBeneficiaries: { male: "", female: "" },
    projectGoal: "",
    majorInterventions: [],
    projectResults: "",
    projectCompletionReport: "",
    remarks: "",
    images: [],
    video: "",
    activitiesID: "",
    projectSummary: "",
  });

  useEffect(() => {
    if (programs.length === 0) fetchPrograms();
    if (activities.length === 0) fetchActivites();
    if (projects.length === 0) fetchProjects();
  }, [
    fetchPrograms,
    fetchActivites,
    fetchProjects,
    programs.length,
    activities.length,
    projects.length,
  ]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ ...notification, show: false }), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "majorInterventions" || name === "implementingAreas") {
      setProject({
        ...project,
        [name]: value ? value.split(",").map((item) => item.trim()) : [],
      });
    } else if (
      name.includes("directBeneficiaries") ||
      name.includes("indirectBeneficiaries")
    ) {
      const [key, gender] = name.split(".");
      setProject({
        ...project,
        [key]: { ...project[key], [gender]: value },
      });
    } else {
      setProject({ ...project, [name]: value });
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleUploadImages = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setImgLoading(true);
    try {
      const uploadedUrls = await Promise.all(
        [...files].map(async (file) => await uploadImageToImgbb(file))
      );
      setProject((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls.filter((url) => url)],
      }));
      showNotification("success", "Images uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      showNotification("error", "Failed to upload images");
    } finally {
      setImgLoading(false);
    }
  };

  const removeImage = (index) => {
    setProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!project.name.trim()) newErrors.name = "Project name is required";
    if (!project.programName)
      newErrors.programName = "Program selection is required";
    if (!project.startDate) newErrors.startDate = "Start date is required";

    if (!project.projectState)
      newErrors.projectState = "Project state is required";
    if (project.images.length === 0)
      newErrors.images = "At least one image is required";
    if (!project.activitiesID)
      newErrors.activitiesID = "Activity selection is required";

    // Date validation
    if (
      project.startDate &&
      project.endDate &&
      project.startDate > project.endDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let response;
      if (isEditing) {
        // Update existing project
        response = await Axios.put(`/projects/${editingId}`, project);
        if (response.data.modifiedCount > 0) {
          showNotification("success", "Project updated successfully!");
          fetchProjects();
          resetForm();
        } else {
          throw new Error("Failed to update project");
        }
      } else {
        // Create new project
        response = await Axios.post("/projects", project);
        if (response.data.insertedId) {
          showNotification("success", "Project added successfully!");
          fetchProjects();
          resetForm();
        } else {
          throw new Error("Failed to add project");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      showNotification(
        "error",
        isEditing ? "Failed to update project" : "Failed to add project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProject({
      name: "",
      programName: "",
      donor: "",
      budget: "",
      startDate: "",
      endDate: "",
      projectState: "",
      implementingAreas: "",
      directBeneficiaries: { male: "", female: "" },
      indirectBeneficiaries: { male: "", female: "" },
      projectGoal: "",
      majorInterventions: [],
      projectResults: "",
      projectCompletionReport: "",
      remarks: "",
      images: [],
      video: "",
      activitiesID: "",
      projectSummary: "",
    });
    setErrors({});
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (projectToEdit) => {
    setProject({
      name: projectToEdit.name || "",
      programName: projectToEdit.programName || "",
      donor: projectToEdit.donor || "",
      budget: projectToEdit.budget || "",
      startDate: projectToEdit.startDate
        ? projectToEdit.startDate.split("T")[0]
        : "",
      endDate: projectToEdit.endDate ? projectToEdit.endDate.split("T")[0] : "",
      projectState: projectToEdit.projectState || "",
      implementingAreas: projectToEdit.implementingAreas || "",
      directBeneficiaries: projectToEdit.directBeneficiaries || {
        male: "",
        female: "",
      },
      indirectBeneficiaries: projectToEdit.indirectBeneficiaries || {
        male: "",
        female: "",
      },
      projectGoal: projectToEdit.projectGoal || "",
      majorInterventions: projectToEdit.majorInterventions || [],
      projectResults: projectToEdit.projectResults || "",
      projectCompletionReport: projectToEdit.projectCompletionReport || "",
      remarks: projectToEdit.remarks || "",
      images: projectToEdit.images || [],
      video: projectToEdit.video || "",
      activitiesID: projectToEdit.activitiesID || "",
      projectSummary: projectToEdit.projectSummary || "",
    });
    setIsEditing(true);
    setEditingId(projectToEdit._id);

    // Scroll to form
    document
      .getElementById("project-form")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <FaCheckCircle className="mr-2" />
          ) : (
            <FaTimes className="mr-2" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div id="project-form" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>

        {isEditing && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-700 flex items-center">
              <FaEdit className="mr-2" />
              You are editing an existing project. Click "Cancel Edit" to stop
              editing.
            </p>
            <button
              onClick={resetForm}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program *
                </label>
                <select
                  name="programName"
                  value={project.programName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.programName ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a Program</option>
                  {programs.map((program) => (
                    <option key={program._id} value={program._id}>
                      {program.title}
                    </option>
                  ))}
                </select>
                {errors.programName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.programName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Donor
                </label>
                <input
                  type="text"
                  name="donor"
                  value={project.donor}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter donor name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget
                </label>
                <input
                  type="text"
                  name="budget"
                  value={project.budget}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter budget amount"
                />
              </div>
            </div>

            {/* Project Dates */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={project.endDate}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project State *
                </label>
                <select
                  name="projectState"
                  value={project.projectState}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.projectState ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Project State</option>
                  <option value="Current">Current</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.projectState && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectState}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity *
                </label>
                <select
                  name="activitiesID"
                  value={project.activitiesID}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.activitiesID ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select an Activity</option>
                  {activities.map((activity) => (
                    <option key={activity._id} value={activity._id}>
                      {activity.title}
                    </option>
                  ))}
                </select>
                {errors.activitiesID && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.activitiesID}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Goal
              </label>
              <textarea
                name="projectGoal"
                value={project.projectGoal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe the project goal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Summary
              </label>
              <textarea
                name="projectSummary"
                value={project.projectSummary}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Provide a project summary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Major Interventions
              </label>
              <input
                type="text"
                name="majorInterventions"
                value={project.majorInterventions.join(", ")}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter major interventions (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Results
              </label>
              <textarea
                name="projectResults"
                value={project.projectResults}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe project results"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Implementing Areas
              </label>
              <input
                type="text"
                name="implementingAreas"
                value={project.implementingAreas}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter implementing areas (comma separated)"
              />
            </div>
          </div>

          {/* Beneficiaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Direct Beneficiaries
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Male
                </label>
                <input
                  type="text"
                  name="directBeneficiaries.male"
                  value={project.directBeneficiaries.male}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Female
                </label>
                <input
                  type="text"
                  name="directBeneficiaries.female"
                  value={project.directBeneficiaries.female}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Indirect Beneficiaries
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Male
                </label>
                <input
                  type="text"
                  name="indirectBeneficiaries.male"
                  value={project.indirectBeneficiaries.male}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Female
                </label>
                <input
                  type="text"
                  name="indirectBeneficiaries.female"
                  value={project.indirectBeneficiaries.female}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Images *
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleUploadImages}
                    className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleUploadImages}
                  disabled={imgLoading}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {imgLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Images"
                  )}
                </button>
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-600">{errors.images}</p>
              )}
              {project.images.length > 0 && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {project.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Project ${index}`}
                          className="w-full h-24 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Video ID
              </label>
              <input
                type="text"
                name="video"
                value={project.video}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter YouTube video ID"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: For "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                enter "dQw4w9WgXcQ"
              </p>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={project.remarks}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter any remarks"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed font-medium flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  {isEditing ? "Updating..." : "Submitting..."}
                </>
              ) : isEditing ? (
                "Update Project"
              ) : (
                "Add Project"
              )}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Project List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Project List</h2>
        <ProjectList onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default ProjectPage;
