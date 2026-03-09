import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { loadWorkshopImages } from "../../../data/Workshops/workshopImages";

const GallerySection = () => {
  const { t } = useTranslation("workshops");
  const [randomImages, setRandomImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const images = await loadWorkshopImages();
        // Extract just the src URLs and get random 3
        const imageUrls = images.map((img) => img.src);
        const shuffled = [...imageUrls].sort(() => 0.5 - Math.random());
        setRandomImages(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Failed to load workshop images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return (
      <section className="bg-white dark:bg-(--color-dark-text) py-20 px-4 transition-colors duration-200">
        <div className="flex justify-center items-center min-h-100 max-w-7xl mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-(--color-dark-text) py-20 px-4 transition-colors duration-200">
      <div
        className="flex flex-col justify-between items-start gap-6 max-w-7xl mx-auto"
        data-aos="fade-up"
      >
        <h1 className="font-bold text-4xl text-(--color-dark-text) dark:text-white text-center">
          {t("gallery.title")}
        </h1>
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-lg text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {t("gallery.description")}
          </p>

          <div
            className="text-center h-fit"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <Link
              to="/gallery"
              className="text-(--color-primary) text-sm font-semibold no-underline whitespace-nowrap inline-flex items-center justify-center hover-anim"
              style={{ "--hover-color": "var(--color-primary)" }}
            >
              {t("gallery.viewMore")}
            </Link>
          </div>
        </div>

        {/* Updated image container */}
        <div className="grid grid-cols-3 gap-8 w-full">
          {randomImages.map((image, index) => (
            <Link
              key={index}
              to="/gallery"
              className="block w-full h-64 overflow-hidden inset-0 rounded-md drop-shadow-md"
              data-aos="fade-down"
              data-aos-delay={300 + index * 150}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-400 ease-in-out hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  console.error(`Failed to load image: ${image}`);
                  e.target.style.display = "none";
                  // Show a fallback background
                  e.target.parentElement.style.backgroundColor = "#e5e7eb";
                  e.target.parentElement.innerHTML =
                    '<div class="flex items-center justify-center h-full text-gray-400">Image not available</div>';
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
