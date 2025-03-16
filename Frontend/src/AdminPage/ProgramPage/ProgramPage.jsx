import React, { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const ProgramPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    focus: [],
    images: [],
    videoId: "",
  });
  const Axios = useAxiosSecure();
  const [focusInput, setFocusInput] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { programs, fetchPrograms } = useRDFStore();

  useEffect(() => {
    if (programs.length === 0) {
      fetchPrograms();
      console.log(programs);
    }
  }, []);
  console.log(programs);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocusAdd = (e) => {
    e.preventDefault();
    if (focusInput.trim() && !formData.focus.includes(focusInput)) {
      setFormData({ ...formData, focus: [...formData.focus, focusInput] });
      setFocusInput("");
    }
  };

  const handleFocusRemove = (focusItem) => {
    setFormData({
      ...formData,
      focus: formData.focus.filter((item) => item !== focusItem),
    });
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    const uploadedImageUrls = [];
    for (const file of selectedFiles) {
      const uploadedUrl = await uploadImageToImgbb(file);
      if (uploadedUrl) uploadedImageUrls.push(uploadedUrl);
    }
    setFormData({
      ...formData,
      images: [...formData.images, ...uploadedImageUrls],
    });
    setPreviewImages([...previewImages, ...uploadedImageUrls]);
    setUploading(false);
    setSelectedFiles([]);
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (formData.focus.length === 0)
      errors.focus = "At least one key focus is required";
    if (formData.images.length === 0)
      errors.images = "At least one image is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Project Data:", formData);
    Axios.post("/programs", formData).then((res) => {
      if (res.data) {
        console.log(res.data);
      }
    });
    // setFormData({
    //   title: "",
    //   description: "",
    //   focus: [],
    //   images: [],
    //   videoId: "",
    // });
    setPreviewImages([]);
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add New Program
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Project Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter project description"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Key Focus Areas</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={focusInput}
              onChange={(e) => setFocusInput(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter a key focus area"
            />
            <button
              onClick={handleFocusAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {errors.focus && (
            <p className="text-red-500 text-sm mt-1">{errors.focus}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.focus.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-lg flex items-center"
              >
                <span className="mr-2">{item}</span>
                <button
                  onClick={() => handleFocusRemove(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium">Upload Images</label>
          <div className="flex space-x-2">
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full mt-1"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>
          {uploading && <p className="text-blue-500 text-sm">Uploading...</p>}
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images}</p>
          )}
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block font-medium">YouTube Video ID</label>
          <input
            name="videoId"
            type="text"
            value={formData.videoId}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Enter YouTube video ID"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProgramPage;
