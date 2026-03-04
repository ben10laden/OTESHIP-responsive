import React from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("workshops");
  return (
    <section
      id="hero"
      className="relative p-30 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2868&auto=format&fit=crop"
          alt="Hands working on pottery wheel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background-50"></div>
      </div>
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
            href="#workshops"
            className="cursor-pointer py-3 px-6 bg-white text-(--color-dark-text) font-semibold border-2 border-transparent rounded-md hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 whitespace-nowrap text-center"
          >
            {t("hero.exploreWorkshops")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
