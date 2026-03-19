import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const EntrepreneursSection = () => {
  const { t } = useTranslation("guide");
  const { businessDemandsData } = useLanguageData();

  return (
    <section
      className="flex flex-col gap-8 scroll-mt-32 w-full"
      id="entrepreneurs"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3" data-aos="fade-up">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="h-1 w-8 bg-(--color-primary) rounded-full"></div>
          <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
            {t("entrepreneurs.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-4xl leading-relaxed">
          {t("entrepreneurs.introText")}
        </p>
      </div>

      {/* Our Findings Card */}
      <div
        className="bg-white dark:bg-(--color-dark-text) rounded-md drop-shadow-lg p-6 lg:p-8 border-l-4 border-(--color-secondary) flex flex-col gap-4 relative overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <i className="fa-solid fa-comments absolute -right-4 -bottom-4 text-6xl text-(--color-secondary)/10 dark:text-(--color-secondary)/5 pointer-events-none"></i>

        <div className="flex flex-row items-center gap-2.5 text-(--color-secondary)">
          <i className="fa-solid fa-magnifying-glass-chart text-xl"></i>
          <h2 className="font-semibold text-lg text-(--color-dark-text) dark:text-white">
            {t("entrepreneurs.findingsTitle")}
          </h2>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed relative z-10">
          {t("entrepreneurs.findingsDesc")}
        </p>
      </div>

      {/* Demands vs. Practice Section */}
      <div
        className="flex flex-col gap-5 mt-4 w-full"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2 className="font-semibold text-xl text-(--color-dark-text) dark:text-white border-b border-(--color-divider)/50 pb-2">
          {t("entrepreneurs.tableTitle")}
        </h2>

        {/* Responsive List Layout (Acts like a table but better for mobile) */}
        <div className="flex flex-col gap-3">
          {businessDemandsData?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start gap-2 md:gap-6 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-md border border-(--color-divider)/30 hover:border-(--color-primary)/30 transition-colors"
            >
              {/* Left Column: Demand */}
              <div className="w-full md:w-1/3 flex flex-row items-start gap-2.5 pt-0.5 shrink-0">
                <i className="fa-solid fa-circle-question text-(--color-primary) text-sm mt-0.5 opacity-80"></i>
                <h3 className="font-medium text-sm text-(--color-primary) dark:text-(--color-primary)">
                  {item.demand}
                </h3>
              </div>

              {/* Right Column: Practice */}
              <div className="w-full md:w-2/3 flex flex-row items-start gap-2.5 pt-0.5">
                <i className="fa-solid fa-arrow-right text-slate-400 text-sm mt-0.5 hidden md:block"></i>
                <p className="text-sm text-(--color-bg-dark) dark:text-slate-300 leading-relaxed">
                  {item.practice}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EntrepreneursSection;
