// Gallery.jsx - Fixed version with proper dynamic imports
import React, { useState, useEffect, useRef, useCallback } from "react";
import { loadWorkshopImages } from "../data/Workshops/workshopImages";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation("gallery");
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef(null);

  // Load images dynamically
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const workshopImages = await loadWorkshopImages();
        // Extract just the src URLs
        const imageUrls = workshopImages.map((img) => img.src);
        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to load workshop images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            if (index && !loadedImages.has(index)) {
              setLoadedImages((prev) => new Set(prev).add(index));
              // Unobserve after loading to prevent unnecessary calls
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); // Empty dependency array - observer only created once

  const handleImageLoad = useCallback((index) => {
    const container = document.querySelector(`[data-index="${index}"]`);
    if (container) {
      container.classList.add("image-fully-loaded");
    }
  }, []);

  const handleImageError = useCallback((index, e) => {
    console.error(`Failed to load image at index ${index}:`, e);
    // Set a fallback background color instead of broken image
    const container = document.querySelector(`[data-index="${index}"]`);
    if (container) {
      container.style.backgroundColor = "#e5e7eb";
      container.innerHTML =
        '<div class="flex items-center justify-center h-full text-gray-400">Image not available</div>';
    }
  }, []);

  const getSpanClass = (index) => {
    let spanClass = "col-span-1 row-span-1";
    if (index === 0) spanClass = "col-span-2 row-span-2";
    if (index === 4) spanClass = "col-span-1 row-span-2";
    return spanClass;
  };

  if (isLoading) {
    return (
      <div className="bg-(--color-bg-primary) w-full">
        <div className="w-full p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--color-bg-primary) w-full">
      <div className="w-full p-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8 justify-evenly items-center flex-1 w-full">
            <h1
              className="font-bold text-4xl text-(--color-dark-text) dark:text-white"
              data-aos="fade-up"
            >
              {t("gallery.title")}
            </h1>

            <div className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 grid-flow-dense">
                {images.slice(0, 10).map((image, index) => {
                  const spanClass = getSpanClass(index);
                  const isLoaded = loadedImages.has(String(index));
                  const imageIndex = String(index);

                  const responsiveClasses = `
                    ${index === 8 ? "lg:col-span-2" : ""} 
                    ${index === 9 ? "md:col-span-2 lg:col-span-2" : ""}
                  `;

                  return (
                    <div
                      key={index}
                      ref={(el) => {
                        if (
                          el &&
                          observerRef.current &&
                          !loadedImages.has(imageIndex)
                        ) {
                          observerRef.current.observe(el);
                        }
                      }}
                      data-index={index}
                      data-aos="fade-down"
                      data-aos-delay={300 + index * 150}
                      data-aos-offset="0"
                      className={`relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${spanClass} ${responsiveClasses}`}
                      style={{
                        backgroundColor: "#f3f4f6",
                        minHeight: "200px",
                      }}
                    >
                      {isLoaded ? (
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          onLoad={() => handleImageLoad(index)}
                          onError={(e) => handleImageError(index, e)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
