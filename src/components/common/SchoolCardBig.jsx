import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const SchoolCardBig = ({
  to,
  image,
  title,
  description,
  country,
  location,
  imagePosition = "left", // 'left' or 'right'
  aosDelay,
}) => {
  const { t } = useTranslation("about");
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch justify-between w-full flex-1 gap-5 md:gap-6 lg:gap-7 xl:gap-8 sm:max-w-lg mx-none sm:mx-auto md:mx-none md:max-w-none ${
        imagePosition === "right" ? "md:flex-row-reverse" : ""
      }`}
      data-aos={imagePosition === "right" ? "fade-left" : "fade-right"}
      data-aos-delay={aosDelay}
    >
      <Link
        to={to}
        // Removed lg:max-h-80 from the Link so the container isn't rigidly capped
        className="w-full md:w-[45%] flex aspect-video md:aspect-auto max-h-56 sm:max-h-64 md:max-h-none overflow-hidden rounded-md shrink-0"
      >
        <img
          src={image}
          alt="Hands-On Learning"
          // Added lg:max-h-80 and lg:min-h-full directly to the image
          className="w-full h-full object-cover transition-transform duration-400 ease-in-out hover:scale-105 lg:max-h-80 lg:min-h-full"
        />
      </Link>
      <div className="flex flex-col justify-start items-start flex-1 gap-2 xs:gap-3 md:gap-3.5">
        <div className="flex flex-col justify-center items-start gap-2 xs:gap-2.5 md:gap-3 w-full">
          <h1 className="text-sm md:text-base lg:text-lg font-bold text-(--color-dark-text) dark:text-white w-full line-clamp-2">
            {title}
          </h1>
          <Link
            to={location}
            className="text-xs md:text-sm lg:text-base link-container flex flex-row items-center justify-center gap-1.5 text-(--color-primary) dark:text-(--color-primary2)"
          >
            <i className="fa-solid fa-location-dot"></i>
            <p className="hover-anim [--hover-color:var(--color-primary)] dark:[--hover-color:var(--color-primary2)]">
              {country}
            </p>
          </Link>
        </div>
        <p className="w-full text-start text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl">
          {description}
        </p>
        <Link
          to={to}
          className="text-xs md:text-sm lg:text-base link-container mt-auto text-(--color-primary) dark:text-(--color-primary2)"
        >
          <p className="hover-anim [--hover-color:var(--color-primary)] dark:[--hover-color:var(--color-primary2)]">
            {t("schoolCardBig.learnMore")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SchoolCardBig;
