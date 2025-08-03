import React, { useState, useEffect } from "react";
import {
  FiUpload,
  FiTrash2,
  FiFileText,
  FiDownload,
  FiPlus,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const PolicyDocPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    file: null,
  });
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [policies, setPolicies] = useState([]);

  const AxiosSecure = useAxiosSecure();

  const fetchPolicies = async () => {
    try {
      const res = await AxiosSecure.get("/api/admin/policies");
      setPolicies(res.data);
    } catch (error) {
      console.error("Error fetching policies", error);
      toast.error("Failed to load policies");
    }
  };

  useEffect(() => {
    fetchPolicies();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.file) {
      toast.error("Please provide both policy name and file");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("pdf", formData.file);

    try {
      setIsUploading(true);
      await AxiosSecure.post("/api/admin/policy-upload", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Policy uploaded successfully!");
      resetForm();
      fetchPolicies();
      setActiveTab("manage");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload policy");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        await AxiosSecure.delete(`/api/admin/policies/${id}`);
        toast.success("Policy deleted successfully!");
        fetchPolicies();
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete policy");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      file: null,
    });
    setFilePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Policy Document Management
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "upload"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload Policy
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Policies ({policies.length})
        </button>
      </div>

      {activeTab === "upload" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Privacy Policy 2023"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Document (PDF)*
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {filePreview ? (
                  <div className="flex flex-col items-center">
                    <FiFileText className="mx-auto h-12 w-12 text-blue-500" />
                    <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">
                      {formData.file.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, file: null }));
                        setFilePreview(null);
                      }}
                      className="mt-2 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload PDF</span>
                        <input
                          type="file"
                          name="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!formData.name || !formData.file || isUploading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Policy"}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              All Policy Documents
            </h2>
            <button
              onClick={() => setActiveTab("upload")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              <FiPlus className="mr-1" /> Add New
            </button>
          </div>

          {policies.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No policies available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your first policy document to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Policy
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Upload Date
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {policies.map((policy) => (
                    <tr key={policy._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                            <FiFileText className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {policy.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(policy.createdAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-4">
                          <a
                            href={`${`http://localhost:3001`}${
                              policy.filePath
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiDownload className="mr-1" /> Download
                          </a>
                          <button
                            onClick={() => handleDelete(policy._id)}
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

export default PolicyDocPage;
