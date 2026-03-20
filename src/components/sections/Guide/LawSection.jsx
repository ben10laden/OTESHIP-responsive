import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LawSection = () => {
  const { t } = useTranslation("guide");
  const BASE_DELAY = 300;
  const rights = t("law.unRights", { returnObjects: true });

  // Tab state: 'greece', 'poland', or 'turkey'
  const [activeTab, setActiveTab] = useState("greece");

  return (
    <section
      className="flex flex-col items-start gap-8 scroll-mt-32 bg-white drop-shadow-lg rounded-md p-8"
      id="legislation"
    >
      {/* Intro & UN Rights */}
      <div className="flex flex-col gap-6" data-aos="fade-up">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="bg-(--color-primary)/20 w-10 h-10 flex items-center justify-center text-(--color-primary) rounded-md">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
            {t("law.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary)">
          {t("law.introText")}
        </p>
      </div>

      {/* UN Rights List */}
      <div
        data-aos="fade-down"
        data-aos-delay={BASE_DELAY}
        className="w-full flex flex-col gap-4 bg-(--color-bg-primary) drop-shadow-sm/10 p-5 outline-1 outline-(--color-light3-text)/40 rounded-md"
      >
        <div className="flex flex-row items-center justify-start gap-2">
          <i className="fa-solid fa-globe text-(--color-primary)"></i>
          <h1 className="font-medium text-(--color-dark-text) dark:text-white">
            {t("law.unRightsTitle")}
          </h1>
        </div>
        <div className="flex flex-col text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) ml-1">
          <ul className="list-disc list-outside ml-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 [&>li::marker]:text-(--color-primary)">
            {rights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Country-Specific Legislation Tabs */}
      <div
        className="w-full flex flex-col gap-4"
        data-aos="fade-down"
        data-aos-delay={BASE_DELAY + 150}
      >
        <div className="flex flex-row border-b border-(--color-divider)">
          {["greece", "poland", "turkey"].map((country) => (
            <button
              key={country}
              onClick={() => setActiveTab(country)}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                activeTab === country
                  ? "text-(--color-primary)"
                  : "text-(--color-bg-dark) hover:text-(--color-primary)/70"
              }`}
            >
              {t(`law.tabs.${country}`)}
              {activeTab === country && (
                <div className="absolute -bottom-px left-0 w-full h-0.5 bg-(--color-primary)"></div>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Content based on active tab */}
        <div className="bg-white p-5 rounded-md outline-1 outline-(--color-light3-text)/40 drop-shadow-sm/5">
          <div className="flex flex-row items-start gap-3">
            <i
              className={`fa-solid fa-flag mt-1 transition-colors duration-300 ${
                activeTab === "greece"
                  ? "text-blue-600"
                  : activeTab === "poland"
                    ? "text-red-400"
                    : "text-red-600"
              }`}
            ></i>

            {/* CSS Grid enforces equal height based on the tallest element */}
            <div className="grid w-full">
              <p
                className={`col-start-1 row-start-1 text-sm text-(--color-dark-text) dark:text-white leading-relaxed transition-all duration-300 ${
                  activeTab === "greece"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                {t("law.grLaw")}
              </p>
              <p
                className={`col-start-1 row-start-1 text-sm text-(--color-dark-text) dark:text-white leading-relaxed transition-all duration-300 ${
                  activeTab === "poland"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                {t("law.plLaw")}
              </p>
              <p
                className={`col-start-1 row-start-1 text-sm text-(--color-dark-text) dark:text-white leading-relaxed transition-all duration-300 ${
                  activeTab === "turkey"
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                }`}
              >
                {t("law.trLaw")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawSection;
