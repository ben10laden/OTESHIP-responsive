import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageData } from "../../../hooks/useLanguageData";

const ToolkitSection = () => {
  const { t } = useTranslation("guide");
  const { toolkitData } = useLanguageData();

  // State to manage which template accordion is currently open
  const [openSheet, setOpenSheet] = useState(null);

  const toggleSheet = (id) => {
    if (openSheet === id) {
      setOpenSheet(null);
    } else {
      setOpenSheet(id);
    }
  };

  return (
    <section
      className="flex flex-col gap-10 scroll-mt-32 w-full mb-8"
      id="toolkit"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-3" data-aos="fade-up">
        <div className="flex flex-row items-center justify-start gap-2">
          <div className="h-1 w-8 bg-(--color-primary) rounded-full"></div>
          <h1 className="font-semibold text-2xl text-(--color-dark-text) dark:text-white">
            {t("toolkit.title")}
          </h1>
        </div>
        <p className="text-sm text-(--color-bg-dark) dark:text-(--color-bg-primary) max-w-4xl leading-relaxed">
          {t("toolkit.introText")}
        </p>
      </div>

      {/* Overview Table */}
      <div
        className="flex flex-col gap-4 w-full"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <h2 className="font-semibold text-lg text-(--color-dark-text) dark:text-white border-b border-(--color-divider)/50 pb-2">
          {t("toolkit.tableTitle")}
        </h2>

        <div className="overflow-x-auto bg-white dark:bg-(--color-dark-text) rounded-md drop-shadow-lg border border-(--color-divider)/50 mt-2">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="bg-(--color-bg-primary) dark:bg-slate-800/50 text-(--color-dark-text) dark:text-white text-sm border-b border-(--color-divider)/50">
                <th className="p-4 font-semibold w-1/4">Tool</th>
                <th className="p-4 font-semibold w-1/3">How it is Used</th>
                <th className="p-4 font-semibold w-5/12">Purpose</th>
              </tr>
            </thead>
            <tbody className="text-xs text-(--color-bg-dark) dark:text-(--color-bg-primary)">
              {toolkitData?.overview?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-(--color-divider)/30 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                >
                  <td className="p-4 font-medium text-(--color-primary) align-top">
                    {item.tool}
                  </td>
                  <td className="p-4 align-top leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.usage}
                  </td>
                  <td className="p-4 align-top leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Sheets / Templates */}
      <div
        className="flex flex-col gap-4 w-full mt-4"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <h2 className="font-semibold text-lg text-(--color-dark-text) dark:text-white border-b border-(--color-divider)/50 pb-2">
          {t("toolkit.sheetsTitle")}
        </h2>

        <div className="flex flex-col gap-3">
          {toolkitData?.sheets?.map((sheet) => (
            <div
              key={sheet.id}
              className="flex flex-col bg-white dark:bg-(--color-dark-text) rounded-md drop-shadow-sm border border-(--color-divider)/40 overflow-hidden transition-all duration-300"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleSheet(sheet.id)}
                className="flex flex-row items-center justify-between p-4 w-full text-left hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex flex-row items-center gap-3">
                  <i className="fa-regular fa-file-lines text-(--color-secondary)"></i>
                  <h3 className="font-medium text-sm text-(--color-dark-text) dark:text-white">
                    {sheet.title}
                  </h3>
                </div>
                <i
                  className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform duration-300 ${openSheet === sheet.id ? "rotate-180" : ""}`}
                ></i>
              </button>

              {/* Accordion Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openSheet === sheet.id
                    ? "max-h-200 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border-t border-(--color-divider)/30">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded border border-slate-200 dark:border-slate-700 shadow-inner font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {sheet.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolkitSection;
