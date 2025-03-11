import { FaClock, FaUser, FaCalendarAlt, FaShareAlt } from "react-icons/fa"; // Import icons
import RelateNews from "../../Components/Navber/AllProjects/RelateNews";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { useEffect } from "react";

const NewsDetails = () => {
  // Demo news data
  const news = {
    title: "NGO Launches New Initiative to Support Education",
    author: "Admin",
    date: "2025-02-09T12:00:00Z",
    imageURL: "/assets/rdfphoto2/IMG_1070.jpg",
    imageCaption:
      "Children receiving educational materials under the new initiative",
    highlights: [
      "Providing education for 500+ underprivileged children",
      "Partnering with local communities for better outreach",
      "Sustainable and long-term impact focus",
    ],
    content: [
      {
        title: "Providing education for 500+ underprivileged children",
        discribed:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aperiam error iusto nam cupiditate voluptate perspiciatis, quam commodi cum corrupti magnam maiores consequatur pariatur totam hic velit numquam libero ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptates praesentium nam tempora doloribus, assumenda quidem cupiditate dolore ex sunt? Reiciendis voluptates architecto nemo quas molestiae quasi minima nulla soluta? ",
      },
      {
        title: "Partnering with local communities for better outreach",
        discribed:
          " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae delectus ex ipsum totam illo vel doloremque eius facilis inventore numquam ea maiores, distinctio modi nulla veniam rerum vitae molestias consequatur? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel reprehenderit perferendis non porro architecto molestias voluptatibus sapiente cumque, officia ex ab odit molestiae modi iure qui! A error odio odit! ",
      },
    ],
  };

  // Function to calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const currentUrl = encodeURIComponent(window.location.href);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto p-6">
      <div className="max-w-4xl mx-auto mt-16 shadow-lg">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 p-4 text-center font-serif">
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

        {/* Featured Image */}
        <div className="my-4">
          <img
            src={news.imageURL}
            alt={news.title}
            className="w-full h-full object-cover rounded-md shadow-sm"
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
          {news.content.map((paragraph, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {paragraph.title}
              </h3>
              <p>{paragraph.discribed}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related News Section */}
      <RelateNews />
    </div>
  );
};

export default NewsDetails;
