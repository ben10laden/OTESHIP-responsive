import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const { t } = useTranslation("home");
  const form = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    // Honeypot Check
    if (e.target.elements.botcheck.value) {
      setSubmitStatus("success");
      form.current.reset();
      // Clear the message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceID, templateID, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setIsSubmitting(false);
          setSubmitStatus("success");
          form.current.reset();

          // Clear the success message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          setIsSubmitting(false);
          setSubmitStatus("error");
          console.error("EmailJS Error:", error.text);

          // Clear the error message after 5 seconds
          setTimeout(() => setSubmitStatus(null), 5000);
        },
      );
  };

  return (
    <div className="bg-white dark:bg-(--color-dark2-text) rounded-md p-3 xs:p-3.5 md:p-5 shadow-md transition-colors duration-200 w-full">
      <h2 className="text-sm md:text-base lg:text-lg font-bold text-(--color-dark-text) dark:text-white mb-3">
        {t("contact.sendMessage")}
      </h2>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-2.5 xs:gap-3.5 md:gap-4.5"
      >
        <input
          type="text"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Input Group: Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="user_name"
            className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)"
          >
            {t("contact.name")}
          </label>
          <input
            id="user_name"
            name="user_name"
            type="text"
            required
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

        {/* Input Group: Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="user_email"
            className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)"
          >
            {t("contact.email")}
          </label>
          <input
            id="user_email"
            name="user_email"
            type="email"
            required
            pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
            title={t("contact.invalidEmail")}
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

        {/* Input Group: Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="user_phone"
            className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)"
          >
            {t("contact.phone")}
          </label>
          <input
            id="user_phone"
            name="user_phone"
            type="tel"
            required
            pattern="[0-9+() -]*"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9+\-() ]/g, "");
            }}
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

        {/* Input Group: Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-xs md:text-sm font-medium text-(--color-bg-dark) dark:text-(--color-bg-primary)"
          >
            {t("contact.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows="3"
            required
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 resize-none focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          ></textarea>
        </div>

        {/* Status Message UI */}
        {submitStatus && (
          <div
            className={`text-xs md:text-sm font-medium p-3 rounded-md border ${
              submitStatus === "success"
                ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400"
                : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400"
            }`}
          >
            {submitStatus === "success"
              ? t("contact.successMessage")
              : t("contact.errorMessage")}
          </div>
        )}

        {/* Button */}
        <button
          aria-label="Submit"
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-2 font-bold rounded-md transition-all duration-300 whitespace-nowrap text-center text-xs sm:text-sm lg:text-base py-2 xs:py-2.5 px-3.5 xs:px-4 sm:px-4.5 md:px-5 lg:px-5.5 xl:px-6 text-white ${
            isSubmitting
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "cursor-pointer bg-(--color-primary) hover:bg-(--color-primary-hover) dark:bg-(--color-primary2)"
          }`}
        >
          {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
