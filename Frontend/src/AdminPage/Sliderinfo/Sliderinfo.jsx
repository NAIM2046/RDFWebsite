import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const Sliderinfo = () => {
  const [slider, setSlider] = useState({
    src: "",
    header: "",
    text: "",
  });
  const AxiosPublice = useAxiosSecure();
  const { isLoading, sliderinfo, fetchsliderinfo } = useRDFStore();
  console.log(sliderinfo);
  useEffect(() => {
    if (sliderinfo.length === 0) {
      fetchsliderinfo();
      console.log(sliderinfo);
    }
  }, [sliderinfo.length, fetchsliderinfo]);

  const handleChange = (e) => {
    setSlider({ ...slider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(slider);
    const result = await AxiosPublice.post("/slider", slider);
    if (result.data) {
      console.log(result.data);
      alert("Slider Info Saved Successfully!");
      fetchsliderinfo();
    }
    setSlider({ src: "", header: "", text: "" });
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    try {
      const result = await AxiosPublice.delete(`/slider/${id}`);
      if (result.data) {
        alert("Slider Deleted Successfully!");
        fetchsliderinfo(); // Refresh list after deletion
      }
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };
  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Admin - Slider Information</h1>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 shadow-md rounded-lg w-full md:w-1/2"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="src"
              value={slider.src}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Header</label>
            <input
              type="text"
              name="header"
              value={slider.header}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter header"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Text</label>
            <textarea
              name="text"
              value={slider.text}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter text"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Preview Section */}
        {slider.src && (
          <div className="mt-10 p-5 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-xl font-bold">veiw detail</h2>
            <img
              src={slider.src}
              alt="Preview"
              className="w-full h-60 object-cover mt-3 rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{slider.header}</h3>
            <p className="text-gray-700 mt-2">{slider.text}</p>
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Existing Sliders</h2>
          {isLoading ? (
            <p>Loading sliders...</p>
          ) : (
            <ul>
              {sliderinfo.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border-b p-2"
                >
                  <div>
                    <p className="font-semibold">{item.header}</p>
                    <img
                      src={item.src}
                      alt={item.header}
                      className="w-24 h-16 object-cover mt-1 rounded"
                    />
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
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

export default Sliderinfo;
