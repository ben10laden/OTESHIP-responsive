import React, { useState, useEffect, useCallback } from "react";
import {
  loadWorkshopImages,
  loadProductImages,
  loadExhibitionImages,
} from "../data/Workshops/workshopImages";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/common/SectionHeader";
import Carousel from "../components/common/Carousel";

const INITIAL_VISIBLE_COUNT = 24; // 24 is divisible by 2, 3, and 4 (perfect for your grid cols)

const GalleryImage = ({ src, index, onClick, inCarousel = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      data-index={index}
      onClick={onClick}
      className={`relative rounded-md overflow-hidden shadow-md cursor-pointer bg-gray-200 dark:bg-gray-800 group ${
        inCarousel
          ? "w-full h-50 xs:h-65"
          : "w-full h-50 xs:w-[calc((100%-0.5rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
      }`}
      style={
        inCarousel
          ? {}
          : {
              contentVisibility: "auto",
              containIntrinsicSize: "200px",
            }
      }
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={src}
          alt={`Gallery image ${index + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          fetchPriority={index < 4 ? "high" : "low"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
          Image not available
        </div>
      )}
    </div>
  );
};

// Reusable "View More" button using your requested styling
// Added hidden md:flex so it completely disappears when the carousel is active
const ShowMoreButton = ({ onClick, text }) => (
  <div className="hidden md:flex justify-center w-full mt-6 md:mt-8">
    <button
      onClick={onClick}
      className="text-(--color-primary) text-xs md:text-sm font-semibold no-underline whitespace-nowrap inline-flex items-center justify-center hover-anim cursor-pointer"
      style={{ "--hover-color": "var(--color-primary)" }}
    >
      {text}
    </button>
  </div>
);

const Gallery = () => {
  const { t } = useTranslation("gallery");

  const [workshopImages, setWorkshopImages] = useState([]);
  const [productImages, setProductImages] = useState({
    gr: [],
    pl: [],
    tr: [],
  });
  const [exhibitionImages, setExhibitionImages] = useState([]);

  // State to track how many images are visible per section (Grid Only)
  const [visibleCounts, setVisibleCounts] = useState({
    workshops: INITIAL_VISIBLE_COUNT,
    gr: INITIAL_VISIBLE_COUNT,
    pl: INITIAL_VISIBLE_COUNT,
    tr: INITIAL_VISIBLE_COUNT,
    exhibitions: INITIAL_VISIBLE_COUNT,
  });

  const [activeImages, setActiveImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState("");

  const [isLightboxLoading, setIsLightboxLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const localizedCountries = t("gallery.countries", { returnObjects: true });
  const countryCodes = ["gr", "pl", "tr"];
  const countries = countryCodes.map((code, index) => ({
    code: code,
    name: localizedCountries[index],
  }));

  useEffect(() => {
    const fetchedWorkshops = loadWorkshopImages();
    setWorkshopImages(fetchedWorkshops.map((img) => img.src));

    const grProducts = loadProductImages("gr");
    const plProducts = loadProductImages("pl");
    const trProducts = loadProductImages("tr");

    setProductImages({
      gr: grProducts.map((img) => img.src),
      pl: plProducts.map((img) => img.src),
      tr: trProducts.map((img) => img.src),
    });

    const fetchedExhibitions = loadExhibitionImages();
    setExhibitionImages(fetchedExhibitions.map((img) => img.src));
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex !== null && activeImages.length > 0) {
      setIsLightboxLoading(true);

      const nextIndex = (selectedIndex + 1) % activeImages.length;
      const prevIndex =
        selectedIndex === 0 ? activeImages.length - 1 : selectedIndex - 1;

      const imgNext = new Image();
      imgNext.src = activeImages[nextIndex];

      const imgPrev = new Image();
      imgPrev.src = activeImages[prevIndex];
    }
  }, [selectedIndex, activeImages]);

  useEffect(() => {
    let timer;
    if (isLightboxLoading) {
      timer = setTimeout(() => setShowSpinner(true), 150);
    } else {
      setShowSpinner(false);
    }
    return () => clearTimeout(timer);
  }, [isLightboxLoading]);

  const openLightbox = (index, imageArray) => {
    setSlideDirection("");
    setActiveImages(imageArray);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setSlideDirection("");
    setTimeout(() => setActiveImages([]), 300);
  };

  const showNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setSlideDirection("next");
      setSelectedIndex((prev) => (prev + 1) % activeImages.length);
    },
    [activeImages.length],
  );

  const showPrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setSlideDirection("prev");
      setSelectedIndex((prev) =>
        prev === 0 ? activeImages.length - 1 : prev - 1,
      );
    },
    [activeImages.length],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    },
    [selectedIndex, showNext, showPrev],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) showNext();
    else if (isRightSwipe) showPrev();
  };

  const handleShowMore = (section) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [section]: prev[section] + INITIAL_VISIBLE_COUNT,
    }));
  };

  return (
    <div className="bg-(--color-bg-primary) dark:bg-(--color-dark-text) w-full relative">
      <style>{`
        @keyframes slideInNext {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInPrev {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-next { animation: slideInNext 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-slide-prev { animation: slideInPrev 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-fade-scale { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>

      <div className="w-full p-6 xs:p-8 md:p-12 lg:p-16 xl:p-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-12 md:gap-16 justify-evenly items-center flex-1 w-full">
            {/* 1. Workshops Section */}
            <div className="w-full">
              <SectionHeader
                title={t("gallery.title")}
                description={t("gallery.description")}
              />

              <div
                id="workshop-grid"
                className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-6 w-full"
              >
                {workshopImages
                  .slice(0, visibleCounts.workshops)
                  .map((image, index) => (
                    <GalleryImage
                      key={`grid-workshop-${index}`}
                      src={image}
                      index={index}
                      onClick={() => openLightbox(index, workshopImages)}
                    />
                  ))}
              </div>

              <div className="block md:hidden mt-4 md:mt-6 w-full">
                {/* Full array passed to Carousel */}
                <Carousel
                  items={workshopImages}
                  renderItem={(image, index) => (
                    <GalleryImage
                      src={image}
                      index={index}
                      inCarousel={true}
                      onClick={() => openLightbox(index, workshopImages)}
                    />
                  )}
                />
              </div>

              {workshopImages.length > visibleCounts.workshops && (
                <ShowMoreButton
                  onClick={() => handleShowMore("workshops")}
                  text={t("gallery.viewMore")}
                />
              )}
            </div>

            {/* 2. Products Section */}
            <div className="w-full">
              <SectionHeader
                title={t("gallery.products")}
                description={t("gallery.prodDesc")}
              />

              <div className="flex flex-col gap-12 md:gap-16 mt-4 md:mt-6">
                {countries.map((country) => {
                  const imagesForCountry = productImages[country.code];

                  if (!imagesForCountry || imagesForCountry.length === 0)
                    return null;

                  const visibleImages = imagesForCountry.slice(
                    0,
                    visibleCounts[country.code],
                  );

                  return (
                    <div key={country.code} className="w-full">
                      <div className="[&>div]:items-start!">
                        <SectionHeader
                          title={country.name}
                          titleColor="text-lg! md:text-xl! lg:text-2xl! text-(--color-dark-text) dark:text-white"
                        />
                      </div>

                      <div
                        id={`product-grid-${country.code}`}
                        className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mt-2 w-full"
                      >
                        {visibleImages.map((image, index) => (
                          <GalleryImage
                            key={`grid-${country.code}-${index}`}
                            src={image}
                            index={index}
                            onClick={() =>
                              openLightbox(index, imagesForCountry)
                            }
                          />
                        ))}
                      </div>

                      <div className="block md:hidden mt-4 w-full">
                        {/* Full array passed to Carousel */}
                        <Carousel
                          items={imagesForCountry}
                          renderItem={(image, index) => (
                            <GalleryImage
                              src={image}
                              index={index}
                              inCarousel={true}
                              onClick={() =>
                                openLightbox(index, imagesForCountry)
                              }
                            />
                          )}
                        />
                      </div>

                      {imagesForCountry.length >
                        visibleCounts[country.code] && (
                        <ShowMoreButton
                          onClick={() => handleShowMore(country.code)}
                          text={t("gallery.viewMore")}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Exhibitions Section */}
            {exhibitionImages.length > 0 && (
              <div className="w-full">
                <SectionHeader
                  title={t("gallery.exhibitions")}
                  description={t("gallery.exhDesc")}
                />

                <div
                  id="exhibition-grid"
                  className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-6 w-full"
                >
                  {exhibitionImages
                    .slice(0, visibleCounts.exhibitions)
                    .map((image, index) => (
                      <GalleryImage
                        key={`grid-exhibition-${index}`}
                        src={image}
                        index={index}
                        onClick={() => openLightbox(index, exhibitionImages)}
                      />
                    ))}
                </div>

                <div className="block md:hidden mt-4 md:mt-6 w-full">
                  {/* Full array passed to Carousel */}
                  <Carousel
                    items={exhibitionImages}
                    renderItem={(image, index) => (
                      <GalleryImage
                        src={image}
                        index={index}
                        inCarousel={true}
                        onClick={() => openLightbox(index, exhibitionImages)}
                      />
                    )}
                  />
                </div>

                {exhibitionImages.length > visibleCounts.exhibitions && (
                  <ShowMoreButton
                    onClick={() => handleShowMore("exhibitions")}
                    text={t("gallery.viewMore")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedIndex !== null && activeImages.length > 0 && (
        <div
          className="fixed inset-0 z-3 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity touch-none"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full h-full max-w-7xl max-h-screen px-4 pt-20 pb-6 xs:px-16 xs:pt-24 xs:pb-8 md:px-24 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
            <div className="flex-1 flex items-center justify-center w-full min-h-0 relative">
              {showSpinner && (
                <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}

              <img
                key={selectedIndex}
                src={activeImages[selectedIndex]}
                alt={`Expanded view ${selectedIndex + 1}`}
                className={`max-w-full max-h-full object-contain rounded-sm shadow-2xl pointer-events-auto transition-opacity duration-300 ${
                  isLightboxLoading ? "opacity-0" : "opacity-100"
                } ${
                  slideDirection === "next"
                    ? "animate-slide-next"
                    : slideDirection === "prev"
                      ? "animate-slide-prev"
                      : "animate-fade-scale"
                }`}
                onLoad={() => setIsLightboxLoading(false)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div
              className="mt-4 text-white/70 text-sm tracking-widest shrink-0 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedIndex + 1} / {activeImages.length}
            </div>
          </div>

          <button
            className="absolute top-4 right-4 xs:top-6 xs:right-6 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 transition-colors z-2 p-2 rounded-full cursor-pointer pointer-events-auto"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            className="hidden md:flex w-12 h-12 items-center justify-center absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 transition-colors z-2 rounded-full cursor-pointer pointer-events-auto"
            onClick={showPrev}
            aria-label="Previous image"
          >
            <svg
              className="-translate-x-px"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="hidden md:flex w-12 h-12 items-center justify-center absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 transition-colors z-2 rounded-full cursor-pointer pointer-events-auto"
            onClick={showNext}
            aria-label="Next image"
          >
            <svg
              className="translate-x-px"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
