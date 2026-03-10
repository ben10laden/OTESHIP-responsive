import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import SectionHeader from "../../common/SectionHeader";

const ImpactSection = () => {
  const { impactNumbersData } = useLanguageData();
  const { t } = useTranslation("about");
  return (
    <section
      className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200 scroll-mt-16"
      id="impact"
    >
      <div className="flex flex-col justify-between items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        <SectionHeader title={t("impact.title")} />

        {/* Updated this single line to handle the grid -> flex switch */}
        <div className="grid grid-cols-2 w-full xs:flex xs:flex-row items-center justify-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-18 xl:gap-20 max-w-7xl">
          {impactNumbersData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2"
              data-aos="fade-down"
              data-aos-delay={300 + index * 150}
            >
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-(--color-primary) dark:text-(--color-primary2)">
                {item.num}
              </h1>
              <p className="uppercase text-center text-xs md:text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
