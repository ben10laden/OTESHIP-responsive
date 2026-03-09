import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import ImageCardSmall from "../../common/ImageCardSmall";
import SectionHeader from "../../common/SectionHeader";

const CeramicsSection = () => {
  const { ceramicsCardsData } = useLanguageData();
  const { t } = useTranslation("home");

  return (
    <section className="bg-white dark:bg-(--color-dark-text) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        <SectionHeader
          title={t("ceramics.title")}
          description={t("ceramics.description")}
        />

        {/* Added md:max-w-[80%] and lg:max-w-7xl here */}
        <div className="flex flex-col sm:grid sm:grid-cols-4 lg:flex lg:flex-row items-stretch justify-center gap-3 xs:gap-4 md:gap-5 lg:gap-6 xl:gap-8 w-full max-w-7xl md:max-w-[80%] lg:max-w-7xl">
          {ceramicsCardsData.map((card, index) => (
            <div
              key={index}
              className="w-full max-w-sm mx-auto sm:max-w-none flex justify-center lg:flex-1 sm:col-span-2"
            >
              <ImageCardSmall
                to={card.to}
                image={card.image}
                title={card.title}
                description={card.description}
                aosDelay={300 + index * 150}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CeramicsSection;
