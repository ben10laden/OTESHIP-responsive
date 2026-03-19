import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const MunicipalitySection = () => {
  const { t } = useTranslation("guide");
  const { familyCardsData, munCardsData, proposalsData } = useLanguageData();

  return (
    <section
      className="flex flex-col gap-10 scroll-mt-32 w-full"
      id="family_municipality"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3" data-aos="fade-up">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="h-1 w-8 bg-(--color-primary) rounded-full"></div>
          <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
            {t("municipality.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-4xl leading-relaxed">
          {t("municipality.introText")}
        </p>
      </div>

      {/* Two-Column Layout: Family vs Municipality */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Family Column */}
        <div
          className="flex-1 flex flex-col gap-3 bg-white rounded-md drop-shadow-lg p-8 border-t-4 border-(--color-primary)"
          data-aos="fade-down"
        >
          <div className="bg-(--color-primary)/20 w-12 h-12 flex items-center justify-center text-(--color-primary) rounded-md">
            <i className="fa-solid fa-house-chimney-heart text-xl"></i>
          </div>
          <h1 className="font-semibold text-xl text-(--color-dark-text) dark:text-white mt-2">
            {t("municipality.familyTitle")}
          </h1>
          <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
            {t("municipality.familyDesc")}
          </p>
          <div className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) mt-auto pt-6 flex flex-col gap-3">
            {familyCardsData?.map((card, index) => (
              <div
                className="flex flex-row items-center justify-start gap-3"
                key={index}
              >
                <i className={`${card.icon} text-(--color-primary) w-4`}></i>
                <p className="font-medium">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Municipality Column */}
        <div
          className="flex-1 flex flex-col gap-3 bg-white rounded-md drop-shadow-lg p-8 border-t-4 border-(--color-gold2)"
          data-aos="fade-down"
          data-aos-delay={150}
        >
          <div className="bg-(--color-gold2)/20 w-12 h-12 flex items-center justify-center text-(--color-gold2) rounded-md">
            <i className="fa-solid fa-city text-xl"></i>
          </div>
          <h1 className="font-semibold text-xl text-(--color-dark-text) dark:text-white mt-2">
            {t("municipality.munTitle")}
          </h1>
          <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
            {t("municipality.munDesc")}
          </p>
          <div className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) mt-auto pt-6 flex flex-col gap-3">
            {munCardsData?.map((card, index) => (
              <div
                className="flex flex-row items-center justify-start gap-3"
                key={index}
              >
                <i className={`${card.icon} text-(--color-gold2) w-4`}></i>
                <p className="font-medium">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW: Our Proposals Section */}
      <div
        className="flex flex-col gap-6 mt-4 w-full"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 className="font-semibold text-xl text-(--color-dark-text) dark:text-white border-b border-(--color-divider)/50 pb-2">
          {t("municipality.proposalsTitle")}
        </h2>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {proposalsData?.map((proposal, index) => (
            <div
              key={index}
              className={`flex flex-col gap-3 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-md border border-(--color-divider)/40 hover:border-(--color-primary)/40 transition-colors ${
                index === proposalsData.length - 1 &&
                proposalsData.length % 3 !== 0
                  ? "md:col-span-2 lg:col-span-1" // Handles orphan item depending on screen size
                  : ""
              }`}
            >
              <div className="flex flex-row items-center gap-2.5 text-(--color-primary)">
                <i className={`${proposal.icon} text-lg`}></i>
                <h3 className="font-semibold text-sm text-(--color-dark-text) dark:text-white">
                  {proposal.title}
                </h3>
              </div>
              <p className="text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
                {proposal.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MunicipalitySection;
