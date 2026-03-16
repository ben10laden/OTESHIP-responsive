// src/components/layouts/AccessibilityMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";
//import { useTranslation } from 'react-i18next';

const AccessibilityMenu = () => {
  //const { t } = useTranslation('layouts');
  const { settings, updateSettings, toggleSetting } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on click outside
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
    fixed bottom-24 right-0 z-1000
    bg-(--color-primary) dark:bg-(--color-primary2)
    text-white p-4 rounded-l-full
    shadow-lg cursor-pointer
    transition-all duration-300
    hover:scale-110
    flex items-center gap-2
    w-auto h-auto
    ${isOpen ? "translate-x-0" : "translate-x-0"}
  `;

  const menuClasses = `
    fixed bottom-24 right-20 z-1000
    bg-white dark:bg-(--color-dark2-text)
    shadow-xl rounded-lg
    p-4 w-80
    transition-all duration-300
    border border-gray-200 dark:border-gray-700
    ${isOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-4"}
  `;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label="Accessibility menu"
        title="Accessibility options"
      >
        <i className="fa-solid fa-universal-access text-xl"></i>
        {isOpen && <span className="text-sm">Close</span>}
      </button>

      {/* Menu panel */}
      <div ref={menuRef} className={menuClasses}>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-(--color-dark-text) dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Accessibility Options
          </h3>

          {/* Font Size */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-dark-text) dark:text-white">
              Font Size
            </label>
            <div className="flex gap-2">
              {["normal", "large", "xlarge"].map((size) => (
                <button
                  aria-label="Change Font Size"
                  key={size}
                  onClick={() => updateSettings({ fontSize: size })}
                  className={`
                    flex-1 px-3 py-2 text-sm rounded
                    transition-all capitalize
                    ${
                      settings.fontSize === size
                        ? "bg-(--color-primary) text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-dark-text) dark:text-white">
              Contrast
            </label>
            <div className="flex gap-2">
              {["normal", "high"].map((contrast) => (
                <button
                  aria-label="Change Contrast"
                  key={contrast}
                  onClick={() => updateSettings({ contrast })}
                  className={`
                    flex-1 px-3 py-2 text-sm rounded
                    transition-all capitalize
                    ${
                      settings.contrast === contrast
                        ? "bg-(--color-primary) text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  {contrast}
                </button>
              ))}
            </div>
          </div>

          {/* Line Spacing */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-dark-text) dark:text-white">
              Line Spacing
            </label>
            <div className="flex gap-2">
              {["normal", "wide"].map((spacing) => (
                <button
                  aria-label="Change Line Spacing"
                  key={spacing}
                  onClick={() => updateSettings({ lineSpacing: spacing })}
                  className={`
                    flex-1 px-3 py-2 text-sm rounded
                    transition-all capitalize
                    ${
                      settings.lineSpacing === spacing
                        ? "bg-(--color-primary) text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }
                  `}
                >
                  {spacing}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="flex flex-col gap-2">
            {[
              {
                key: "reduceMotion",
                label: "Reduce Motion",
                icon: "fa-solid fa-person-walking",
              },
              {
                key: "dyslexiaFont",
                label: "Dyslexia-Friendly Font",
                icon: "fa-solid fa-book-open",
              },
              {
                key: "highlightLinks",
                label: "Highlight Links",
                icon: "fa-solid fa-link",
              },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => toggleSetting(option.key)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded
                  transition-all w-full text-left
                  ${
                    settings[option.key]
                      ? "bg-(--color-primary) text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-(--color-dark-text) dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  }
                `}
              >
                <i className={`${option.icon} w-5`}></i>
                <span className="text-sm flex-1">{option.label}</span>
                <i
                  className={`fa-solid ${settings[option.key] ? "fa-check" : "fa-xmark"}`}
                ></i>
              </button>
            ))}
          </div>

          {/* Reset Button */}
          <button
            aria-label="Reset to Default"
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
            className="mt-2 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-(--color-dark-text) dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </>
  );
};

export default AccessibilityMenu;
