import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation("layouts");
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "us" },
    { code: "ελ", name: "Ελληνικά", flag: "gr" },
    { code: "pl", name: "Polski", flag: "pl" },
    { code: "tr", name: "Türkçe", flag: "tr" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <nav className="bg-white dark:bg-(--color-bg-dark) p-2.5 px-4 sm:px-8 md:px-16 lg:px-32 flex items-center drop-shadow-sm sticky top-0 z-10 transition-colors duration-200">
      {/* Left Section */}
      <div className="flex flex-col shrink-0 justify-start max-w-fit">
        <Link to="/">
          <div className="flex flex-row space-x-0.5 sm:space-x-1 md:space-x-1.5 lg:space-x-2 items-center pb-0 sm:pb-0 md:pb-1 lg:pb-2">
            <img
              src="/logos/oteship.png"
              alt="IKY"
              className="lg:h-[2em] md:h-[1.5em] sm:h-[1em] h-[0.75em] w-auto inline-block"
            />
            <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base font-bold text-(--color-primary) dark:text-(--color-primary2)">
              OTESHIP
            </h1>
          </div>
          <div className="flex flex-row items-center space-x-0.5 sm:space-x-1 md:space-x-1.5 lg:space-x-2">
            <span className="fi fi-eu lg:h-[1em] md:h-[0.85em] sm:h-[0.75em] h-[0.65em]"></span>
            <img
              src="/logos/IKY.png"
              alt="IKY"
              className="lg:h-[1em] md:h-[0.85em] sm:h-[0.75em] h-[0.65em] w-auto inline-block"
            />
            <img
              src="/logos/eeeek.png"
              alt="EEEEK"
              className="lg:h-[1em] md:h-[0.85em] sm:h-[0.75em] h-[0.65em] w-auto inline-block"
            />
            <img
              src="/logos/poland.png"
              alt="IKY"
              className="lg:h-[1em] md:h-[0.85em] sm:h-[0.75em] h-[0.65em] w-auto inline-block"
            />
            <img
              src="/logos/turkey.png"
              alt="IKY"
              className="lg:h-[1em] md:h-[0.85em] sm:h-[0.75em] h-[0.65em] w-auto inline-block"
            />
            <h2 className="lg:text-xs md:text-[10px] sm:text-[8px] text-[6px] text-(--color-bg-dark) dark:text-(--color-bg-primary)">
              Erasmus+
            </h2>
          </div>
        </Link>
      </div>

      {/* Center Section */}
      <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 static md:static hidden lg:flex md:flex sm:hidden justify-center lg:text-base md:text-sm lg:space-x-12 md:space-x-4 font-medium flex-1 min-w-fit text-center [--hover-color:#aeaeae] dark:[--hover-color:#aeaeaebd] text-(--color-dark-text) dark:text-white">
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
      <div className="flex flex-row justify-end items-center space-x-2.5 flex-1 max-w-none lg:flex-1 md:flex-0 lg:max-w-none md:max-w-fit">
        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="lg:flex md:flex sm:hidden hidden lg:w-20 md:w-15 lg:space-x-2 md:space-x-1.5 lg:px-3.5 md:px-2.5 lg:py-1.5 md:py-1 bg-gray-100 dark:bg-(--color-dark2-text) border border-gray-300 dark:border-gray-500 rounded-md cursor-pointer flex-row justify-center items-center hover:bg-gray-200 dark:hover:bg-black/40 transition-all duration-200"
          >
            <h1 className="font-light lg:inline-block md:inline-block lg:text-sm md:text-xs uppercase tracking-wide dark:text-white">
              {currentLanguage.code}
            </h1>
            <span className={`fi fi-${currentLanguage.flag} text-sm`}></span>
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
    </nav>
  );
}
