import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("about");
  return (
    <section className="relative p-28 bg-[url(https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&h=1080)] bg-cover bg-center transition-colors duration-200">
      <div className="absolute inset-0 bg-blue-900/10"></div>
      <div
        data-aos="zoom-out"
        className="flex flex-col items-center justify-between gap-6"
      >
        {/* Headers */}
        <h1 className="font-bold text-6xl text-white max-w-3xl text-center">
          {t("hero.title")}
        </h1>

        <h1 className="text-lg text-(--color-bg-primary) text-center max-w-3xl">
          {t("hero.description")}
        </h1>
        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 justify-center pt-4">
          <a
            href="#impact"
            className="cursor-pointer py-3 px-6 bg-white text-(--color-dark-text) font-semibold border-2 border-transparent rounded-md hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 whitespace-nowrap text-center"
          >
            {t("hero.exploreImpact")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
