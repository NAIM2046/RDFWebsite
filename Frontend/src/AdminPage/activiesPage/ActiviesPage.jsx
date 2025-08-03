import { useState, useEffect } from "react";
import useRDFStore from "../../storage/useRDFstorage";
import useAxiosSecure from "../../Hook/useAxoisSecure";
import uploadImageToImgbb from "../../Hook/ImgUpload";
import { FiTrash2, FiUpload, FiPlus, FiCheckCircle } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActiviesPage = () => {
  const [goal, setGoal] = useState({ id: "", title: "", img: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetchActivites, activities } = useRDFStore();
  const Axios = useAxiosSecure();

  useEffect(() => {
    fetchActivites();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "img") {
      const file = e.target.files[0];
      if (file) {
        setIsSubmitting(true);
        uploadImageToImgbb(file)
          .then((url) => {
            setGoal({ ...goal, img: url });
            toast.success("Image uploaded successfully!");
          })
          .catch((err) => {
            console.error("Image upload failed:", err);
            toast.error("Image upload failed. Please try again.");
          })
          .finally(() => setIsSubmitting(false));
        return;
      }
    }
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    Axios.post("/activities", goal)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Activity added successfully!");
          fetchActivites();
          setGoal({ id: "", title: "", img: "" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add activity. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      Axios.delete(`/activities/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("Activity deleted successfully!");
            fetchActivites();
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete activity.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Add New Activity
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity ID
                </label>
                <input
                  type="number"
                  name="id"
                  value={goal.id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter unique ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={goal.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter activity title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      {goal.img ? "Image uploaded" : "Click to upload image"}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    required={!goal.img}
                  />
                </label>
                {goal.img && (
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={goal.img}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium ${
                isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <FiPlus className="mr-2" />
                  Add Activity
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Activity List
          </h2>
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No activities found. Add your first activity above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={activity.img}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          ID: {activity.id}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(activity._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete activity"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiviesPage;
