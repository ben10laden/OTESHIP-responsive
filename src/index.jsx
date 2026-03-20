import React, {
  Suspense,
  lazy,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { Routes, Route, useLocation } from "react-router";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Guide from "./pages/Guide";
import Ceramics from "./pages/Ceramics";
import NotFound from "./pages/NotFound";
import ScrollToTopButton from "./components/layouts/ScrollToTopButton";
import SideBar from "./components/sections/Guide/SideBar";
import AccessibilityMenu from "./components/layouts/AccessibilityMenu";
import GalleryPageSkeleton from "./components/skeletons/GalleryPageSkeleton";

const Gallery = lazy(() => import("./pages/Gallery"));

export default function Index() {
  const location = useLocation();
  const isGuidePage = location.pathname === "/guide";

  // State for mobile sidebar drawer
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Close sidebar automatically on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  if (isGuidePage) {
    return (
      // FIX: Removed overflow-x-hidden so the sticky Navbar works again
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0b101a] transition-colors duration-200">
        <Navbar />
        <ScrollToTopButton />
        <AccessibilityMenu />

        {/* Mobile Sidebar Toggle Button (Left Edge) */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-(--color-primary) dark:bg-(--color-primary2) text-white p-3 sm:p-4 rounded-r-xl drop-shadow-xl transition-all duration-300 ease-in-out hover:pl-5 cursor-pointer ${
            isSidebarOpen
              ? "-translate-x-full opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100"
          }`}
          aria-label="Open Guide Menu"
        >
          <i className="fa-solid fa-chevron-right text-lg sm:text-xl"></i>
        </button>

        {/* Mobile Backdrop Blur */}
        <div
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-4000 lg:hidden transition-opacity duration-300 ${
            isSidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Drawer (Slides from Left) */}
        <div
          className={`fixed inset-y-0 left-0 z-5000 w-[85vw] max-w-sm bg-white dark:bg-(--color-dark-text) shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 bg-(--color-bg-primary) dark:bg-(--color-bg-dark) border-b border-(--color-light3-text)/40 shrink-0">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-(--color-dark-text) dark:text-white p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <SideBar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* Main Layout Container */}
        <div className="max-w-7xl mx-auto w-full relative flex-1">
          <div className="flex flex-col lg:flex-row">
            {/* Desktop Sidebar Container - Takes up space in flow but hidden on mobile */}
            <div className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
              {/* RESTORED: Fixed sidebar positioned exactly within the flow space with overflow-visible */}
              <div className="fixed top-0 pt-32 bottom-0 lg:w-80 xl:w-96 px-6 sm:px-8 lg:px-6 xl:px-12 pb-12 overflow-visible">
                <SideBar />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 pb-16">
              <main className="mt-8 xs:mt-10 md:mt-12 lg:mt-13 px-6 sm:px-8 lg:px-6 xl:px-0">
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
      <AccessibilityMenu />
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
