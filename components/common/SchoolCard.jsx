import { Link } from "react-router";

const SchoolCard = ({
  to,
  image,
  title,
  description,
  country,
  location,
  aosDelay,
}) => {
  return (
    <div
      className="flex-1 min-w-0"
      data-aos="fade-down"
      data-aos-delay={aosDelay}
    >
      <div className="flex lg:flex-col md:flex-row sm:flex-col flex-col bg-white dark:bg-(--color-dark2-text) drop-shadow-md rounded-md min-w-0 flex-1 transition-colors duration-200 h-full">
        <Link
          to={to}
          className="inset-0 lg:w-full md:w-1/2 sm:w-full w-full aspect-video block overflow-hidden rounded-t-md lg:rounded-t-md lg:rounded-l-none md:rounded-t-none md:rounded-l-md sm:rounded-t-md sm::rounded-l-none"
        >
          <img
            src={image}
            alt="Hands-On Learning"
            className="w-full h-full object-cover transition-transform duration-400 ease-in-out hover:scale-105"
          />
        </Link>
        <div className="flex flex-col justify-start items-start lg:gap-3 md:gap-2 sm:gap-1.5 gap-1.5 flex-1 lg:p-5 md:p-3.5 sm:p-3.5 p-3.5">
          <h1 className="lg:text-xl md:text-lg sm:text-base text-base font-bold text-(--color-dark-text) dark:text-white w-full line-clamp-2">
            {title}
          </h1>
          <p className="w-full text-start lg:text-base md:text-sm sm:text-xs text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {description}
          </p>
          <Link
            to={location}
            className="lg:text-sm md:text-xs sm:text-xs text-xs link-container mt-auto flex flex-row items-center justify-center gap-1.5 text-(--color-primary) dark:text-(--color-primary2)"
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
