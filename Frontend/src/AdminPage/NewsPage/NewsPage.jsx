import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useRDFStore from "../../storage/useRDFstorage";

const NewsPage = () => {
  const Axios = useAxiosPublic();
  const { newss, fetchNews, programs, fetchPrograms } = useRDFStore();
  useEffect(() => {
    if (newss.length === 0) {
      fetchNews();
    }
    if (programs.length === 0) {
      fetchPrograms();
    }
  }, []);
  console.log(newss);
  console.log(programs);
  const [news, setNews] = useState({
    title: "",
    author: "",
    date: "",
    type: "news",
    program: "",
    imageURL: "",
    imageCaption: "",
    highlights: [""],
    content: [{ title: "", description: "" }],
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  // Handle dynamic highlights
  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...news.highlights];
    updatedHighlights[index] = value;
    setNews({ ...news, highlights: updatedHighlights });
  };

  const addHighlight = () => {
    setNews({ ...news, highlights: [...news.highlights, ""] });
  };

  // Handle dynamic content sections
  const handleContentChange = (index, field, value) => {
    const updatedContent = [...news.content];
    updatedContent[index][field] = value;
    setNews({ ...news, content: updatedContent });
  };

  const addContent = () => {
    setNews({
      ...news,
      content: [...news.content, { title: "", description: "" }],
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadImageToImgbb(file);
    if (imageUrl) {
      setNews({ ...news, imageURL: imageUrl });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("News Data Submitted:", news);
    try {
      const response = await Axios.post("/news", news);
      console.log("News added successfully:", response.data);
      // Reset form after submission
      // setNews({
      //   title: "",
      //   author: "",
      //   date: "",
      //   imageURL: "",
      //   imageCaption: "",
      //   highlights: [""],
      //   content: [{ title: "", description: "" }],
      // });
    } catch (error) {
      console.error("Error submitting news:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin - Add News</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium">News Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter news title"
            value={news.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Type</label>
          <select
            name="type"
            value={news.type}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="news">News</option>
            <option value="blog">Blog</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Program Selection */}
        <div>
          <label className="block font-medium">Program</label>
          <select
            name="program"
            value={news.program}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program._id} value={program._id}>
                {program.title}
              </option>
            ))}
          </select>
        </div>

        {/* Author & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={news.author}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={news.date}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Image Caption */}
        <div>
          <label className="block font-medium">Image Caption</label>
          <input
            type="text"
            name="imageCaption"
            placeholder="Enter image caption"
            value={news.imageCaption}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Highlights Section */}
        <div>
          <h3 className="text-lg font-semibold">Highlights</h3>
          {news.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder={`Highlight ${index + 1}`}
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Highlight
          </button>
        </div>

        {/* Content Section */}
        <div>
          <h3 className="text-lg font-semibold">Content Sections</h3>
          {news.content.map((section, index) => (
            <div key={index} className="mb-4 border p-3 rounded bg-gray-100">
              <input
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) =>
                  handleContentChange(index, "title", e.target.value)
                }
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                placeholder="Section Description"
                value={section.description}
                onChange={(e) =>
                  handleContentChange(index, "description", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addContent}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Content
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Submit News
          </button>
        </div>
      </form>
      <h3 className="text-2xl font-semibold mt-10">News List</h3>
      <ul className="space-y-4 mt-4">
        {newss.map((item) => (
          <li
            key={item._id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-gray-600">
                By {item.author} on {item.date}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;
