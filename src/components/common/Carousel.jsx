import React, { useState, useEffect } from "react";

const Carousel = ({
  items,
  renderItem,
  gridContainerStyle = {},
  gridContainerClassName = "",
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const MAX_VISIBLE_PAGES = 5;

  const [cardsPerPage, setCardsPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return 3;
  });

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

  const minSwipeDistance = 30;
  const totalCards = items?.length || 0;
  const totalPages = Math.ceil(totalCards / cardsPerPage) || 1;

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerPage(1);
      } else if (width < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  useEffect(() => {
    if (totalCards > 0 && currentPage >= totalPages) {
      handlePageChange(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsPerPage, totalPages, totalCards]);

  // --- The Push/Pull Window Math ---
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    setWindowStart((prevStart) => {
      let newStart = prevStart;

      // Push window right
      if (newPage > prevStart + MAX_VISIBLE_PAGES - 2) {
        newStart = newPage - MAX_VISIBLE_PAGES + 2;
      }
      // Pull window left
      else if (newPage < prevStart + 1) {
        newStart = newPage - 1;
      }

      const maxStart = Math.max(0, totalPages - MAX_VISIBLE_PAGES);
      return Math.min(Math.max(0, newStart), maxStart);
    });
  };

  const handlePrev = () => {
    if (currentPage > 0) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) handlePageChange(currentPage + 1);
  };

  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX || !touchStartY || !touchEndY) return;

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;

    if (Math.abs(distanceY) > Math.abs(distanceX)) return;

    if (distanceX > minSwipeDistance && currentPage < totalPages - 1)
      handleNext();
    if (distanceX < -minSwipeDistance && currentPage > 0) handlePrev();
  };

  return (
    <div className="w-full">
      <div
        className={`grid gap-4 md:gap-5 lg:gap-6 transition-all duration-300 w-full touch-pan-y ${gridContainerClassName}`}
        style={{
          gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))`,
          ...gridContainerStyle,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, index) => {
          const isVisible =
            index >= currentPage * cardsPerPage &&
            index < (currentPage + 1) * cardsPerPage;

          return (
            <div
              key={index}
              className={`w-full h-full flex flex-col transition-all duration-300 ${
                isVisible
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible h-0 overflow-hidden pointer-events-none"
              }`}
              style={{
                gridRow: "1",
                gridColumn: `${(index % cardsPerPage) + 1} / span 1`,
              }}
            >
              {renderItem(item, index, isVisible)}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8 md:mt-10 lg:mt-12 w-full">
          {/* THE CLIPPING MASK */}
          <div className="overflow-hidden max-w-22 flex items-center h-6 relative">
            {/* THE SLIDING TRACK */}
            <div
              className="flex gap-2 w-max transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${windowStart}rem)` }}
            >
              {Array.from({ length: totalPages }).map((_, index) => {
                const isActive = index === currentPage;
                const isLeftGhost = index === windowStart && windowStart > 0;
                const isRightGhost =
                  index === windowStart + MAX_VISIBLE_PAGES - 1 &&
                  windowStart < totalPages - MAX_VISIBLE_PAGES;
                const isHidden =
                  index < windowStart ||
                  index >= windowStart + MAX_VISIBLE_PAGES;

                // flex-shrink-0 preserves the track math, preventing squishing
                let dotClasses =
                  "h-2 rounded-full transition-all duration-300 ease-out flex-shrink-0 ";

                if (isActive) {
                  dotClasses +=
                    "w-6 bg-blue-600 scale-100 opacity-100 cursor-pointer";
                } else if (isLeftGhost || isRightGhost) {
                  // Ghost dots shrink slightly to create the 3D rounded edge effect
                  dotClasses +=
                    "w-2 bg-gray-400 dark:bg-gray-500 scale-75 opacity-50 cursor-pointer";
                } else if (isHidden) {
                  // THE FIX: Hidden dots keep their physical w-2 space for the track math,
                  // but visually shrink to scale-0 so they don't get chopped off by the mask!
                  dotClasses +=
                    "w-2 bg-gray-300 dark:bg-gray-600 scale-0 opacity-0 pointer-events-none";
                } else {
                  dotClasses +=
                    "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 scale-100 opacity-100 cursor-pointer";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={dotClasses}
                    aria-label={`Go to page ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* ... Next/Prev Buttons remain exactly the same ... */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`p-2 rounded-full bg-white dark:bg-(--color-dark2-text) shadow-md transition-all ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110 cursor-pointer"
              }`}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full bg-white dark:bg-(--color-dark2-text) shadow-md transition-all ${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-110 cursor-pointer"
              }`}
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
