import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation("layouts");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "us" },
    { code: "ελ", name: "Ελληνικά", flag: "gr" },
    { code: "pl", name: "Polski", flag: "pl" },
    { code: "tr", name: "Türkçe", flag: "tr" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close language dropdown if clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }

      // Close mobile menu if clicking outside
      if (isMobileMenuOpen) {
        // Check if click is outside both the mobile menu and the hamburger button
        const isClickInsideMobileMenu =
          mobileMenuRef.current && mobileMenuRef.current.contains(event.target);
        const isClickOnHamburger =
          hamburgerButtonRef.current &&
          hamburgerButtonRef.current.contains(event.target);

        if (!isClickInsideMobileMenu && !isClickOnHamburger) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Add isMobileMenuOpen to dependencies

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const selectLanguage = async (language) => {
    try {
      localStorage.setItem("oteship-lang", language.code);
      await i18n.changeLanguage(language.code);
      setIsLanguageOpen(false);
    } catch (error) {
      console.error("Language change failed:", error);
      setIsLanguageOpen(false);
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <nav className="bg-white dark:bg-(--color-bg-dark) p-2.5 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex items-center drop-shadow-sm sticky top-0 z-10 transition-colors duration-200">
      {/* Left Section */}
      <div className="flex flex-col shrink-0 justify-start max-w-fit">
        <Link to="/">
          <div className="flex flex-row items-center pb-0 md:pb-1 lg:pb-1.5 xl:pb-2 space-x-0.5 sm:space-x-1 md:space-x-1.5 xl:space-x-2">
            <img
              src="/logos/oteship.png"
              alt="IKY"
              className="h-[0.75em] sm:h-[1em] md:h-[1.5em] lg:h-[1.75em] xl:h-[2em] w-auto inline-block"
            />
            <h1 className="text-base sm:text-lg md:text-xl lg:text-[1.35rem] xl:text-2xl font-bold text-(--color-primary) dark:text-(--color-primary2)">
              OTESHIP
            </h1>
          </div>
          <div className="flex flex-row items-center space-x-0.5 sm:space-x-1 md:space-x-1.5 xl:space-x-2">
            <span className="fi fi-eu h-[0.65em] sm:h-[0.75em] md:h-[0.85em] lg:h-[0.9em] xl:h-[1em]"></span>
            <img
              src="/logos/IKY.png"
              alt="IKY"
              className="h-[0.65em] sm:h-[0.75em] md:h-[0.85em] lg:h-[0.9em] xl:h-[1em] w-auto inline-block"
            />
            <img
              src="/logos/eeeek.png"
              alt="EEEEK"
              className="h-[0.65em] sm:h-[0.75em] md:h-[0.85em] lg:h-[0.9em] xl:h-[1em] w-auto inline-block"
            />
            <img
              src="/logos/poland.png"
              alt="IKY"
              className="h-[0.65em] sm:h-[0.75em] md:h-[0.85em] lg:h-[0.9em] xl:h-[1em] w-auto inline-block"
            />
            <img
              src="/logos/turkey.png"
              alt="IKY"
              className="h-[0.65em] sm:h-[0.75em] md:h-[0.85em] lg:h-[0.9em] xl:h-[1em] w-auto inline-block"
            />
            <h2 className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-[11px] xl:text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
              Erasmus+
            </h2>
          </div>
        </Link>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex justify-center flex-1 min-w-fit text-center xl:absolute xl:left-1/2 xl:-translate-x-1/2 text-sm lg:text-[15px] xl:text-base space-x-4 lg:space-x-8 xl:space-x-12 font-medium [--hover-color:#aeaeae] dark:[--hover-color:#aeaeaebd] text-(--color-dark-text) dark:text-white">
        <Link to="/" className="hover-anim">
          {t("navbar.home")}
        </Link>
        <Link to="/about" className="hover-anim">
          {t("navbar.about")}
        </Link>
        <Link to="/guide" className="hover-anim">
          {t("navbar.guide")}
        </Link>
        <Link to="/ceramics" className="hover-anim">
          {t("navbar.ceramics")}
        </Link>
        <Link to="/contact" className="hover-anim">
          {t("navbar.contact")}
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex flex-row justify-end items-center space-x-2 sm:space-x-2.5 md:space-x-2.5 lg:space-x-2.5 xl:space-x-2.5 flex-1 md:flex-none xl:flex-1 max-w-none md:max-w-fit xl:max-w-none">
        {/* Desktop Theme & Language Container */}
        <div className="hidden xs:flex flex-row items-center space-x-2 sm:space-x-2.5">
          <ThemeToggle />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleLanguageDropdown}
              className="flex w-12.5 sm:w-13.75 md:w-15 lg:w-17.5 xl:w-20 px-2 sm:px-2.5 md:px-2.5 lg:px-3 xl:px-3.5 py-1 lg:py-1.5 space-x-1 md:space-x-1.5 xl:space-x-2 bg-gray-100 dark:bg-(--color-dark2-text) border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer flex-row justify-center items-center hover:bg-gray-200 dark:hover:bg-black/40 transition-all duration-200"
            >
              <h1 className="font-light inline-block text-[10px] sm:text-[11px] md:text-xs lg:text-[13px] xl:text-sm uppercase tracking-wide dark:text-white">
                {currentLanguage.code}
              </h1>
              <span
                className={`fi fi-${currentLanguage.flag} text-[10px] sm:text-xs md:text-sm`}
              ></span>
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-(--color-bg-dark) shadow-lg ring-1 ring-gray-300 dark:ring-gray-500 ring-opacity-5 focus:outline-none z-50 transition-all duration-200 ease-out ${
                isLanguageOpen
                  ? "transform opacity-100 scale-100 translate-y-0"
                  : "transform opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <div>
                {languages.map((language, index) => (
                  <button
                    key={language.code}
                    onClick={() => selectLanguage(language)}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-all duration-150 cursor-pointer ${
                      currentLanguage.code === language.code
                        ? "bg-blue-50 dark:bg-(--color-light2-text) text-blue-700 dark:text-black font-medium"
                        : "text-(--color-dark2-text) dark:text-white hover:bg-black/25"
                    } ${index === 0 ? "rounded-t-md" : ""} ${
                      index === languages.length - 1 ? "rounded-b-md" : ""
                    }`}
                  >
                    <span className={`fi fi-${language.flag} mr-3`}></span>
                    {language.name}
                    {currentLanguage.code === language.code && (
                      <svg
                        className="ml-auto h-4 w-4 text-blue-600 dark:text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Button with invisible touch target */}
        <div className="relative xs:hidden flex items-center justify-center w-10 h-10 shrink-0">
          <button
            ref={hamburgerButtonRef}
            className="peer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-10 cursor-pointer rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          ></button>

          <div className="relative flex items-center justify-center w-full h-full rounded-md text-(--color-dark-text) dark:text-white peer-hover:bg-gray-100 dark:peer-hover:bg-gray-800 transition-colors pointer-events-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`absolute top-full left-0 w-full bg-white dark:bg-(--color-bg-dark) shadow-md border-t border-gray-200 dark:border-(--color-divider) transition-all duration-300 ease-in-out xs:hidden overflow-hidden ${
          isMobileMenuOpen
            ? "max-h-125 opacity-100 py-4"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 space-y-6">
          {/* Top: Theme & Language */}
          <div className="flex flex-row justify-between items-center border-b border-gray-200 dark:border-(--color-divider) pb-4">
            {/* Added variant prop here! */}
            <ThemeToggle variant="menu" />

            <div className="flex space-x-2 bg-[#eceef0] dark:bg-(--color-dark2-text) p-1 rounded-md transition-colors duration-200">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    selectLanguage(language);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
                    currentLanguage.code === language.code
                      ? "bg-white dark:bg-black/40 shadow-sm"
                      : "hover:bg-gray-200 dark:hover:bg-black/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className={`fi fi-${language.flag} text-sm`}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom: Nav Links */}
          <div className="flex flex-col space-y-4 text-center text-[15px] font-medium text-(--color-dark-text) dark:text-white pb-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover-anim inline-block w-fit mx-auto"
            >
              {t("navbar.home")}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover-anim inline-block w-fit mx-auto"
            >
              {t("navbar.about")}
            </Link>
            <Link
              to="/guide"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover-anim inline-block w-fit mx-auto"
            >
              {t("navbar.guide")}
            </Link>
            <Link
              to="/ceramics"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover-anim inline-block w-fit mx-auto"
            >
              {t("navbar.ceramics")}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover-anim inline-block w-fit mx-auto"
            >
              {t("navbar.contact")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
