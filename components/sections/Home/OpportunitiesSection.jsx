import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import OpportunitiesCard from "../../common/OpportunitiesCard";
import SectionHeader from "../../common/SectionHeader";

const OpportunitiesSection = () => {
  const { opportunitiesCardsData } = useLanguageData();
  const { t } = useTranslation("home");

  return (
    <section className="bg-linear-to-bl from-[#FFCC00] via-[#2e489e] via-40% to-[#0F2FA2] p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        <SectionHeader
          title={t("opportunities.title")}
          description={t("opportunities.description")}
          titleColor="text-white"
          descColor="text-(--color-bg-primary)"
        />

        {/* Applied the responsive grid layout and 4-column math trick here */}
        <div className="grid grid-cols-1 xs:grid-cols-4 md:grid-cols-3 gap-3 xs:gap-4 md:gap-5 lg:gap-6 xl:gap-8 max-w-7xl w-full mx-auto auto-rows-fr">
          {opportunitiesCardsData.map((card, index) => (
            <div
              key={index}
              className={`w-full flex justify-center h-full ${
                index === 2
                  ? "xs:col-span-2 xs:col-start-2 md:col-span-1 md:col-start-auto"
                  : "xs:col-span-2 md:col-span-1"
              }`}
            >
              <OpportunitiesCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                aosDelay={300 + index * 150}
                className="w-full max-w-sm h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
