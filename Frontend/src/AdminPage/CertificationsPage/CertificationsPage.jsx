import React, { useState, useEffect } from "react";
import {
  FiUpload,
  FiTrash2,
  FiImage,
  FiPlus,
  FiDownload,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import imgUploadImgbb from "../../Hook/ImgUpload";

const CertificationsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [certifications, setCertifications] = useState([]);

  const AxiosSecure = useAxiosSecure();

  const fetchCertifications = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosSecure.get("/api/admin/certifications");
      setCertifications(res.data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
      toast.error("Failed to load certifications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      toast.error("Please provide both certification name and image");
      return;
    }

    setIsUploading(true);
    try {
      // Upload to imgbb and get image URL
      const imageUrl = await imgUploadImgbb(formData.image);
      if (!imageUrl) throw new Error("Image upload failed");

      // Send to backend
      await AxiosSecure.post("/api/admin/certification-upload", {
        name: formData.name,
        filePath: imageUrl,
      });

      toast.success("Certification uploaded successfully!");
      resetForm();
      fetchCertifications();
      setActiveTab("manage");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload certification");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await AxiosSecure.delete(`/api/admin/certifications/${id}`);
        toast.success("Certification deleted successfully!");
        setCertifications(certifications.filter((cert) => cert._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete certification");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Certifications Management
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
          Upload Certification
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Certifications ({certifications.length})
        </button>
      </div>

      {activeTab === "upload" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. ISO 9001 Certification"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certification Image*
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-48 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, image: null }));
                        setImagePreview(null);
                      }}
                      className="mt-2 text-sm text-red-600"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload Image</span>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!formData.name || !formData.image || isUploading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Certification"}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              All Certifications
            </h2>
            <button
              onClick={() => setActiveTab("upload")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              <FiPlus className="mr-1" /> Add New
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading certifications...</p>
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-12">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No certifications available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your first certification to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert._id}
                  className="bg-white rounded-lg shadow overflow-hidden border border-gray-200"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{cert.name}</h3>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <img
                      src={cert.filePath}
                      alt={cert.name}
                      className="w-full h-48 object-contain mx-auto"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <a
                      href={cert.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiDownload className="mr-2" /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;
