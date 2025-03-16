import { useEffect, useState } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import ProjectList from "./ProjectList";
import useAxiosSecure from "../../Hook/useAxoisSecure";
const ProjectPage = () => {
  const { programs, fetchPrograms, fetchProjects, fetchActivites, activities } =
    useRDFStore();
  const Axios = useAxiosSecure();
  useEffect(() => {
    if (programs.length === 0) {
      fetchPrograms();
    }
    if (activities.length === 0) {
      fetchActivites();
    }
  }, []);

  const [imgLoading, setImgLoading] = useState(false);

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "majorInterventions" ||
      name === "images" ||
      name === "implementingAreas"
    ) {
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
  };
  //   const handleUploadCoverImg = async (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setImgLoading(true); // Start loading
  //       try {
  //         const imageUrl = await uploadImageToImgbb(file);
  //         setProject({ ...project, coverImage: imageUrl });
  //       } catch (error) {
  //         console.error("Image upload failed:", error);
  //       } finally {
  //         setImgLoading(false); // Stop loading
  //       }
  //     }
  //   };
  const handleUploadImages = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImgLoading(true);
      try {
        const uploadedUrls = await Promise.all(
          [...files].map(async (file) => {
            return await uploadImageToImgbb(file);
          })
        );
        setProject((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setImgLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Project: ", project);
    Axios.post("/projects", project)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          alert("project add sucessfully");
          fetchProjects();
        } else {
          alert("project add failed");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });

    // Submit logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={project.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="programName"
          value={project.programName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a Program</option>
          {programs.map((program) => (
            <option key={program._id} value={program._id}>
              {program.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="donor"
          placeholder="Donor"
          value={project.donor}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={project.budget}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="projectState"
          value={project.projectState}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Project State</option>
          <option value="Current">Current</option>
          <option value="Ended">Ended</option>
        </select>
        <textarea
          name="projectGoal"
          placeholder="Project Goal"
          value={project.projectGoal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="text"
          name="majorInterventions"
          placeholder="Major Interventions (comma separated)"
          value={project.majorInterventions.join(", ")}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="projectResults"
          placeholder="Project Results"
          value={project.projectResults}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        {/* <div className="flex space-x-2 items-center">
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleUploadCoverImg}
            placeholder="upload cover image"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
            disabled={imgLoading}
          >
            {imgLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {imgLoading && <p className="text-blue-500">Uploading Image...</p>}
        {project.coverImage && (
          <img
            src={project.coverImage}
            alt="Cover"
            className="w-32 h-32 mt-2 rounded"
          />
        )} */}
        <div className="flex space-x-2 items-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadImages}
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
            disabled={imgLoading}
          >
            {imgLoading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
        {imgLoading && <p className="text-blue-500">Uploading Images...</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index}`}
              className="w-20 h-20 rounded"
            />
          ))}
        </div>

        <input
          type="text"
          name="video"
          placeholder="Youtube video id"
          value={project.video}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="implementingAreas"
          placeholder="Implementing Areas (comma separated)"
          value={project.implementingAreas}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="directBeneficiaries.male"
          placeholder="Direct Beneficiaries Male"
          value={project.directBeneficiaries.male}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="directBeneficiaries.female"
          placeholder="Direct Beneficiaries Female"
          value={project.directBeneficiaries.female}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="indirectBeneficiaries.male"
          placeholder="Indirect Beneficiaries Male"
          value={project.indirectBeneficiaries.male}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="indirectBeneficiaries.female"
          placeholder="Indirect Beneficiaries Female"
          value={project.indirectBeneficiaries.female}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="remarks"
          placeholder="Remarks"
          value={project.remarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <select
          name="activitiesID"
          value={project.activitiesID}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select an Activity</option>
          {activities.map((activity) => (
            <option key={activity._id} value={activity._id}>
              {activity.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      <div>
        <ProjectList></ProjectList>
      </div>
    </div>
  );
};

export default ProjectPage;
