import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide";
import Ceramics from "./pages/Ceramics";
import NotFound from "./pages/NotFound";
import { useLayoutEffect } from "react"; // Add useLayoutEffect
import ScrollToTopButton from "./components/layouts/ScrollToTopButton";
import SideBar from "./components/sections/Guide/SideBar";
import AccessibilityMenu from "./components/layouts/AccessibilityMenu";

// 1. Import your new skeleton
import GalleryPageSkeleton from "./components/skeletons/GalleryPageSkeleton"; // <-- Adjust path based on where you saved it

// 2. Lazily load the heavy Gallery page
const Gallery = lazy(() => import("./pages/Gallery"));

export default function Index() {
  const location = useLocation();
  const isGuidePage = location.pathname === "/guide";

  // Use useLayoutEffect instead of useEffect for instant scroll before paint
  useLayoutEffect(() => {
    // Instant scroll to top - happens before browser paint
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" instead of "smooth" for immediate scroll
    });
  }, [location.pathname]);

  if (isGuidePage) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0b101a]">
        <Navbar />
        <ScrollToTopButton />
        <AccessibilityMenu /> {/* Add this */}
        {/* Wrapper that creates the centered region */}
        <div className="overflow-x-hidden max-w-7xl mx-auto w-full relative flex-1">
          {/* Two-column layout within centered region */}
          <div className="flex">
            {/* Sidebar container - takes up space in flow */}
            <div className="w-96">
              {/* Fixed sidebar positioned within the flow space */}
              <div className="fixed top-0 pt-32 bottom-0 w-96 p-12 overflow-visible">
                <SideBar />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <main className="mt-13">
                <Routes>
                  <Route path="/guide" element={<Guide />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default layout for all other pages
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTopButton />
      <AccessibilityMenu /> {/* Add this */}
      <main className="grow flex overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ceramics" element={<Ceramics />} />
          <Route
            path="/gallery"
            element={
              <Suspense fallback={<GalleryPageSkeleton />}>
                <Gallery />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
