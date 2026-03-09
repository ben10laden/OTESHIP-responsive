import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";
import SectionHeader from "../../common/SectionHeader";
import ContactForm from "../../common/ContactForm";

const ContactSection = () => {
  const { contactSectionData } = useLanguageData();
  const { t } = useTranslation("home");

  return (
    <section
      className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-8 xs:p-10 md:p-15 lg:p-16 xl:p-20 transition-colors duration-200"
      id="contact"
    >
      <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-9 xl:gap-10">
        <SectionHeader
          title={t("contact.title")}
          description={t("contact.description")}
          aosDelay="200"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-9 xl:gap-10 max-w-7xl w-full mx-auto items-start">
          {/* Column 1: Contact Info */}
          <div
            className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl mx-auto lg:mx-0"
            data-aos="fade-right"
          >
            <h2 className="text-sm md:text-base lg:text-lg font-bold text-(--color-dark-text) dark:text-white">
              {t("contact.contactInfo")}
            </h2>

            <div className="flex flex-col gap-6 md:gap-8">
              {contactSectionData.map((school, index) => (
                <div
                  key={index}
                  id={index === 0 ? "first-school-trigger" : undefined}
                  /* RESTORED: The clean border-l-2 sidebar from the first version */
                  className="flex flex-col gap-2 border-l-2 border-(--color-primary) dark:border-(--color-primary2) pl-4"
                >
                  <h3 className="text-sm md:text-base font-bold text-(--color-dark-text) dark:text-white">
                    {school.name}
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2.5 text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                      <i className="fa-solid fa-envelope text-(--color-primary) dark:text-(--color-primary2) w-4 text-center"></i>
                      {school.email}
                    </span>
                    <span className="flex items-center gap-2.5 text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                      <i className="fa-solid fa-phone text-(--color-primary) dark:text-(--color-primary2) w-4 text-center"></i>
                      {school.phone}
                    </span>
                    <span className="flex items-center gap-2.5 text-xs md:text-sm lg:text-base text-(--color-bg-dark) dark:text-(--color-bg-primary)">
                      <i className="fa-solid fa-location-dot text-(--color-primary) dark:text-(--color-primary2) w-4 text-center"></i>
                      {school.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: The Form */}
          <div className="w-full max-w-2xl mx-auto lg:max-w-none">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
