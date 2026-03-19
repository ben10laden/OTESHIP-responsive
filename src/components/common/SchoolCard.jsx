import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router"; // (Note: depending on your router version, this might be 'react-router-dom')

const SchoolCard = ({ to, image, title, description, country, location }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null); // 1. Add a ref for the image

  // If the image prop changes, reset the loaded state
  useEffect(() => {
    if (image) {
      setIsLoaded(false);
    }
  }, [image]);

  // 2. Check if the image is ALREADY loaded by the browser cache
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleCardClick = () => {
    if (to.startsWith("http")) {
      window.location.href = to;
    } else {
      navigate(to);
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div
        onClick={handleCardClick}
        className="flex flex-col md:flex-row lg:flex-col bg-white dark:bg-(--color-dark2-text) drop-shadow-md rounded-md min-w-0 flex-1 [transition:all_200ms,translate_300ms] hover:shadow-xl/4 hover:-translate-y-1 h-full cursor-pointer"
      >
        <div className="relative block w-full aspect-video overflow-hidden rounded-t-md md:w-1/2 md:rounded-none md:rounded-l-md lg:w-full lg:rounded-none lg:rounded-t-md bg-gray-200 dark:bg-gray-800 shrink-0">
          {/* Pulsing Skeleton Overlay */}
          <div
            className={`absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse transition-opacity duration-400 ease-in-out ${
              isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {/* The Actual Image */}
          {image && (
            <img
              ref={imgRef} // Attach the ref here
              src={image}
              alt={title || "School"}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)} // Fail gracefully if image is broken
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>

        <div className="flex flex-col justify-start items-start gap-1.5 xs:gap-2 md:gap-2.5 flex-1 p-3 xs:p-3.5 md:p-4 xl:p-5">
          <h1 className="text-sm md:text-base lg:text-lg font-bold text-(--color-dark-text) dark:text-white w-full line-clamp-2">
            {title}
          </h1>

          <p className="w-full text-start text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {description}
          </p>

          <Link
            to={location}
            onClick={(e) => e.stopPropagation()}
            className="text-xs md:text-sm lg:text-base link-container mt-auto flex flex-row items-center justify-center gap-1.5 text-(--color-primary) dark:text-(--color-primary2)"
          >
            <i className="fa-solid fa-location-dot"></i>
            <p className="hover-anim [--hover-color:var(--color-primary)] dark:[--hover-color:var(--color-primary2)]">
              {country}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
