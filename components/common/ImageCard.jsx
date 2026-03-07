import React from "react";
import { Link } from "react-router";

const ImageCard = ({ title, description, image }) => {
  return (
    <div className="flex-1" data-aos="fade-down" data-aos-delay="400">
      <div className="transition-colors duration-200 flex flex-col lg:p-5 md:p-3.5 sm:p-3.5 p-3.5 bg-(--color-bg-primary) dark:bg-(--color-bg-dark) rounded-md lg:gap-5 md:gap-4 sm:gap-3 gap-3 drop-shadow-sm flex-1 h-full">
        <Link
          to="/ceramics"
          className="inset-0 rounded-md max-h-72 block overflow-hidden"
        >
          <img
            src={image}
            alt="Hands-On Learning"
            className="w-full h-full object-cover rounded-md transition-transform duration-400 ease-in-out hover:scale-105"
          />
        </Link>

        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-(--color-dark-text) dark:text-white font-bold lg:text-lg md:text-base sm:text-sm text-sm">
            {title}
          </h1>
          <p className="lg:text-base md:text-sm sm:text-xs text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
