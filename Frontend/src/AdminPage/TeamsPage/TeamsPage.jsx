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
  FiUsers,
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
    committees: [{ rank: "", committee_name: "" }], // Changed to array of committees
  });

  const resetForm = () => {
    setMember({
      name: "",
      post: "",
      image: "",
      bio: "",
      committees: [{ rank: "", committee_name: "" }],
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  // Handle committee changes
  const handleCommitteeChange = (index, field, value) => {
    const updatedCommittees = [...member.committees];
    updatedCommittees[index][field] = value;
    setMember({ ...member, committees: updatedCommittees });
  };

  // Add new committee field
  const addCommittee = () => {
    setMember({
      ...member,
      committees: [...member.committees, { rank: "", committee_name: "" }],
    });
  };

  // Remove committee field
  const removeCommittee = (index) => {
    if (member.committees.length > 1) {
      const updatedCommittees = [...member.committees];
      updatedCommittees.splice(index, 1);
      setMember({ ...member, committees: updatedCommittees });
    }
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

    // Validate committees
    const validCommittees = member.committees.filter(
      (committee) => committee.rank && committee.committee_name
    );

    if (validCommittees.length === 0) {
      toast.error("Please add at least one valid committee assignment.");
      setSubmitting(false);
      return;
    }

    const memberData = {
      ...member,
      committees: validCommittees,
    };

    const request = editingId
      ? Axios.patch(`/teams/${editingId}`, memberData)
      : Axios.post("/teams", memberData);

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
      committees:
        teamMember.committees && teamMember.committees.length > 0
          ? teamMember.committees
          : [{ rank: "", committee_name: "" }],
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

                {/* Committee Assignments */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Committee Assignments *
                    </label>
                    <button
                      type="button"
                      onClick={addCommittee}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <FiPlus className="mr-1" /> Add Committee
                    </button>
                  </div>

                  {member.committees.map((committee, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Rank
                          </label>
                          <input
                            type="number"
                            placeholder="Rank"
                            value={committee.rank}
                            onChange={(e) =>
                              handleCommitteeChange(
                                index,
                                "rank",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            Committee
                          </label>
                          <select
                            value={committee.committee_name}
                            onChange={(e) =>
                              handleCommitteeChange(
                                index,
                                "committee_name",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="">Select Committee</option>
                            <option value="Executive Committee">
                              Executive Committee
                            </option>
                            <option value="General Committee">
                              General Committee
                            </option>
                            <option value="Senior Management">
                              Senior Management
                            </option>
                          </select>
                        </div>
                      </div>
                      {member.committees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCommittee(index)}
                          className="p-1 text-red-500 hover:text-red-700 mt-5"
                        >
                          <FiX size={16} />
                        </button>
                      )}
                    </div>
                  ))}
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
                  .sort((a, b) => {
                    // Sort by the first committee's rank
                    const aRank = a.committees?.[0]?.rank || 0;
                    const bRank = b.committees?.[0]?.rank || 0;
                    return aRank - bRank;
                  })
                  .map((teamMember) => (
                    <div
                      key={teamMember._id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
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

                        {/* Display Committees */}
                        {teamMember.committees &&
                          teamMember.committees.length > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center text-sm text-gray-500 mb-1">
                                <FiUsers className="mr-1" /> Committees:
                              </div>
                              {teamMember.committees.map((committee, index) => (
                                <div
                                  key={index}
                                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded mb-1"
                                >
                                  {committee.committee_name}{" "}
                                  {committee.rank &&
                                    `(Rank: ${committee.rank})`}
                                </div>
                              ))}
                            </div>
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
