import React, { useState } from "react";
import { useLanguageData } from "../../../hooks/useLanguageData";
import { useTranslation } from "react-i18next";

const EmploymentSection = () => {
  const BASE_DELAY = 300;
  const { successCardsData } = useLanguageData();
  const { t } = useTranslation("guide");

  // Fetching the arrays from the JSON
  const prSteps = t("employment.prSteps", { returnObjects: true });
  const frBenefits = t("employment.frBenefits", { returnObjects: true });

  const [animatedCard, setAnimatedCard] = useState(null);

  const handleCardAnimation = (cardId) => {
    setAnimatedCard(cardId);
    // Remove animation class after animation completes
    setTimeout(() => {
      setAnimatedCard(null);
    }, 350);
  };

  // Expose the animation function to the window object for sidebar access
  React.useEffect(() => {
    window.animateEmploymentCard = handleCardAnimation;
    return () => {
      delete window.animateEmploymentCard;
    };
  }, []);

  const getCardClass = (cardId) => {
    const baseClass =
      "bg-white rounded-md drop-shadow-lg p-6 w-full h-full flex flex-col gap-4 transition-transform duration-350 transform-gpu backface-visibility-hidden perspective-1000";
    return animatedCard === cardId
      ? `${baseClass} scale-105 ring-2 ring-(--color-primary)/50`
      : baseClass;
  };

  return (
    <section
      id="employment"
      className="flex flex-col items-start gap-8 scroll-mt-30 w-full"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3" data-aos="fade-up">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="h-1 w-8 bg-(--color-primary) rounded-full"></div>
          <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
            {t("employment.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-4xl leading-relaxed">
          {t("employment.introText")}
        </p>
      </div>

      {/* 3-Column Grid for Employment Types */}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8 items-stretch">
        {/* PUBLIC SECTOR */}
        <div data-aos="fade-down" data-aos-delay={BASE_DELAY}>
          <div className={getCardClass("public")} id="public_sector">
            <div className="bg-(--color-primary)/20 w-12 h-12 flex items-center justify-center text-(--color-primary) rounded-md shrink-0">
              <i className="fa-solid fa-building-columns text-xl"></i>
            </div>
            <h1 className="font-semibold text-xl text-(--color-dark-text) dark:text-white">
              {t("employment.puTitle")}
            </h1>
            <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
              {t("employment.puDesc")}
            </p>
          </div>
        </div>

        {/* PRIVATE SECTOR */}
        <div data-aos="fade-down" data-aos-delay={BASE_DELAY + 150}>
          <div className={getCardClass("private")} id="private_sector">
            <div className="bg-(--color-gold)/10 w-12 h-12 flex items-center justify-center text-(--color-gold) rounded-md shrink-0">
              <i className="fa-solid fa-briefcase text-xl"></i>
            </div>
            <h1 className="font-semibold text-xl text-(--color-dark-text) dark:text-white">
              {t("employment.prTitle")}
            </h1>
            <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
              {t("employment.prDesc")}
            </p>

            <div className="flex flex-col gap-2 text-sm mt-auto pt-2">
              <h2 className="font-medium text-(--color-dark-text) dark:text-white">
                {t("employment.prSubtitle")}
              </h2>
              <ol className="list-decimal list-inside text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary) bg-(--color-bg-primary) drop-shadow-sm/10 p-3 outline-1 outline-(--color-light3-text)/40 rounded-md">
                {prSteps.map((item, index) => (
                  <li key={index} className="mb-1.5 last:mb-0">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* SELF-EMPLOYMENT */}
        <div data-aos="fade-down" data-aos-delay={BASE_DELAY + 300}>
          <div className={getCardClass("freelance")} id="freelancing">
            <div className="bg-emerald-100 w-12 h-12 flex items-center justify-center text-emerald-600 rounded-md shrink-0">
              <i className="fa-solid fa-user-tie text-xl"></i>
            </div>
            <h1 className="font-semibold text-xl text-(--color-dark-text) dark:text-white">
              {t("employment.frTitle")}
            </h1>
            <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed">
              {t("employment.frDesc")}
            </p>

            <div className="flex flex-col gap-3 text-sm mt-auto pt-2">
              <h2 className="font-medium text-(--color-dark-text) dark:text-white">
                {t("employment.frBenefitsTitle")}
              </h2>
              <ul className="flex flex-col gap-2 text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary) bg-(--color-bg-primary) drop-shadow-sm/10 p-3 outline-1 outline-(--color-light3-text)/40 rounded-md">
                {frBenefits.map((item, index) => (
                  <li key={index} className="flex flex-row items-start gap-2">
                    <i className="fa-solid fa-check text-emerald-500 mt-0.5 shrink-0"></i>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FULL WIDTH: Personal Assistant Highlights Box */}
      <div
        className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 p-6 rounded-md flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 relative overflow-hidden mt-2"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <i className="fa-solid fa-handshake-angle absolute -right-6 -bottom-6 text-8xl text-blue-500/10 dark:text-blue-400/10 pointer-events-none"></i>

        <div className="bg-blue-100 dark:bg-blue-800/40 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
          <i className="fa-solid fa-people-arrows text-xl text-blue-700 dark:text-blue-400"></i>
        </div>
        <div className="flex flex-col gap-1.5 z-10">
          <h2 className="font-medium text-base text-blue-800 dark:text-blue-300">
            {t("employment.personalAssistantTitle")}
          </h2>
          <p className="text-sm text-blue-900/80 dark:text-blue-200/80 leading-relaxed">
            {t("employment.personalAssistantDesc")}
          </p>
        </div>
      </div>

      {/* FULL WIDTH GRID: Success Examples */}
      <div
        className="w-full flex flex-col gap-5 mt-2"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <h2 className="font-semibold text-xl text-(--color-dark-text) dark:text-white border-b border-(--color-divider)/50 pb-2">
          {t("employment.successTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {successCardsData?.map((card, index) => (
            <div
              key={index}
              className="flex flex-row gap-3 items-start bg-slate-50 dark:bg-slate-800/40 p-4 rounded-md border border-(--color-divider)/30 hover:border-(--color-primary)/40 transition-colors"
            >
              <div className="bg-(--color-secondary)/15 w-10 h-10 flex items-center justify-center text-(--color-secondary) rounded-md shrink-0">
                <i className={`${card.icon} text-lg`} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold text-(--color-dark-text) dark:text-white">
                  {card.title}
                </h1>
                <p className="text-xs leading-relaxed text-(--color-bg-dark) dark:text-(--color-bg-primary) mt-1">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmploymentSection;
