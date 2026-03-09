import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("home");
  return (
    <section className="p-6 xs:p-8 sm:p-10 md:p-14 lg:p-20 xl:p-28 bg-linear-to-tl from-[#FFCC00] via-[#2E5D9E] via-40% to-[#0F2FA2] transition-colors duration-200">
      <div
        data-aos="zoom-out"
        className="flex flex-col items-center justify-between gap-2 xs:gap-3 lg:gap-5"
      >
        {/* Headers */}
        <h1 className="font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
          {t("hero.title")}
        </h1>
        <h1 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-center text-(--color-bg-primary)">
          {t("hero.subtitle")}
        </h1>
        <h1 className="text-xs xs:text-sm md:text-base lg:text-lg xl:text-xl text-(--color-light1-text) text-center max-w-3xl">
          {t("hero.description")}
        </h1>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center pt-4 gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-4">
          <Link
            to="/ceramics"
            className="cursor-pointer text-xs sm:text-sm lg:text-base py-2 xs:py-2.5 sm:py-3 px-3.5 xs:px-4 sm:px-4.5 md:px-5 lg:px-5.5 xl:px-6 bg-white text-[#2E5D9E] font-semibold border-2 border-transparent rounded-md hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 whitespace-nowrap text-center"
          >
            {t("hero.viewCeramics")}
          </Link>

          <div className="text-center h-fit">
            <Link
              to="/about"
              className="text-white text-xs sm:text-sm lg:text-base no-underline whitespace-nowrap inline-flex items-center justify-center hover-anim"
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
