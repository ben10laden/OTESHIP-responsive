import React from "react";
import FeatureCard from "../../common/FeatureCard";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const AboutSection = () => {
  const { featureCardsData } = useLanguageData();
  const { t } = useTranslation("home");

  return (
    <section className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) lg:p-20 md:p-15 sm:p-10 p-10 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center lg:gap-10 md:gap-8 sm:gap-6 gap-6">
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="flex flex-col justify-center items-center lg:gap-4 md:gap-2 sm:gap-1 gap-1"
        >
          <h1 className="font-bold lg:text-4xl md:text-2xl sm:text-lg text-lg text-(--color-dark-text) dark:text-white">
            {t("about.title")}
          </h1>
          <h1 className="lg:text-lg md:text-base sm:text-sm text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl text-center">
            {t("about.description")}
          </h1>
        </div>

        {/* Flexbox approach for better centering control */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-4 md:gap-5 lg:gap-8 max-w-7xl w-full mx-auto">
          {featureCardsData.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(33.333%-2rem)] flex justify-center"
            >
              <FeatureCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                to={card.to}
                aosDelay={1100 + index * 150}
                index={index}
                className="w-full max-w-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
