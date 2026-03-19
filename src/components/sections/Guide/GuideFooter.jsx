import React from "react";
import { useTranslation } from "react-i18next";

const GuideFooter = () => {
  const { t } = useTranslation("guide");

  return (
    <footer
      className="pt-10 mb-12 flex flex-col items-center gap-8 w-full"
      data-aos="fade-up"
    >
      {/* Concluding Thought / "The End" */}
      <div className="flex flex-col items-center text-center gap-3 bg-(--color-bg-primary) dark:bg-slate-800/30 p-8 rounded-md border border-(--color-divider)/40 w-full max-w-4xl relative overflow-hidden">
        <i className="fa-solid fa-quote-left absolute -left-2 -top-2 text-6xl text-(--color-primary)/5 pointer-events-none"></i>

        <h2 className="font-semibold text-lg text-(--color-primary)">
          {t("footer.conclusionTitle")}
        </h2>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) leading-relaxed max-w-2xl italic">
          {t("footer.conclusionText")}
        </p>
      </div>

      {/* Official Project Footer */}
      <div className="border-t border-(--color-divider)/40 pt-6 w-full text-center text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary) flex flex-col gap-1.5 opacity-80">
        <p className="font-medium">{t("footer.text")}</p>
        <p dangerouslySetInnerHTML={{ __html: t("footer.copyright") }} />
      </div>
    </footer>
  );
};

export default GuideFooter;
