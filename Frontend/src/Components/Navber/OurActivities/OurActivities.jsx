import { Link, useNavigate } from "react-router-dom";
import useRDFStore from "../../../storage/useRDFstorage";
import { useEffect } from "react";

const OurActivities = () => {
  const navigate = useNavigate();
  const { fetchActivites, activities } = useRDFStore();

  useEffect(() => {
    if (activities.length === 0) {
      fetchActivites();
    }
  }, []);
  // const activities = [
  //   {
  //     id: 1,
  //     title: "No Poverty",
  //     color: "bg-red-500",
  //     img: "/assets/RDF Photo/gole2.png",
  //   },
  //   {
  //     id: 2,
  //     title: "Zero Hunger",
  //     color: "bg-yellow-500",
  //     img: "/assets/RDF Photo/gole3.webp",
  //   },
  //   {
  //     id: 3,
  //     title: "Good Health & Well-being",
  //     color: "bg-green-500",
  //     img: "/assets/RDF Photo/gole4.png",
  //   },
  //   {
  //     id: 4,
  //     title: "Quality Education",
  //     color: "bg-red-600",
  //     img: "/assets/RDF Photo/gole5.png",
  //   },
  //   {
  //     id: 5,
  //     title: "Gender Equality",
  //     color: "bg-orange-500",
  //     img: "/assets/RDF Photo/gole6.png",
  //   },
  //   {
  //     id: 6,
  //     title: "Clean Water & Sanitation",
  //     color: "bg-blue-400",
  //     img: "/assets/RDF Photo/gole7.png",
  //   },
  //   {
  //     id: 7,
  //     title: "Affordable Clean Energy",
  //     color: "bg-yellow-400",
  //     img: "/assets/RDF Photo/gole11.png",
  //   },
  //   {
  //     id: 8,
  //     title: "Decent Work & Growth",
  //     color: "bg-rose-600",
  //     img: "/assets/RDF Photo/gole1.png",
  //   },
  //   {
  //     id: 9,
  //     title: "Industry & Innovation",
  //     color: "bg-orange-400",
  //     img: "/assets/RDF Photo/gole1.png",
  //   },
  //   {
  //     id: 10,
  //     title: "Reduced Inequalities",
  //     color: "bg-pink-500",
  //     img: "/assets/RDF Photo/gole1.png",
  //   },
  // ];

  return (
    <div className="text-center py-10 px-4">
      <h3 className="text-sm text-gray-500 tracking-widest uppercase">
        This is What We Do
      </h3>
      <h2 className="text-3xl font-bold text-indigo-900 mt-2 font-serif">
        Introduce Our Activities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-8 max-w-6xl mx-auto">
        {activities.map((activity) => (
          <div
            to="/activities-details"
            key={activity._id}
            state={{ activity }}
            onClick={() => {
              navigate("/activities-details", { state: { activity } });
            }}
            className={`rounded-lg overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl border-3 cursor-pointer border-white`}
          >
            <img
              src={activity.img}
              alt={activity.title}
              loading="lazy"
              className="w-full h-full sm:h-40 md:h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurActivities;
