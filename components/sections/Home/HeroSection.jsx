import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("home");
  return (
    <section className="lg:p-28 md:p-14 sm:p-10 p-10 bg-linear-to-tl from-[#FFCC00] via-[#2E5D9E] via-40% to-[#0F2FA2] transition-colors duration-200">
      <div
        data-aos="zoom-out"
        className="flex flex-col items-center justify-between lg:gap-6 md:gap-4 sm:gap-2 gap-2"
      >
        {/* Headers */}
        <h1 className="font-bold lg:text-6xl md:text-4xl sm:text-2xl text-2xl text-white">
          {t("hero.title")}
        </h1>
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-lg text-center text-(--color-bg-primary)">
          {t("hero.subtitle")}
        </h1>
        <h1 className="lg:text-lg md:text-base sm:text-sm text-sm text-(--color-light1-text) text-center max-w-3xl">
          {t("hero.description")}
        </h1>
        {/* Buttons */}
        <div className="flex flex-col items-center lg:gap-4 md:gap-2 sm:gap-1 gap-1 justify-center pt-4">
          <Link
            to="/ceramics"
            className="cursor-pointer lg:text-base md:text-sm sm:text-xs text-xs lg:py-3 lg:px-6 md:py-3 md:px-5.5 sm:py-2.5 sm:px-4.5 py-2.5 px-4.5 bg-white text-[#2E5D9E] font-semibold border-2 border-transparent rounded-md hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 whitespace-nowrap text-center"
          >
            {t("hero.viewCeramics")}
          </Link>

          <div className="text-center h-fit">
            <Link
              to="/about"
              className="text-white lg:text-base md:text-sm sm:text-xs text-xs no-underline whitespace-nowrap inline-flex items-center justify-center hover-anim"
              style={{ "--hover-color": "#ffffff" }}
            >
              {t("hero.learnMore")}
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180 mt-0.5 ml-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
