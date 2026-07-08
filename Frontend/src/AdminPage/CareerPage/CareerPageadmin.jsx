import { useState, useEffect } from "react";
import {
  FiUpload,
  FiTrash2,
  FiFileText,
  FiImage,
  FiEdit,
  FiX,
  FiExternalLink
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const CareerPageadmin = () => {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("manage");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  
  const [careers, setCareers] = useState([]);
  const AxiosSecure = useAxiosSecure();

  const fetchLocalCareers = async () => {
    try {
      const response = await AxiosSecure.get("/career");
      setCareers(response.data);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };

  useEffect(() => {
    fetchLocalCareers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, file }));
    setFilePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      file: null,
    });
    setFilePreview(null);
    setIsEditMode(false);
    setEditingCareer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }

    if (!isEditMode && !formData.file) {
      toast.error("Please upload a file (PDF or Image)");
      return;
    }

    setIsUploading(true);

    const careerData = new FormData();
    careerData.append("title", formData.title);
    if (formData.file) {
      careerData.append("file", formData.file);
    }

    try {
      if (isEditMode && editingCareer) {
        await AxiosSecure.put(`/career/${editingCareer._id}`, careerData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Career posting updated successfully!");
      } else {
        await AxiosSecure.post("/career", careerData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Career posting added successfully!");
      }
      resetForm();
      fetchLocalCareers();
      setActiveTab("manage");
    } catch (error) {
      console.error("Error saving career posting:", error);
      toast.error(isEditMode ? "Failed to update career posting" : "Failed to add career posting");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (job) => {
    setEditingCareer(job);
    setIsEditMode(true);
    setFormData({
      title: job.title,
      file: null,
    });
    setFilePreview(null);
    setActiveTab("create");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this career posting?")) {
      try {
        await AxiosSecure.delete(`/career/${id}`);
        toast.success("Career posting deleted successfully!");
        fetchLocalCareers();
      } catch (error) {
        console.error("Error deleting career posting:", error);
        toast.error("Failed to delete career posting");
      }
    }
  };

  const cancelEdit = () => {
    resetForm();
    setActiveTab("manage");
  };

  // Helper to check if file is PDF
  const isPdf = (filename) => filename && filename.toLowerCase().endsWith(".pdf");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Career Management</h1>
        {isEditMode && (
          <button
            onClick={cancelEdit}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FiX className="mr-2" /> Cancel Edit
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "create"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("create")}
        >
          {isEditMode ? "Edit Career Posting" : "Add Career Posting"}
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Career Postings ({careers.length})
        </button>
      </div>

      {activeTab === "create" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Technical Officer - Education"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File (PDF or Image)* {isEditMode && "(Leave empty to keep existing file)"}
            </label>
            <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="file"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {filePreview && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected File Preview</h3>
              {formData.file && formData.file.type === "application/pdf" ? (
                <div className="flex items-center space-x-2 text-red-600 p-4">
                  <FiFileText size={36} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formData.file.name}</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </div>
              ) : (
                <img src={filePreview} alt="Preview" className="max-h-64 object-contain rounded border" />
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            {isEditMode && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : isEditMode ? "Update Career Posting" : "Add Career Posting"}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">All Career Postings</h2>
            <button
              onClick={() => {
                resetForm();
                setActiveTab("create");
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Add New Posting
            </button>
          </div>

          {careers.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No career postings</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new job vacancy posting.</p>
            </div>
          ) : (
            <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Job Posting
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      File Type
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 pr-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[...careers].sort((a, b) => b._id.localeCompare(a._id)).map((job) => (
                    <tr key={job._id}>
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-gray-400 text-xs">Uploaded on: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isPdf(job.file) ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {isPdf(job.file) ? (
                            <>
                              <FiFileText className="mr-1" /> PDF
                            </>
                          ) : (
                            <>
                              <FiImage className="mr-1" /> Image
                            </>
                          )}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-4">
                          <a
                            href={`http://localhost:3001${job.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiExternalLink className="mr-1" /> View File
                          </a>
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-amber-600 hover:text-amber-900 flex items-center"
                            title="Edit posting"
                          >
                            <FiEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <FiTrash2 className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerPageadmin;
