import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import ImageCard from "../../common/ImageCard";

const GoalsSection = () => {
  const { goalsData } = useLanguageData();
  const { t } = useTranslation("home");
  const firstGoalRef = useRef(null);
  return (
    <section className="bg-white dark:bg-(--color-dark-text) lg:p-20 md:p-15 sm:p-10 p-10 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center lg:gap-10 md:gap-8 sm:gap-6 gap-6">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center lg:gap-4 md:gap-2 sm:gap-1 gap-1"
        >
          <h1 className="font-bold lg:text-4xl md:text-2xl sm:text-lg text-lg text-(--color-dark-text) dark:text-white">
            {t("goals.title")}
          </h1>
          <h1 className="lg:text-lg md:text-base sm:text-sm text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl text-center">
            {t("goals.description")}
          </h1>
        </div>

        <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col items-stretch justify-center lg:gap-8 md:gap-5 sm:gap-4 gap-4 max-w-7xl">
          <div className="flex flex-col lg:gap-8 md:gap-6 sm:gap-4 gap-4 justify-evenly flex-1">
            {goalsData.goals.map((goal, index) => (
              <div
                ref={index === 0 ? firstGoalRef : null}
                data-aos="fade-right"
                data-aos-delay={300 + index * 150}
                data-aos-anchor={
                  index === 0 ? undefined : "#first-goal-trigger"
                }
                data-aos-anchor-placement="top-bottom"
                key={index}
                className="flex lg:gap-4 md:gap-3 sm:gap-2 gap-2"
                id={index === 0 ? "first-goal-trigger" : undefined}
              >
                {/* Circle */}
                <div className="bg-(--color-primary) dark:bg-(--color-primary2) rounded-full flex items-center justify-center lg:w-8 lg:h-8 md:w-7 md:h-7 sm:w-6 sm:h-6 w-6 h-6 shrink-0">
                  <p className="lg:text-sm md:text-xs sm:text-[10px] text-[10px] font-bold text-white m-0 p-0">
                    {goal.number}
                  </p>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h1 className="font-bold lg:text-lg md:text-base sm:text-sm text-sm text-(--color-dark-text) dark:text-white">
                    {goal.title}
                  </h1>
                  <p className="lg:text-base md:text-sm sm:text-xs text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                    {goal.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ImageCard
            image={goalsData.card.image}
            title={goalsData.card.title}
            description={goalsData.card.description}
          />
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
