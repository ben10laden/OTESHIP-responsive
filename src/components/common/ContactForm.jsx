import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation("home");
  const form = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const sendEmail = async (e) => {
    e.preventDefault();

    // Spam protection check
    if (e.target.elements.botcheck.value) {
      setToastType("success");
      setShowToast(true);
      form.current.reset();
      return;
    }

    setIsSubmitting(true);

    // 1. Gather form data into a clean object
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    // Remove the botcheck field from the payload
    delete data.botcheck;

    try {
      // 2. Send the data to your Hostinger PHP script
      const response = await fetch("https://oteship.eu/send-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // 3. Handle the server's response
      if (result.status === "success") {
        setIsSubmitting(false);
        setToastType("success");
        setShowToast(true);
        form.current.reset();
      } else {
        throw new Error(result.message || "Server returned an error");
      }
    } catch (error) {
      setIsSubmitting(false);
      setToastType("error");
      setShowToast(true);
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-(--color-dark2-text) rounded-md p-3 xs:p-3.5 md:p-5 shadow-md transition-colors duration-200 w-full relative">
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
            onInvalid={(e) =>
              e.target.setCustomValidity(t("contact.requiredField"))
            }
            onInput={(e) => e.target.setCustomValidity("")}
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

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
            pattern="^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"
            onInvalid={(e) => {
              if (e.target.validity.valueMissing) {
                e.target.setCustomValidity(t("contact.requiredField"));
              } else {
                e.target.setCustomValidity(
                  `${t("contact.invalidFormat")}\n${t("contact.invalidEmail")}`,
                );
              }
            }}
            onInput={(e) => e.target.setCustomValidity("")}
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

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
            pattern="[0-9+\\-\\(\\)\\s]*"
            onInvalid={(e) =>
              e.target.setCustomValidity(t("contact.requiredField"))
            }
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9+\-() ]/g, "");
              e.target.setCustomValidity("");
            }}
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          />
        </div>

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
            onInvalid={(e) =>
              e.target.setCustomValidity(t("contact.requiredField"))
            }
            onInput={(e) => e.target.setCustomValidity("")}
            className="text-xs md:text-sm lg:text-base text-(--color-dark-text) dark:text-white bg-transparent border border-gray-300 dark:border-gray-500 rounded-md px-3.5 py-2 xs:py-2.5 md:py-3 resize-none focus:outline-none focus:ring-1 focus:ring-(--color-primary) transition-all"
          ></textarea>
        </div>

        <button
          aria-label="Submit"
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-2 font-bold rounded-md transition-all duration-300 whitespace-nowrap text-center text-xs sm:text-sm lg:text-base py-2 xs:py-2.5 px-3.5 xs:px-4 sm:px-4.5 md:px-5 lg:px-5.5 xl:px-6 text-white ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "cursor-pointer bg-(--color-primary) hover:bg-(--color-primary-hover) dark:bg-(--color-primary2)"
          }`}
        >
          {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
        </button>
      </form>

      <div
        className={`no-scale fixed bottom-10 left-0 right-0 sm:right-auto sm:left-5 sm:bottom-5 z-9999 transition-all duration-500 transform px-4 sm:px-0 ${
          showToast
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div
          className={`flex items-center justify-between sm:justify-start gap-3 px-5 py-4 rounded-lg shadow-2xl border-l-4 w-full sm:w-max min-w-70 ${
            toastType === "success"
              ? "bg-white dark:bg-(--color-dark2-text) border-green-500 text-gray-800 dark:text-white"
              : "bg-white dark:bg-(--color-dark2-text) border-red-500 text-gray-800 dark:text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <i
              className={`fa-solid ${toastType === "success" ? "fa-circle-check text-green-500" : "fa-circle-xmark text-red-500"} text-xl`}
            ></i>
            <span className="text-sm md:text-base font-semibold">
              {toastType === "success"
                ? t("contact.successMessage")
                : t("contact.errorMessage")}
            </span>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
