import { useState } from "react";
import NewsFilter from "./NewsFilter";
import PageCoverPhoto from "../../Components/Navber/PageCoverPhoto/PageCoverPhoto";

import { useLocation, useNavigate } from "react-router-dom";
const newsData = [
  {
    id: 1,
    date: "07 FEB 2025",
    region: "Occupied Palestinian Territory",
    theme: "Politics",
    title:
      "West Bank: Nearly Half of All Child Killings Since Records Began Happened in Last Two Years",
    description:
      "At least 224 children have been killed by Israeli forces or settlers since January 2023, accounting for nearly half of the 468 children killed in the West Bank since records began in 2005, according to OCHA.",
    image: "/assets/news.webp",
  },
  {
    id: 2,
    date: "05 FEB 2025",
    region: "Global",
    theme: "Human Rights",
    title:
      "Suffering Has Not Stopped for Children in Gaza - Save the Children CEO",
    description:
      "Children in Gaza continue to face immense hardship, with limited access to food, water, and medical aid amid ongoing conflicts.",
    image: "/assets/news1.webp",
  },
  {
    id: 3,
    date: "03 FEB 2025",
    region: "Global",
    theme: "Environment",
    title:
      "Climate Crisis: UN Reports Record-Breaking Global Temperatures in 2024",
    description:
      "The UN's latest report highlights that 2024 was the hottest year on record, emphasizing the urgent need for climate action.",
    image: "/assets/children.webp",
  },
  {
    id: 4,
    date: "01 FEB 2025",
    region: "Global",
    theme: "Health",
    title:
      "Global Health Concerns Rise as New Pandemic Preparedness Measures Announced",
    description:
      "World Health Organization urges nations to strengthen their pandemic preparedness plans amid rising health risks.",
    image: "/assets/children.webp",
  },
  {
    id: 5,
    date: "30 JAN 2025",
    region: "Global",
    theme: "Technology",
    title:
      "AI Breakthrough: New Model Achieves Human-Level Understanding in Medical Diagnosis",
    description:
      "A major AI breakthrough has been achieved, with new models demonstrating human-level understanding in diagnosing diseases.",
    image: "/assets/children.webp",
  },
  {
    id: 6,
    date: "28 JAN 2025",
    region: "Global",
    theme: "Politics",
    title: "Global Leaders Meet to Discuss Ongoing Geopolitical Tensions",
    description:
      "World leaders gather for an emergency summit to address rising geopolitical tensions and conflicts.",
    image: "/assets/children.webp",
  },
];

const RecentNews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;
  const [filteredRegion, setFilteredRegion] = useState("All Regions");
  const [filteredTheme, setFilteredTheme] = useState("All Themes");
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean).pop();

  console.log(path);

  const filteredNews = newsData.filter(
    (news) =>
      (filteredRegion === "All Regions" || news.region === filteredRegion) &&
      (filteredTheme === "All Themes" || news.theme === filteredTheme)
  );
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <PageCoverPhoto
          title={path.toUpperCase()}
          subtitle="We Are A Global Non-Profit Organization That Supports Good Causes and Positive Changes All Over The World."
        ></PageCoverPhoto>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          LATES {path.toUpperCase()}
        </h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <NewsFilter
            onFilter={(region, theme) => {
              setFilteredRegion(region);
              setFilteredTheme(theme);
            }}
          ></NewsFilter>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {currentNews.map((news) => (
            <div
              key={news.id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4"
            >
              {/* News Image (Left on larger screens, Top on smaller screens) */}
              <img
                src={news.image}
                alt={news.title}
                className="w-full md:w-1/3 h-48 object-cover rounded-md"
              />

              {/* News Content (Right on larger screens, Below on smaller screens) */}
              <div className="w-full md:w-2/3">
                <p className="text-sm text-gray-500">
                  {news.date} |{" "}
                  <span className="font-semibold text-red-600">
                    {news.category}
                  </span>
                </p>
                <h2 className="text-xl font-bold text-gray-800 mt-2">
                  {news.title}
                </h2>
                <p className="text-gray-600 mt-2">{news.description}</p>
                <a
                  onClick={() => {
                    navigate("/news/details");
                  }}
                  className="text-blue-600 font-medium mt-2 inline-block cursor-pointer"
                >
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 mx-1 rounded bg-gray-200"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2 mx-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 mx-1 rounded bg-gray-200"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecentNews;
