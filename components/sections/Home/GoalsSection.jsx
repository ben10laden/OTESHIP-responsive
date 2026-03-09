import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import ImageCard from "../../common/ImageCard";
import SectionHeader from "../../common/SectionHeader";

const GoalsSection = () => {
  const { goalsData } = useLanguageData();
  const { t } = useTranslation("home");
  const firstGoalRef = useRef(null);

  return (
    <section className="bg-white dark:bg-(--color-dark-text) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        {/* Abstracted Header with Delay */}
        <SectionHeader
          title={t("goals.title")}
          description={t("goals.description")}
        />

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 xs:gap-4 md:gap-5 lg:gap-6 xl:gap-8 max-w-7xl">
          <div className="flex flex-col justify-evenly flex-1 gap-4 md:gap-6 lg:gap-7 xl:gap-8">
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
                className="flex gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4"
                id={index === 0 ? "first-goal-trigger" : undefined}
              >
                {/* Circle */}
                <div className="bg-(--color-primary) dark:bg-(--color-primary2) rounded-full flex items-center justify-center size-6 md:size-7 lg:size-7.5 xl:size-8 shrink-0">
                  <p className="text-xs mr-px mb-px lg:text-sm xl:text-base font-bold text-white m-0 p-0">
                    {goal.number}
                  </p>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h1 className="font-bold text-sm md:text-base lg:text-lg text-(--color-dark-text) dark:text-white">
                    {goal.title}
                  </h1>
                  <p className="text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
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
