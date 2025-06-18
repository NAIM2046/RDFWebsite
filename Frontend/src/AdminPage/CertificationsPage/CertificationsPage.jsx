import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import imgUploadImgbb from "../../Hook/ImgUpload";

const CertificationsPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Renamed from pdf
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const AxiosSecure = useAxiosSecure();

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const res = await AxiosSecure.get("/api/admin/certifications");
      setCertifications(res.data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      alert("Please provide a name and select an image file.");
      return;
    }

    setUploading(true);
    try {
      // Upload to imgbb and get image URL
      const imageUrl = await imgUploadImgbb(image);

      if (!imageUrl) throw new Error("Image upload failed");

      console.log(name, imageUrl);

      // Send to backend
      const res = await AxiosSecure.post("/api/admin/certification-upload", {
        name,
        filePath: imageUrl,
      });

      alert("Certification uploaded successfully!");
      setName("");
      setImage(null);
      fetchCertifications(); // Refresh list
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certification?"
    );
    if (!confirmDelete) return;

    try {
      await AxiosSecure.delete(`/api/admin/certifications/${id}`);
      alert("Certification deleted.");
      setCertifications(certifications.filter((cert) => cert._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Certifications</h1>
      <p className="text-gray-700 mb-8">
        This page will display and manage certifications.
      </p>

      <form
        className="bg-white p-6 rounded shadow-md max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter certification name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Image File
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Certifications list */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Uploaded Certifications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : certifications.length === 0 ? (
          <p>No certifications uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li
                key={cert._id}
                className="bg-white p-4 shadow rounded flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={cert.filePath}
                    alt={cert.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{cert.name}</p>
                    <a
                      href={cert.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      View Image
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cert._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CertificationsPage;
