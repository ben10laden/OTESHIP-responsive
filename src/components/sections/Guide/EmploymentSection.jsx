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
      className="flex flex-col items-start gap-6 scroll-mt-30 w-full"
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

            <div className="flex flex-col gap-2 text-sm mt-1">
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

            {/* Greek Examples - Scrollable Container */}
            <div className="mt-auto flex flex-col gap-3 pt-5 border-t border-(--color-divider)/60">
              <h2 className="font-medium text-sm text-(--color-dark-text) dark:text-white">
                {t("employment.successTitle")}
              </h2>
              <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
                {successCardsData?.map((card, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-3 items-start bg-slate-50 dark:bg-slate-800/40 p-3 rounded-md border border-(--color-divider)/30"
                  >
                    <div className="bg-(--color-secondary)/15 w-8 h-8 flex items-center justify-center text-(--color-secondary) rounded-md shrink-0">
                      <i className={card.icon} />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-xs font-semibold text-(--color-dark-text) dark:text-white">
                        {card.title}
                      </h1>
                      <p className="text-[11px] leading-relaxed text-(--color-bg-dark) dark:text-(--color-bg-primary) mt-1">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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

            <div className="flex flex-col gap-3 text-sm mt-2">
              <h2 className="font-medium text-(--color-dark-text) dark:text-white">
                {t("employment.frBenefitsTitle")}
              </h2>
              <ul className="flex flex-col gap-2 text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                {frBenefits.map((item, index) => (
                  <li key={index} className="flex flex-row items-start gap-2">
                    <i className="fa-solid fa-check text-emerald-500 mt-0.5 shrink-0"></i>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Assistant Highlights Box */}
            <div className="mt-auto pt-5">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 p-4 rounded-md flex flex-col gap-2.5 relative overflow-hidden">
                {/* Decorative background icon */}
                <i className="fa-solid fa-handshake-angle absolute -right-3 -bottom-3 text-5xl text-blue-500/10 dark:text-blue-400/10"></i>

                <div className="flex flex-row items-center gap-2 text-blue-700 dark:text-blue-400">
                  <i className="fa-solid fa-people-arrows"></i>
                  <h2 className="font-medium text-sm">
                    {t("employment.personalAssistantTitle")}
                  </h2>
                </div>
                <p className="text-xs text-blue-900/80 dark:text-blue-200/80 leading-relaxed relative z-10">
                  {t("employment.personalAssistantDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmploymentSection;
