import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { loadRandomWorkshopImages } from "../../../data/Workshops/workshopImages";

const PrefaceSection = () => {
  const { t } = useTranslation("guide");
  const prefaceParagraphs = t("preface.paragraphs", { returnObjects: true });
  const bodies = t("preface.bodies", { returnObjects: true });
  const firstItemRef = useRef(null);

  // State for the dynamic image
  const [randomImage, setRandomImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch the random image on mount
  useEffect(() => {
    const fetchRandomImage = async () => {
      const images = await loadRandomWorkshopImages(1);
      if (images && images.length > 0) {
        setRandomImage(images[0].src);
      }
    };
    fetchRandomImage();
  }, []);

  useEffect(() => {
    if (randomImage) {
      setIsLoaded(false);
    }
  }, [randomImage]);

  // Combine all elements that need staggering
  const staggeredElements = [
    ...prefaceParagraphs.map((text) => ({ type: "paragraph", content: text })),
    { type: "title", content: t("preface.bodiesTitle") },
    ...bodies.map((body) => ({ type: "body", content: body })),
  ];

  return (
    <section
      className="flex flex-col items-start gap-4 scroll-mt-30 w-full"
      id="preface"
    >
      <div
        className="flex flex-row items-center justify-center gap-2"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="h-1 w-8 bg-(--color-primary) rounded-full"></div>
        <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
          {t("preface.title")}
        </h1>
      </div>

      {/* Parent row container sets the available height */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 items-stretch w-full">
        {/* Left Content: Text (Takes up remaining space, approx 60%) */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col items-start gap-2">
            {staggeredElements.map((element, index) => {
              if (element.type === "paragraph") {
                return (
                  <p
                    className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) pb-4 leading-relaxed"
                    key={`para-${index}`}
                    ref={index === 0 ? firstItemRef : null}
                    dangerouslySetInnerHTML={{ __html: element.content }}
                    data-aos="fade-down"
                    data-aos-delay={800 + index * 150}
                    data-aos-anchor={
                      index === 0 ? undefined : "#first-stagger-trigger"
                    }
                    data-aos-anchor-placement="top-bottom"
                    id={index === 0 ? "first-stagger-trigger" : undefined}
                  />
                );
              } else if (element.type === "title") {
                return (
                  <h1
                    key={`title-${index}`}
                    className="text-sm font-semibold text-(--color-dark-text) dark:text-white mt-2"
                    data-aos="fade-down"
                    data-aos-delay={800 + index * 150}
                    data-aos-anchor="#first-stagger-trigger"
                    data-aos-anchor-placement="top-bottom"
                  >
                    {element.content}
                  </h1>
                );
              } else if (element.type === "body") {
                return (
                  <div
                    key={`body-${index}`}
                    className="flex flex-row items-center justify-start gap-2.5 pt-1"
                    data-aos="fade-down"
                    data-aos-delay={800 + index * 150}
                    data-aos-anchor="#first-stagger-trigger"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <i className="fa-solid fa-location-dot text-(--color-primary) shrink-0"></i>
                    <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                      {element.content}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Right Content: Dynamic Image - Exactly 40% width on large screens */}
        <Link
          to="/ceramics"
          className="relative rounded-md w-full lg:w-2/5 min-h-62.5 lg:min-h-0 self-stretch block overflow-hidden drop-shadow-lg shrink-0 bg-gray-200 dark:bg-gray-800"
          data-aos="fade-down"
          data-aos-delay="1100"
        >
          {/* Skeleton Overlay */}
          <div
            className={`absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse transition-opacity duration-400 ${
              isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />

          {randomImage && (
            <img
              src={randomImage}
              alt="Ceramics project banner"
              onLoad={() => setIsLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover rounded-md transition-all duration-500 ease-in-out hover:scale-105 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>
      </div>
    </section>
  );
};

export default PrefaceSection;
