import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const SkillsSection = () => {
  const { t } = useTranslation("guide");
  const { skillsData } = useLanguageData();
  const firstSkillRef = useRef(null);

  // Tab state: 'greece', 'poland', or 'turkey'
  const [activeTab, setActiveTab] = useState("greece");

  // Get the current array of skills based on the active tab
  const currentSkills = skillsData[activeTab] || [];

  return (
    <section
      className="relative flex flex-col bg-(--color-dark-text) items-start gap-8 scroll-mt-32 drop-shadow-lg rounded-md p-8 overflow-hidden w-full"
      id="skills"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-primary) rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>

      {/* Header Section */}
      <div className="flex flex-col gap-3 relative z-10" data-aos="fade-up">
        <h1 className="font-semibold text-2xl text-white">
          {t("skills.title")}
        </h1>
        <p className="text-sm text-(--color-light3-text) max-w-3xl leading-relaxed">
          {t("skills.introText")}
        </p>
      </div>

      {/* Country Tabs */}
      <div
        className="flex flex-row gap-2 border-b border-slate-700 w-full relative z-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {["greece", "poland", "turkey"].map((country) => (
          <button
            key={country}
            onClick={() => setActiveTab(country)}
            className={`px-5 py-2.5 font-medium text-sm transition-all duration-300 relative ${
              activeTab === country
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t(`skills.tabs.${country}`)}
            {activeTab === country && (
              <div className="absolute -bottom-px left-0 w-full h-0.5 bg-(--color-primary) shadow-[0_0_8px_var(--color-primary)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Skills List */}
      <div className="flex flex-col gap-6 w-full relative z-10 mt-2 min-h-75">
        {currentSkills.map((item, index) => (
          <React.Fragment key={`${activeTab}-${index}`}>
            <div
              className="flex flex-col gap-4 animate-fade-in"
              ref={index === 0 ? firstSkillRef : null}
            >
              <div className="flex flex-row gap-5 items-start">
                <div className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 shrink-0 outline-1 outline-slate-600 drop-shadow-md">
                  <p className="font-semibold text-(--color-gold2)">
                    {item.order}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1.5 mt-0.5">
                  <h1 className="font-semibold text-base text-white">
                    {item.title}
                  </h1>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Divider between items */}
              {index < currentSkills.length - 1 && (
                <div className="border-t border-slate-700/60 mt-2 ml-15"></div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Simple fade-in animation for tab switching */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </section>
  );
};

export default SkillsSection;
