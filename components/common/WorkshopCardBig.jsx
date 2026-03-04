import React from "react";
import { useTranslation } from "react-i18next";

const WorkshopCardBig = ({
  image,
  title,
  description,
  outcomes,
  imagePosition = "left", // 'left' or 'right'
  aosDelay,
}) => {
  const { t } = useTranslation("workshops");
  return (
    <div
      className={`flex flex-row items-stretch justify-between w-full flex-1 gap-12 ${
        imagePosition === "right" ? "flex-row-reverse" : ""
      }`}
      data-aos={imagePosition === "right" ? "fade-left" : "fade-right"}
      data-aos-delay={aosDelay}
    >
      <div className="inset-0 w-full max-h-80 block overflow-hidden rounded-md flex-1">
        <img
          src={image}
          alt="Hands-On Learning"
          className="w-full h-full object-cover transition-transform duration-400 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-start items-start flex-1 gap-6">
        <div className="flex flex-col justify-center items-start gap-2">
          <h1 className="text-xl font-bold text-(--color-dark-text) dark:text-white w-full line-clamp-2">
            {title}
          </h1>
        </div>
        <p className="w-full text-start text-base text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-3xl">
          {description}
        </p>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-sm font-semibold text-(--color-primary) dark:text-white uppercase">
            {t("workshopCardBig.keyOutcomes")}
          </h1>
          <div className="flex flex-col items-start gap-2">
            {outcomes &&
              outcomes.map((outcome, index) => (
                <p
                  key={index}
                  className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary)"
                >
                  {index + 1}. {outcome}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCardBig;
