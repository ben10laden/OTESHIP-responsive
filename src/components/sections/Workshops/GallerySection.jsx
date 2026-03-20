import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { loadWorkshopImages } from "../../../data/Workshops/workshopImages";
import Carousel from "../../common/Carousel"; // Adjust path as needed

const CarouselCard = ({ src, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <Link
      to="/gallery"
      className="block w-full h-full overflow-hidden rounded-md drop-shadow-md relative bg-gray-200 dark:bg-gray-800"
    >
      <div
        className={`absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse transition-opacity duration-400 ease-in-out ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {src && !hasError && (
        <img
          src={src}
          alt={`Gallery image ${index + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-400 ease-in-out hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
          Image not available
        </div>
      )}
    </Link>
  );
};

const GallerySection = () => {
  const { t } = useTranslation("workshops");
  const [randomImages, setRandomImages] = useState(Array(6).fill(null));

  useEffect(() => {
    const loadImages = async () => {
      const images = await loadWorkshopImages();
      const imageUrls = images.map((img) => img.src);
      const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
      setRandomImages(shuffled.slice(0, 6));
    };

    loadImages();
  }, []);

  return (
    <section className="bg-white dark:bg-(--color-dark-text) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200">
      <div className="flex flex-col justify-between items-start gap-2 md:gap-3 lg:gap-4 xl:gap-6 max-w-7xl mx-auto w-full">
        <h1 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl text-(--color-dark-text) dark:text-white text-start">
          {t("gallery.title")}
        </h1>

        <div className="flex flex-col md:flex-row w-full items-start md:items-end gap-4 xs:gap-5 md:gap-6 justify-between">
          <p className="text-sm md:text-base xl:text-lg text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {t("gallery.description")}
          </p>

          <div className="text-start md:text-center h-fit mt-2 xs:mt-0">
            <Link
              to="/gallery"
              className="text-(--color-primary) text-xs md:text-sm font-semibold no-underline whitespace-nowrap inline-flex items-center justify-center hover-anim"
              style={{ "--hover-color": "var(--color-primary)" }}
            >
              {t("gallery.viewMore")}
            </Link>
          </div>
        </div>

        <Carousel
          items={randomImages}
          gridContainerStyle={{ height: "256px" }}
          renderItem={(image, index) => (
            <CarouselCard src={image} index={index} />
          )}
        />
      </div>
    </section>
  );
};

export default GallerySection;
