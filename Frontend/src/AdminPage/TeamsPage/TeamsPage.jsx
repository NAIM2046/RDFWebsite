import { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUpload,
  FiX,
  FiSave,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeamsPage = () => {
  const Axios = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { teams, fetchTeams } = useRDFStore();

  useEffect(() => {
    if (teams.length === 0) {
      fetchTeams();
    }
  }, []);

  const [member, setMember] = useState({
    name: "",
    post: "",
    image: "",
    bio: "",
    rank: "",
    type: "General committee",
    academic: [{ institute: "", period: "", degree: "" }],
    experience: [{ organization: "", position: "", period: "" }],
    contact: { email: "", phone: "" },
  });

  const resetForm = () => {
    setMember({
      name: "",
      post: "",
      image: "",
      bio: "",
      rank: "",
      type: "General committee",
      academic: [{ institute: "", period: "", degree: "" }],
      experience: [{ organization: "", position: "", period: "" }],
      contact: { email: "", phone: "" },
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleAcademicChange = (index, field, value) => {
    const updatedAcademic = [...member.academic];
    updatedAcademic[index][field] = value;
    setMember({ ...member, academic: updatedAcademic });
  };

  const addAcademic = () => {
    setMember({
      ...member,
      academic: [...member.academic, { institute: "", period: "", degree: "" }],
    });
  };

  const removeAcademic = (index) => {
    const updatedAcademic = [...member.academic];
    updatedAcademic.splice(index, 1);
    setMember({ ...member, academic: updatedAcademic });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...member.experience];
    updatedExperience[index][field] = value;
    setMember({ ...member, experience: updatedExperience });
  };

  const addExperience = () => {
    setMember({
      ...member,
      experience: [
        ...member.experience,
        { organization: "", position: "", period: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = [...member.experience];
    updatedExperience.splice(index, 1);
    setMember({ ...member, experience: updatedExperience });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, contact: { ...member.contact, [name]: value } });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageToImgbb(file);
      if (imageUrl) {
        setMember({ ...member, image: imageUrl });
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const request = editingId
      ? Axios.patch(`/teams/${editingId}`, member)
      : Axios.post("/teams", member);

    request
      .then((res) => {
        toast.success(
          `Member ${editingId ? "updated" : "added"} successfully!`
        );
        fetchTeams();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `Failed to ${editingId ? "update" : "add"} member. Please try again.`
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      Axios.delete(`/teams/${id}`)
        .then((res) => {
          toast.success("Member deleted successfully!");
          fetchTeams();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete member.");
        });
    }
  };

  const handleEdit = (teamMember) => {
    setEditingId(teamMember._id);
    setMember({
      name: teamMember.name || "",
      post: teamMember.post || "",
      image: teamMember.image || "",
      bio: teamMember.bio || "",
      rank: teamMember.rank || "",
      type: teamMember.type || "General committee",
      academic: teamMember.academic?.length
        ? teamMember.academic
        : [{ institute: "", period: "", degree: "" }],
      experience: teamMember.experience?.length
        ? teamMember.experience
        : [{ organization: "", position: "", period: "" }],
      contact: teamMember.contact || { email: "", phone: "" },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        {/* Member Form Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800">
            <h2 className="text-2xl font-bold text-white">
              {editingId ? "Edit Member" : "Add New Member"}
            </h2>
          </div>
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Member's full name"
                    value={member.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position/Role *
                  </label>
                  <input
                    type="text"
                    name="post"
                    placeholder="Member's position"
                    value={member.post}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rank/Order
                  </label>
                  <input
                    type="number"
                    name="rank"
                    placeholder="Display order (lower numbers appear first)"
                    value={member.rank}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Type *
                  </label>
                  <select
                    name="type"
                    value={member.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="General committee">General Committee</option>
                    <option value="Executive committee">
                      Executive Committee
                    </option>
                    <option value="Senior Management">Senior Management</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo *
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          {member.image ? "Change photo" : "Click to upload"}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        required={!member.image}
                      />
                    </label>
                    {member.image && (
                      <div className="w-32 h-32 border rounded-lg overflow-hidden">
                        <img
                          src={member.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {uploading && (
                    <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio/Description
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Short biography or description"
                    value={member.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="member@example.com"
                    value={member.contact.email}
                    onChange={handleContactChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1234567890"
                    value={member.contact.phone}
                    onChange={handleContactChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Academic Background
                </h3>
                <button
                  type="button"
                  onClick={addAcademic}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FiPlus className="mr-1" /> Add Academic
                </button>
              </div>
              {member.academic.map((edu, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeAcademic(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <FiX />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        placeholder="University/School"
                        value={edu.institute}
                        onChange={(e) =>
                          handleAcademicChange(
                            index,
                            "institute",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        placeholder="Degree/Certificate"
                        value={edu.degree}
                        onChange={(e) =>
                          handleAcademicChange(index, "degree", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Period
                      </label>
                      <input
                        type="text"
                        placeholder="Year or Duration"
                        value={edu.period}
                        onChange={(e) =>
                          handleAcademicChange(index, "period", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional Experience */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Professional Experience
                </h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FiPlus className="mr-1" /> Add Experience
                </button>
              </div>
              {member.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <FiX />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Company/Organization"
                        value={exp.organization}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "organization",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.position}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Period
                      </label>
                      <input
                        type="text"
                        placeholder="Year or Duration"
                        value={exp.period}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "period",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 rounded-lg text-white flex items-center ${
                  submitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? (
                  "Processing..."
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    {editingId ? "Update Member" : "Add Member"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Team Members List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800">
            <h2 className="text-2xl font-bold text-white">Team Members</h2>
          </div>
          <div className="p-6">
            {teams.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No team members found. Add your first member above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams
                  .sort((a, b) => (a.rank || 0) - (b.rank || 0))
                  .map((teamMember) => (
                    <div
                      key={teamMember._id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 bg-gray-100 overflow-hidden relative">
                        {teamMember.image ? (
                          <img
                            src={teamMember.image}
                            alt={teamMember.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            No Image
                          </div>
                        )}
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <button
                            onClick={() => handleEdit(teamMember)}
                            className="p-2 bg-white rounded-full shadow-md text-blue-600 hover:bg-blue-50"
                            title="Edit"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(teamMember._id)}
                            className="p-2 bg-white rounded-full shadow-md text-red-600 hover:bg-red-50"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800">
                          {teamMember.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {teamMember.post}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {teamMember.type}
                        </p>
                        {teamMember.rank && (
                          <p className="text-xs text-gray-400 mt-1">
                            Rank: {teamMember.rank}
                          </p>
                        )}
                        {teamMember.bio && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {teamMember.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
