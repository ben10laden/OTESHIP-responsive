import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import SchoolCard from "../../common/SchoolCard";

const SchoolsSection = () => {
  const { schoolCardsData } = useLanguageData();
  const { t } = useTranslation("home");
  return (
    <section
      className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) lg:p-20 md:p-15 sm:p-10 p-10 transition-colors duration-200 scroll-mt-8"
      id="schools"
    >
      <div className="flex flex-col justify-between items-center lg:gap-10 md:gap-8 sm:gap-6 gap-6">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center lg:gap-4 md:gap-2 sm:gap-1 gap-1"
        >
          <h1 className="font-bold lg:text-4xl md:text-2xl sm:text-lg text-lg text-(--color-dark-text) dark:text-white">
            {t("schools.title")}
          </h1>
          <h1 className="lg:text-lg md:text-base sm:text-sm text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl text-center">
            {t("schools.description")}
          </h1>
        </div>
        <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col items-stretch justify-center lg:gap-8 md:gap-5 sm:gap-4 gap-4 max-w-7xl">
          {schoolCardsData.map((school, index) => (
            <SchoolCard
              key={index}
              to={school.to}
              image={school.image}
              title={school.title}
              description={school.description}
              country={school.country}
              location={school.location}
              aosDelay={300 + index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolsSection;
