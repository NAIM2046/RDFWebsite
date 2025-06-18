import { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";
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
  console.log(teams);
  const [member, setMember] = useState({
    name: "",
    post: "",
    image: "",
    bio: "",
    rank: "",
    type: "General committe",

    academic: [{ institute: "", period: "", degree: "" }],
    experience: [{ organization: "", position: "", period: "" }],
    contact: { email: "", phone: "" },
  });

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

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...member.experience];
    updatedExperience[index][field] = value;
    setMember({ ...member, experience: updatedExperience });
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, contact: { ...member.contact, [name]: value } });
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
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageToImgbb(file);
      if (imageUrl) {
        setMember({ ...member, image: imageUrl });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
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
        console.log(res.data);

        alert(`Member ${editingId ? "updated" : "added"} successfully!`);
        fetchTeams();
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
        setSubmitting(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleDelete = (id) => {
    Axios.delete(`/teams/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Member deleted successfully!");
        fetchTeams();
      })
      .catch((err) => console.log(err));
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
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Member Information</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={member.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="post"
          placeholder="Post"
          value={member.post}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="rank"
          placeholder="Rank"
          value={member.rank}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="type"
          value={member.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="General committee">General committee</option>
          <option value="Executive committee">Executive committee</option>
          <option value="Senior Management">Senior Management</option>
        </select>
        <label> upload profile</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded cursor-pointer"
        />
        {uploading && <p className="text-blue-500">Uploading image...</p>}

        {/* Preview Uploaded Image */}
        {member.image && (
          <img
            src={member.image}
            alt="Uploaded"
            className="w-32 h-32 mt-2 rounded"
          />
        )}
        <textarea
          name="bio"
          placeholder="Bio"
          value={member.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <h3 className="text-lg font-medium">Academic Information</h3>
        {member.academic.map((edu, index) => (
          <div key={index} className="space-y-2 border p-2 rounded">
            <input
              type="text"
              placeholder="Institute"
              value={edu.institute}
              onChange={(e) =>
                handleAcademicChange(index, "institute", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Period"
              value={edu.period}
              onChange={(e) =>
                handleAcademicChange(index, "period", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleAcademicChange(index, "degree", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addAcademic}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Academic Info
        </button>

        <h3 className="text-lg font-medium">Experience</h3>
        {member.experience.map((exp, index) => (
          <div key={index} className="space-y-2 border p-2 rounded">
            <input
              type="text"
              placeholder="Organization"
              value={exp.organization}
              onChange={(e) =>
                handleExperienceChange(index, "organization", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) =>
                handleExperienceChange(index, "position", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Period"
              value={exp.period}
              onChange={(e) =>
                handleExperienceChange(index, "period", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addExperience}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Experience
        </button>

        <h3 className="text-lg font-medium">Contact</h3>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={member.contact.email}
          onChange={handleContactChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={member.contact.phone}
          onChange={handleContactChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded cursor-pointer"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : editingId ? "Update" : "Submit"}
        </button>
      </form>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Team Members</h2>
      <ul className="space-y-4">
        {teams.map((teamMember) => (
          <li
            key={teamMember._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <p className="text-lg font-semibold">{teamMember.name}</p>
              <p className="text-sm text-gray-600">{teamMember.post}</p>
            </div>
            <div className="flex space-x-2 ">
              <button
                onClick={() => handleEdit(teamMember)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(teamMember._id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamsPage;
