import React from "react";
import SchoolCardBig from "../../common/SchoolCardBig";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import SectionHeader from "../../common/SectionHeader";

const SchoolsSection = () => {
  const { t } = useTranslation("about");
  const { schoolData } = useLanguageData();
  return (
    <section className="bg-white dark:bg-(--color-dark-text) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10 max-w-7xl mx-auto">
        <SectionHeader title={t("schools.title")} />
        <div
          className="flex flex-col gap-8 lg:gap-10 xl:gap-12"
          data-aos-delay="300"
        >
          {schoolData.map((school, index) => (
            <SchoolCardBig
              key={index}
              to={school.to}
              image={school.image}
              title={school.title}
              description={school.description}
              country={school.country}
              location={school.location}
              imagePosition={index % 2 === 0 ? "left" : "right"}
              aosDelay={150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolsSection;
