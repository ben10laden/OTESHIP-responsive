import React from "react";
import { Link } from "react-router";

const ImageCardSmall = ({ to, image, title, description, aosDelay }) => {
  return (
    <div
      className="flex-1 min-w-0"
      data-aos="fade-down"
      data-aos-delay={aosDelay}
    >
      <div className="flex flex-col bg-(--color-bg-primary) dark:bg-(--color-bg-dark) drop-shadow-md rounded-md flex-1 transition-colors duration-200 h-full">
        <Link
          to={to}
          className="inset-0 w-full block overflow-hidden rounded-t-md aspect-video lg:h-full md:h-36 sm:h-full h-full" // Fixed aspect ratio (16:9)
        >
          <img
            src={image}
            alt={title || "Card image"}
            className="w-full h-full object-cover transition-transform duration-400 ease-in-out hover:scale-105"
          />
        </Link>
        <div className="flex flex-col justify-start items-start gap-1 flex-1 lg:p-4 md:p-3 sm:p-2 p-2">
          <h1 className="lg:text-base md:text-sm sm:text-sm text-sm font-bold text-(--color-dark-text) dark:text-white w-full line-clamp-2">
            {title}
          </h1>
          <p className="w-full text-start lg:text-sm md:text-xs sm:text-xs text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary) line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCardSmall;
