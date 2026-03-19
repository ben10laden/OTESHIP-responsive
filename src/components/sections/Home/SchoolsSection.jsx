import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import SchoolCard from "../../common/SchoolCard";
import SectionHeader from "../../common/SectionHeader";

const SchoolsSection = () => {
  const { schoolCardsData } = useLanguageData();
  const { t } = useTranslation("home");

  return (
    <section
      className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200 scroll-mt-8"
      id="schools"
    >
      <div className="flex flex-col justify-between items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        <SectionHeader
          title={t("schools.title")}
          description={t("schools.description")}
        />

        <div className="flex flex-col sm:grid sm:grid-cols-4 md:flex md:flex-col lg:flex-row items-stretch justify-center gap-3 xs:gap-4 md:gap-5 lg:gap-6 xl:gap-8 w-full max-w-7xl md:max-w-2xl lg:max-w-7xl">
          {schoolCardsData.map((school, index) => (
            <div
              key={index}
              className={`w-full max-w-sm mx-auto sm:max-w-none flex justify-center lg:flex-1 ${
                index === 2 ? "sm:col-span-2 sm:col-start-2" : "sm:col-span-2"
              }`}
            >
              <SchoolCard
                to={school.to}
                image={school.image}
                title={school.title}
                description={school.description}
                country={school.country}
                location={school.location}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolsSection;
