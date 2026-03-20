import { Link } from "react-router";

const FeatureCard = ({ icon, title, description, to, index }) => {
  const cardContent = (
    <>
      <i
        className={`${icon} text-base xs:text-lg md:text-xl lg:text-2xl text-(--color-primary) dark:text-(--color-primary2)`}
      ></i>
      <h1 className="text-sm md:text-base lg:text-lg font-bold text-(--color-dark-text) dark:text-white w-full">
        {title}
      </h1>
      <p className="w-full text-start text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
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
    gap-1.5
    xs:gap-2
    md:gap-2.5
    bg-white 
    dark:bg-(--color-dark2-text) 
    drop-shadow-md 
    rounded-md 
    p-3 
    xs:p-3.5 
    md:p-4 
    xl:p-5 
    hover:shadow-xl/4 
    hover:-translate-y-1 
    h-full
    w-full
    mx-auto
    no-highlight
  `;

  if (index === 0) {
    return (
      <div className="w-full h-full">
        <a href={to} className={cardClasses}>
          {cardContent}
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Link to={to} className={cardClasses}>
        {cardContent}
      </Link>
    </div>
  );
};

export default FeatureCard;
