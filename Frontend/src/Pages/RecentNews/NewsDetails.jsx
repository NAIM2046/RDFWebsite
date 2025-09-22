import {
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaShareAlt,
  FaUserAlt,
  FaRegBookmark,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaRegComment,
} from "react-icons/fa6";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRDFStore from "../../storage/useRDFstorage";
import { IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const NewsDetails = () => {
  const location = useLocation();
  const news = location.state?.news;
  const currentUrl = encodeURIComponent(window.location.href);
  const { newss, fetchNews } = useRDFStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!newss.length) {
      fetchNews();
    }
  }, []);
  console.log(newss);

  // Filter related news
  const filterNews = (newss || []).filter(
    (newsss) =>
      String(newsss.program) === String(news?.program) &&
      String(newsss._id) !== String(news?._id)
  );

  // Calculate reading time
  const calculateReadingTime = (text) => {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Format date beautifully
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Social share links
  const socialLinks = [
    {
      platform: "Facebook",
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      color: "text-blue-600 hover:bg-blue-100",
    },
    {
      platform: "Twitter",
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${currentUrl}`,
      color: "text-blue-400 hover:bg-blue-100",
    },
    {
      platform: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: `https://www.linkedin.com/shareArticle?url=${currentUrl}`,
      color: "text-blue-700 hover:bg-blue-100",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>{`RDF - ${news?.title || "News Details"}`}</title>
        <meta
          name="description"
          content={news?.content?.[0]?.description || ""}
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <a href="/" className="text-gray-400 hover:text-gray-500">
                    <span className="text-blue-600">Home</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <IoIosArrowForward className="flex-shrink-0 h-4 w-4 text-gray-400" />
                  <a
                    href="/news"
                    className="ml-4 text-gray-400 hover:text-gray-500"
                  >
                    News
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <IoIosArrowForward className="flex-shrink-0 h-4 w-4 text-gray-400" />
                  <span className="ml-4 text-gray-500 font-medium">
                    {news?.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Article Header */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                  {news?.type}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {news?.title}
                </h1>
              </div>
              <button className="text-gray-400 hover:text-blue-600 p-2">
                <FaRegBookmark className="text-xl" />
              </button>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
              <div className="flex items-center">
                <FaUser className="mr-2 text-blue-600" />
                <span className="font-medium">
                  {news?.author || "Unknown Author"}
                </span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                <time dateTime={news?.date}>{formatDate(news?.date)}</time>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-blue-600" />
                <span>
                  {calculateReadingTime(
                    news?.content?.map((item) => item?.description).join(" ") ||
                      ""
                  )}{" "}
                  min read
                </span>
              </div>
              <div className="flex items-center">
                <FaRegComment className="mr-2 text-blue-600" />
                <span>Leave a comment</span>
              </div>
            </div>
          </div>

          {/* Featured Image - Enhanced Section */}
          <div className="relative w-full overflow-hidden">
            <div className="flex justify-center items-center bg-gray-100 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full max-w-4xl h-full"
              >
                <img
                  src={news?.imageURL}
                  alt={news?.title}
                  className="w-full h-full object-contain max-h-[500px] md:max-h-[600px] mx-auto"
                  loading="eager"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' fill='%23f3f4f6'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Cpath d='M400 300L300 200 400 100 500 200 400 300Z' fill='%23d1d5db'/%3E%3Cpath d='M250 400L150 300 250 200 350 300 250 400Z' fill='%23d1d5db'/%3E%3Cpath d='M550 400L450 300 550 200 650 300 550 400Z' fill='%23d1d5db'/%3E%3C/svg%3E";
                  }}
                />

                {/* Loading shimmer effect */}
                {!news?.imageURL && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                )}

                {/* Subtle frame effect on hover */}
                <div className="absolute inset-0 border-8 border-white opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            </div>

            {news?.imageCaption && (
              <div className="text-center bg-gray-50 py-3 px-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic max-w-3xl mx-auto">
                  {news.imageCaption}
                </p>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="px-8 py-8">
            {/* Key Highlights */}
            {news?.highlights?.length > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {news.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 text-blue-500 mr-3 mt-1">
                        •
                      </span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Content */}
            <div className="prose max-w-none text-gray-700">
              {news?.content?.length > 0 ? (
                news.content.map((paragraph, index) => (
                  <div key={index} className="mb-8">
                    {paragraph.title && (
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {paragraph.title}
                      </h3>
                    )}
                    <p className="mb-4 leading-relaxed">
                      {paragraph.description}
                    </p>
                    {paragraph.imageUrl && (
                      <figure className="my-6">
                        <div className="flex justify-center">
                          <img
                            src={paragraph.imageUrl}
                            alt={paragraph.title || "Content image"}
                            className="rounded-lg shadow-md w-full max-w-2xl"
                            loading="lazy"
                          />
                        </div>
                        {paragraph.imageCaption && (
                          <figcaption className="text-center text-sm text-gray-500 mt-2">
                            {paragraph.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No content available</p>
              )}
            </div>

            {/* Related Links */}
            {news?.socialMediaLinks?.some((link) => link.link) && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Related Links
                </h3>
                <ul className="space-y-3">
                  {news.socialMediaLinks.map(
                    (item, index) =>
                      item.link && (
                        <li key={index}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-start"
                          >
                            <span className="mr-2">→</span>
                            <span>{item.header || "Related Link"}</span>
                          </a>
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-gray-700 font-medium mr-3">Share:</span>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center border rounded-full ${social.color} transition-colors`}
                      aria-label={`Share on ${social.platform}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                Back to Top
              </button>
            </div>
          </div>
        </motion.article>

        {/* Related News Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related News
          </h2>

          {filterNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterNews.slice(0, 3).map((relatedNews) => (
                <motion.div
                  key={relatedNews._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={relatedNews.imageURL}
                      alt={relatedNews.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="flex items-center mr-4">
                        <FaUser className="mr-1 text-blue-600" />
                        {relatedNews.author}
                      </span>
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1 text-blue-600" />
                        {formatDate(relatedNews.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {relatedNews.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedNews.content?.[0]?.description ||
                        "No description available"}
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/news/${relatedNews._id}`, {
                          state: { news: relatedNews },
                        })
                      }
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      Read More <IoIosArrowForward className="ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="max-w-md mx-auto">
                <svg
                  className="h-16 w-16 text-gray-400 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No related news found
                </h3>
                <p className="mt-2 text-gray-500">
                  We couldn't find any related news articles. Check back later
                  or explore our other news stories.
                </p>
                <div className="mt-6">
                  <a
                    href="/news"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View All News
                  </a>
                </div>
              </div>
            </div>
          )}

          {filterNews.length > 3 && (
            <div className="mt-8 text-center">
              <a
                href="/news"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View All News
                <IoIosArrowForward className="ml-2" />
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NewsDetails;
