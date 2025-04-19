import React, { useState } from "react";

const weWorkForData = [
  {
    title: "The most socially & politically marginalized women",
    image: "/assets/rdfphoto2/PRA, Joyalbhanga.jpg",
    detail:
      "Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit necessitatibus autem soluta culpa quod amet officiis consequatur quas reprehenderit quidem! Hic ad sit officia iusto voluptatem fugit ab voluptatum sequi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio explicabo blanditiis mollitia voluptates ipsam modi ipsum. Iusto, quidem harum! Optio nulla nesciunt beatae laborum corporis iste fugiat soluta quisquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quia, cum nulla provident aperiam similique perspiciatis. Beatae ut iure est aperiam! Rerum in voluptatem, id facilis consequatur laboriosam natus porro. ",
  },
  {
    title: "Underprivileged children & youth",
    image: "/assets/children.webp",
    detail:
      "Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit necessitatibus autem soluta culpa quod amet officiis consequatur quas reprehenderit quidem! Hic ad sit officia iusto voluptatem fugit ab voluptatum sequi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio explicabo blanditiis mollitia voluptates ipsam modi ipsum. Iusto, quidem harum! Optio nulla nesciunt beatae laborum corporis iste fugiat soluta quisquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quia, cum nulla provident aperiam similique perspiciatis. Beatae ut iure est aperiam! Rerum in voluptatem, id facilis consequatur laboriosam natus porro. ",
  },
  {
    title: "Rural & Indigenous communities",
    image: "/assets/rdfphoto2/IMG_20210320_164610.jpg",
    detail:
      "Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit necessitatibus autem soluta culpa quod amet officiis consequatur quas reprehenderit quidem! Hic ad sit officia iusto voluptatem fugit ab voluptatum sequi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio explicabo blanditiis mollitia voluptates ipsam modi ipsum. Iusto, quidem harum! Optio nulla nesciunt beatae laborum corporis iste fugiat soluta quisquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quia, cum nulla provident aperiam similique perspiciatis. Beatae ut iure est aperiam! Rerum in voluptatem, id facilis consequatur laboriosam natus porro. ",
  },
  {
    title: "People affected by natural disasters",
    image: "/assets/rdfphoto2/IMG_20201231_111258.jpg",
    detail:
      "Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit necessitatibus autem soluta culpa quod amet officiis consequatur quas reprehenderit quidem! Hic ad sit officia iusto voluptatem fugit ab voluptatum sequi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio explicabo blanditiis mollitia voluptates ipsam modi ipsum. Iusto, quidem harum! Optio nulla nesciunt beatae laborum corporis iste fugiat soluta quisquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quia, cum nulla provident aperiam similique perspiciatis. Beatae ut iure est aperiam! Rerum in voluptatem, id facilis consequatur laboriosam natus porro. ",
  },
  {
    title: "Persons with disabilities",
    image: "/assets/rdfphoto1/DSC03021.JPG",
    detail:
      "Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit necessitatibus autem soluta culpa quod amet officiis consequatur quas reprehenderit quidem! Hic ad sit officia iusto voluptatem fugit ab voluptatum sequi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio explicabo blanditiis mollitia voluptates ipsam modi ipsum. Iusto, quidem harum! Optio nulla nesciunt beatae laborum corporis iste fugiat soluta quisquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quia, cum nulla provident aperiam similique perspiciatis. Beatae ut iure est aperiam! Rerum in voluptatem, id facilis consequatur laboriosam natus porro. ",
  },
  {
    title: "Elderly & abandoned seniors",
    image: "/assets/rdfphoto1/Edsc.JPG",
    detail:
      "Lorem Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit necessitatibus autem soluta culpa quod amet officiis consequatur quas reprehenderit quidem! Hic ad sit officia iusto voluptatem fugit ab voluptatum sequi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam odio explicabo blanditiis mollitia voluptates ipsam modi ipsum. Iusto, quidem harum! Optio nulla nesciunt beatae laborum corporis iste fugiat soluta quisquam? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quia, cum nulla provident aperiam similique perspiciatis. Beatae ut iure est aperiam! Rerum in voluptatem, id facilis consequatur laboriosam natus porro. ",
  },
];

const WeWorkFor = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div id="weworkfor" className="max-w-6xl mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 font-serif">
        We <span className="text-orange-400">Work For</span>
      </h2>
      <p className="text-green-400 max-w-3xl mx-auto mb-10">
        Our organization is committed to uplifting marginalized communities by
        addressing their unique challenges and empowering them through
        sustainable solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {weWorkForData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-green-400 font-serif mt-4">
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-md shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b p-2">
              {selectedItem.title}
            </h3>
            <p className="text-gray-700 mb-4 text-justify">
              {selectedItem.detail}
            </p>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-5 cursor-pointer bg-green-400 p-2 rounded-full right-2 text-red-500 text-xl font-bold "
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeWorkFor;
