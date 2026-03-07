import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import ImageCardSmall from "../../common/ImageCardSmall";

const CeramicsSection = () => {
  const { ceramicsCardsData } = useLanguageData();
  const { t } = useTranslation("home");
  return (
    <section className="bg-white dark:bg-(--color-dark-text) lg:p-20 md:p-15 sm:p-10 p-10 transition-colors duration-200">
      <div className="flex flex-col justify-between items-center lg:gap-10 md:gap-8 sm:gap-6 gap-6">
        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center lg:gap-4 md:gap-2 sm:gap-1 gap-1"
        >
          <h1 className="font-bold lg:text-4xl md:text-2xl sm:text-lg text-lg text-(--color-dark-text) dark:text-white">
            {t("ceramics.title")}
          </h1>
          <h1 className="lg:text-lg md:text-base sm:text-sm text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl text-center">
            {t("ceramics.description")}
          </h1>
        </div>
        <div className="flex flex-wrap lg:flex-row md:flex-row sm:flex-col flex-col items-stretch justify-center lg:gap-8 md:gap-5 sm:gap-4 gap-4 max-w-7xl">
          {ceramicsCardsData.map((card, index) => (
            <div
              key={index}
              className="w-full sm:w-full md:w-[calc(50%-1rem)] lg:w-auto lg:flex-1"
            >
              <ImageCardSmall
                to={card.to}
                image={card.image}
                title={card.title}
                description={card.description}
                aosDelay={300 + index * 150}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CeramicsSection;
