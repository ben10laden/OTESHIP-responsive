import React from "react";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { t } = useTranslation("guide");

  const handleEmploymentClick = (e, cardType) => {
    e.preventDefault();
    const employmentSection = document.getElementById("employment");
    if (employmentSection) {
      employmentSection.scrollIntoView({ behavior: "smooth" });
    }
    if (window.animateEmploymentCard) {
      window.animateEmploymentCard(cardType);
    }
  };

  return (
    <aside
      className="flex flex-col h-full w-full drop-shadow-lg/10"
      data-aos="fade-right"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 p-5 bg-(--color-bg-primary) dark:bg-(--color-bg-dark) rounded-t-md border-b border-(--color-light3-text)/40">
        <div className="flex flex-row items-center justify-start gap-2.5">
          <div className="bg-(--color-primary) dark:bg-(--color-primary2) rounded-md p-1.5 text-white">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <h1 className="font-bold text-lg text-(--color-dark-text) dark:text-white">
            {t("sidebar.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-60">
          {t("sidebar.subTitle")}
        </p>
      </div>

      {/* Navigation Links */}
      <div className="border-b border-(--color-light3-text)/40 bg-white dark:bg-(--color-dark-text) flex flex-col gap-1.5 p-5 overflow-y-auto [&_a]:hover:bg-(--color-primary)/5 [&_a_i]:text-slate-900/55 [&_a:hover_i]:text-(--color-primary) [&_a]:hover:text-(--color-primary) [&_a]:p-1.5 [&_a]:px-3 [&_a]:rounded-md">
        <a
          href="#preface"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-regular fa-comment text-sm"></i>{" "}
          {t("sidebar.preface")}
        </a>
        <a
          href="#legislation"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-scale-balanced text-sm"></i>{" "}
          {t("sidebar.legislation")}
        </a>

        {/* Employment Group */}
        <a
          href="#employment"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-briefcase text-sm"></i>{" "}
          {t("sidebar.employment")}
        </a>
        <div className="text-sm flex flex-col ml-6.5 [&_a]:hover:bg-transparent [&_a]:text-(--color-dark2-text)">
          <a
            href="#employment"
            onClick={(e) => handleEmploymentClick(e, "public")}
            className="cursor-pointer hover:text-(--color-primary) transition-colors"
          >
            {t("sidebar.publicSect")}
          </a>
          <a
            href="#employment"
            onClick={(e) => handleEmploymentClick(e, "private")}
            className="cursor-pointer hover:text-(--color-primary) transition-colors"
          >
            {t("sidebar.privateSect")}
          </a>
          <a
            href="#employment"
            onClick={(e) => handleEmploymentClick(e, "freelance")}
            className="cursor-pointer hover:text-(--color-primary) transition-colors"
          >
            {t("sidebar.freelance")}
          </a>
        </div>

        <a
          href="#skills"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-graduation-cap text-sm"></i>{" "}
          {t("sidebar.skills")}
        </a>
        <a
          href="#entrepreneurship"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-rocket text-sm"></i> {t("sidebar.business")}
        </a>
        <a
          href="#family_municipality"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-user-group text-sm"></i>{" "}
          {t("sidebar.municipality")}
        </a>

        {/* NEW SECTIONS */}
        <a
          href="#entrepreneurs"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-comments text-sm"></i>{" "}
          {t("sidebar.entrepreneurs")}
        </a>
        <a
          href="#good-practices"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-star text-sm"></i>{" "}
          {t("sidebar.goodPractices")}
        </a>
        <a
          href="#toolkit"
          className="flex flex-row items-center justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-toolbox text-sm"></i> {t("sidebar.toolkit")}
        </a>
      </div>

      {/* Footer */}
      <div className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-5 border-b border-(--color-light3-text)/40">
        <div className="flex flex-row justify-start items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
            <span className="fi fi-eu text-4xl block scale-135"></span>
          </div>
          <h1 className="text-(--color-bg-dark) dark:text-(--color-bg-primary) text-xs max-w-40">
            {t("sidebar.footer")}
          </h1>
        </div>
      </div>
      <div className="bg-white dark:bg-(--color-dark-text) flex-1 rounded-b-md"></div>
    </aside>
  );
};

export default SideBar;
