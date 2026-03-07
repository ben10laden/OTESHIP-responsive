import { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  const handleToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <button
      className="relative lg:w-8 lg:h-8 md:w-4 md:h-4 p-1.5 lg:inline-block md:inline-block sm:hidden hidden rounded-full hover:bg-gray-100 dark:hover:bg-(--color-secondary) transition-colors duration-200 overflow-hidden cursor-pointer"
      style={{ lineHeight: 0 }}
      onClick={handleToggle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Moon - shows when in light mode */}
      <i
        className={`ml-px fa-solid fa-moon text-xl text-(--color-secondary-light) absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        transition-all duration-300 ease-out origin-center ${
          isDarkMode
            ? "opacity-0 scale-50 rotate-90"
            : "opacity-100 scale-100 rotate-0"
        }`}
      ></i>

      {/* Sun - shows when in dark mode */}
      <i
        className={`text-xl text-(--color-light3-text) absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        transition-all duration-300 ease-out origin-center ${
          isDarkMode
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 -rotate-90"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          width="1.4em"
          height="1.4em"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </i>
    </button>
  );
};

export default ThemeToggle;
