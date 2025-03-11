import { useState, useEffect } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";

const PartnerPage = () => {
  const Axios = useAxiosPublic();
  const [partner, setPartner] = useState({
    name: "",
    logo: "",
    fullName: "",
    category: "Current Partners",
    link: "",
  });
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // Status for image upload
  const { partners, fetchPartner } = useRDFStore();

  useEffect(() => {
    fetchPartner();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner({ ...partner, [name]: value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadStatus("Uploading image..."); // Show uploading message
      try {
        const url = await uploadImageToImgbb(file);
        setPartner({ ...partner, logo: url });
        setPreview(url);
        setUploadStatus("Upload complete! ✅"); // Success message
      } catch (error) {
        console.error("Image upload failed:", error);
        setUploadStatus("❌ Image upload failed. Try again."); // Error message
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/partner", partner)
      .then((res) => {
        console.log(res.data);
        fetchPartner();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    Axios.delete(`/partner/${id}`)
      .then(() => {
        fetchPartner();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={partner.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={partner.fullName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={partner.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Current Partners">Current Partners</option>
            <option value="Donors">Donors</option>
            <option value="Strategic Partners">Strategic Partners</option>
            <option value="Govt. Ministries">Govt. Ministries</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Website Link</label>
          <input
            type="url"
            name="link"
            value={partner.link}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full"
          />
          {/* Upload Status */}
          {uploadStatus && (
            <p
              className={`mt-2 text-sm ${
                uploadStatus.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {uploadStatus}
            </p>
          )}
          {/* Preview Image */}
          {preview && (
            <img
              src={preview}
              alt="Logo Preview"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Partner List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Partner List</h2>
        {partners.length === 0 ? (
          <p>No partners added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((p) => (
              <div key={p._id} className="p-4 border rounded shadow">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-20 h-20 object-cover"
                />
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.fullName}</p>
                <p className="text-sm">{p.category}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Visit Website
                </a>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerPage;
