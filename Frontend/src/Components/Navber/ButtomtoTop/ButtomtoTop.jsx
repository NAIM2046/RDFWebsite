import React, { useState, useEffect } from "react";
import { RxDoubleArrowUp } from "react-icons/rx";

const ButtomtoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to show/hide button
  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };

  // Scroll to top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 p-3 bg-green-700 text-white rounded-full shadow-lg z-50 
        transition-opacity duration-300 transform cursor-pointer hover:bg-blue-600 focus:outline-none
        ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
    >
      <RxDoubleArrowUp className="text-2xl" />
    </button>
  );
};

export default ButtomtoTop;
