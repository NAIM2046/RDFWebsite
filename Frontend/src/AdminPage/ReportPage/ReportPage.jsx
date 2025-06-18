import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";
import uploadImageToImgbb from "../../Hook/ImgUpload";

const ReportPage = () => {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const AxiosSecure = useAxiosSecure();
  const { reports, fetchReport } = useRDFStore();

  useEffect(() => {
    if (reports.length === 0) {
      fetchReport();
    }
  }, []);

  const handlePdfChange = (e) => setPdf(e.target.files[0]);
  const handleImageChange = (e) => setCoverImage(e.target.files[0]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  const handleUpload = async () => {
    if (!title || !pdf || !coverImage) {
      showMessage(
        "error",
        "Please enter a title, select a PDF file, and choose a cover image."
      );
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImageToImgbb(coverImage);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("pdf", pdf);
      formData.append("coverImage", imageUrl);

      const response = await AxiosSecure.post(`/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showMessage(
        "success",
        response.data.message || "Report uploaded successfully."
      );
      setTitle("");
      setPdf(null);
      setCoverImage(null);
      fetchReport();
    } catch (error) {
      console.error("Error uploading report:", error);
      showMessage("error", "Failed to upload report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirm) return;

    setLoading(true);
    try {
      await AxiosSecure.delete(`/report/${id}`);
      showMessage("success", "Report deleted successfully!");
      fetchReport();
    } catch (error) {
      console.error("Error deleting report:", error);
      showMessage("error", "Failed to delete report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Report Management</h2>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Upload Form */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Enter report title"
          className="w-full p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="application/pdf"
          className="w-full p-2 border rounded-md"
          onChange={handlePdfChange}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded-md"
          onChange={handleImageChange}
        />
        <button
          className={`w-full mt-2 py-2 px-4 rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Report"}
        </button>
      </div>

      {/* Uploaded Reports */}
      <h3 className="text-xl font-semibold mt-6">Uploaded Reports</h3>
      <ul className="mt-4 space-y-4">
        {reports.map((report) => (
          <li
            key={report._id}
            className="flex items-center justify-between p-4 border rounded-md"
          >
            <div className="flex items-center space-x-4">
              {report.coverImage && (
                <img
                  src={report.coverImage}
                  alt="Cover"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <a
                href={`http://localhost:3001${report.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium"
              >
                {report.title}
              </a>
            </div>
            <button
              className="text-red-500 font-semibold"
              onClick={() => handleDelete(report._id)}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;
