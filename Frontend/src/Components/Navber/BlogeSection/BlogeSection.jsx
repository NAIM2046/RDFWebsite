import React from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
const BlogSection = () => {
  // Blog data array
  const blogs = [
    {
      id: 1,
      date: "Jan 01, 2023",
      title: "Clever ways to invest in product to organize your portfolio",
      description:
        "Discover smart investment strategies to streamline and organize your portfolio..",
      imgSrc: "https://pagedone.io/asset/uploads/1696244317.png",
      link: "#",
    },
    {
      id: 2,
      date: "Feb 01, 2023",
      title: "How to grow your profit through systematic investment with us",
      description:
        "Unlock the power of systematic investment with us and watch your profits soar. Our..",
      imgSrc: "https://pagedone.io/asset/uploads/1696244340.png",
      link: "#",
    },
    {
      id: 3,
      date: "Mar 01, 20233",
      title: "How to analyze every holdings of your portfolio",
      description:
        "Our comprehensive guide will equip you with the tools and insights needed to..",
      imgSrc: "https://pagedone.io/asset/uploads/1696244356.png",
      link: "#",
    },
    {
      id: 4,
      date: "Jan 01, 2023",
      title: "Clever ways to invest in product to organize your portfolio",
      description:
        "Discover smart investment strategies to streamline and organize your portfolio..",
      imgSrc: "https://pagedone.io/asset/uploads/1696244317.png",
      link: "#",
    },
    {
      id: 5,
      date: "Feb 01, 2023",
      title: "How to grow your profit through systematic investment with us",
      description:
        "Unlock the power of systematic investment with us and watch your profits soar. Our..",
      imgSrc: "https://pagedone.io/asset/uploads/1696244340.png",
      link: "#",
    },
    {
      id: 6,
      date: "Mar 01, 20233",
      title: "How to analyze every holdings of your portfolio",
      description:
        "Our comprehensive guide will equip you with the tools and insights needed to..",
      imgSrc: "https://pagedone.io/asset/uploads/1696244356.png",
      link: "#",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 font-serif">
          Our latest News And Blog
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group border border-gray-300 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="flex items-center">
                <img
                  src={blog.imgSrc}
                  alt={`Blog image ${blog.id}`}
                  className="rounded-t-2xl w-full object-cover"
                />
              </div>
              <div className="p-5 transition-all duration-300 bg-white group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium mb-3 flex space-x-2">
                  <FaCalendarDays className="text-xl" />{" "}
                  <p className=""> {blog.date}</p>
                </span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
                  {blog.title}
                </h4>
                <p className="text-gray-500 leading-6 mb-10">
                  {blog.description}
                </p>
                <a
                  href="/news/details"
                  className="cursor-pointer text-sm text-indigo-600 font-semibold btn btn-outline btn-ghost hover:shadow-lg"
                >
                  Read Details{" "}
                  <IoIosArrowRoundForward className="rotate-320 text-2xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/news"
            className="text-lg text-indigo-600 font-semibold hover:underline flex justify-center items-center font-serif"
          >
            VIEW ALL NEWS <IoMdArrowRoundForward className="text-2xl ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
