import React from "react";
import { useTranslation } from "react-i18next";

const SideBar = ({ onClose }) => {
  const { t } = useTranslation("guide");

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const handleEmploymentClick = (e, cardType) => {
    e.preventDefault();
    const employmentSection = document.getElementById("employment");
    if (employmentSection) {
      employmentSection.scrollIntoView({ behavior: "smooth" });
    }
    if (window.animateEmploymentCard) {
      window.animateEmploymentCard(cardType);
    }
    if (onClose) onClose();
  };

  return (
    <aside
      className="flex flex-col h-full w-full drop-shadow-lg/10 bg-white dark:bg-(--color-dark-text) rounded-md overflow-hidden"
      data-aos="fade-right"
    >
      <div className="flex flex-col gap-2 p-4 xs:p-5 bg-(--color-bg-primary) dark:bg-(--color-bg-dark) border-b border-(--color-light3-text)/40 shrink-0">
        <div className="flex flex-row items-center justify-start gap-2.5">
          <div className="bg-(--color-primary) dark:bg-(--color-primary2) rounded-md p-1.5 text-white">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <h1 className="font-bold text-base xs:text-lg text-(--color-dark-text) dark:text-white">
            {t("sidebar.title")}
          </h1>
        </div>
        <p className="text-xs xs:text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-60">
          {t("sidebar.subTitle")}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 p-4 xs:p-5 overflow-y-auto [&_a]:hover:bg-(--color-primary)/5 [&_a_i]:text-slate-900/55 [&_a:hover_i]:text-(--color-primary) [&_a]:hover:text-(--color-primary) [&_a]:p-1.5 [&_a]:px-3 [&_a]:rounded-md">
        <a
          href="#preface"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-regular fa-comment text-sm pt-1"></i>
          <span className="text-sm xs:text-base">{t("sidebar.preface")}</span>
        </a>

        <a
          href="#legislation"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-scale-balanced text-sm pt-1"></i>
          <span className="text-sm xs:text-base">
            {t("sidebar.legislation")}
          </span>
        </a>

        <a
          href="#employment"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-briefcase text-sm pt-1"></i>
          <span className="text-sm xs:text-base">
            {t("sidebar.employment")}
          </span>
        </a>

        <div className="text-xs xs:text-sm flex flex-col ml-6.5 [&_a]:hover:bg-transparent [&_a]:text-(--color-dark2-text) mb-1">
          <a
            href="#employment"
            onClick={(e) => handleEmploymentClick(e, "public")}
            className="cursor-pointer hover:text-(--color-primary) transition-colors py-1"
          >
            {t("sidebar.publicSect")}
          </a>
          <a
            href="#employment"
            onClick={(e) => handleEmploymentClick(e, "private")}
            className="cursor-pointer hover:text-(--color-primary) transition-colors py-1"
          >
            {t("sidebar.privateSect")}
          </a>
          <a
            href="#employment"
            onClick={(e) => handleEmploymentClick(e, "freelance")}
            className="cursor-pointer hover:text-(--color-primary) transition-colors py-1"
          >
            {t("sidebar.freelance")}
          </a>
        </div>

        <a
          href="#skills"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-graduation-cap text-sm pt-1"></i>
          <span className="text-sm xs:text-base">{t("sidebar.skills")}</span>
        </a>
        <a
          href="#entrepreneurship"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-rocket text-sm pt-1"></i>
          <span className="text-sm xs:text-base">{t("sidebar.business")}</span>
        </a>
        <a
          href="#family_municipality"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-user-group text-sm pt-1"></i>
          <span className="text-sm xs:text-base">
            {t("sidebar.municipality")}
          </span>
        </a>

        <a
          href="#entrepreneurs"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-comments text-sm pt-1"></i>
          <span className="text-sm xs:text-base">
            {t("sidebar.entrepreneurs")}
          </span>
        </a>
        <a
          href="#good-practices"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-star text-sm pt-1"></i>
          <span className="text-sm xs:text-base">
            {t("sidebar.goodPractices")}
          </span>
        </a>
        <a
          href="#toolkit"
          onClick={handleLinkClick}
          className="flex flex-row items-start justify-start gap-2 text-(--color-dark-text) dark:text-white"
        >
          <i className="fa-solid fa-toolbox text-sm pt-1"></i>
          <span className="text-sm xs:text-base">{t("sidebar.toolkit")}</span>
        </a>
      </div>

      <div className="bg-(--color-bg-primary) dark:bg-(--color-bg-dark) p-4 xs:p-5 border-t border-(--color-light3-text)/40 mt-auto shrink-0">
        <div className="flex flex-row justify-start items-center gap-3">
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <span className="fi fi-eu text-2xl xs:text-4xl block scale-135"></span>
          </div>
          <h1 className="text-(--color-bg-dark) dark:text-(--color-bg-primary) text-[8px] xs:text-[10px] leading-tight max-w-40 uppercase font-medium">
            {t("sidebar.footer")}
          </h1>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
