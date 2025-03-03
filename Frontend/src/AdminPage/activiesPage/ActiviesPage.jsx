import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublice";
import useRDFStore from "../../storage/useRDFstorage";

const ActiviesPage = () => {
  const [goal, setGoal] = useState({ id: "", title: "", img: "" });
  const { fetchActivites, activities } = useRDFStore();
  const Axios = useAxiosPublic();

  useEffect(() => {
    fetchActivites();
  }, []);

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/activities", goal)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Added successfully");
          fetchActivites();
          setGoal({ id: "", title: "", img: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    Axios.delete(`/activities/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          alert("Deleted successfully");
          fetchActivites();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Goal ID:</label>
          <input
            type="number"
            name="id"
            value={goal.id}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Goal Title:</label>
          <input
            type="text"
            name="title"
            value={goal.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL:</label>
          <input
            type="text"
            name="img"
            value={goal.img}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit Goal
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Activity List</h2>
      <ul className="mt-4 space-y-2">
        {activities.map((activity) => (
          <li
            key={activity._id}
            className="flex justify-between items-center p-2 border rounded-md"
          >
            <div>
              <p className="font-medium">{activity.title}</p>
              <img
                src={activity.img}
                alt={activity.title}
                className="w-16 h-16 mt-1"
              />
            </div>
            <button
              onClick={() => handleDelete(activity._id)}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiviesPage;
