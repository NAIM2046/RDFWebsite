import { useState, useEffect } from "react";
import {
  FiUpload,
  FiTrash2,
  FiFileText,
  FiImage,
  FiDownload,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";
import uploadImageToImgbb from "../../Hook/ImgUpload";

const ReportPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    pdf: null,
    coverImage: null,
  });
  const [pdfPreview, setPdfPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const { reports, fetchReport } = useRDFStore();
  const AxiosSecure = useAxiosSecure();

  useEffect(() => {
    if (reports.length === 0) {
      fetchReport();
    }
  }, [reports.length, fetchReport]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (e.target.name === "pdf") {
      setFormData((prev) => ({ ...prev, pdf: file }));
      setPdfPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, coverImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!formData.title || !formData.pdf || !formData.coverImage) {
      toast.error("Please fill all fields and select both PDF and cover image");
      return;
    }

    setIsUploading(true);
    try {
      // Upload cover image first
      const imageUrl = await uploadImageToImgbb(formData.coverImage);

      // Then upload PDF with metadata
      const reportData = new FormData();
      reportData.append("title", formData.title);
      reportData.append("pdf", formData.pdf);
      reportData.append("coverImage", imageUrl);

      await AxiosSecure.post("/upload", reportData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Report uploaded successfully!");
      resetForm();
      fetchReport();
      setActiveTab("manage");
    } catch (error) {
      console.error("Error uploading report:", error);
      toast.error("Failed to upload report");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await AxiosSecure.delete(`/report/${id}`);
        toast.success("Report deleted successfully!");
        fetchReport();
      } catch (error) {
        console.error("Error deleting report:", error);
        toast.error("Failed to delete report");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      pdf: null,
      coverImage: null,
    });
    setPdfPreview(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Report Management
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
          Upload Report
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Reports ({reports.length})
        </button>
      </div>

      {activeTab === "upload" ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Annual Report 2023"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF File*
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {pdfPreview ? (
                    <div className="flex flex-col items-center">
                      <FiFileText className="mx-auto h-12 w-12 text-blue-500" />
                      <p className="mt-2 text-sm text-gray-600 truncate max-w-xs">
                        {formData.pdf.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, pdf: null }));
                          setPdfPreview(null);
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
                            name="pdf"
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

            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image*
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="mx-auto h-24 object-contain rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            coverImage: null,
                          }));
                          setImagePreview(null);
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
                          <span>Upload Image</span>
                          <input
                            type="file"
                            name="coverImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpload}
              disabled={
                !formData.title ||
                !formData.pdf ||
                !formData.coverImage ||
                isUploading
              }
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload Report"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">All Reports</h2>
            <button
              onClick={() => setActiveTab("upload")}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Upload New Report
            </button>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No reports available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your first report to get started.
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
                      Report
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
                  {reports.map((report) => (
                    <tr key={report._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {report.coverImage ? (
                              <img
                                className="h-10 w-10 object-cover rounded"
                                src={report.coverImage}
                                alt={report.title}
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <FiFileText className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {report.title}
                            </div>
                            <div className="text-gray-500">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-4">
                          <a
                            href={`http://localhost:3001${report.filePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiDownload className="mr-1" /> Download
                          </a>
                          <button
                            onClick={() => handleDelete(report._id)}
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

export default ReportPage;
