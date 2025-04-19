import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";

const ReportPage = () => {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const AxiosSecure = useAxiosSecure();
  const { reports, fetchReport } = useRDFStore();
  useEffect(() => {
    if (reports.length === 0) {
      fetchReport();
    }
  }, []);
  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!title || !pdf) {
      alert("Please enter a title and select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("title", title);

    console.log(formData);

    try {
      const response = await AxiosSecure.post(`/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      // Refresh report list
      setTitle("");
      setPdf(null);
    } catch (error) {
      console.error("Error uploading report:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosSecure.delete(`/report/${id}`);
      alert("Report deleted successfully!");
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Report Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter report title"
          className="w-full p-2 border rounded-md mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="application/pdf"
          className="w-full p-2 border rounded-md"
          onChange={handleFileChange}
        />
        <button
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleUpload}
        >
          Upload Report
        </button>
      </div>
      <h3 className="text-xl font-semibold mt-6">Uploaded Reports</h3>
      <ul className="mt-2">
        {reports.map((report) => (
          <li
            key={report._id}
            className="flex justify-between items-center p-2 border-b"
          >
            <a
              href={`${`http://localhost:3001`}${report.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {report.title}
            </a>
            <button
              className="text-red-500"
              onClick={() => handleDelete(report._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;
