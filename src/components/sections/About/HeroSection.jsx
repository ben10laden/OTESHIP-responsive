import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("about");
  return (
    <section className="relative p-8 xs:p-10 sm:p-12 md:p-14 lg:p-20 xl:p-28 bg-[url(https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&h=1080)] bg-cover bg-center transition-colors duration-200">
      <div className="absolute inset-0 bg-blue-900/10"></div>
      <div
        data-aos="zoom-out"
        className="flex flex-col items-center justify-between gap-2 xs:gap-3 lg:gap-5"
      >
        {/* Headers */}
        <h1 className="font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white max-w-3xl text-center">
          {t("hero.title")}
        </h1>

        <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-(--color-bg-primary) text-center max-w-3xl">
          {t("hero.description")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center pt-4 gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4">
          <a
            href="#impact"
            className="cursor-pointer text-xs sm:text-sm lg:text-base py-2 xs:py-2.5 sm:py-3 px-3.5 xs:px-4 sm:px-4.5 md:px-5 lg:px-5.5 xl:px-6 bg-white text-(--color-dark-text) font-semibold border-2 border-transparent rounded-md hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 whitespace-nowrap text-center"
          >
            {t("hero.exploreImpact")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
