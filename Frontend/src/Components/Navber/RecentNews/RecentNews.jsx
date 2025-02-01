import React from "react";

const newsData = [
  {
    id: 1,
    title: "Fintech 101: Exploring the Basics of Electronic Payments",
    author: "Harsh C.",
    date: "2 years ago",
    image: "https://pagedone.io/asset/uploads/1696244553.png",
  },
  {
    id: 2,
    title:
      "From Classroom to Cyberspace: The Growing Influence of EdTech in Fintech",
    author: "John D.",
    date: "2 years ago",
    image: "https://pagedone.io/asset/uploads/1696244579.png",
  },
  {
    id: 3,
    title:
      "Fintech Solutions for Student Loans: Easing the Burden of Education Debt",
    author: "Alexa H.",
    date: "2 years ago",
    image: "https://pagedone.io/asset/uploads/1696244619.png",
  },
];

const RecentNews = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-14">
          Our Popular Blogs
        </h2>

        {/* News Cards */}
        <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600"
            >
              <div className="flex items-center mb-6">
                <img
                  src={news.image}
                  alt={news.author}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <div className="block">
                <h4 className="text-gray-900 font-medium leading-8 mb-9">
                  {news.title}
                </h4>
                <div className="flex items-center justify-between font-medium">
                  <h6 className="text-sm text-gray-500">By {news.author}</h6>
                  <span className="text-sm text-indigo-600">{news.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <a
          href="#"
          className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 font-semibold mx-auto transition-all duration-300 hover:bg-gray-100"
        >
          View All
        </a>
      </div>
    </section>
  );
};

export default RecentNews;
