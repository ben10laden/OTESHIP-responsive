import React from "react";

// Matches the exact dimensions of GalleryImage
const GalleryImageSkeleton = ({ inCarousel }) => (
  <div
    className={`relative rounded-md overflow-hidden shadow-md bg-gray-200 dark:bg-gray-800 animate-pulse shrink-0 ${
      inCarousel
        ? "w-full h-50 xs:h-65 block" // Taller responsive heights for the carousel
        : "w-full h-50 xs:w-[calc((100%-0.5rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
    }`}
  />
);

// Matches the SectionHeader component
const SectionHeaderSkeleton = ({
  hasDescription = true,
  alignStart = false,
  isSmallTitle = false,
}) => (
  <div
    className={`flex flex-col gap-3 w-full ${alignStart ? "items-start" : "items-center justify-center"}`}
  >
    <div
      className={`${isSmallTitle ? "h-6 md:h-7 lg:h-8 w-32 md:w-48" : "h-7 md:h-8 lg:h-9 xl:h-10 w-48 md:w-64"} bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse`}
    ></div>
    {hasDescription && (
      <div
        className={`flex flex-col gap-1.5 w-full max-w-2xl mt-2 ${alignStart ? "items-start" : "items-center"}`}
      >
        <div className="w-full h-3 md:h-4 lg:h-5 bg-gray-200 dark:bg-gray-800 rounded-sm animate-pulse"></div>
        <div className="w-4/5 h-3 md:h-4 lg:h-5 bg-gray-200 dark:bg-gray-800 rounded-sm animate-pulse"></div>
      </div>
    )}
  </div>
);

// Matches the exact Carousel layout used on mobile
const MobileCarouselSkeleton = () => (
  <div className="block md:hidden mt-4 md:mt-6 w-full">
    {/* Single visible card for mobile carousel */}
    <div className="w-full">
      <GalleryImageSkeleton inCarousel={true} />
    </div>

    {/* Carousel Navigation Skeleton */}
    <div className="flex flex-col items-center gap-4 mt-6 md:mt-8 w-full">
      {/* Dots */}
      <div className="flex flex-wrap justify-center gap-2 px-4 w-full max-w-md">
        <div className="h-2 w-6 rounded-full bg-gray-400 dark:bg-gray-600 animate-pulse"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
      </div>

      <div className="flex gap-4">
        <div className="p-2 rounded-full bg-white dark:bg-(--color-dark2-text) shadow-md w-9 h-9 flex items-center justify-center">
          <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-700 rounded-sm animate-pulse"></div>
        </div>
        <div className="p-2 rounded-full bg-white dark:bg-(--color-dark2-text) shadow-md w-9 h-9 flex items-center justify-center">
          <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-700 rounded-sm animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Desktop Grid Layout
const DesktopGridSkeleton = ({ count = 8 }) => (
  <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-6 w-full">
    {Array.from({ length: count }).map((_, index) => (
      <GalleryImageSkeleton key={index} inCarousel={false} />
    ))}
  </div>
);

const GalleryPageSkeleton = () => {
  // Simulating 3 country grids for the products section
  const countries = [1, 2, 3];

  return (
    <div className="bg-(--color-bg-primary) dark:bg-(--color-dark-text) w-full relative min-h-screen">
      <div className="w-full p-6 xs:p-8 md:p-12 lg:p-16 xl:p-20">
        <div className="max-w-7xl mx-auto">
          {/* Main flex container handling gaps */}
          <div className="flex flex-col gap-12 md:gap-16 justify-evenly items-center flex-1 w-full">
            {/* 1. Workshops Section Skeleton */}
            <div className="w-full">
              <SectionHeaderSkeleton hasDescription={true} />
              <DesktopGridSkeleton count={8} />{" "}
              {/* Fills 2 rows on large screens */}
              <MobileCarouselSkeleton />
            </div>

            {/* 2. Products Section Skeleton */}
            <div className="w-full">
              <SectionHeaderSkeleton hasDescription={true} />

              <div className="flex flex-col gap-12 md:gap-16 mt-4 md:mt-6">
                {countries.map((_, index) => (
                  <div key={index} className="w-full">
                    {/* The real component uses [&>div]:items-start! so we pass alignStart */}
                    <SectionHeaderSkeleton
                      hasDescription={false}
                      alignStart={true}
                      isSmallTitle={true}
                    />
                    <DesktopGridSkeleton count={4} />{" "}
                    {/* Fills 1 row on large screens */}
                    <MobileCarouselSkeleton />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Exhibitions Section Skeleton */}
            <div className="w-full">
              <SectionHeaderSkeleton hasDescription={true} />
              <DesktopGridSkeleton count={8} />{" "}
              {/* Fills 2 rows on large screens */}
              <MobileCarouselSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPageSkeleton;
