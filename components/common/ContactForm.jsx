import React from "react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation("home");

  return (
    <div
      data-aos="fade-down"
      data-aos-delay="400"
      className="bg-white dark:bg-(--color-dark2-text) rounded-md p-5 xs:p-6 md:p-8 shadow-md transition-colors duration-200 w-full"
    >
      <h2 className="text-sm md:text-base lg:text-lg font-bold text-(--color-dark-text) dark:text-white mb-6">
        {t("contact.sendMessage")}
      </h2>

      <form className="flex flex-col gap-4 md:gap-5">
        {/* Input Group: Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {t("contact.name")}
          </label>
          <input
            type="text"
            required
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

        {/* Input Group: Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {t("contact.email")}
          </label>
          <input
            type="email"
            required
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

        {/* Input Group: Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {t("contact.phone")}
          </label>
          <input
            type="tel"
            pattern="[0-9+() -]*"
            required
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

        {/* Input Group: Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)">
            {t("contact.message")}
          </label>
          <textarea
            rows="3"
            required
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 resize-none focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-2 cursor-pointer font-bold rounded-md transition-all duration-300 whitespace-nowrap text-center
                     text-xs sm:text-sm lg:text-base 
                     py-2 xs:py-2.5 sm:py-3 
                     px-3.5 xs:px-4 sm:px-4.5 md:px-5 lg:px-5.5 xl:px-6
                     bg-(--color-primary) hover:bg-(--color-primary-hover) dark:bg-(--color-primary2) text-white"
        >
          {t("contact.sendButton")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
