import { Link } from "react-router";

const FeatureCard = ({ icon, title, description, to, aosDelay, index }) => {
  const cardContent = (
    <>
      <i
        className={`${icon} lg:text-3xl md:text-xl sm:text-lg text-lg text-(--color-primary) dark:text-(--color-primary2) mb-2`}
      ></i>
      <h1 className="lg:text-xl md:text-lg sm:text-base text-base font-bold text-(--color-dark-text) dark:text-white w-full">
        {title}
      </h1>
      <p className="w-full text-start lg:text-base md:text-sm sm:text-xs text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
        {description}
      </p>
    </>
  );

  const cardClasses = `
    [transition:all_200ms,translate_300ms] 
    flex 
    flex-col 
    justify-start 
    items-start 
    lg:gap-3 
    md:gap-1.5 
    sm:gap-1 
    gap-1 
    bg-white 
    dark:bg-(--color-dark2-text) 
    drop-shadow-md 
    rounded-md 
    lg:p-5 
    md:p-4 
    sm:p-3.5 
    p-3.5 
    hover:shadow-xl/4 
    hover:-translate-y-1 
    h-full
    w-full
    mx-auto
  `;

  // If it's the first card (index === 0), render as <a> tag
  if (index === 0) {
    return (
      <div
        data-aos="fade-down"
        data-aos-delay={aosDelay}
        data-aos-offset="50"
        className="w-full h-full"
      >
        <a href={to} className={cardClasses}>
          {cardContent}
        </a>
      </div>
    );
  }

  // For all other cards, render as Link
  return (
    <div
      data-aos="fade-down"
      data-aos-delay={aosDelay}
      data-aos-offset="50"
      className="w-full h-full"
    >
      <Link to={to} className={cardClasses}>
        {cardContent}
      </Link>
    </div>
  );
};

export default FeatureCard;
