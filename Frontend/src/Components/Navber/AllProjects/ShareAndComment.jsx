import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaShareAlt,
} from "react-icons/fa";

const ShareAndComment = () => {
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = () => {
    const { name, email, comment } = commentData;

    if (!name.trim() || !email.trim() || !comment.trim()) {
      alert("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newCommentData = {
      name,
      email,
      comment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([newCommentData, ...comments]);
    setCommentData({ name: "", email: "", comment: "" });
  };

  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div>
      {/* Share & Comment Section */}
      <div className="mt-6">
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

        {/* Comment Section */}
        <div className=" max-w-6xl mx-auto space-y-4 mt-4 flex flex-col pl-8">
          <h2 className="text-2xl font-semibold text-blue-600">
            Leave a Reply
          </h2>

          <textarea
            name="comment"
            className="w-full sm:w-[70%] p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 h-40"
            placeholder="Write a comment..."
            value={commentData.comment}
            onChange={handleInputChange}
          ></textarea>

          <input
            name="name"
            className="w-full sm:w-[70%]  p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Your Name"
            value={commentData.name}
            onChange={handleInputChange}
          />

          <input
            name="email"
            className="w-full sm:w-[70%]  p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Your Email"
            value={commentData.email}
            onChange={handleInputChange}
          />

          <button
            className="w-full max-w-sm bg-green-600 text-white py-3 rounded-lg cursor-pointer transition"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>

        {/* Display Comments */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h2>

          <ul className="mt-4 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-lg shadow-md ${
                    index % 2 === 0 ? "bg-blue-100" : "bg-green-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700">
                        {comment.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {comment.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{comment.comment}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShareAndComment;
