import { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import {
  FiTrash2,
  FiPlus,
  FiUpload,
  FiX,
  FiSave,
  FiEdit2,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsPage = () => {
  const Axios = useAxiosSecure();
  const { newss, fetchNews, programs, fetchPrograms } = useRDFStore();

  useEffect(() => {
    if (newss.length === 0) fetchNews();
    if (programs.length === 0) fetchPrograms();
  }, []);

  const [filteredNews, setFilteredNews] = useState([]);

  // Initialize filteredNews when newss changes
  useEffect(() => {
    setFilteredNews(newss);
  }, [newss]);

  const [news, setNews] = useState({
    title: "",
    author: "",
    date: "",
    type: "news",
    program: "",
    imageURL: "",
    imageCaption: "",
    highlights: [""],
    content: [{ title: "", description: "", imageUrl: "" }],
    socialMediaLinks: [{ header: "", link: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState({});
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setNews({
      title: "",
      author: "",
      date: "",
      type: "news",
      program: "",
      imageURL: "",
      imageCaption: "",
      highlights: [""],
      content: [{ title: "", description: "", imageUrl: "" }],
      socialMediaLinks: [{ header: "", link: "" }],
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...news.highlights];
    updatedHighlights[index] = value;
    setNews({ ...news, highlights: updatedHighlights });
  };

  const addHighlight = () => {
    setNews({ ...news, highlights: [...news.highlights, ""] });
  };

  const removeHighlight = (index) => {
    const updatedHighlights = [...news.highlights];
    updatedHighlights.splice(index, 1);
    setNews({ ...news, highlights: updatedHighlights });
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...news.content];
    updatedContent[index][field] = value;
    setNews({ ...news, content: updatedContent });
  };

  const addContent = () => {
    setNews({
      ...news,
      content: [...news.content, { title: "", description: "", imageUrl: "" }],
    });
  };

  const removeContent = (index) => {
    const updatedContent = [...news.content];
    updatedContent.splice(index, 1);
    setNews({ ...news, content: updatedContent });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const imageUrl = await uploadImageToImgbb(file);
      if (imageUrl) {
        setNews({ ...news, imageURL: imageUrl });
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleContentImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setContentLoading({ ...contentLoading, [index]: true });
    try {
      const imageUrl = await uploadImageToImgbb(file);
      if (imageUrl) {
        const updatedContent = [...news.content];
        updatedContent[index].imageUrl = imageUrl;
        setNews({ ...news, content: updatedContent });
        toast.success("Content image uploaded successfully!");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setContentLoading({ ...contentLoading, [index]: false });
    }
  };

  const handleSocialMediaChange = (index, field, value) => {
    const updatedLinks = [...news.socialMediaLinks];
    updatedLinks[index][field] = value;
    setNews({ ...news, socialMediaLinks: updatedLinks });
  };

  const addSocialMediaLink = () => {
    setNews({
      ...news,
      socialMediaLinks: [...news.socialMediaLinks, { header: "", link: "" }],
    });
  };

  const removeSocialMediaLink = (index) => {
    const updatedLinks = [...news.socialMediaLinks];
    updatedLinks.splice(index, 1);
    setNews({ ...news, socialMediaLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const request = editingId
        ? Axios.patch(`/news/${editingId}`, news)
        : Axios.post("/news", news);

      const response = await request;
      toast.success(`News ${editingId ? "updated" : "added"} successfully!`);
      fetchNews();
      resetForm();
    } catch (error) {
      console.error("Error submitting news:", error);
      toast.error(
        `Failed to ${editingId ? "update" : "add"} news. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await Axios.delete(`/news/${id}`);
        toast.success("News deleted successfully!");
        fetchNews();
      } catch (error) {
        console.error("Error deleting news:", error);
        toast.error("Failed to delete news.");
      }
    }
  };

  const handleEdit = (newsItem) => {
    setEditingId(newsItem._id);
    setNews({
      title: newsItem.title || "",
      author: newsItem.author || "",
      date: newsItem.date || "",
      type: newsItem.type || "news",
      program: newsItem.program || "",
      imageURL: newsItem.imageURL || "",
      imageCaption: newsItem.imageCaption || "",
      highlights: newsItem.highlights?.length ? newsItem.highlights : [""],
      content: newsItem.content?.length
        ? newsItem.content
        : [{ title: "", description: "", imageUrl: "" }],
      socialMediaLinks: newsItem.socialMediaLinks?.length
        ? newsItem.socialMediaLinks
        : [{ header: "", link: "" }],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === "") {
      setFilteredNews(newss);
    } else {
      const filtered = newss.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );
      setFilteredNews(filtered);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        {/* News Form Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800">
            <h2 className="text-2xl font-bold text-white">
              {editingId ? "Edit News" : "Add New News"}
            </h2>
          </div>
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    News Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter news title"
                    value={news.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={news.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="news">News</option>
                    <option value="blogs">Blog</option>
                    <option value="publication">Publication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program
                  </label>
                  <select
                    name="program"
                    value={news.program}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Program</option>
                    {programs.map((program) => (
                      <option key={program._id} value={program._id}>
                        {program.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author & Date */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    placeholder="Enter author name"
                    value={news.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={news.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image *
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          {news.imageURL ? "Change image" : "Click to upload"}
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        required={!news.imageURL}
                      />
                    </label>
                    {news.imageURL && (
                      <div className="w-32 h-32 border rounded-lg overflow-hidden">
                        <img
                          src={news.imageURL}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {loading && (
                    <p className="mt-2 text-sm text-blue-600">Uploading...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Caption
                  </label>
                  <input
                    type="text"
                    name="imageCaption"
                    placeholder="Enter image caption"
                    value={news.imageCaption}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Highlights
                </h3>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FiPlus className="mr-1" /> Add Highlight
                </button>
              </div>
              {news.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Highlight ${index + 1}`}
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(index, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Content Sections
                </h3>
                <button
                  type="button"
                  onClick={addContent}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FiPlus className="mr-1" /> Add Content Section
                </button>
              </div>
              {news.content.map((section, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-4 bg-gray-50 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeContent(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    title="Remove"
                  >
                    <FiX />
                  </button>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        placeholder="Section Title"
                        value={section.title}
                        onChange={(e) =>
                          handleContentChange(index, "title", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        placeholder="Section Description"
                        value={section.description}
                        onChange={(e) =>
                          handleContentChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-3 pb-4">
                            <FiUpload className="w-6 h-6 text-gray-400 mb-1" />
                            <p className="text-xs text-gray-500">
                              {section.imageUrl
                                ? "Change image"
                                : "Click to upload"}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleContentImageUpload(index, e)}
                            className="hidden"
                          />
                        </label>
                        {section.imageUrl && (
                          <div className="w-24 h-24 border rounded-lg overflow-hidden">
                            <img
                              src={section.imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      {contentLoading[index] && (
                        <p className="mt-2 text-sm text-blue-600">
                          Uploading...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Social Media Links
                </h3>
                <button
                  type="button"
                  onClick={addSocialMediaLink}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <FiPlus className="mr-1" /> Add Link
                </button>
              </div>
              {news.socialMediaLinks.map((link, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-2 items-center"
                >
                  <div className="md:col-span-4">
                    <input
                      type="text"
                      placeholder="Platform (e.g., Facebook)"
                      value={link.header}
                      onChange={(e) =>
                        handleSocialMediaChange(index, "header", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-7">
                    <input
                      type="text"
                      placeholder="Link URL"
                      value={link.link}
                      onChange={(e) =>
                        handleSocialMediaChange(index, "link", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => removeSocialMediaLink(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                      title="Remove"
                    >
                      <FiX />
                    </button>
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
                disabled={loading}
                className={`px-6 py-2 rounded-lg text-white flex items-center ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    {editingId ? "Update News" : "Publish News"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        {/* Search Section */}
        <div className="p-6">
          <input
            type="text"
            name="search"
            onChange={handleSearch}
            placeholder="Search news..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* News List Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800">
            <h2 className="text-2xl font-bold text-white">News List</h2>
          </div>
          <div className="p-6">
            {filteredNews.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No news items found. Add your first news above.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNews.map((item) => (
                  <div
                    key={item._id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.type} • {item.author} • {item.date}
                          </p>
                          {item.program && (
                            <p className="text-xs text-blue-600 mt-1">
                              Program:{" "}
                              {programs.find((p) => p._id === item.program)
                                ?.title || item.program}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100"
                            title="Edit"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 bg-red-50 rounded-full text-red-600 hover:bg-red-100"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      {item.imageURL && (
                        <div className="mt-3 h-48 bg-gray-100 overflow-hidden rounded-lg">
                          <img
                            src={item.imageURL}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {item.highlights?.length > 0 && (
                        <div className="mt-3">
                          <h4 className="font-medium text-sm">Highlights:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {item.highlights.map((hl, i) => (
                              <li key={i}>{hl}</li>
                            ))}
                          </ul>
                        </div>
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

export default NewsPage;
