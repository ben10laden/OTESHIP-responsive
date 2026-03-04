import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import ImageCard from "../../common/ImageCard";

const GoalsSection = () => {
  const { goalsData } = useLanguageData();
  const { t } = useTranslation("home");
  const firstGoalRef = useRef(null);
  return (
    <section className="bg-white dark:bg-(--color-dark-text) p-20 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center gap-10">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center gap-4"
        >
          <h1 className="font-bold text-4xl text-(--color-dark-text) dark:text-white">
            {t("goals.title")}
          </h1>
          <h1 className="text-lg text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl text-center">
            {t("goals.description")}
          </h1>
        </div>

        <div className="flex flex-row items-stretch justify-center gap-8 max-w-7xl">
          <div className="flex flex-col gap-8 justify-evenly flex-1">
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
                className="flex gap-4"
                id={index === 0 ? "first-goal-trigger" : undefined}
              >
                {/* Circle */}
                <div className="bg-(--color-primary) dark:bg-(--color-primary2) rounded-full flex items-center justify-center w-8 h-8 shrink-0">
                  <p className="text-sm font-bold text-white m-0 p-0">
                    {goal.number}
                  </p>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h1 className="font-bold text-lg text-(--color-dark-text) dark:text-white">
                    {goal.title}
                  </h1>
                  <p className="text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
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
