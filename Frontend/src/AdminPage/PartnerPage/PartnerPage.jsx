import { useState, useEffect } from "react";
import { FiTrash2, FiExternalLink, FiUpload, FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import useRDFStore from "../../storage/useRDFstorage";

const PartnerPage = () => {
  const Axios = useAxiosSecure();
  const [partner, setPartner] = useState({
    name: "",
    logo: "",
    fullName: "",
    category: "Current Partners",
    link: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const { partners, fetchPartner } = useRDFStore();

  useEffect(() => {
    fetchPartner();
  }, [fetchPartner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImageToImgbb(file);
      setPartner((prev) => ({ ...prev, logo: url }));
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Logo upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("/partner", partner);
      toast.success("Partner added successfully!");
      setPartner({
        name: "",
        logo: "",
        fullName: "",
        category: "Current Partners",
        link: "",
      });
      fetchPartner();
      setActiveTab("manage");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add partner");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        await Axios.delete(`/partner/${id}`);
        toast.success("Partner deleted successfully!");
        fetchPartner();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete partner");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Partner Management
      </h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "create"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("create")}
        >
          Add Partner
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "manage"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Partners ({partners.length})
        </button>
      </div>

      {activeTab === "create" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Name*
              </label>
              <input
                type="text"
                name="name"
                value={partner.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. UNICEF"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                name="fullName"
                value={partner.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. United Nations Children's Fund"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website URL*
              </label>
              <input
                type="url"
                name="link"
                value={partner.link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Partner Logo*
            </label>
            <div className="mt-1 flex items-center">
              {partner.logo ? (
                <div className="relative group">
                  <img
                    src={partner.logo}
                    alt="Logo preview"
                    className="w-24 h-24 object-contain border border-gray-200 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPartner((prev) => ({ ...prev, logo: "" }))
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <FiImage className="h-8 w-8 text-gray-400" />
                </div>
              )}

              <div className="ml-4">
                <label className="cursor-pointer">
                  <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FiUpload className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                    {isUploading ? "Uploading..." : "Upload Logo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="sr-only"
                    disabled={isUploading}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!partner.logo || isUploading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Partner
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">All Partners</h2>
            <button
              onClick={() => setActiveTab("create")}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Add New Partner
            </button>
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-12">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No partners added
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first partner.
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
                      Partner
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
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
                  {partners.map((p) => (
                    <tr key={p._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {p.logo ? (
                              <img
                                className="h-10 w-10 object-contain"
                                src={p.logo}
                                alt={p.name}
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <FiImage className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {p.name}
                            </div>
                            <div className="text-gray-500">{p.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            p.category === "Current Partners"
                              ? "bg-blue-100 text-blue-800"
                              : p.category === "Donors"
                              ? "bg-green-100 text-green-800"
                              : p.category === "Strategic Partners"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-4">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiExternalLink className="mr-1" /> Visit
                          </a>
                          <button
                            onClick={() => handleDelete(p._id)}
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

export default PartnerPage;
