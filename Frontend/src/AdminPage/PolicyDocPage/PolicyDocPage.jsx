import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const PolicyDocPage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [policies, setPolicies] = useState([]);

  const AxiosSecure = useAxiosSecure();

  // ✅ Fetch policies
  const fetchPolicies = async () => {
    try {
      const res = await AxiosSecure.get("/api/admin/policies");
      console.log(res.data);
      setPolicies(res.data);
    } catch (error) {
      console.error("Error fetching policies", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  // ✅ Upload handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !file) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf", file);

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await AxiosSecure.post("/api/admin/policy-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("✅ Policy uploaded successfully!");
      setName("");
      setFile(null);
      fetchPolicies(); // Refresh list
    } catch (error) {
      console.error(error);
      setErrorMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this policy?"
    );
    if (!confirm) return;

    try {
      await AxiosSecure.delete(`/api/admin/policies/${id}`);
      setSuccessMessage("✅ Policy deleted successfully!");
      fetchPolicies(); // Refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      setErrorMessage("❌ Failed to delete. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          📄 Upload Policy Document
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* ✅ Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Policy Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter policy name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload File (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* ✅ Policies List */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            📚 Uploaded Policies
          </h3>
          {policies.length === 0 ? (
            <p className="text-gray-500 text-sm">No policies uploaded yet.</p>
          ) : (
            <ul className="space-y-3">
              {policies.map((policy) => (
                <li
                  key={policy._id}
                  className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">{policy.name}</p>
                    <a
                      href={`${`http://localhost:3001`}${policy.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm underline cursor-pointer"
                    >
                      View Document
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(policy._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyDocPage;
