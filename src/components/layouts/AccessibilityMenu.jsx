import React, { useState, useEffect, useRef } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
import { useTranslation } from "react-i18next";

const AccessibilityMenu = () => {
  const { t } = useTranslation("accessibilityMenu");

  const { settings, updateSettings, toggleSetting } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonClasses = `
    fixed bottom-24 right-0 z-5000
    bg-(--color-primary) hover:bg-(--color-primary-hover) 
    dark:bg-(--color-primary2) dark:hover:bg-(--color-primary2-hover)
    text-white py-3.5 sm:py-4.5 px-2.5 sm:px-3.5 rounded-l-xl
    drop-shadow-xl cursor-pointer
    transition-all duration-300 ease-in-out
    flex items-center justify-center
    no-scale
  `;

  const menuClasses = `
    fixed bottom-24 right-4 xs:right-14 sm:right-16 z-5000
    bg-white dark:bg-(--color-dark2-text)
    shadow-2xl rounded-md
    p-4 sm:p-5 
    w-[calc(100vw-2rem)] xs:w-92
    max-h-[75vh] overflow-y-auto
    border border-gray-200 dark:border-gray-700
    transform transition-all duration-300 origin-bottom-right
    ${
      isOpen
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none invisible"
    }
  `;

  const toggleOptions = [
    {
      key: "reduceMotion",
      label: t("toggles.reduceMotion"),
      icon: "fa-solid fa-person-walking",
    },
    {
      key: "dyslexiaFont",
      label: t("toggles.dyslexiaFont"),
      icon: "fa-solid fa-book-open",
    },
    {
      key: "highlightLinks",
      label: t("toggles.highlightLinks"),
      icon: "fa-solid fa-link",
    },
  ];

  return (
    <div ref={menuRef} className="no-highlight">
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label={t("buttons.toggle")}
        title={t("buttons.title")}
      >
        <i
          className={`fa-solid ${
            isOpen ? "fa-xmark" : "fa-universal-access"
          } text-lg sm:text-xl transition-transform duration-300`}
        ></i>
      </button>

      {/* Menu panel */}
      <div className={menuClasses}>
        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 className="font-bold text-base sm:text-lg text-(--color-dark-text) dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
            {t("title")}
          </h3>

          {/* Font Size (Cycling Button) */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-xs sm:text-sm font-medium text-(--color-dark-text) dark:text-white">
              {t("sections.fontSize")}
            </label>
            <button
              aria-label={t("sections.fontSize")}
              onClick={() => {
                const sizes = ["normal", "large", "xlarge"];
                const currentIndex = sizes.indexOf(
                  settings.fontSize || "normal",
                );
                const nextSize = sizes[(currentIndex + 1) % sizes.length];
                updateSettings({ fontSize: nextSize });
              }}
              className="flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-800 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 rounded cursor-pointer transition-all w-full"
            >
              {/* Custom 3 A's Icon */}
              <div className="w-5 flex items-baseline justify-center gap-px font-bold text-(--color-primary) dark:text-(--color-primary2)">
                <span className="text-[9px] leading-none">A</span>
                <span className="text-[12px] leading-none">A</span>
                <span className="text-[16px] leading-none">A</span>
              </div>
              <span className="text-xs sm:text-sm flex-1 text-left font-medium capitalize">
                {t(`options.fontSize.${settings.fontSize || "normal"}`)}
              </span>
              <i className="fa-solid fa-rotate-right text-xs sm:text-sm opacity-60"></i>
            </button>
          </div>

          {/* Contrast */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-xs sm:text-sm font-medium text-(--color-dark-text) dark:text-white">
              {t("sections.contrast")}
            </label>
            <div className="flex gap-1.5 sm:gap-2">
              {["normal", "high"].map((contrast) => (
                <button
                  key={contrast}
                  aria-label={t("sections.contrast")}
                  onClick={() => updateSettings({ contrast })}
                  className={`
                    flex-1 px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm rounded cursor-pointer
                    transition-all capitalize font-medium
                    ${
                      settings.contrast === contrast
                        ? "bg-(--color-primary) dark:bg-(--color-primary2) text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900"
                    }
                  `}
                >
                  {t(`options.contrast.${contrast}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-xs sm:text-sm font-medium text-(--color-dark-text) dark:text-white">
              {t("sections.lineSpacing")}
            </label>
            <div className="flex gap-1.5 sm:gap-2">
              {["normal", "wide"].map((spacing) => (
                <button
                  key={spacing}
                  aria-label={t("sections.lineSpacing")}
                  onClick={() => updateSettings({ lineSpacing: spacing })}
                  className={`
                    flex-1 px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm rounded cursor-pointer
                    transition-all capitalize font-medium
                    ${
                      settings.lineSpacing === spacing
                        ? "bg-(--color-primary) dark:bg-(--color-primary2) text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900"
                    }
                  `}
                >
                  {t(`options.lineSpacing.${spacing}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="flex flex-col gap-2">
            {toggleOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => toggleSetting(option.key)}
                className={`
                  flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 rounded cursor-pointer
                  transition-all w-full text-left
                  ${
                    settings[option.key]
                      ? "bg-(--color-primary) dark:bg-(--color-primary2) text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900"
                  }
                `}
              >
                <i
                  className={`${option.icon} w-5 text-center text-xs sm:text-sm`}
                />
                <span className="text-xs sm:text-sm flex-1 font-medium">
                  {option.label}
                </span>
                <i
                  className={`fa-solid ${
                    settings[option.key] ? "fa-check" : "fa-xmark"
                  } text-xs sm:text-sm`}
                />
              </button>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={() =>
              updateSettings({
                fontSize: "normal",
                contrast: "normal",
                lineSpacing: "normal",
                reduceMotion: false,
                dyslexiaFont: false,
                highlightLinks: false,
              })
            }
            className="mt-1 sm:mt-2 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold bg-gray-200 dark:bg-gray-800 text-(--color-dark-text) dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-900 transition-all cursor-pointer"
          >
            {t("buttons.reset")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
