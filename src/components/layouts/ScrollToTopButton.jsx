import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position and toggle button visibility
  const toggleVisibility = () => {
    if (window.pageYOffset > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", toggleVisibility);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      aria-label="Scroll to Top"
      onClick={scrollToTop}
      className={`no-scale z-500 bg-(--color-primary) hover:bg-(--color-primary-hover) dark:bg-(--color-primary2) dark:hover:bg-(--color-primary2-hover) drop-shadow-md cursor-pointer fixed right-0 bottom-0 p-6 md:p-6.5 m-5 rounded-full flex items-center justify-center transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <i className="text-white text-xl fixed fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTopButton;
