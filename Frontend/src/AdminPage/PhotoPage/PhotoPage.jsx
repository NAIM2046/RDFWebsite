import React, { useEffect, useState } from "react";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";

const PhotoPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const Axios = useAxiosPublic();
  const { photo, fetchPhoto } = useRDFStore();
  useEffect(() => {
    console.log("fetching");
    fetchPhoto();
  }, []);
  console.log(photo);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const url = await uploadImageToImgbb(file);
      if (url) {
        setImageUrl(url);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoinfo = {
      title,
      imageUrl,
      text,
    };
    console.log(photoinfo);
    Axios.post("/photos", photoinfo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    Axios.delete(`/photos/${id}`)
      .then(() => fetchPhoto())
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload a Photo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Upload Image:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2"
            required
          />
        </div>
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <h2 className="text-xl font-bold mt-6">Photo List</h2>
      <div className="mt-4">
        {photo.map((item) => (
          <div
            key={item.id}
            className="border p-2 mb-2 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-32 h-20 object-cover rounded mt-2"
              />
              <p className="text-sm mt-1">{item.text}</p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoPage;
