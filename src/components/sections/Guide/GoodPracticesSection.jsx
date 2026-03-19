import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const GoodPracticesSection = () => {
  const { t } = useTranslation("guide");
  const { goodPracticesData } = useLanguageData();

  // Tab state: 'poland', 'turkey', or 'greece'
  const [activeTab, setActiveTab] = useState("poland");

  // Get current practices based on active tab
  const currentPractices = goodPracticesData[activeTab] || [];

  return (
    <section
      className="flex flex-col gap-8 scroll-mt-32 w-full"
      id="good-practices"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3" data-aos="fade-up">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="h-1 w-8 bg-(--color-primary) rounded-full"></div>
          <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
            {t("goodPractices.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-4xl leading-relaxed">
          {t("goodPractices.introText")}
        </p>
      </div>

      {/* Main Content Area: Tabs + Cards */}
      <div
        className="flex flex-col gap-5 w-full bg-white dark:bg-(--color-dark-text) drop-shadow-lg rounded-md p-6 lg:p-8"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        {/* Tab Navigation */}
        <div className="flex flex-row flex-wrap gap-2 border-b border-(--color-divider)/50 w-full relative">
          {["poland", "turkey", "greece"].map((country) => (
            <button
              key={country}
              onClick={() => setActiveTab(country)}
              className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 relative ${
                activeTab === country
                  ? "text-(--color-primary)"
                  : "text-(--color-bg-dark) dark:text-slate-400 hover:text-(--color-primary)/70"
              }`}
            >
              {t(`goodPractices.tabs.${country}`)}
              {activeTab === country && (
                <div className="absolute -bottom-px left-0 w-full h-0.5 bg-(--color-primary)"></div>
              )}
            </button>
          ))}
        </div>

        {/* Practices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2 min-h-62.5 relative">
          {currentPractices.map((practice, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="flex flex-col gap-3 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-md border border-(--color-divider)/30 hover:border-(--color-primary)/40 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-row items-start gap-3">
                <div className="bg-(--color-primary)/10 dark:bg-(--color-primary)/20 w-8 h-8 flex items-center justify-center text-(--color-primary) rounded-md shrink-0 mt-0.5">
                  <i className="fa-solid fa-lightbulb text-sm"></i>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-sm text-(--color-dark-text) dark:text-white leading-tight">
                    {practice.title}
                  </h3>
                  <p className="text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
                    {practice.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </section>
  );
};

export default GoodPracticesSection;
