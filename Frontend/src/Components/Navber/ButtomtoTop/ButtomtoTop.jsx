import React, { useState, useEffect } from "react";
import { RxDoubleArrowUp } from "react-icons/rx";
const ButtomtoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to show/hide button
  const handleScroll = () => {
    if (window.scrollY > 200) {
      // Show button after scrolling down 200px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
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
    <div>
      {/* Button appears when isVisible is true */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 bg-blue-500 cursor-pointer text-white rounded-full shadow-lg z-50 hover:bg-blue-600 focus:outline-none"
        >
          <RxDoubleArrowUp className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default ButtomtoTop;
