import {
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaShareAlt,
  FaUserAlt,
} from "react-icons/fa"; // Import icons
import RelateNews from "../../Components/Navber/AllProjects/RelateNews";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRDFStore from "../../storage/useRDFstorage";
import { IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet-async";
const NewsDetails = () => {
  const location = useLocation();
  const news = location.state?.news;
  console.log(news);

  // Function to calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const currentUrl = encodeURIComponent(window.location.href);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const { newss, fetchNews } = useRDFStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!newss.length) {
      fetchNews();
    }
  }, []);

  console.log("news", newss);

  const filterNews = (newss || []).filter(
    (newsss) =>
      String(newsss.program) === String(news?.program) &&
      String(newsss._id) !== String(news?._id)
  );

  console.log("filternews", filterNews);

  const truncateDescription = (text, wordLimit = 30) => {
    return text.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="mx-auto p-6">
      <Helmet>
        <title> RDF-News-details </title>
      </Helmet>
      <div className="max-w-4xl mx-auto mt-16 lg:mt-0 shadow-lg mb-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-400 p-4 text-center font-serif">
          {news.title}
        </h1>

        {/* Author, Date & Reading Time */}
        <div className="flex  justify-center items-center text-gray-500 text-sm mt-3 gap-4 p-4 ">
          <p className="flex items-center gap-2">
            <FaUser className="text-orange-400" />{" "}
            <span className="font-semibold">{news.author}</span>
          </p>
          {"|"}
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-orange-400" />{" "}
            {new Date(news.date).toLocaleDateString()}
          </p>
          {"|"}
          <p className="flex items-center gap-2">
            <FaClock className="text-orange-400" />{" "}
            {calculateReadingTime(
              news.content.map((item) => item.discribed).join(" ")
            )}{" "}
            min read
          </p>
        </div>

        {/* Social Share Buttons */}

        {/* Featured Image */}
        <div className="my-4">
          <img
            src={news.imageURL}
            alt={news.title}
            className="w-full max-h-[600px] object-cover"
          />
          <p className="text-sm text-gray-500 mt-1 italic text-center">
            {news.imageCaption}
          </p>
        </div>

        {/* Key Highlights / Takeaways */}
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Highlights</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {news.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center gap-2">
                <FaClock className="text-blue-500" /> {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* News Content with Paragraph Headers */}
        <div className="text-gray-700 leading-7 space-y-6 p-4">
          {news?.content?.length > 0 ? (
            news.content.map((paragraph, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  {paragraph.title}
                </h3>
                <p>{paragraph.description}</p>
                {paragraph.imageUrl ? (
                  <img
                    src={paragraph.imageUrl}
                    alt={paragraph.title || "News Image"}
                    className="w-96 mx-auto"
                    loading="lazy"
                  />
                ) : (
                  <p className="text-gray-500 italic">No image available</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No news available</p>
          )}
        </div>
        {news?.socialMediaLinks?.some((link) => link.link) && (
          <div className="mt-6 p-4 ">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 font-serif">
              Related Links
            </h3>
            <ul className="space-y-2">
              {news.socialMediaLinks.map(
                (item, index) =>
                  item.link && (
                    <li key={index} className="">
                      {item.header || "Click here"}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-2"
                      >
                        Click here
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        <div className="border-t pt-6 flex justify-between border-b pb-4 px-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaShareAlt className="text-orange-500" /> Share
          </h2>
          <div className="flex gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border rounded-full text-blue-600 hover:bg-blue-100 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border rounded-full text-blue-400 hover:bg-blue-100 transition"
            >
              <FaTwitter />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border rounded-full text-blue-700 hover:bg-blue-100 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Related News Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-12">
            Related News
          </h2>

          {filterNews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filterNews.slice(0, 3).map((news) => (
                <div
                  key={news._id}
                  className="group border border-gray-300 rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={news.imageURL}
                    alt={`Blog image ${news._id}`}
                    className="w-full h-64 object-cover rounded-t-3xl"
                  />
                  <div className="p-6 bg-white group-hover:bg-indigo-50 transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <FaUserAlt className="text-indigo-600 text-xl" />
                        <span className="text-indigo-600 font-semibold">
                          {news.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-indigo-600 text-xl" />
                        <span className="text-gray-500 text-sm">
                          {new Date(news.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xl text-gray-900 font-semibold mt-2 mb-4">
                      {news.title}
                    </h4>
                    <p className="text-gray-600 text-base mb-6">
                      {news.content?.[0]?.description
                        ? news.content[0].description
                            .split(" ")
                            .slice(0, 20)
                            .join(" ") + "..."
                        : "No description available."}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/news/${news._id}`, { state: { news } })
                      }
                      className="flex items-center space-x-2 text-indigo-600 font-semibold border border-indigo-600 px-4 py-2 rounded-lg transition-all hover:bg-indigo-600 hover:text-white cursor-pointer"
                    >
                      Read Details
                      <IoIosArrowForward className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white rounded-2xl shadow p-10 max-w-2xl mx-auto">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                alt="No news found"
                className="w-24 h-24 mx-auto mb-6 opacity-70"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No Related News Found
              </h3>
              <p className="text-gray-600 mb-4">
                Please check back later or explore other categories.
              </p>
              <a
                href="/news"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View All News
              </a>
            </div>
          )}

          {/* View All Button (only if there’s related news) */}
          {filterNews.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/news"
                className="text-lg text-indigo-600 font-semibold hover:underline"
              >
                View All News
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;
