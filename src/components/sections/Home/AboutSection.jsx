import React from "react";
import FeatureCard from "../../common/FeatureCard";
import SectionHeader from "../../common/SectionHeader";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const AboutSection = () => {
  const { featureCardsData } = useLanguageData();
  const { t } = useTranslation("home");

  return (
    <section className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        {/* Abstracted Header with Delay */}
        <SectionHeader
          title={t("about.title")}
          description={t("about.description")}
        />

        {/* 4-column math trick happens right here */}
        <div className="grid grid-cols-1 xs:grid-cols-4 md:grid-cols-3 gap-3 xs:gap-4 md:gap-5 lg:gap-6 xl:gap-8 max-w-7xl w-full mx-auto auto-rows-fr">
          {featureCardsData.map((card, index) => (
            <div
              key={index}
              className={`w-full flex justify-center h-full ${
                index === 2
                  ? // Card 3: Spans 2 cols & starts at col 2 on mobile, resets to normal on desktop
                    "xs:col-span-2 xs:col-start-2 md:col-span-1 md:col-start-auto"
                  : // Cards 1 & 2: Span 2 cols on mobile, 1 col on desktop
                    "xs:col-span-2 md:col-span-1"
              }`}
            >
              <FeatureCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                to={card.to}
                index={index}
                className="w-full max-w-sm h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
