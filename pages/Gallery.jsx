// Gallery.jsx - Optimized component with stable rendering
import React, { useState, useEffect, useRef, useCallback } from "react";
import { wsImagesArray } from "../data/Workshops/workshopImages";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { t } = useTranslation("gallery");
  const [loadedImages, setLoadedImages] = useState(new Set());
  const observerRef = useRef(null);

  // Clean up the image loading logic
  useEffect(() => {
    // Create observer once
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            if (index && !loadedImages.has(index)) {
              setLoadedImages((prev) => new Set(prev).add(index));
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

  // Handle image load completion
  const handleImageLoad = useCallback((index) => {
    // Mark image as fully loaded (you could add a separate state if needed)
    const container = document.querySelector(`[data-index="${index}"]`);
    if (container) {
      container.classList.add("image-fully-loaded");
    }
  }, []);

  const getSpanClass = (index) => {
    let spanClass = "col-span-1 row-span-1";
    if (index === 0) spanClass = "col-span-2 row-span-2";
    if (index === 4) spanClass = "col-span-1 row-span-2";
    return spanClass;
  };

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
                {wsImagesArray.slice(0, 10).map((image, index) => {
                  const spanClass = getSpanClass(index);
                  const isLoaded = loadedImages.has(String(index));

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
                          !loadedImages.has(String(index))
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
