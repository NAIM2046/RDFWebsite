import React from "react";

const RelateNews = () => {
  const blogs = [
    {
      id: 1,
      date: "Jan 01, 2023",
      title: "Clever ways to invest in product to organize your portfolio",
      description:
        "Discover smart investment strategies to streamline and organize your portfolio.",
      imgSrc: "https://pagedone.io/asset/uploads/1696244317.png",
      link: "#",
    },
    {
      id: 2,
      date: "Feb 01, 2023",
      title: "How to grow your profit through systematic investment with us",
      description:
        "Unlock the power of systematic investment with us and watch your profits soar.",
      imgSrc: "https://pagedone.io/asset/uploads/1696244340.png",
      link: "#",
    },
    {
      id: 3,
      date: "Mar 01, 2023",
      title: "How to analyze every holding of your portfolio",
      description:
        "Our comprehensive guide will equip you with the tools and insights needed.",
      imgSrc: "https://pagedone.io/asset/uploads/1696244356.png",
      link: "#",
    },
    {
      id: 4,
      date: "Apr 01, 2023",
      title: "The importance of diversifying your investments",
      description:
        "Learn why diversification is key to reducing risk and increasing long-term returns.",
      imgSrc: "https://pagedone.io/asset/uploads/1696244356.png",
      link: "#",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-10">
          Project Relate News
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group border border-gray-300 rounded-2xl overflow-hidden shadow-sm transition-transform transform hover:scale-105"
            >
              <img
                src={blog.imgSrc}
                alt={`Blog image ${blog.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 transition-all duration-300 group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium">{blog.date}</span>
                <h4 className="text-xl text-gray-900 font-semibold mt-2">
                  {blog.title}
                </h4>
                <p className="text-gray-500 mt-2">{blog.description}</p>
                <a
                  href={blog.link}
                  className="block text-indigo-600 font-semibold mt-4"
                >
                  Read more..
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/all-blogs"
            className="text-lg text-indigo-600 font-semibold hover:underline"
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
};

export default RelateNews;
